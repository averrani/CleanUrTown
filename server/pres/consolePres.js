const chalk = require('chalk');
let readlineSync = require('readline-sync');

const business = require('../business/business');

let i, id, email, first, last, company, company1, created, country, country1, user, users, input;


const consolePres = {
    start: function () {

        /**
         * on a recupéré les données du fichier et on les stocke dans users
         */
        function getData() {
            users = business.getAllClients();
            return users; //ENLEVER
        }

        /**
         * on affiche le menu et les questions en couleur
         */
        function printQst() {
            console.log(chalk.red("                    Menu : \n"));
            console.log(chalk.blue(" -1- Afficher la liste des pays et le compteur"));
            console.log(chalk.blue(" -2- Afficher la liste des sociétés et le compteur"));
            console.log(chalk.blue(" -3- Afficher toute la liste"));
            console.log(chalk.blue(" -4- Ajouter un utilisateur "));
            console.log(chalk.blue(" -5- Retirer un utilisateur \n"));
            

            input = readlineSync.question(chalk.yellow('Quel est votre choix ? \n'));
        }

        function getElement(elt) {
            //on met que les elt selectiones dans elt
            console.log(users);
            if (elt === country) {
                for (i = 0; i < users.length; i++) {
                    elt[i] = users[i].country;
                }
            } else {
                for (i = 0; i < users.length; i++) {
                    elt[i] = users[i].company;
                }
            }
            console.log(users[2]);
            // on compte les elt et on les met dans l'objet counts
            const counts = {};
            for (const num of elt) {
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }
            let res = [];
            // on transforme l'objet counts en tableau
            for (i in counts) {
                if (elt === country) {
                    res.push({ "country": i, "count": counts[i] });
                } else {
                    res.push({ "company": i, "count": counts[i] });
                }
            }
            //on sort le tableau
            res.sort((a, b) => b.count - a.count);
            console.log(res);
        }

        function addUser() {
            id = readlineSync.question(chalk.green('Quel est l`id ? \n')); //changer
            email = readlineSync.question(chalk.green('Quel est l`email ? \n'));
            first = readlineSync.question(chalk.green('Quel est le prenom ? \n'));
            last = readlineSync.question(chalk.green('Quel est le nom? \n'));
            company1 = readlineSync.question(chalk.green('Quel est le nom de la société ? \n'));
            created = readlineSync.question(chalk.green('Quand a elle été créee ? \n'));
            country1 = readlineSync.question(chalk.green('Quel est en est le pays ? \n'));

            user = {
                id: id,
                email: email,
                first: first,
                last: last,
                company: company1,
                created_at: created,
                country: country1
            };

            business.addUser(user);
        }

        function removeUser(){
            id = readlineSync.question(chalk.green('Quel est l`id ? \n')); 
            business.removeUser(id);
        }


        function cases(input) {
            if (input === '1') {
                getElement(country);
            } else if (input === '2') {
                getElement(company);
            } else if (input === '3') {
                console.log(users);
            } else if (input === '4') {
                addUser();
            } else if (input === '5') {
                removeUser();
            }
        }

        function main() {
            getData();
            printQst();
            country = new Array(users.length);
            company = new Array(users.length);
            cases(input);
        }

        main();

    }
};

module.exports = consolePres;