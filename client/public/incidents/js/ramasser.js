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
  // Prevent page refresh
  event.preventDefault();
  let incidentId = document.getElementById("numero").value;
  if (!incidentId || isNaN(incidentId)) {
      alert("Veuillez saisir un numéro d'incident valide.");
      return;
  }
  url.searchParams.set("numero", incidentId);
  // Envoie de la requête DELETE
  $.ajax({
      url: url,
      method: "DELETE",
      success: function (response) {
          alert(response.message);
      },
  });
}
