var url = new URL("http://localhost:3001/api/incidents");

function tab() {


        $.get(url,(data) => {

        //on vide le div container puis on cree le tableau
        document.getElementById("container").innerHTML = "";

        //on recupere le div container
        let container = document.getElementById("container");

        //on cree la table
        let table = document.createElement("table");
        table.setAttribute('class', 'table');
        
        //on cree le nom des cases du haut du tableau
        let thead = document.createElement("thead");
        let tr = document.createElement("tr"); //ligne du tablea
        let th = document.createElement("th");

        th.innerText = "Numero"; 
        tr.appendChild(th);
            th = document.createElement("th");
            th.innerText = "Type";
            tr.appendChild(th);

            th = document.createElement("th");
            th.innerText = "Longitude";
            tr.appendChild(th);

            th = document.createElement("th");
            th.innerText = "Latitude";
            tr.appendChild(th);

            th = document.createElement("th");
            th.innerText = "Situation";
            tr.appendChild(th);

            th = document.createElement("th");
            th.innerText = "Priorite";
            tr.appendChild(th);

            th = document.createElement("th");
            th.innerText = "Date";
            tr.appendChild(th);

            th = document.createElement("th");
            th.innerText = "Image";
            tr.appendChild(th);

            thead.appendChild(tr);
            table.appendChild(thead);

            //on cree les donnees du tableau
            let tbody = document.createElement("tbody");
            for (let i = 0; i < data.incidents.length; i++) {

                tr = document.createElement("tr");
                let td = document.createElement("td");
                td.innerText = data.incidents[i].numero;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerText = data.incidents[i].type;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerText = data.incidents[i].longitude;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerText = data.incidents[i].latitude;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerText = data.incidents[i].situation;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerText = data.incidents[i].priorite;
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerText = data.incidents[i].date;
                tr.appendChild(td);

                td = document.createElement("td");

                // Création de l'élément image miniature
                const thumbnailImage = document.createElement('img');
                thumbnailImage.src = 'chemin_vers_image_miniature.jpg';
                thumbnailImage.alt = data.incidents[i].image;

                // Création de l'élément lien de la popup
                const popupLink = document.createElement('a');
                // popupLink.href = '#'; // Lien de la popup à définir
                popupLink.classList.add('popup-link');
                popupLink.appendChild(thumbnailImage);

                // Création de l'élément conteneur d'image
                const imageContainer = document.createElement('div');
                const imageContainerId = 'image-container-' + i; // Identifiant unique
                imageContainer.id = imageContainerId;
                imageContainer.setAttribute('class', 'image-container');
                imageContainer.appendChild(popupLink);

                td.appendChild(imageContainer);
               
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);

            // Création de l'élément bouton de fermeture
            const closeButton = document.createElement('span');
            const closeButtonId = 'close-button'; // Identifiant unique
            closeButton.id = closeButtonId;
            closeButton.setAttribute('class', 'close-button');
            closeButton.innerHTML = '&times;';

            // Création de l'élément conteneur du popup
            const popupContainer = document.createElement('div');
            const popupContainerId = 'popup-container'; // Identifiant unique
            popupContainer.id = popupContainerId;
            popupContainer.setAttribute('class', 'popup-container');
            popupContainer.appendChild(closeButton);

            container.appendChild(table);  
            container.appendChild(popupContainer);
        });

           
}

function getTotalPages(){
  //on recupere le nombre de pages
  
  let nbpages; 
  $.ajax({
    url: url,
    async: false,
    success: function(data){
      nbpages = data.totalPages;
    }
  });
  return nbpages;
}

function addRemovePage(param){
  //on recupere l'url et on la transforme en objet url et on fait des verifications pour ne pas depasser les bornes
  let page = url.searchParams.get('page'); if (!page) page = 1; if(page == 1 && param == "-") return; if(page == getTotalPages() && param == "+") return;

  //on change la page en fonction du parametre puis on change l'url
  if(param == "+")
    page++;
  else if(param == "-")
    page--;
  changeParam('page', page);
}

function colorPage(){
  //on recupere la page actuelle et on la colore
  let page = url.searchParams.get('page'); if (!page) page = 1;
  document.querySelector("#page"+page).setAttribute('class', "page-link bg-custom");
}

function changeParam(param, value){
  // si on veut aller a la derniere page, on recupere le nombre de pages (last) et on change la valeur
  if(value == 'last'){
    value = getTotalPages();
  }
  
  //on recupere l'url et on la transforme en objet url
  var search_params = url.searchParams;
  search_params.set(param, value);

  // replace current query string with new params
  url.search = search_params.toString();

  //on recree le tableau et la pagination
  tab();
  if(param == 'page'){
    createPagin();
  }
}

function changeSelectValue(){
  //on recupere la valeur du select  
  let e = document.getElementById("nbelt");
  //on change l'url
  changeParam('number', e.value);
  
  //on verifie que la page actuelle n'est pas superieure au nombre de pages
  let page = url.searchParams.get('page');
  let totalPages = getTotalPages();
  if (page > totalPages) { page = totalPages; changeParam('page', page);}
}

function createPagin(){
  //on vide la pagination actuelle
  document.getElementById("pagin").innerHTML = " ";

  //on recupere la page actuelle
  let page = url.searchParams.get('page'); if (!page) page = 1;
  let e = document.getElementById("pagin");

  //set timeout pour attendre que le serveur soit lancé
  setTimeout(function() {
    $.get(url, function (data) {
      let nbpages = data.totalPages;
      //verifications pour ne pas depasser les bornes
      let firstPage; if (page-3 < 0) firstPage = 1; else firstPage = Number(page) - 1; if (firstPage+3 > nbpages) firstPage = nbpages - 3;
      //on cree les boutons de pagination
      for (let i = firstPage; i <= firstPage+3; i++) {
        let a = document.createElement("a");
        a.setAttribute('class', 'page-link');
        a.setAttribute('href', '#');
        a.setAttribute('id', 'page'+i);
        a.setAttribute('onclick', `changeParam('page',${i})`);
        a.innerText = i;
        e.appendChild(a);
      }
      //on colore la page actuelle
      colorPage();
    });
  }, 200); // pause de 100 ms avant la tentative de connexion
  
}

function getImage(i, popupContainer){
  $.ajax({
    url: 'http://localhost:3001/api/image/' + i,
    method: 'GET',
    success: function(data) {
      // La requête a réussi, 'data' contient l'image
      // Création de l'élément d'image
      const image = $('<img>');
      image.attr('src', 'data:image/jpeg;base64,' + data);
      image.attr('alt', 'Image du backend');
      image.attr('id', 'popup');
    
      // Ajouter l'image au conteneur d'image
      $(popupContainer).append(image);
    }
  });
}

function handlePopup() {

  // Sélectionnez l'élément racine avec l'ID "container"
  const containerElement = document.getElementById('container');

  // Ajoutez un gestionnaire d'événements au conteneur
  containerElement.addEventListener('click', function(event) {
    // Vérifiez si l'élément cliqué est un div à l'intérieur d'un td
    if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'A') {
      // Récupérez l'ID du div
      const divId = event.target.parentElement.parentElement.id;

          // Récupérer l'élément de conteneur d'image
        const popupContainer = document.getElementById('popup-container');
        const popupImage = document.getElementById('popup');
        const closeButton = document.getElementById('close-button');
        const imageContainer = document.getElementById(divId);

        const linkElement = imageContainer.querySelector('a');
        const imageElement = linkElement.querySelector('img');
        const altText = imageElement.alt;

        imageContainer.addEventListener('click', function (event) {
          getImage(altText, popupContainer);
          event.preventDefault(); // Empêche le comportement par défaut du lien 
          // Affiche le popup
          popupContainer.style.display = 'block';
        });

        closeButton.addEventListener('click', function() {  
          // Ferme le popup
          popupContainer.style.display = 'none';
          // Supprime l'image du popup
          popupContainer.removeChild(popupImage);
        });
    }
  });  
}

//on attend que le DOM soit chargé pour executer les fonctions
document.addEventListener("DOMContentLoaded", function () {
  //code
  console.log("Le document est chargé");
  //on crée le tableau initial
  tab();
  //si on change le nombre d'éléments à afficher, on appelle changeSelectValue
  document.getElementById("nbelt").addEventListener("change", changeSelectValue);
  //on crée la pagination initiale
  createPagin();
  handlePopup();

});