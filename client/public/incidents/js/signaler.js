var url = new URL("http://localhost:3001/api/incidents");

function handleSubmit() {
    //on recupere l'id du dernier client
    let numMax;
    $.ajax({
        url: url,
        async: false,
        success: function (data) {
            numMax = data.total;
        }
    });

    //on cree un objet client avec les valeurs du formulaire
    let  incidents= {
        numero: numMax + 1,
        type: document.getElementById("type").value,
        longitude: document.getElementById("longitude").value,
        latitude: document.getElementById("latitude").value,
        situation: document.getElementById("situation").value,
        priorite: document.getElementById("priorite").value,
        date: new Date()
        
    };
    //on envoie le client au serveur
    $.ajax({
        url: url,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(incidents),
        success: function (response) {
            alert(response.message);
        }
    });
}
