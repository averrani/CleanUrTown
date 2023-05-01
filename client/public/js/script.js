var url = new URL("http://localhost:3001/api/clients");

function create_tab(){
  //set timeout pour attendre que le serveur soit lancé
  setTimeout(function() {
    $.get(url, function (data) {
      //on vide le div container puis on cree le tableau
      document.getElementById("cont").innerHTML = "";
  
      //on recupere le div container
      let container = document.getElementById("cont");
    
      //on cree la table
      let table = document.createElement("table");
      table.setAttribute('class', 'stable');
    
      //on cree le nom des cases du haut du tableau
      let thead = document.createElement("thead");
      let tr = document.createElement("tr"); //ligne du tableau
    
      let th = document.createElement("th");
      th.innerText = "Id"; 
      tr.appendChild(th);
      
      //on crée le nom des colonnes
      th = document.createElement("th"); th.innerText = "E-mail"; tr.appendChild(th);
      th = document.createElement("th"); th.innerText = "Prénom"; tr.appendChild(th);
      th = document.createElement("th"); th.innerText = "Nom"; tr.appendChild(th);
      th = document.createElement("th"); th.innerText = "Société"; tr.appendChild(th);
      th = document.createElement("th"); th.innerText = "Date"; tr.appendChild(th);
      th = document.createElement("th"); th.innerText = "Pays"; tr.appendChild(th);
      
      //et on l'accole au reste du tableau
      thead.appendChild(tr);
      table.append(tr);
    
      //pour chaque element du fichier on cree une ligne
      data.clients.forEach((item) => {
        //on cree une ligne pour chaque element
        let tr = document.createElement("tr");
    
        // on met leurs valeurs dans vals
        let vals = Object.values(item);
    
        // on cree les cellules
        vals.forEach((elem) => {
          let td = document.createElement("td");
          td.innerText = elem; // on met dans les celulles le contenu du fichier
          tr.appendChild(td); // on associe la cellule a la ligne en cours
        });
        table.appendChild(tr); // et on associe la ligne au tableau
      });
      container.appendChild(table) // et on associe le tableau au div
    
    });
  }, 200); // pause de 100 ms avant la tentative de connexion
  
  
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
  create_tab();
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
  document.getElementById("pagin").innerHTML = "";

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

//on attend que le DOM soit chargé pour executer les fonctions
document.addEventListener("DOMContentLoaded", function() {
  //on crée le tableau initial
  create_tab();
  //si on change le nombre d'éléments à afficher, on appelle changeSelectValue
  document.getElementById("nbelt").addEventListener("change", changeSelectValue);
  //on crée la pagination initiale
  createPagin();  
});