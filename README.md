# Netatmo-Project

Cette station remonte des mesures vers le cloud Netatmo qui les archive et permet leur restitution via une API que tout le monde peut utiliser 
(Disponible ici : https://dev.netatmo.com/resources/technical/reference/common/getmeasure)

L’exercice consiste à utiliser cette API afin de récupérer les mesures températures relevées par la station météo pendant les 7 derniers jours, puis, avec le résultat, d’écrire un algorithme calculant le min, max et la moyenne de la température sur ces 7 derniers jours.

Les contraintes que vous devez respecter :
* L'échelle demandée à l’API doit être “max”
* Vous pouvez utiliser un client qui vous simplifie le travail (implémentation de oauth credentials, requête d'API...), l’algorithme doit par contre travailler sur l’ensemble des données.
* Vous pouvez utiliser les couples device_id/module_id suivants : `70:ee:50:04:a4:4e/02:00:00:04:a0:c8`. Ces stations sont publiques, leur données sont accessibles par tout le monde.


### Server NodeJS

J'utilise l'extension `RestClient` sur *Visual Studio Code* pour pouvoir envoyer des requêtes au serveur, le fichier contenant les requêtes est : `requests.rest`

Pour démarrer le serveur, il faut : 
* Se rendre dans le dossier avec un terminal
* Executer `npm install` pour installer les dépendances néccessaires
* Créer un fichier `.env` et copier-coller ses identifiants sous la forme :
```
client_id=<your_client_id>
client_secret=<your_client_secret>
grant_type=password
username=<your_username>
password=<your_password>

device_id=70%3Aee%3A50%3A04%3Aa4%3A4e
module_id=02%3A00%3A00%3A04%3Aa0%3Ac8
scale=1hour
type=temperature
optimize=false
real_time=false
end_date=1599609500
```
* Garder ce fichier dans le .gitignore puisqu'il contient des identifiants

Je me suis servi du fichier `.env` comme fichier de config, dans une vraie interface, ces fichiers seraient séparés et modifiable

Pour toute question, je suis disponible par mail : hugo.deroche@gmail.com 
