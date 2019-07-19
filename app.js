// "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/6.png",
// "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
// "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png"
document.addEventListener("DOMContentLoaded", preLoader)

function preLoader(){
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/charizard"

    fetch(apiUrl)
        .then(parseJson)
        .then(getPokemon)
        .then(displayPokemon)

    function parseJson(response){
        return response.json()
    }

    function getPokemon(pokemon){
        return {
            image: pokemon.sprites.front_default,
            name: pokemon.forms[0].name
        }
    }

    function displayPokemon(pokemonObject){
        if (pokemonObject.image !== null){
            const $img = document.createElement("img")
            $img.src = pokemonObject.image
            $img.className = "pokemon-img"
            
            const $pokemonName = document.createElement("span")
            $pokemonName.innerText = pokemonObject.name
            $pokemonName.className = "pokemon-name"

            const table = document.createElement("table")
            const tableRow1 = document.createElement("tr")
            tableRow1.className = "pokemon-name-row"
            const tableRow2 = document.createElement("tr")
            
            tableRow1.append($pokemonName)
            tableRow2.append($img)
            table.append(tableRow1, tableRow2)

            const individualPokemonSpan = document.createElement("span")
            individualPokemonSpan.className = "individual-pokemon-span"
            individualPokemonSpan.append(table)

            const $pokemon = document.querySelector(".ditto")
            $pokemon.append(individualPokemonSpan)
        }
    }

    const apiFirstPageUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=964"

    fetch(apiFirstPageUrl)
        .then(parseJson)
        .then(fetchEachPokemon)

    function fetchEachPokemon(allPokemon){
        allPokemon.results.map(pokemon => {
            fetch(pokemon.url)
            .then(parseJson)
            .then(getPokemon)
            .then(displayPokemon)
        })
    }
}