const data = require('../data/dataLayer_incident');

const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 50;

const business = {
    getAllIncidents : function(){
        return data.getIncidents();
    }, 

    getIncidents : function(number, page){
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
        const incidents = data.getIncidents(number, page);

        //ajoute a l'objet d'autre infos
        incidents.page = page;
        incidents.number = number;
        incidents.totalPages = Math.ceil(incidents.total / number); //si la division est decimale, renvoie nbr par exces 

        return incidents;
    },

    addIncident : function(user){
        data.addIncident(user);
        return { success: true, message: "Utilisateur ajouté avec succès." };
    },

    updateIncident : function(user){
        let nb = data.updateIncident(user);
        if(nb) return { success: true, message: "Utilisateur modifié avec succès." };
        else return { success: false, message: "Erreur lors de la modification du client." };
    },

    removeIncident : function(user){
        let nb = data.removeIncident(user);
        if(nb) return { success: true, message: "Utilisateur supprimé avec succès." };
        else return { success: false, message: "ID d'utilisateur non trouvé." };
    },

    handleIncident : function(form, file){
        data.handleIncident(form, file);
    }

};

module.exports = business;