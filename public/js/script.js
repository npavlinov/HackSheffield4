const form = document.querySelector('form')
const API_URL = 'http://localhost:3000/recipes'

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
})