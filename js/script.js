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

return {
  add: add,
  getAll: getAll
};
})();

// test if add works with an object
pokemonRepository.add({name: "Snorlax", height: 200, types:"Normal"});

// test if add works without an Object
pokemonRepository.add("name: test");

pokemonRepository.getAll().forEach(function(pokemon) {
  document.write("<p>" + pokemon.name + " " + "(height: " + pokemon.height + ") </p>");
});
