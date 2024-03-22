 
const numberOfRequests = 5;

for (let i = 0; i < numberOfRequests; i++) {
  fetch("https://api.chucknorris.io/jokes/random")
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(`Blague ${i + 1}: ${data.value}`);
    });
}

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


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
  });


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////




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

getJokeCategories()
  .then(categories => {
    console.log("Liste des catégories disponibles :");
    categories.forEach(category => {
      console.log(category);
    });
  });


