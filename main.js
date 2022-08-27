const pokemonInput = document.getElementById('pokemonInput');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonName = document.getElementById('pokemonName');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonStats = document.getElementById('pokemonStats');
const pokemonMoves = document.getElementById('pokemonMoves');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');

function findPokemon() {
    if (pokemonInput.value != '') {
        var url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput.value.toLowerCase()}`;
        fetch(url).then(res => {
            if (res.status != 200) pokemonNotFound();
            return res.json();
        }).then(data => {
            setData(data);
        });
    }
}

function setData(data) {
    pokemonImage.src = data.sprites.front_default;
    pokemonName.innerHTML = data.name;

    // set Pokemon Type(s)
    var typesText = '';
    if (data.types.length > 1) {
        typesText = `Types: ${data.types[0].type.name}, ${data.types[1].type.name}`;
    } else {
        typesText = `Type: ${data.types[0].type.name}`
    }
    pokemonTypes.innerText = typesText;

    // set Pokemon stats
    var statsText = 'Stats: \n\n';
    data.stats.forEach(element => {
        statsText += `${element.stat.name}: ${element.base_stat} \n`;
    });
    pokemonStats.classList.add('scroll');
    pokemonStats.innerText = statsText;

    // set Pokemon moves
    var movesText = '';
    pokemonMoves.classList.remove('scroll');
    if (data.moves.lenght == 1) {
        movesText = `Move: ${data.moves[0].move.name}`;
    } else {
        movesText = 'Moves: \n\n';
        data.moves.forEach(element => {
            movesText += `° ${element.move.name} \n`;
        });
        pokemonMoves.classList.add('scroll');
    }
    pokemonMoves.innerText = movesText;

    pokemonHeight.innerText = `Height: ${data.height}`;
    pokemonWeight.innerText = `Wight: ${data.weight}`;
}

function pokemonNotFound() {
    pokemonImage.src = './assets/not-found-gif.gif';
    pokemonName.innerText  = '¡Not Found!';
    pokemonTypes.innerText = '';
    pokemonStats.innerText = '';
    pokemonStats.classList.remove('scroll');
    pokemonMoves.innerText = '';
    pokemonMoves.classList.remove('scroll');
    pokemonHeight.innerText = '';
    pokemonWeight.innerText = '';
}

pokemonInput.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
        findPokemon();
    }
});