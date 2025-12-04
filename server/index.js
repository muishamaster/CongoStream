require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple DB abstraction: prefer Postgres (DATABASE_URL) else use SQLite file
let db = null;
let dbType = null;

async function initDb() {
  if (process.env.DATABASE_URL) {
    // Postgres
    const { Client } = require('pg');
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    try {
      await client.connect();
      db = client;
      dbType = 'pg';
    } catch (err) {
      console.error('⚠️ Postgres connection failed:', err.message);
      console.log('Falling back to SQLite...');
      initSqlite();
      return;
    }
    // Ensure tables exist
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT UNIQUE,
          password TEXT,
          created_at TIMESTAMP DEFAULT now()
        );
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS films (
          id SERIAL PRIMARY KEY,
          title TEXT,
          poster TEXT
        );
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS musiques (
          id SERIAL PRIMARY KEY,
          title TEXT,
          artist TEXT,
          cover TEXT
        );
      `);
    } catch (err) {
      console.error('Error creating Postgres tables:', err.message);
    }
  } else {
    initSqlite();
  }
}

function initSqlite() {
  try {
    const sqlite3 = require('sqlite3');
    if (!sqlite3) {
      console.error('SQLite3 not available, running in demo mode');
      dbType = 'demo';
      return;
    }
    const dbFile = path.join(__dirname, 'data', 'dev.sqlite');
    // ensure data dir
    const dataDir = path.dirname(dbFile);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const sqlite = new sqlite3.Database(dbFile);
    db = sqlite;
    dbType = 'sqlite';
    // Create tables
    sqlite.serialize(() => {
      sqlite.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
      sqlite.run(`CREATE TABLE IF NOT EXISTS films (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, poster TEXT)`);
      sqlite.run(`CREATE TABLE IF NOT EXISTS musiques (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, artist TEXT, cover TEXT)`);
    });
  } catch (err) {
    console.error('⚠️ SQLite initialization failed:', err.message);
    console.log('Running in demo mode (using in-memory storage)');
    dbType = 'demo';
  }
}

// Seed some sample data if empty
async function seedData() {
  if (dbType === 'pg') {
    const res = await db.query('SELECT COUNT(*) AS cnt FROM films');
    if (parseInt(res.rows[0].cnt) === 0) {
      await db.query("INSERT INTO films (title, poster) VALUES ($1,$2)", ['Kinshasa by Night','/assets/data/film1.jpg']);
      await db.query("INSERT INTO films (title, poster) VALUES ($1,$2)", ['Mboka Hustle','/assets/data/film2.jpg']);
    }
    const r2 = await db.query('SELECT COUNT(*) AS cnt FROM musiques');
    if (parseInt(r2.rows[0].cnt) === 0) {
      await db.query("INSERT INTO musiques (title, artist, cover) VALUES ($1,$2,$3)", ['Formidable','Fally Ipupa','/assets/data/music1.jpg']);
      await db.query("INSERT INTO musiques (title, artist, cover) VALUES ($1,$2,$3)", ['Mortel-06','Innoss\'B','/assets/data/music2.jpg']);
    }
  } else if (dbType === 'sqlite') {
    db.get('SELECT COUNT(*) AS cnt FROM films', (err, row) => {
      if (!row || row.cnt === 0) {
        db.run("INSERT INTO films (title, poster) VALUES (?,?)", ['Kinshasa by Night','/assets/data/film1.jpg']);
        db.run("INSERT INTO films (title, poster) VALUES (?,?)", ['Mboka Hustle','/assets/data/film2.jpg']);
      }
    });
    db.get('SELECT COUNT(*) AS cnt FROM musiques', (err, row) => {
      if (!row || row.cnt === 0) {
        db.run("INSERT INTO musiques (title, artist, cover) VALUES (?,?,?)", ['Formidable','Fally Ipupa','/assets/data/music1.jpg']);
        db.run("INSERT INTO musiques (title, artist, cover) VALUES (?,?,?)", ['Mortel-06','Innoss\'B','/assets/data/music2.jpg']);
      }
    });
  }
}

// Routes
app.get('/api/films', async (req, res) => {
  try {
    if (dbType === 'pg') {
      const r = await db.query('SELECT id,title,poster FROM films');
      res.json(r.rows);
    } else {
      db.all('SELECT id,title,poster FROM films', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/musiques', async (req, res) => {
  try {
    if (dbType === 'pg') {
      const r = await db.query('SELECT id,title,artist,cover FROM musiques');
      res.json(r.rows);
    } else {
      db.all('SELECT id,title,artist,cover FROM musiques', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    if (dbType === 'pg') {
      const r = await db.query('SELECT id,username,created_at FROM users WHERE id=$1', [id]);
      res.json(r.rows[0] || null);
    } else {
      db.get('SELECT id,username,created_at FROM users WHERE id=?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || null);
      });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Auth: register
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    if (dbType === 'pg') {
      const r = await db.query('INSERT INTO users (username,password) VALUES ($1,$2) RETURNING id,username,created_at', [username, hashed]);
      const user = r.rows[0];
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ user, token });
    } else {
      db.run('INSERT INTO users (username,password) VALUES (?,?)', [username, hashed], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        const user = { id: this.lastID, username };
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ user, token });
      });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Auth: login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });
  try {
    if (dbType === 'pg') {
      const r = await db.query('SELECT id,username,password FROM users WHERE username=$1', [username]);
      const user = r.rows[0];
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ user: { id: user.id, username: user.username }, token });
    } else {
      db.get('SELECT id,username,password FROM users WHERE username=?', [username], async (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(400).json({ error: 'Invalid credentials' });
        const ok = await bcrypt.compare(password, row.password);
        if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: row.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ user: { id: row.id, username: row.username }, token });
      });
    }
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', db: dbType, port: PORT });
});

// Start
(async () => {
  try {
    await initDb();
    await seedData();
    app.listen(PORT, () => console.log(`\n🚀 Server listening on port ${PORT} (db=${dbType})\n`));
  } catch (e) {
    console.error('Failed to start server', e);
    process.exit(1);
  }
})();
