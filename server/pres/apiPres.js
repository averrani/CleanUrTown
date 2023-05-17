const express = require('express');
const business_incidents = require('../business/business_incident');
const business_customers = require('../business/business_customers');
const app = express();
const path =require('path');
var cors = require('cors');
const multer  = require('multer');
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null,Date.now()+ path.extname(file.originalname));
    }
});
const upload = multer({storage:storage});

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

       //image
        app.get("/api/incidents/uploads",(req,res)=>{
            res.render("upload");
        });
            

        app.post("/api/incidents/uploads",upload.single('image'),(req,res)=>{
            res.send("upload sucess");
        });

        //ajoute un user
        app.post('/api/incidents', (req, res) => {
            let message = business_incidents.addIncident(req.body);
            res.status(200).send(message);
        })
        
        app.put('/api/incidents', (req, res) => {
            let message = business_incidents.updateIncident(req.body);
            res.status(200).send(message);
        })

        app.delete('/api/incidents', (req, res) => {
            const clientid = req.query.id;
            let message = business_incidents.removeIncident(clientid);
            res.status(200).send(message);
        })
        
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