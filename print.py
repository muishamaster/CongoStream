# print.py - Exemples d'affichage de reçu (conservation pour tests)
# Ce script calcule des frais et affiche un reçu en trois formats (f-strings,
# str.format() et l'opérateur %). Utile pour tests locaux ou démonstrations.

montant = 25000.00  # Montant de la transaction
expediteur = "Daniel songo(+24397000000)"
destinataire = "Rosaline (+24382000000)"
date_heure = "17/09/2025 09:44"
reference = "TEST-001"

# Calcul des frais (1%), minimum 100 CDF
frais = montant * 0.01
if frais < 100:
    frais = 100

total_debite = montant + frais

print("=== REÇU (f-string) ===")
print(f"Date/Heure : {date_heure}")
print(f"Expéditeur : {expediteur}")
print(f"Destinataire : {destinataire}")
print(f"Montant : {montant} CDF")
print(f"Frais : {frais} CDF")
print(f"Total débité : {total_debite} CDF")
print(f"Référence : {reference}")

print("\n" + "="*30 + "\n")

print("=== REÇU (str.format) ===")
print("Date/Heure : {}".format(date_heure))
print("Expéditeur : {}".format(expediteur))
print("Destinataire : {}".format(destinataire))
print("Montant : {} CDF".format(montant))
print("Frais : {} CDF".format(frais))
print("Total débité : {} CDF".format(total_debite))
print("Référence : {}".format(reference))

print("\n" + "="*30 + "\n")

print("=== REÇU (% operator) ===")
print("Date/Heure : %s" % date_heure)
print("Expéditeur : %s" % expediteur)
print("Destinataire : %s" % destinataire)