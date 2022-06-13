let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
  const body = document.body;
    const loadingMessage = document.createElement("div");
    body.append(loadingMessage);

  function showLoadingMessage() {
      loadingMessage.innerText = "Loading...";
    console.log("Loading...");
  }
  function hideLoadingMessage(){
    loadingMessage.remove();
    console.log("Loading complete");
  }

// this function runs a list of all the pokemon in the API
  function loadList() {
    showLoadingMessage();
    // Promise function
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      // runs a loop through the result and into the required keys
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          types: item.type
        };
        // runs the function above "add" checking if the entry has all the required items
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  };

// This function runs the details when you click the button
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage()
      // adds details of the pokemon
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      let types = [];
			details.types.forEach((item) => types.push(item.type.name));
			item.types = types;
      // this catches any errors
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

 let modalContainer = document.querySelector('#modal-container');
  function showModal(item) {
    // Clear all current modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');


  // close the modal
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

// add details of the pokemon
  let nameElement = document.createElement('h1');
  nameElement.innerText = item.name;

  let heightElement = document.createElement('p');
  heightElement.innerText = 'height: ' + item.height;

  let typeElement = document.createElement('p');
  typeElement.innerText = 'Types: ' + item.types;


// add the pokemon image
  let myImage = document.createElement('img');
  myImage.src = item.imageUrl;
  myImage.classList.add('pokemon-modal')

  modal.appendChild(myImage);
  modal.appendChild(nameElement);
  modal.appendChild(heightElement);
  modal.appendChild(typeElement);
  modalContainer.appendChild(modal);
  modal.appendChild(closeButtonElement);



  modalContainer.classList.add('is-visible');
}
function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
// close modal when user presses escape on keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  // close modal when user clicks
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
