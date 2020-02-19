jQuery(document).ready(function($){

  const number = document.getElementById('numberField')
  const button = document.getElementById('submitnumber')
  const randomButton = document.getElementById('submitrandom')


  randomButton.addEventListener('click', function(e) {
    e.preventDefault()
    // number below is 806 because there 807 pokemon
    const randomInput = Math.floor(Math.random()*806)+1
    pokeApi(randomInput)
    document.getElementById('numberField').value = randomInput
  })

  button.addEventListener('click', function(e) {
    e.preventDefault()
    const input = parseInt(number.value)
    pokeApi(input)
  })

  const pokeApi = (input) => {
    const apiData = {
      url: 'https://pokeapi.co/api/v2/',
      type: 'pokemon',
      id: input
    }
    const {url, type, id} = apiData
    const apiUrl = `${url}${type}/${id}`
    fetch(apiUrl)
      .then( (data) => data.json())
      .then( (pokemon) => generateHtml(pokemon) )
  }

  const capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const getTypes = (data) => {
    let types = data.types.map( type => capitalizeFirst(type.type.name ))
    return types
  }

  const generateHtml = (data) => {
    const { name, sprites, height, weight, id } = data
    const html =
      `
      <h1 class="name">${capitalizeFirst(name)}</h1>
      <div class="images-container crt">
        <div class="image-container">
          <img src=${sprites.front_default} alt=${capitalizeFirst(name)}>
        </div>
        <div class="image-container">
          <img src=${!sprites.back_default ? sprites.front_default : sprites.back_default} alt=${capitalizeFirst(name)}>
        </div>
      </div>
      <div class="details">
        <span>Height: ${height}</span>
        <span>Weight: ${weight}</span>
        <span>${getTypes(data).length >= 2 ? 'Types&nbsp;' : 'Type&nbsp;&nbsp;'}: ${getTypes(data).join(', ')}</span>
        <span>Number: ${id}</span>
      </div>
      `
    const pokemonDiv = document.querySelector('.pokemon')
    pokemonDiv.innerHTML = html
    slickInit()
  }
})