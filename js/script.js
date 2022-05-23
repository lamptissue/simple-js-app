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
  pokemonList.push(pokemon);
}

return {
  add: add,
  getAll: getAll
};
})();

// test if add works
pokemonRepository.add({name: "Snorlax", height: 200, types: "Normal"});
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write("<p>" + pokemon.name + " " + "(height: " + pokemon.height + ") </p>");
});
