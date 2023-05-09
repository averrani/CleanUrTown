var express = require("express");
const business = require("../business/business");
var cors = require('cors')
var app = express();

// Importation de bodyParser pour gérer les requêtes POST
var bodyParser = require('body-parser')

const apiPres = {
    start:function(port){

        // Définition du middleware pour gérer le format JSON dans les requêtes
        app.use(express.json());

        // Définition du middleware pour parser les données POST
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json());

        // Définition des headers pour autoriser les requêtes provenant d'autres domaines
        app.use(function(req, res, next) {  
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.use(cors())

        app.get('/api/login', function (req, res) {
        res.json({msg: 'This is CORS-enabled for all origins!'})
        })


        // Définition de la route POST pour ajouter un nouveau client avec les données envoyées dans le body
        app.post("/api/customers", function(req, res) {
            const total = business.getCustomers();
            let id = total.total + 1;
            var d = new Date();
            var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
            var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            var fullDate = date+' '+hours;
            const newCustomer ={
                id : id,
                email : req.body.email,
                first : req.body.first,
                last : req.body.last,
                company : req.body.company,
                created_at : fullDate,
                password : req.body.password
            }

            // Appel de la méthode ajouter pour ajouter le nouveau client à la base de données
            // et renvoi de la réponse à la requête HTTP
            res.json(business.ajouter(newCustomer));
        });
        app.post('/api/login', (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            const result = business.checkLogin(email, password);
            if (result) {
              res.status(200).json({ message: 'Login successful' });
            } else {
              res.status(401).json({ message: 'Login failed' });
            }
          });
          

        // Démarrage du serveur sur le port spécifié en paramètre
        app.listen(port, function(){
            console.log("Server running on port " + port);
        });
    }
}

// Exportation de l'objet apiPres pour l'utiliser dans d'autres fichiers
module.exports = apiPres;
