const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <!--### Início Listagem de Pokemons ###-->
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class=types>
                <div class=type>
                    <label class="btn" for="${pokemon.number}">more details</label>
                </div>
            </div>
            <!--### Final Listagem de Pokemons ###-->

            <!--### Início Modal Detalhes do Pokemon ###-->
            <input class="modal-state" id="${pokemon.number}" type="checkbox"/>
            <div class="modal">
                <label class="modal__bg" for="${pokemon.number}"></label>
                <div class="modal__inner ${pokemon.types[0]}-bg">
                    <div class="details">
                        <label class="modal__close" for="${pokemon.number}"></label>
                        <div class="title">
                            <span class="detail_name">${pokemon.name}</span>
                            <span class="detail_number">#${pokemon.number}</span>
                        </div>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join(' ')}
                            </ol>
                        </div>
                    </div>
                    <div class="image">
                        <img src="${pokemon.photo}" alt="${pokemon.name}"/>
                    </div>
                    <div class="info_abilities">
                        <div class="row">
                            <span>Height</span>
                            <span>Category</span>
                        </div>
                        <div class="row_answer">
                        <span>${pokemon.height}.0 m</span>
                        <span>${pokemon.species}</span>
                        </div>
                        <div class="row">
                            <span>Weight</span>
                            <span>Abilities</span>
                        </div>
                        <div class="row_answer">
                            <span>${pokemon.weight}.0 Kg</span>
                            <span class="abilities">${pokemon.abilities.map((ability) => `${ability}`).join(pokemon.abilities.length > 1 ? ',&nbsp' : '')}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!--### Final Modal Detalhes do Pokemon ###-->
        </li>
    `
}


async function loadPokemonItens(offset, limit) {
    await pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
