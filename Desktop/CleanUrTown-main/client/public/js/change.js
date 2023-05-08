var url = new URL("http://localhost:3001/api/clients");

document.addEventListener("DOMContentLoaded", function () {
    const id = document.getElementById("id");
    id.addEventListener("input", handleChange);
});

function handleChange() {
    $.get(url, function (data) {
        //on récupère l'élement correspondant à l'id
        let item = data.clients[parseInt(id.value) - 1];
        console.log(item);
        //on remplit les champs avec les valeurs de l'élément
        document.getElementById("email").value = item.email;
        document.getElementById("name2").value = item.first;
        document.getElementById("name").value = item.last;
        document.getElementById("society").value = item.company;
        document.getElementById("country").value = item.country;
        //on formate la date pour l'afficher dans le bon format
        const date = new Date(item.created_at);
        const newDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        document.getElementById("date").value = newDate;
    });
}

function handleSubmit() {
    let id = parseInt(document.getElementById("id").value);
    //on cree un objet client avec les valeurs du formulaire
    let client = {
        id: id,
        email: document.getElementById("email").value,
        first: document.getElementById("name2").value,
        last: document.getElementById("name").value,
        company: document.getElementById("society").value,
        created_at: document.getElementById("date").value,
        country: document.getElementById("country").value
    };
    //on envoie le client au serveur
    $.ajax({
        url: url,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(client),
        success: function (response){
            console.log("eeeeee");
            alert(response.message);
        }
    });
}