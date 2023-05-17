var url = new URL("http://localhost:3001/api/incidents");


Lon_max = 43.358366219149865;
Lon_min = 43.213288;
Lat_max = 5.284260;
Lat_min = 5.571010;

function handleImageFormSubmit(event) {
    event.preventDefault(); // Empêche le rechargement de la page
  
    // Récupérer l'élément du formulaire d'image et le fichier sélectionné
    const imageInput = document.getElementById('imageInput');
    const imageFile = imageInput.files[0];
  
    // Vérifier si un fichier a été sélectionné
    if (imageFile) {
      // Créer un objet FormData pour envoyer les données du formulaire
      const formData = new FormData();
      formData.append('image', imageFile);
  
      // Envoyer l'image au serveur en utilisant une requête AJAX
      const imageUploadURL = 'http://localhost:3001/api/uploads'; // URL de l'endpoint de téléchargement d'image sur le serveur
      $.ajax({
        url: imageUploadURL,
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          // Traitement de la réponse du serveur après l'envoi de l'image
          console.log('Image envoyée avec succès');
          console.log('Réponse du serveur :', response);
  
          // Une fois l'image envoyée, exécuter la fonction handleSubmit()
          handleSubmit();
        },
        error: function (error) {
          // Gérer les erreurs lors de l'envoi de l'image
          console.error('Erreur lors de l\'envoi de l\'image :', error);
        }
      });
    } else {
      console.log('Aucun fichier image sélectionné');
      // Gérer le cas où aucun fichier n'a été sélectionné
    }
  }
  

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
        date: new Date(),
      
        
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
