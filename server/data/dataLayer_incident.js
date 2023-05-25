const fs = require('fs');
const incident_file = "./data/incidents.json";


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

    
    //retire l'incident en fonction de son id
    removeIncident: function (removeuser) {
        //get data from json file
        const rawdata = fs.readFileSync(incident_file);
        //parse to object
        let newincidents = JSON.parse(rawdata);
        //findIndex permet de retrouver un incident en fonction du paramètre removeuser
        const index = newincidents.findIndex(incident => incident.numero === parseInt(removeuser));
        if (index !== -1) {
            //puis de le retirer s'il existe
            newincidents.splice(index, 1);
            //et de réécrire le fichier
            fs.writeFileSync(incident_file, JSON.stringify(newincidents, null, 2));
            return { success: true, message: "Incident supprimé avec succès." };
        } else {
            return { success: false, message: "Incident non trouvé." };
        }
    },
      

    handleIncident : function(incident, image){
        let obj = JSON.parse(incident.incidents);
        obj.image = "../../server/img/" + image.filename;
        this.addIncident(obj);
        console.log(incident);
    }
};  

module.exports = data;