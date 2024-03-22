 
///////////////////////////AFFICHER UN CERTAINS NOMBRES DE BLAGUES ALEATOIRE//////////////////////////////////
const numberOfRequests = 5;
let currentJoke;

const category = "animal"; 
getRandomJokeByCategory(category)
    .then(joke => {
      console.log(`Blague aléatoire dans la catégorie "${category}": ${joke}`);
    });
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

function viderResultat() {
  let ulElement = document.getElementById("resultatField");
  ulElement.innerHTML = ""; // Efface le contenu de l'élément UL
}

function ajouterResultat(contenu) {
  let ulElement = document.getElementById("resultatField");
  let liElement = document.createElement("li");
  liElement.textContent = contenu;
  ulElement.appendChild(liElement);
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


const searchTerm = "sun"; 
/*
searchJoke(searchTerm)
  .then(jokes => {
    if (jokes.length > 0) {
      console.log(`Voici les blagues trouvées avec "${searchTerm}":`);
      jokes.forEach((joke, index) => {
        console.log(`Blague ${index + 1}: ${joke}`);
      });
    } else {
      console.log(`Aucune blague trouvée avec "${searchTerm}".`);
    }
  });*/


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
    for(i=0;i<10;i+=1){
      ajouterResultat(jokes[i]);
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
    console.log("Blague aléatoire :");
    console.log(joke);
    ajouterResultat(joke);
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}


/*
async function categorieJokeOnClick(){
  let champ = document.getElementById("resultatField");
  let categories = getJokeCategories().then(categories => {
      console.log(categories);
      return categories
  });
  let chaine = "";
  console.log("Liste des catégories disponibles :");
  console.log(categories)
    categories.categories.forEach(category => {
      chaine+=category;
      console.log(category);
    });
  champ.textContent = chaine;
}*/

//////////////////////////AFFICHER UNE BLAGUE ALEATOIRE D'UNE CATEGORIE//////////////////////////////////













function getRandomJokeByCategory(category) {
    const apiUrl = `https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(category)}`;
  
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        return data.value;
      })
      .catch(error => {
        console.error('Une erreur s\'est produite:', error);
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
      console.log("Liste des catégories disponibles :");
      console.log(categories);
      creerBoutons(categories, randomJokeOnClick);
    } catch (error) {
      console.error("Une erreur:", error);
    }
  }

