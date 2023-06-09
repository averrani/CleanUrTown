const express = require('express');
const business_incidents = require('../business/business_incident');
const business_customers = require('../business/business_customers');
const app = express();
const fs = require('fs');
const { Buffer } = require('buffer');
const path = require('path');


var cors = require('cors');

const multer  = require('multer');


const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPE[file.mimetype];

        cb(null, name + "_" + Date.now() + '.' + extension);
    }
})

const upload = multer({storage: storage });

// Importation de bodyParser pour gérer les requêtes POST
var bodyParser = require('body-parser');


const apiServ = {
    //fct qui recupere les données et les renvoie au path indiqué
    start : function(port) {
        /* ----------------------------------------------------------- */
        /* ----------------------------------------------------------- */
        // Définition du middleware pour gérer les incidents
        /* ----------------------------------------------------------- */
        /* ----------------------------------------------------------- */
        app.use(express.json()); 
        app.use(express.static('public'));
        app.use(cors()); 

        app.get('/api/image/:imageName', (req, res) => {
            const imagePath = path.resolve('', 'img', req.params.imageName);
            // Vérification de l'existence de l'image
            if (fs.existsSync(imagePath)) {
              // Lecture du contenu de l'image
              fs.readFile(imagePath, (err, data) => {
                if (err) {
                  console.error(err);
                  res.status(500).send('Erreur lors de la récupération de l\'image');
                } else {
                  const imageBase64 = Buffer.from(data).toString('base64');
                  res.send(imageBase64);
                }
              });
            } else {
              res.status(404).send('Image non trouvée');
            }
          });
        
        app.get('/api/incidents/all', (req,res) => {   
            
            const incidents = business_incidents.getAllIncidents();

            //transforme en flux lisible par le navigateur
            res.status(200).json(incidents);
        })

        //req reprend les donnees fournies par la requete
        app.get('/api/incidents', (req,res) => {   
            
            const number = req.query.number;
            const page = req.query.page;
            const incidents = business_incidents.getIncidents(number, page);

            //transforme en flux lisible par le navigateur
            res.status(200).json(incidents);
        })


        app.post('/api/incidents/form', upload.single("image"), (req,res) => {
            business_incidents.handleIncident(req.body, req.file);
            res.json({ success: true, message: "Formulaire soumis avec succès !" });
        });

        //ajoute un user
        app.post('/api/incidents', (req, res) => {
            let message = business_incidents.addIncident(req.body);
            res.status(200).send(message);
        })
        
       
        app.delete('/api/incidents', (req, res) => {
            const incidentId = req.query.numero;
            let message = business_incidents.removeIncident(incidentId);
            res.status(200).json(message);
        });
        
            
        /* ----------------------------------------------------------- */
        /* ----------------------------------------------------------- */
        // Définition du middleware pour gérer les customers
        /* ----------------------------------------------------------- */
        /* ----------------------------------------------------------- */

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

        app.get('/api/login', function (req, res) {
        res.json({msg: 'This is CORS-enabled for all origins!'})
        });

        // Définition de la route POST pour ajouter un nouveau client avec les données envoyées dans le body
        app.post("/api/customers", function(req, res) {
            const total = business_customers.getCustomers();
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
            res.json(business_customers.addCustomer(newCustomer));
        });

        app.post('/api/login', (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            const result = business_customers.checkLogin(email, password);
            if (result) {
              res.status(200).json({ message: 'Login successful' });
            } else {
              res.status(401).json({ message: 'Login failed' });
            }
          });

        //lance l'ecoute
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        }) 
    }

};

module.exports = apiServ;