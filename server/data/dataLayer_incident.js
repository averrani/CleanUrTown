const incident_file = "./data/incidents.json";
const fs = require('fs');

let data = {
    //renvoie tous les incidents du fichier users.json
    getAllIncidents : function(){
        //get data from json file
        const rawdata = fs.readFileSync(incident_file);
        //parse to object
        let incidents = JSON.parse(rawdata);
        //return object
        return incidents;
    },

    //renvoie que les number incidents de la page page
    getIncidents : function(number, page){
        //get data from json file
        const rawdata = fs.readFileSync(incident_file);
        //parse to object
        let incidents = JSON.parse(rawdata);

        const total = incidents.length;

        //si les param sont definis, on decoupe notre tab de incidents a partir de facon a afficher
        //le number d'elts entre la page -1 et la page
        if(number && page){
            incidents = incidents.slice((page - 1)*number, page*number);
        }

        incidents = {
            total : total,
            incidents : incidents
        };

        //return object
        return incidents;
    },

    addIncident : function(user){
        //get data from json file
        const rawdata = fs.readFileSync(incident_file);
        //parse to object
        let incidents = JSON.parse(rawdata);

        incidents.push(user);

        var newdata = JSON.stringify(incidents);

        fs.writeFile(incident_file, newdata, err => {
            if (err) throw err;
        });

    },

    updateIncident : function(user){
        // Charge le contenu du fichier JSON
        const data = fs.readFileSync(incident_file);
        const incidents = JSON.parse(data);

        // Trouve l'objet à mettre à jour
        const objectid = incidents.findIndex(obj => obj.id === user.id);

        // Si l'objet existe, met à jour ses propriétés avec les données fournies
        if (objectid !== -1) {
            const updatedObject = { ...incidents[objectid], ...user };
            incidents[objectid] = updatedObject;
            // Écrit le nouveau contenu du fichier JSON
            const updatedData = JSON.stringify(incidents, null, 2);
            fs.writeFileSync(incident_file, updatedData);
            return 1;
        } else {
            return 0;
        }
    },

    //retire l'incident en fonction de son id
    removeIncident : function(removeuser){
        //get data from json file
        const rawdata = fs.readFileSync(incident_file);
        //parse to object
        let newincidents = JSON.parse(rawdata);
        //findIndex permet de retrouver un user en fonction du param removeuser
        const numero = newincidents.findIndex(user => user.numero=== parseInt(removeuser));
        if (numero != -1) {
            //puis de le retirer s'il existe 
            newincidents.splice(numero, 1);
            //et de reecrire le fichier
            fs.writeFileSync(incident_file, JSON.stringify(newincidents, null, 2));
            return 1;
        } else 
          return 0;        
    }
};  

module.exports = data;