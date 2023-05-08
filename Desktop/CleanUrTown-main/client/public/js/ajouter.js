
// Ajout d'un client
addEventListener("DOMContentLoaded", async function(){
    // A l'écoute des clique sur le bouton envoyer
    const formAddCustomer = document.getElementById("formAddCustomer");
    formAddCustomer.addEventListener("submit", function(event){
        event.preventDefault();
    // Prépare les données
        const customer = {
                        "email" : document.getElementById("email").value,
                        "first" : document.getElementById("first").value,   
                        "last" : document.getElementById("last").value,
                        "country" : document.getElementById("country").value,
                        "password" : document.getElementById("password").value,}

     // Ajout du client sur le serveur
        ajouter(customer);
        alert("vous êtes inscrit!");

        // Retour à la page d'accueil
        window.location.href="index.html";
    });
});

// Ajout du client sur le serveur
function ajouter(customer) {
    const url="http://localhost:3001/api/customers";
    return new Promise((resolve, reject) => {
        $.post(url, customer)
        .done(function(data){
            resolve(data.result);
        })
        .fail(function(error) {
            reject(new Error(`erreur': ${error.statusText}`));
        });
    });
}