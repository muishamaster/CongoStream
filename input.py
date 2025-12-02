# input.py - Script utilitaire simple pour tests locaux
# Ce fichier demande un numéro et un montant, calcule des frais (1%)
# et affiche un reçu. Il est conservé pour tests manuels et exemples.
try:
    destinataire = float(input("veuillez entrer le numero de destinataire:"))
    montant = float(input("Veuillez entrer le montant de la transaction : "))
except ValueError:
    print("Entrée invalide. Veuillez entrer un nombre.")
    exit()

# Valeurs par défaut d'exemple (peuvent être remplacées)
expediteur = "Daniel songo (0812403653)"
date_heure = "17/09/2025 09:44"
reference = "TEST-001"

# Calcul des frais (1%) avec minimum 100 CDF
frais = montant * 0.01
if frais < 100:
    frais = 100

total_debite = montant + frais

print("\n=== REÇU ===")
print(f"Date/Heure : {date_heure}")
print(f"Expéditeur : {expediteur}")
print(f"Destinataire : {destinataire}")
print(f"Montant : {montant} CDF")
print(f"Frais : {frais} CDF")
print(f"Total débité : {total_debite} CDF")
print(f"Référence : {reference}")