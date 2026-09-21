# E-Biblia 1.1.0 — dépôt GitHub APK

Ce dépôt transforme l'application web E-Biblia en application Android avec Capacitor.

## Structure

- `www/index.html` : application E-Biblia complète.
- `assets/icon.png` : icône officielle fournie.
- `bible-data/` : données bibliques fournies dans `Français.zip`.
- `capacitor.config.ts` : configuration Android.
- `.github/workflows/build-apk.yml` : construction automatique de l'APK par GitHub Actions.

## Création du dépôt GitHub

1. Créer un nouveau dépôt GitHub, par exemple `E-Biblia`.
2. Décompresser cette archive.
3. Envoyer **tout le contenu** du dossier à la racine du dépôt.
4. Vérifier que `.github/workflows/build-apk.yml` est bien présent. Le workflow installe les dépendances et génère automatiquement le dossier Android, donc vous n'avez pas besoin de téléverser un dossier `android/` au départ.
5. Faire un commit sur la branche `main`.
6. Ouvrir l'onglet **Actions**.
7. Sélectionner **Construire APK E-Biblia**.
8. Cliquer sur **Run workflow** si le workflow n'a pas déjà démarré.
9. À la fin du build, ouvrir l'exécution terminée et récupérer l'artefact **E-Biblia-APK**.

## Télécharger l'APK depuis GitHub

1. Ouvrir l'onglet **Actions** du dépôt.
2. Ouvrir la dernière exécution réussie de **Construire APK E-Biblia**.
3. Descendre jusqu'à **Artifacts** et télécharger **E-Biblia-APK**.
4. Décompresser le fichier téléchargé, puis installer `app-debug.apk` sur le téléphone Android.

Le téléphone doit autoriser l'installation d'applications provenant de cette source. L'APK debug est destiné aux tests et à un usage personnel.

## Identité Android

- Nom : E-Biblia
- ID Android : `com.ebiblia.app`
- Version web : 1.1.0

## Icône

L'image fournie a été placée dans `assets/icon.png`. Le workflow utilise `@capacitor/assets` pour générer les ressources Android.

## Important — clé Gemini

La version HTML fournie contient déjà une clé API Gemini côté client. Elle n'est donc pas demandée dans les paramètres de l'application.

Cependant, une clé intégrée dans un HTML/une APK peut être extraite par une personne ayant accès au paquet. Pour une distribution publique, il faudra idéalement déplacer l'appel Gemini vers un serveur/proxy et appliquer des restrictions à la clé.

## Données bibliques

Le fichier `Français.zip` a été décompressé dans `bible-data/` afin que les ressources restent disponibles dans le dépôt. Le HTML actuel doit continuer à utiliser ses données embarquées/son mécanisme actuel ; ces fichiers ne sont pas automatiquement chargés par le navigateur tant qu'un code de chargement ne les référence pas.

## Version

E-Biblia 1.1.0
