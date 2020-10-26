# Netatmo-Project

Cette station remonte des mesures vers le cloud Netatmo qui les archive et permet leur restitution via une API que tout le monde peut utiliser 
(Disponible ici : https://dev.netatmo.com/resources/technical/reference/common/getmeasure)

L’exercice consiste à utiliser cette API afin de récupérer les mesures températures relevées par la station météo pendant les 7 derniers jours, puis, avec le résultat, d’écrire un algorithme calculant le min, max et la moyenne de la température sur ces 7 derniers jours.

Les contraintes que vous devez respecter :
* L'échelle demandée à l’API doit être “max”
* Vous pouvez utiliser un client qui vous simplifie le travail (implémentation de oauth credentials, requête d'API...), l’algorithme doit par contre travailler sur l’ensemble des données.
* Vous pouvez utiliser les couples device_id/module_id suivants : 70:ee:50:04:a4:4e/02:00:00:04:a0:c8. Ces stations sont publiques, leur données sont accessibles par tout le monde.


### Server NodeJS

Pour démarrer le serveur, il faut : 
* se rendre dans le dossier avec un terminal
* executer `npm install` pour installer les dépendances néccessaires
* créer un fichier `.env` et copier-coller ses identifiants sous la forme :
```
client_id=<your client_ir>
client_secret=<your client_secret>
grant_type=password
username=<your username>
password=<your password>
```
