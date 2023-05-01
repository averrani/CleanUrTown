const data = require('../data/dataLayer');

const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 50;

const business = {
    getAllClients : function(){
        return data.getClients();
    },

    getClients : function(number, page){
        //initialise les pages si non fait
        if(page == undefined ){ // == ou === ?????
            page = defaultPage;
        }
        if(number == undefined ){ // == ou === ?????
            number = defaultNumber;
        }
        //etablit une val max a pas depasser
        if(number > maxNumber)
            number = maxNumber;

        //recupere l'objet crée par datalayer
        const clients = data.getClients(number, page);

        //ajoute a l'objet d'autre infos
        clients.page = page;
        clients.number = number;
        clients.totalPages = Math.ceil(clients.total / number); //si la division est decimale, renvoie nbr par exces 

        return clients;
    },

    addUser : function(user){
        data.addUser(user);
        return { success: true, message: "Utilisateur ajouté avec succès." };
    },

    updateUser : function(user){
        let nb = data.updateUser(user);
        if(nb) return { success: true, message: "Utilisateur modifié avec succès." };
        else return { success: false, message: "Erreur lors de la modification du client." };
    },

    removeUser : function(user){
        let nb = data.removeUser(user);
        if(nb) return { success: true, message: "Utilisateur supprimé avec succès." };
        else return { success: false, message: "ID d'utilisateur non trouvé." };
    }

};

module.exports = business;