 
///////////////////////////AFFICHER UN CERTAINS NOMBRES DE BLAGUES ALEATOIRE//////////////////////////////////
const numberOfRequests = 5;
let displayedJokes = [];
let favoris = [];

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
  bouton.textContent = "FAV";
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
  actualiserFavoris();
}

function actualiserFavoris(){
  let champ =  document.getElementById("favorisList");
  champ.innerHTML = "";
  let i = 0;
  favoris.forEach(joke => {
    let liElement = docume nt.createElement("li");
    let bouton = document.createElement("button");
    bouton.id = "btn-favoris";
    bouton.type = "button";
    bouton.title = "Ajouter la recherche aux favoris";
    bouton.textContent = "FAV"+i;
    bouton.onclick = function() {
      console.log(i);
      retirerFavoris(i);
    };
    let texteElement = document.createTextNode(joke);

    liElement.appendChild(bouton);
    liElement.appendChild(texteElement);
    champ.appendChild(liElement);
    i+=1
  });
}

function retirerFavoris(index){
  favoris.splice(index,1);
  actualiserFavoris();
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
    let champ = document.getElementById("category");
  
    try {
      const categories = await getJokeCategories(); 
      creerBoutons(categories, getRandomJokeByCategory);
    } catch (error) {
      console.error("Une erreur:", error);
    }
  }
  

