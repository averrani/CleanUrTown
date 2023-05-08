const data = require("../data/dataLayer"); // Importe le module dataLayer
const _ = require("underscore"); // Importe le module Underscore

const defaultNumber = 10; // Nombre de clients à retourner par défaut
const defaultPage = 1; // Page à retourner par défaut
const maxNumber = 50; // Nombre maximum de clients à retourner

const business = {
    // Récupère tous les clients
    getAllCustomers : function() {
        return data.getAllCustomers();
    },

    // Récupère les clients en fonction du nombre et de la page spécifiés
    getCustomers : function(number, page) {

        // Si le nombre ou la page n'est pas spécifié, utilise les valeurs par défaut
        if(number == undefined || page == undefined){
            number = defaultNumber;
            page = defaultPage;
        }

        // Si le nombre est supérieur au maximum, utilise le maximum
        if(number > maxNumber)
            number = maxNumber;

        // Récupère les clients correspondants aux critères
        const resCustomers = data.getCustomers(number, page);
        
        // Ajoute des propriétés pour faciliter la pagination
        resCustomers.page = page;
        resCustomers.numberByPage = number;
        resCustomers.totalPages = Math.ceil(resCustomers.total /number);

        return resCustomers;
    },

    // Ajoute un nouveau client
    ajouter : function(customer){
        return data.ajouter(customer);;
    },



}

module.exports = business; // Exporte le module business
