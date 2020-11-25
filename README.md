# Readme

## Démarrage de l'application frontend

- Clônez le repo sur lequel vous vous trouvez.
- À la racine du dossier app faites un npm start. (Sous OSX vérifiez que vous avez vscode ou CLT Apple)
- Puis npm run serve
- Vous rendre sur http://localhost:8080/

## Installation de la base de données

- Créer une base donnée nommée "keeplinkdb" dans votre base de donnée mysql. Command : CREATE DATABASE keeplinkdb;
- Copier keeplinkdb_sauvegarde.sql dans la base de donnée keeplinkdb. Command : SOURCE keeplinkdb_sauvegarde.sql;
- Dans un fichier .env à la racine du dossier /api insérer les informations suivantes :
    => DB_NAME=keeplinkdb
    => DB_USER=root
    => DB_MDP=""

## Démarrage de l'application backend

- À la racine du dossier api, faites un node server ou nodemon server (node recquis pour cette aplication)
- Vous pouvez utiliser l'application. Enjoy!

## Infos

- L'utilisateur Victor est admin.
Voici ses informations pour se connecter :
email : victor@gmail.com
mot de passe : VictorDeweerdt