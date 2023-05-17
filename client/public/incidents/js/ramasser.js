var url = new URL("http://localhost:3001/api/incidents");


function getTotalIncidents() {
    //on recupere le nombre de clients
    let nbincidents;
    $.ajax({
        url: url,
        async: false,
        success: function (data) {
            nbincidents = data.incidents.length;
        }
    });
    return nbincidents;
}


function handleSubmit(event) {
    // Preventing page refresh
    event.preventDefault();
    let numero = parseInt(document.getElementById("numero").value);
    let nbincidents = getTotalCustomers();
    if ( numero <= 0 || isNaN(numero)) {
      alert("Le client avec l'ID donné n'existe pas");
      return;
    }
    // on récupère l'url et on la transforme en objet url
    url.searchParams.set("numero", numero);
    // on envoie le client au serveur
    $.ajax({
      url: url,
      method: "DELETE",
      success: function (response) {
        alert(response.message);
      },
    });
  }