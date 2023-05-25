var url = new URL("http://localhost:3001/api/incidents/form");


function handleSubmit() {
  console.log("handleSubmit");
    //on recupere l'id du dernier client
    let numMax;
    $.ajax({
        url: "http://localhost:3001/api/incidents",
        async: false,
        success: function (data) {
            numMax = data.total;
        }
    });
    newnum = numMax + 1;

    //on cree un objet client avec les valeurs du formulaire
    let incidents= {
        numero: newnum,
        type: document.getElementById("type").value,
        longitude: document.getElementById("longitude").value,
        latitude: document.getElementById("latitude").value,
        situation: document.getElementById("situation").value,
        priorite: document.getElementById("priorite").value,
        date: new Date()
    };
    // let tmp = document.getElementById("image").files[0];
    // console.log(tmp);

     // on crée un objet FormData pour envoyer les données avec le fichier
     let formData = new FormData();
     formData.append("image", document.getElementById("image").files[0]);
     formData.append("incidents", JSON.stringify(incidents));

    //on envoie le client au serveur
    $.ajax({
        url: url,
        method: "POST",
        contentType: false,
        processData: false,
        data: formData,
        success: function (response) {
            alert(response.message);
        },
        error: function (error) {
            console.error('Erreur lors de l\'envoi de l\'image :', error);
        }

    });

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.getElementById("latitude").value = latitude;
    document.getElementById("longitude").value = longitude;
}
