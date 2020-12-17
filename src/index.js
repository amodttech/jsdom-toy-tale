let addToy = false;
let toys = []
let url = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyForm = document.querySelector("form.add-toy-form");
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    newToyObj = {
      // id: event.target.id.value,
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToyObj)
    }

    fetch(url, configObj)
    .then((response) => response.json())
    .then(results => renderToy(results))
    toyForm.reset()

  })
  



  const toyCollection = document.querySelector("#toy-collection")
  // console.log(toyCollection)

  fetch(url)
    .then(response => response.json())
    .then(results => {
      results.forEach(toy => renderToy(toy))
      // console.log(results)
      
    })

  function renderToy(toy){
    let div = document.createElement("div")
    div.classList.add('card')

    let h2 = document.createElement("h2")
    h2.textContent = toy.name
    let img = document.createElement("img")
    img.classList.add('toy-avatar')
    img.src = toy.image
    let p = document.createElement("p")
    p.textContent = toy.likes
    let button = document.createElement("button")
    button.classList.add('like-btn')
    button.textContent = "Like <3"

    div.append(h2, img, p, button)
    toyCollection.append(div)
    
    button.dataset.id = toy.id

    button.addEventListener("click", (event) => {
      let likes = parseInt(p.textContent) + 1
      console.log(likes)
      const id = event.target.dataset.id
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          likes: likes})
      })
      .then(response => response.json())
      .then(results => {
        p.textContent = results.likes
      })

    })
  }

  

  


});
