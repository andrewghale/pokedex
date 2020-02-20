// Constants
// Grabbing elements on the page so that we can use them with javascript
const number = document.getElementById('numberField')
const button = document.getElementById('submitnumber')
const randomButton = document.getElementById('submitrandom')
const namePrev = document.getElementById('name-prev')
const nameNext = document.getElementById('name-next');


// Random
randomButton.addEventListener('click', e => {
  // prevent browser from refreshing page on form submit
  e.preventDefault()
  // generate random number between 0 and 1 multiply by 806 (and then + 1) to chose between all 807 pokemon
  const randomInput = Math.floor(Math.random()*806)+1
  // put this random number into the function which fetches a pokemon
  pokeApi(randomInput)
  // show the generated number in the number field
  document.getElementById('numberField').value = randomInput
})

// Search
button.addEventListener('click', e => {
  // prevent browser from refreshing page on form submit
  e.preventDefault()
  // search for whatever number is in the number field
  const input = parseInt(number.value)
  pokeApi(input)
})

// Prev
namePrev.addEventListener('click', () => {
  // minus 1 from current shown number
  const prevNumber = (number.value - 1)
  // fetch the pokemon with that number
  pokeApi(prevNumber)
  // update the number field with new decremented number
  number.value = prevNumber
})

// Next
nameNext.addEventListener('click', () => {
  let nextInt = parseInt(number.value)
  const nextNumber = nextInt + 1
  pokeApi(nextNumber)
  number.value = nextNumber
})

// Fetching the pokemon
const pokeApi = (input) => {
  // define the object
  const apiData = {
    url: 'https://pokeapi.co/api/v2/',
    type: 'pokemon',
    id: input
  }
  // destructure apiData
  const {url, type, id} = apiData
  // build the Url to fetch from
  const apiUrl = `${url}${type}/${id}`
  // fetch the data and then use it in the generateHtml function
  fetch(apiUrl)
    .then( (data) => data.json())
    .then( (pokemon) => generateHtml(pokemon) )
}

// this function capitalizes the first letter in a string
const capitalizeFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// gets types of the pokemon
const getTypes = (data) => {
  let types = data.types.map( type => capitalizeFirst(type.type.name ))
  return types
}

// Generate HTML
// this function dynamically outputs HTML and displays the returned data in the pokeApi function
const generateHtml = (data) => {
  const { name, sprites, height, weight, id, moves } = data
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
      <span>Moves: ${moves.length}</span>
    </div>
    `
  const pokemonDiv = document.querySelector('.pokemon')
  pokemonDiv.innerHTML = html
  // Slick needs to be initialized each time generateHtml is called
  slickInit()
}