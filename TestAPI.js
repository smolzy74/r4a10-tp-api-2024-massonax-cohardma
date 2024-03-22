 
///////////////////////////AFFICHER UN CERTAINS NOMBRES DE BLAGUES ALEATOIRE//////////////////////////////////
const numberOfRequests = 5;
let currentJoke;
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

function getRandomJoke(){
  fetch("https://api.chucknorris.io/jokes/random")
    .then(res => {
      return res.json();
    })/*
    .then(data => {
      currentJoke = data.value;
      return data.value;
    });*/
}

<<<<<<< HEAD
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

////////////////////////////RECHERCHE D'UNE BLAGUE AVEC UNE CHAINE DE CARACTERES/////////////////////////////////
=======
>>>>>>> 0dcaa73 (ajout des boutons)

function searchJoke(query) {
  const apiUrl = `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`;

  return fetch(apiUrl)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data.result.map(joke => joke.value);
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




function  rechercheButtonOnClick(){
  let champ = document.getElementById("resultatField");
  let saisie = document.getElementById("rechercheField").value
  console.log(saisie);
  champ.textContent = searchJoke(saisie);
}

async function randomJokeOnClick() {
  let champ = document.getElementById("resultatField");
  try {
    const joke = await getRandomJoke(); // Attend la résolution de la promesse
    console.log("Blague aléatoire :");
    console.log(joke);
    champ.textContent = joke; // Met à jour le contenu du champ avec la blague aléatoire
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

<<<<<<< HEAD
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
  
  const category = "animal"; 
getRandomJokeByCategory(category)
    .then(joke => {
      console.log(`Blague aléatoire dans la catégorie "${category}": ${joke}`);
    });
  
=======

async function categorieJokeOnClick() {
  let champ = document.getElementById("resultatField");

  try {
    const categories = await getJokeCategories(); // Attend la résolution de la promesse
    console.log("Liste des catégories disponibles :");
    console.log(categories);
    let chaine = "";
    categories.forEach(category => {
      chaine += category + " ";
    });
    champ.textContent = chaine;
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}
>>>>>>> 0dcaa73 (ajout des boutons)
