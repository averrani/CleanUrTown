const fs = require("fs");
const filename ="./data/customers.json";

let dataLayer = {

    // Récupère tous les clients du fichier JSON
    getAllCustomers: function() {
        const data = fs.readFileSync(filename);
        const customers = JSON.parse(data);
        return customers;
    },

    // Récupère les clients en fonction du nombre et de la page spécifiée
    getCustomers: function(number, page) {
        // Lire le fichier JSON
        let rawdata = fs.readFileSync(filename);
        // Le transformer en objet
        let customers = JSON.parse(rawdata);

        const total = customers.length;
        // Filtrer en fonction du nombre et de la page
        if (number && page) {
            customers = customers.slice((page - 1) * number, page * number);
        }

        // Créer un objet contenant le nombre total et les clients filtrés
        const result = {
            total: total,
            result: customers
        };

        return result;
    },

    // Ajoute un nouveau client au fichier JSON
    addCustomer: function(newCustomer) {
        let data = fs.readFileSync(filename, "utf-8");
        let added = JSON.parse(data);
        added.push(newCustomer);

        fs.writeFileSync(filename, JSON.stringify(added), (error) => {
            if(error) throw error;
        });

        return added;
    },
    
    // Vérifie si l'email et le mot de passe existent dans le fichier JSON
    checkLogin: function(email, password) {
        const data = fs.readFileSync(filename);
        const customers = JSON.parse(data);
        
        for (let customer of customers) {
            if (customer.email === email && customer.password === password) {
                return true;
            }
        }
        
    return false;
    }
}

module.exports = dataLayer;
