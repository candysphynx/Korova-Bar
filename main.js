// Récupération des éléments du HTML
let stockContainer = document.querySelector(".stockContainer");
let addProductContainer = document.querySelector(".addProductContainer");
let form = document.querySelector(".formProduct");
let ulContainer = document.querySelector(".ulContainer");
let arrayStock;

// Tableau de produit (a récupérer dans le localStorage si existe)
if (localStorage.getItem("keyStock") == null) {
  // Crée un tableau vide
  arrayStock = [];
} else {
  // Récupérer le tableau stocké en string dans le localStorage
  arrayStock = JSON.parse(localStorage.getItem("keyStock"));
  displayProduct(arrayStock);
}

// Fonctions
function createProduct(e) {
  // Empecher le rechargement de la page
  e.preventDefault();

  // On stocke dans une variable data les données du formulaire
  let data = new FormData(form);

  // On crée un nouveau produit en utilisant en paramètres les saisies de l'utilisateur
  let product = new Product(
    data.get("name"),
    data.get("stock"),
    data.get("buyingPriceHT"),
    data.get("sellingPriceHT"),
    data.get("TVA"),
    data.get("type"),
    data.get("degres")
  );

  // On push le nouveau produit dans le tableau arrayStock
  arrayStock.push(product);

  // On enregistre le produit dans le localStorage
  localStorage.setItem("keyStock", JSON.stringify(arrayStock));

  // On efface les inputs du formulaire
  form.reset();

  // On affiche dans le stock le nouveau produit en appelant la fonction displayProduct
  displayProduct(arrayStock, "all");
}

// Fonction displayProduct pour afficher le tableau dans une li
function displayProduct(array, type) {
  // On crée une ligne vide
  let li = "";

  // On boucle sur le tableau arrayStock
  array.forEach((element, index) => {
    // Pour chaque produit de arrayStock, on crée une ligne correspondante
    li += `<li class="liProduct">${
      element.name
    }  \u00a0 ‖ \u00a0   Prix d'achat HT : ${
      element.buyingPriceHT
    }   \u00a0 ‖ \u00a0  Prix de vente HT : ${
      element.sellingPriceHT
    }   \u00a0 ‖ \u00a0  Marge : ${
      element.margeHT
    }   \u00a0 ‖ \u00a0  Prix TTC : ${element.priceTTC} ${
      // Si la boisson est alcoolisée, on affiche l'emoji -18 ans
      element.type == "boisson-alcoolise" ? "  \u00a0 ‖ \u00a0 🔞" : ""
    } ${
      // Si la boisson est alcoolisée, on affiche le degré d'alcool
      element.type == "boisson-alcoolise"
        ? `\u00a0 ‖ \u00a0  Degrès : ${element.degres} `
        : ""
    }    \u00a0 ‖ \u00a0 Stock : <input type="number" name="stock" min="0" class=${
      // Modification de la couleur du stock
      element.stock > 5 ? "high" : "low"
    } value="${
      element.stock
    }"/> <button class="deleteBtn">❌</button> <button class="editBtn">✏️</button>
  </li>`;

    // Fin de boucle du tableau
  });

  // On affiche li dans ulContainer
  ulContainer.innerHTML = li;

  // On récupère les éléments créés dans la li
  let allDeleteButton = document.querySelectorAll(".deleteBtn");
  let allEditButton = document.querySelectorAll(".editBtn");
  let allLiProduct = document.querySelectorAll(".liProduct");

  // On commence la boucle des boutons supprimer
  allDeleteButton.forEach((element, index) => {
    // Pour chaque bouton je déclenche un event qui :
    element.addEventListener("click", () => {
      // Supprime à l'intérieur du tableau arrayStock l'index selectionné au moment du click
      supprimer(index);
    });
  });
  // On commence la boucle des boutons modifier
  allEditButton.forEach((element, index) => {
    // Pour chaque bouton je déclenche un event qui :
    element.addEventListener("click", () => {
      // Modifie l'index selectionné au moment du click à l'intérieur du tableau arrayStock
      modifier(allLiProduct, index);
    });
  });
}

// Fonction modifier
function modifier(li, liIndex) {
  // Apparition des inputs après click sur btn modifier
  li[
    liIndex
  ].innerHTML = `<input type="text" value=${arrayStock[liIndex].name} class="nameEdit"/> <input type="text" value=${arrayStock[liIndex].buyingPriceHT} class="buyingPriceHTEdit"/> <input type="text" value=${arrayStock[liIndex].sellingPriceHT} class="sellingPriceHTEdit"/> <input type="text" value=${arrayStock[liIndex].TVA} class="TVAEdit"/> <select name="type" class="typeEdit">
  <option value=${arrayStock[liIndex].type}>Choisissez un type de boisson</option>
  <option value="boisson-alcoolise">Boisson alcoolisée</option>
  <option value="boisson-non-alcoolise">
    Boisson non alcoolisée
  </option>
</select> <input type="text" value=${arrayStock[liIndex].degres} class="degresEdit"/>
<input type="number" name="stock" min="0" class="stockEdit" value="${arrayStock[liIndex].stock}"/> 
`;

  // On récupère les variables modifiées
  let nameEdit = document.querySelector(".nameEdit");
  let buyingPriceHTEdit = document.querySelector(".buyingPriceHTEdit");
  let sellingPriceHTEdit = document.querySelector(".sellingPriceHTEdit");
  let TVAEdit = document.querySelector(".TVAEdit");
  let typeEdit = document.querySelector(".typeEdit");
  let degresEdit = document.querySelector(".degresEdit");
  let stockEdit = document.querySelector(`.stockEdit`);

  // On crée le btn valider pour les modifications
  let validerBtn = document.createElement("button");
  validerBtn.classList.add("Valider");
  li[liIndex].appendChild(validerBtn);
  validerBtn.innerText = "✅";

  // EventListener sur le btn valider pour prendre en compte les changements
  validerBtn.addEventListener("click", function () {
    console.log(arrayStock[liIndex]);
    arrayStock[liIndex].name = nameEdit.value;
    arrayStock[liIndex].buyingPriceHT = buyingPriceHTEdit.value;
    arrayStock[liIndex].sellingPriceHT = sellingPriceHTEdit.value;
    arrayStock[liIndex].TVA = TVAEdit.value;
    arrayStock[liIndex].margeHT =
      arrayStock[liIndex].sellingPriceHT - arrayStock[liIndex].buyingPriceHT;
    arrayStock[liIndex].priceTTC = (
      Number(arrayStock[liIndex].sellingPriceHT) *
      (1 + Number(arrayStock[liIndex].TVA) / 100)
    ).toFixed(2);
    arrayStock[liIndex].type = typeEdit.value;
    arrayStock[liIndex].degres = degresEdit.value;
    arrayStock[liIndex].stock = stockEdit.value;
    localStorage.setItem("keyStock", JSON.stringify(arrayStock));
    console.log(arrayStock[liIndex].stock);
    // On réactualise l'affiche de la li modifiée
    displayProduct(arrayStock);
  });
}

// Fonction supprimer
function supprimer(index) {
  if (confirm("Voulez vous supprimez ?")) {
    // Splice arrayStock du localStorage
    arrayStock.splice(index, 1);
    localStorage.setItem("keyStock", JSON.stringify(arrayStock));
    // On raffraichit le composant displayProduct
    displayProduct(arrayStock, "all");
  }
}

// Lors du clic sur le bouton Ajouter Produit, appelle la fonction createProduct
form.addEventListener("submit", createProduct);

// Constructor
function Product(
  name,
  stock,
  buyingPriceHT,
  sellingPriceHT,
  TVA,
  type,
  degres
) {
  this.name = name;
  this.stock = stock;
  this.buyingPriceHT = buyingPriceHT;
  this.sellingPriceHT = sellingPriceHT;
  this.TVA = TVA;
  this.margeHT = sellingPriceHT - buyingPriceHT;
  this.priceTTC = (sellingPriceHT * (1 + TVA / 100)).toFixed(2);
  this.type = type;
  this.degres = degres;
}
