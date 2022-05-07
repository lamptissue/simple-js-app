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


for (let i = 0; i < pokemonList.length; i++) {
  // Looks for large pokemon with a height over 11
  if (pokemonList[i].height > 11) {
    document.write("<p>" + pokemonList[i].name + " " + "(height " + pokemonList[i].height + ") - Whoa! That's a big one!</p>");
  }
  else {
    document.write("<p>" + pokemonList[i].name + " " + "(height " + pokemonList[i].height + ") </p>");
  }
}
