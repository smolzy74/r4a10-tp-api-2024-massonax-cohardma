 
///////////////////////////AFFICHER UN CERTAINS NOMBRES DE BLAGUES ALEATOIRE//////////////////////////////////
const numberOfRequests = 5;
let displayedJokes = [];
let favoris = [];
const localStorageFavorisId = "mesFavorisList";

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



function viderResultat() {
  let ulElement = document.getElementById("resultatList");
  ulElement.innerHTML = ""; // Efface le contenu de l'élément UL
  displayedJokes = [];
}

function ajouterResultat(contenu, index) {
  let ulElement = document.getElementById("resultatList");
  let liElement = document.createElement("li");
  let bouton = document.createElement("button");
  bouton.id = "btn-favoris";
  bouton.type = "button";
  bouton.title = "Ajouter la recherche aux favoris";
  let imageEtoile = document.createElement("img");
  imageEtoile.src = "images/etoile-vide.svg";
  imageEtoile.width = "22";
  bouton.appendChild(imageEtoile);
  bouton.onclick = function() {
    ajouterFavoris(index);
  };
  let texteElement = document.createTextNode(contenu);
  liElement.appendChild(bouton);
  liElement.appendChild(texteElement);
  ulElement.appendChild(liElement);
}

function ajouterFavoris(index){
  favoris.push(displayedJokes[index]);
  let favorisSansDoublons = supprimerDoublons(favoris);
  favoris = favorisSansDoublons;
  actualiserFavoris();
  saveToLocal();

}

function actualiserFavoris(){
  let champ =  document.getElementById("favorisList");
  champ.innerHTML = "";
  let i = 0;
  favoris.forEach(joke => {
    let liElement = document.createElement("li");
    let bouton = document.createElement("button");
    bouton.id = "btn-favoris";
    bouton.type = "button";
    bouton.title = "Ajouter la recherche aux favoris";
    let imageEtoile = document.createElement("img");
    imageEtoile.src = "images/etoile-pleine.svg";
    imageEtoile.width = "22";
    bouton.appendChild(imageEtoile);
    bouton.classList.add("btn-supprimer");

    let texteElement = document.createTextNode(joke);

    liElement.appendChild(bouton);
    liElement.appendChild(texteElement);
    champ.appendChild(liElement);
    i+=1
  });
let boutonsSupprimer = document.querySelectorAll(".btn-supprimer");

boutonsSupprimer.forEach(bouton => {
  bouton.addEventListener("click", function() {
    this.parentNode.remove();
    saveToLocal();
  });
});
}


function saveToLocal(){
  // Sélectionnez la liste <ul> par son ID
// Sélectionnez la liste <ul> par son ID
let ulFavoris = document.getElementById("favorisList");

// Sélectionnez tous les éléments <li> dans la liste <ul>
let elementsLi = ulFavoris.querySelectorAll("li");

// Créez une liste pour stocker les textes
let listeTextes = [];

// Parcourez chaque élément <li> et récupérez son texte après la balise </button>
elementsLi.forEach(li => {
  // Récupérez le contenu après la balise </button>
  let texte = li.innerHTML.split("</button>")[1].trim();
  listeTextes.push(texte); // Ajoutez le texte à la liste
});

// Affichez la liste des textes dans la console
favoris = listeTextes;


// Convertissez la liste des textes en chaîne JSON
let listeTextesJSON = JSON.stringify(listeTextes);

// Stockez la chaîne JSON dans le localStorage avec l'identifiant "mesFavorisList"
localStorage.setItem("mesFavorisList", listeTextesJSON);

}

function getFromLocal(){
  let listeTextesJSON = localStorage.getItem("mesFavorisList");

// Convertissez la chaîne JSON en liste des textes
let listeTextes = JSON.parse(listeTextesJSON);

// Vérifiez si la liste est vide ou non
if (listeTextes) {
  favoris = listeTextes;
  actualiserFavoris();
}
}

function getRandomJoke() {
  return fetch("https://api.chucknorris.io/jokes/random")
    .then(res => {
      if (!res.ok) {
        throw new Error(`La requête a échoué avec le code d'état ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      return data.value; // Retourne la valeur de la blague aléatoire
    })
    .catch(error => {
      console.error("Une erreur s'est produite :", error);
      throw error; // Relancer l'erreur pour la gérer plus tard si nécessaire
    });
}


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

////////////////////////////RECHERCHE D'UNE BLAGUE AVEC UNE CHAINE DE CARACTERES/////////////////////////////////

function searchJoke(query) {
  const apiUrl = `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`;

  return fetch(apiUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error(`La requête a échoué avec le code d'état ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      return data.result.map(joke => joke.value);
    })
    .catch(error => {
      console.error("Une erreur s'est produite :", error);
      throw error; // Relancer l'erreur pour la gérer plus tard si nécessaire
    });
}


function getJokeFromCategory(category) {
  const apiUrl = `https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(category)}`;

  return fetch(apiUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error(`La requête a échoué avec le code d'état ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      return data.value; // La valeur de la blague aléatoire est déjà récupérée dans data.value
    })
    .catch(error => {
      console.error("Une erreur s'est produite :", error);
      throw error; // Relancer l'erreur pour la gérer plus tard si nécessaire
    });
}




/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////



/////////////////////////LISTE DES CATEGORIES////////////////////////////////////
function getJokeCategories() {
  viderResultat()
  const apiUrl = "https://api.chucknorris.io/jokes/categories";

  return fetch(apiUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error(`La requête a échoué avec le code d'état ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      console.error("Une erreur s'est produite :", error);
    });
}




async function rechercheButtonOnClick() {
  viderResultat()
  let saisie = document.getElementById("rechercheField").value;

  try {
    const jokes = await searchJoke(saisie); // Attend la résolution de la promesse
    displayedJokes = jokes;
    for(i=0;i<10;i+=1){
      ajouterResultat(jokes[i],i);
    }



    // Sélectionner les 10 premières blagues et les rejoindre avec des retours à la ligne
    } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}


async function randomJokeOnClick() {
  viderResultat()
  try {
    const joke = await getRandomJoke(); // Attend la résolution de la promesse
    displayedJokes = [joke];
    ajouterResultat(joke,0);
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

function supprimerDoublons(liste) {
  // Créer un nouvel ensemble à partir de la liste pour éliminer les doublons
  let ensemble = new Set(liste);
  // Convertir l'ensemble en tableau et le retourner
  return Array.from(ensemble);
}



//////////////////////////AFFICHER UNE BLAGUE ALEATOIRE D'UNE CATEGORIE//////////////////////////////////
async function getRandomJokeByCategory(category) {

  let jokes=[];
  for(i=0;i<10;i++){
    jokes.push(await getJokeFromCategory(category));
  }
  jokes = supprimerDoublons(jokes);
    viderResultat()
    displayedJokes = jokes;
    let j = 0;
    jokes.forEach(joke => {
      ajouterResultat(joke,j++);
    });
    
  }
  
  function creerBoutons(liste, fonction) {
    const conteneurListe = document.getElementById("category");
  
    conteneurListe.innerHTML = "";
  

    liste.forEach(mot => {
      const bouton = document.createElement("button");
      bouton.textContent = mot;
      bouton.addEventListener("click", () => {
        fonction(mot);
      });
  
      const elementLi = document.createElement("li");
      elementLi.appendChild(bouton);
  
      conteneurListe.appendChild(elementLi);
    });
  }
  
  

  async function categorieJoke() {
    try {
      const categories = await getJokeCategories(); 
      creerBoutons(categories, getRandomJokeByCategory);
    } catch (error) {
      console.error("Une erreur:", error);
    }
  }
  

