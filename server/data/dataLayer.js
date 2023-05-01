const file = "./data/users.json";
const fs = require('fs');

let data = {
    //renvoie tous les clients du fichier users.json
    getAllClients : function(){
        //get data from json file
        const rawdata = fs.readFileSync(file);
        //parse to object
        let clients = JSON.parse(rawdata);
        //return object
        return clients;
    },

    //renvoie que les number clients de la page page
    getClients : function(number, page){
        //get data from json file
        const rawdata = fs.readFileSync(file);
        //parse to object
        let clients = JSON.parse(rawdata);

        const total = clients.length;

        //si les param sont definis, on decoupe notre tab de clients a partir de facon a afficher
        //le number d'elts entre la page -1 et la page
        if(number && page){
            clients = clients.slice((page - 1)*number, page*number);
        }

        clients = {
            total : total,
            clients : clients
        };

        //return object
        return clients;
    },

    addUser : function(user){
        //get data from json file
        const rawdata = fs.readFileSync(file);
        //parse to object
        let clients = JSON.parse(rawdata);

        clients.push(user);

        var newdata = JSON.stringify(clients);

        fs.writeFile(file, newdata, err => {
            if (err) throw err;
        });

    },

    updateUser : function(user){
        // Charge le contenu du fichier JSON
        const data = fs.readFileSync(file);
        const clients = JSON.parse(data);

        // Trouve l'objet à mettre à jour
        const objectid = clients.findIndex(obj => obj.id === user.id);

        // Si l'objet existe, met à jour ses propriétés avec les données fournies
        if (objectid !== -1) {
            const updatedObject = { ...clients[objectid], ...user };
            clients[objectid] = updatedObject;
            // Écrit le nouveau contenu du fichier JSON
            const updatedData = JSON.stringify(clients, null, 2);
            fs.writeFileSync(file, updatedData);
            return 1;
        } else {
            return 0;
        }
    },

    //retire l'user en fonction de son id
    removeUser : function(removeuser){
        //get data from json file
        const rawdata = fs.readFileSync(file);
        //parse to object
        let newclients = JSON.parse(rawdata);
        //findIndex permet de retrouver un user en fonction du param removeuser
        const id = newclients.findIndex(user => user.id === parseInt(removeuser));
        if (id != -1) {
            //puis de le retirer s'il existe 
            newclients.splice(id, 1);
            //et de reecrire le fichier
            fs.writeFileSync(file, JSON.stringify(newclients, null, 2));
            return 1;
        } else 
          return 0;        
    }
};  

module.exports = data;