let editBtn = document.querySelector(".editBtn");
//let editBtn = document.createElement("button");
//editBtn.innerText = "MODIFIER"
//stockContainer.appendChild(editBtn)

let deleteBtn = document.querySelector(".deleteBtn");
//let deleteBtn = document.createElement("button");
//deleteBtn.innerText = "SUPPRIMER"
//stockContainer.appendChild(deleteBtn)

let ulContainer = document.querySelector(".ulContainer");
// POUR RAJOUTER UN PRODUIT CRÉÉ À L'UL DU STOCKCONTAINER
let li = document.createElement("li");

let name = document.querySelector("#name");
let stock = document.querySelector("#stock");
let buyingPriceHT = document.querySelector("#buyingPriceHT");
let sellingPriceHT = document.querySelector("#sellingPriceHt");
let type = document.querySelector("#type");
let degres = document.querySelector("#degres");

//FonctionConstructeur POUR LES PRODUITS CRÉÉS PUIS AJOUTÉS AU STOCK

//FONCTION MODIFIER
function modifier() {
  let inputAdd = editInput.value;

  //DEMANDE DE REMPLISSAGE
  if (inputAdd.value == "") {
    alert("Veuillez remplir le formulaire avant de valider.");
  }

  //CRÉATION D'UN INPUT TEXT AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
  li.innerHTML = `<input type="text" value=${li.innerValue} class="updateInput"/>`;

  //CRÉATION D'UN INPUT NUMBER AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
  //li.innerHTML = `<input type="number" value=${li.innerValue} class="updateInput"/>`;

  //CRÉATION D'UN INPUT DATALIST AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
  //li.innerHTML = `<input type="datalist" value=${li.innerValue} class="updateInput"/>`;

  //QUERY SUR L'INPUT POUR LE RÉCUPÉRER ET LE STOCKER DANS updateInput
  let updateInput = document.querySelectorAll(".updateInput");

  //EVENTLISTENER SUR updateInput TEXT
  updateInput.addEventListener("keydown", function (eventInfo) {
    if (eventInfo.key == "Enter") {
      //updateInput REMPLIE PAR USER REMPLACE LA BALISE INPUT
      li.innerText = updateInput.value;
      li.innerValue = updateInput.value;

      //REPLACEMENT DES BOUTONS DELETE ET EDIT
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
    }
  });

  //EVENTLISTENER SUR updateInput NUMBER

  //EVENTLISTENER SUR updateInput DATALIST

  // REMPLACEMENT DE L'ANCIEN ARRAY NON MODIFIÉ PAR CELUI QU'ON VIENT D'ÉDITER
  //render(FonctionConstructeurModifiée);
}

//FONCTION SUPPRIMER
function supprimer() {
  deleteBtn.addEventListener("click", function () {
    if (confirm("Voulez vous supprimez ?")) {
      li.remove();
    }
  });
}

//ECOUTER D'ÉVÈNEMENT SUR LE BOUTON MODIFIER
editBtn.addEventListener("click", function () {
  modifier();
});

//FONCTION CHANGER LA COULEUR SELON SI LA BOISSON EST ALCOOLISÉE OU NON
/* function colorAlcool(li) {
    switch (alcool.value) {
        // Si la valeur de l'input alcool est true
        case "true":
            // On colore l'élément (juste son nom ?) en rouge
            li.style.color = "red";
            break;
        // Si la valeur de l'input alcool est false
        case "false":
            // On colore l'élément (juste son nom ?) en bleu
            li.style.color = "blue";
            break;
        default:
            break;
    }
}*/

//FONCTION RANGEMENT DES ÉLÉMENTS DU STOCK PAR ORDRE ALPHABÉTIQUE