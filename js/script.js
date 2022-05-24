let pokemonRepository = (function () {

let pokemonList = [
  {name: "Bulbasaur",
   height: 10,
   types: ["grass", "poison"]
  },
  {name: "Pikachu",
   height: 4,
   types: ["electric"]
  },
  {name: "Squirtle",
   height: 13,
   types: ["water"]}
  ];

function getAll() {
  return pokemonList;
}

function add(pokemon) {
  // tests if the item being added is an object
  if (typeof(pokemon) !== 'object'){
    console.log("This is not an object");
}
else {
  pokemonList.push(pokemon);
}
}
function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("poke-button")
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);
  button.addEventListener('click', function () {
  showDetails(pokemon)
  });

}
function showDetails(pokemon) {
  console.log(pokemon);
}
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem
};
})();

// test if add works with an object
pokemonRepository.add({name: "Snorlax", height: 200, types:"Normal"});

// test if add works without an Object
pokemonRepository.add("name: test");

pokemonRepository.getAll().forEach(function(pokemon) {
  // document.write("<p>" + pokemon.name + " " + "(height: " + pokemon.height + ") </p>");
pokemonRepository.addListItem(pokemon);
});
