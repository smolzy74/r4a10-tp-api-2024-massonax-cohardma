 
///////////////////////////AFFICHER UN CERTAINS NOMBRES DE BLAGUES ALEATOIRE//////////////////////////////////
const numberOfRequests = 5;
let displayedJokes = [];
let favoris = [];
const localStorageFavorisId = "mesFavorisList";

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// requete a l'API
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


//utilise l'API pour obtenir une blague aléatoire
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

//utilise l'api pour obtenir une blague a partir du texte saisie
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

//utilise l'API pour obtenir une blague aléatoir d'une catégorie
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

//utilise l'API pour obtenir la liste des catégories
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



/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// modification du HTML
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

//vide la page de tous les résultat affiché
function viderResultat() {
  let ulElement = document.getElementById("resultatList");
  ulElement.innerHTML = ""; // Efface le contenu de l'élément UL
  displayedJokes = [];
}

//ajoute un résultat a la liste des resultat et l'affiche
function ajouterResultat(contenu, index) {
  let ulElement = document.getElementById("resultatList");
  let liElement = document.createElement("li");
  let bouton = document.createElement("button");
  bouton.id = "btn-favoris";
  bouton.type = "button";
  bouton.title = "Ajouter la recherche aux favoris";
  let imageEtoile = document.createElement("img");
  if(estPresentDansListe(contenu,favoris)){
    imageEtoile.src = "images/etoile-pleine.svg";
    bouton.className = "inFavoris";
  }else{
    imageEtoile.src = "images/etoile-vide.svg";
    bouton.className ="notInFavoris";
  }
  imageEtoile.width = "22";
  bouton.appendChild(imageEtoile);
  bouton.onclick = function() {
    if(this.classList.contains("inFavoris")){
      try{
      supprimerFavoris(favoris.indexOf(contenu));
      bouton.className ="notInFavoris";
      }catch{
        ajouterFavoris(index);
        bouton.className ="inFavoris";
      }
    }else{
      ajouterFavoris(index);
      bouton.className ="inFavoris";
    }
    miseAJourEtoilesResultat();
  };
  let texteElement = document.createTextNode(contenu);
  liElement.appendChild(bouton);
  liElement.appendChild(texteElement);
  ulElement.appendChild(liElement);
}



//actualise la liste des favoris et sauvegarde les favoris dans le local storage
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
    miseAJourEtoilesResultat();
  });
});
}

//génére les boutons des catégories
function creerBoutons(liste, fonction) {
  const conteneurListe = document.getElementById("category");
  conteneurListe.innerHTML = "";
  liste.forEach(mot => {
    const bouton = document.createElement("button");
    bouton.textContent = mot;
    bouton.style.fontFamily = "'ChuckNorris', Roboto, sans-serif";
    bouton.addEventListener("click", () => {
      fonction(mot);
    });
    const elementLi = document.createElement("li");
    elementLi.appendChild(bouton);
    conteneurListe.appendChild(elementLi);
  });
}

//met a jour les étoiles des resultat lorsque l on ajoute ou enleve une blague dans nos favoris
function miseAJourEtoilesResultat() {
  let ulElement = document.getElementById("resultatList");
  let elementsLi = ulElement.querySelectorAll("li");
  elementsLi.forEach(li => {
    let bouton = li.querySelector("button");
    let texte = li.innerHTML.split("</button>")[1].trim();
    if(estPresentDansListe(texte,favoris)){
      bouton.querySelector("img").src = "images/etoile-pleine.svg";

    }else{
      bouton.querySelector("img").src =  "images/etoile-vide.svg";

    }
  });
}


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// action des boutons
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


//action du bouton de la barre de recherche, recherche une blague selon la saisie de l'utilisateur
async function rechercheButtonOnClick() {
  viderResultat()
  let saisie = document.getElementById("rechercheField").value;
  if(saisie){
    let jokes = await searchJoke(saisie)
    try {
      displayedJokes = jokes;
      for(i=0;i<10;i+=1){
        ajouterResultat(jokes[i],i);
      }
      } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  }
}

//action du bouton blague aléatoire, recherche une blague aléatoire 
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

//action du bouton d'une catégorie, sors des blagues aléatoirement a partir d'une catégorie
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

  //action du bouton ajouter au favoris, ajoute aux favoris la blague et enregistre les favoris dans le local storage
  function ajouterFavoris(index){
    favoris.push(displayedJokes[index]);
    let favorisSansDoublons = supprimerDoublons(favoris);
    favoris = favorisSansDoublons;
    actualiserFavoris();
    saveToLocal();
  }

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// utilitaire
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

//enregistre les favoris dans le local storage
function saveToLocal(){
  let ulFavoris = document.getElementById("favorisList");
  let elementsLi = ulFavoris.querySelectorAll("li");
  let listeTextes = [];
  elementsLi.forEach(li => {
    let texte = li.innerHTML.split("</button>")[1].trim();
    listeTextes.push(texte);
  });
  favoris = listeTextes;
  let listeTextesJSON = JSON.stringify(listeTextes);
  localStorage.setItem("mesFavorisList", listeTextesJSON);
  }

  //récupere les favoris enregistré dans le local storage
function getFromLocal(){
  let listeTextesJSON = localStorage.getItem("mesFavorisList");
  let listeTextes = JSON.parse(listeTextesJSON);
  if (listeTextes) {
    favoris = listeTextes;
    actualiserFavoris();
  }
}

//initialise la page, récupére et génére les boutons des catégories
async function categorieJoke() {
  try {
    const categories = await getJokeCategories(); 
    creerBoutons(categories, getRandomJokeByCategory);
  } catch (error) {
    console.error("Une erreur:", error);
  }
}

//supprime les doublons dans une liste donné
function supprimerDoublons(liste) {
  let ensemble = new Set(liste);
  return Array.from(ensemble);
}

// Vérifie si la chaîne est présente dans la liste
function estPresentDansListe(chaine, liste) {
  return liste.includes(chaine);
}

function supprimerFavoris(index){
  let ul = document.getElementById("favorisList");
  let li = ul.querySelectorAll("li")[index];
  li.remove()
  saveToLocal()
  miseAJourEtoilesResultat()
}

