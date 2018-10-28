const form = document.querySelector('form')
const API_URL = 'http://localhost:3000/recipes'
const recipeElement = document.querySelector('.recipes')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(form)
  const linkText = formData.get('link')

  const link = {
    linkText
  }

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(link),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(fetch(API_URL))
  .then(response => response.json())
  .then(recipes => {
    recipes.forEach(recipe => {
        const div = document.createElement('div');

        const header = document.createElement('h3');
        header.textContent = recipe.title;
        header.classList.add('text-white')
        header.classList.add('my-3')
        header.classList.add('text-center')

        const image = document.createElement('img');
        image.src = recipe.image;
        image.classList.add('mx-auto')
        image.classList.add('d-block')

        div.appendChild(header);
        div.appendChild(image);

        recipeElement.appendChild(div);

    })
  })
})