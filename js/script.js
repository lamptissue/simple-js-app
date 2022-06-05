let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
    showDetails(pokemon);
    });
  }
  const body = document.body
    const test = document.createElement('div')
    body.append(test)

  function showLoadingMessage() {
      test.innerText = "Loading..."
    console.log("Loading...")
  }
  function hideLoadingMessage(){
    test.remove()
    console.log("Loading complete")
  }

// this function runs a list of all the pokemon in the API
  function loadList() {
    showLoadingMessage()
    // Promise function
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage()
      // runs a loop through the result and into the required keys
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        // runs the function above "add" checking if the entry has all the required items
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage()
      console.error(e);
    })
  }

// This function runs the details when you click the button
  function loadDetails(item) {
    showLoadingMessage()
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage()
      // adds details of the pokemon
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      // this catches any errors
    }).catch(function (e) {
      hideLoadingMessage()
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
