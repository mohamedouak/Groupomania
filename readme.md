INFOS
Projet 7 de la formation Développeur Web d'OpenClassrooms : Créez un réseau social d’entreprise Août 2021

Prerequis
Ce projet necessite l'installation de : Node : https://nodejs.org/fr/download/ MySQL : http://dev.mysql.com/downloads/mysql/#downloads Vue CLI : npm install -g @vue/cli

Installation
DATABASE :

Executez les commandes suivante pour importer la base de données : 
    mysql -h localhost -u root -p root < groupomania.sql
BACKEND :

Executez les commandes suivantes dans le dossier "backend": 
    "npm install" 
    "nodemon server"

Il est necessaire de modifier le fichier ".env.test" présent en racine :
- Renommez le fichier ".env"
- modifiez le fichier : entrez les valeurs d'environnement suivantes :
    DB_NAME = groupomania
    DB_USER = root
    DB_HOST=localhost:3306
    TOKEN_KEY = 7fa4efcef04a839925bf05fb227487cc
FRONTEND :

Executez les commandes suivantes dans le dossier "groupomania": 
    "npm install" 
    "npm run serve"
pour tester l'appli vous pouvez utilisez ces 2 comptes utilisateurs :
    1. compte administrateur :
        pseudo : Momo59
        mdp : Tisslane59
    2. compte utilisateur sans droits admin :
        pseudo : Nono59
        mdp : Tisslane59