<![endif]-->

**

## ProjetN°7: 
## Créez un réseau social d’entreprise

## Groupomania


Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

## Exigences
la web app doit pouvoir se connecter et se déconnecter à l’application et que la session de l’utilisateur persiste pendant qu’il est connecté.
* la présentation des fonctionnalités doit être simple ;
* la création d’un compte doit être simple et possible depuis un téléphone mobile ;
*  le profil doit contenir très peu d’informations pour que sa complétion soit rapide ;
* la suppression du compte doit être possible ;
* l’accès à un forum où les salariés publient des contenus multimédias doit être présent ;
* l’accès à un forum où les salariés publient des textes doit être présent ;
*  les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés ;
* le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés;


### Technologies à utiliser:

Une base de données relationnelles qui se manipule avec le langage SQL pour le stockage de données.
Utiliser un framework Front-End au choix, le projet doit être codé en Javascript, donc pas le framework Symfony.

L'API utilisée devra impérativement respecter des pratiques de code sécurisé et respecter les standards WCAG.

## Conditions préalables:

Vous aurez besoin d'avoir Node et npm installés localement sur votre machine.

##  Installation de certaines indépendances
Cloner le projet.
#### Backend:
- Ouvrir le terminal, aller dans le répertoire backend et exécuter npm install pour installer les dépendances.

- Pour créer la base de données utilisez le fichier groupomania.sql  qui se trouve dans le dossier config qui se trouve dans le dossier backend. Et la configuration de la base de donnée se trouve dans le fichier db.config.js.
- Exécuter la commande npm start pour lancer le serveur de développement.

#### Frontend:
- Ouvrir le terminal, aller dans le répertoire frontend et exécuter npm install pour installer les dépendances.

- Le projet a été généré avec VueJS: exécuter npm run serve pour lancer le serveur de développement.


## Technologies & frameworks utilisés:

Installer:
NodeJS
@vue/cli@4.5.13
MySQL






