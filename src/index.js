// write your code here
let menuDiv = document.getElementById("ramen-menu")
let ramenDetails = document.getElementById("ramen-detail")
let ramenDetailImage = document.querySelector(".detail-image")
let ramenDetailName = document.querySelector(".name")
let ramenDetailRest = document.querySelector(".restaurant")
let ramenRating = document.getElementById('rating-display')
let ramenComment = document.getElementById('comment-display')
let editForm = document.getElementById('edit-ramen')

// use a fetch to get all the dad from the server
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then((object) => { // make the first ramen load on page refresh
        object.forEach(renderImages)
        ramenDetailImage.src = object[0].image
        ramenDetailName.innerText = object[0].name
        ramenDetailRest.innerText = object[0].restaurant
        ramenRating.innerText = `This scored ${object[0].rating}`
        ramenComment.innerText = object[0].comment   
        })
    })

// function to render the nav
function renderImages(object) {
    // render nav bar
    let image = document.createElement("img")
    image.src = object.image
    image.id = object.id
    menuDiv.appendChild(image)
    // add event listener for each image
    image.addEventListener("click", () => {loadRamenDetails()})
    // function to load ramen details when image is clicked
    function loadRamenDetails() {
        ramenDetailImage.src = object.image
        ramenDetailName.innerText = object.name
        ramenDetailRest.innerText = object.restaurant
        ramenRating.innerText = `This scored ${object.rating}`
        ramenComment.innerText = object.comment   
        // make a delete button for the ramen
        let deleteButton = document.createElement("button")
        deleteButton.innerText = "DELETE THIS BUTTON"
        editForm.appendChild(deleteButton)
        deleteButton.addEventListener("click", () => {
            console.log('delete activated')
            image.style.display = "none"
            ramenDetailImage.style.display = "none"
            ramenDetailRest.style.display = "none"
            ramenRating.style.display = "none"
            ramenComment.style.display = "none"

    })
}}

let newRamenForm = document.getElementById("new-ramen")
newRamenForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addNewRamen(e)
})

function addNewRamen(e) {
    let newImage = document.createElement("img")
    newImage.src = e.target.image.value
    newImage.id = e.target.id.value
    menuDiv.appendChild(newImage)
    // add event listener 
    newImage.addEventListener("click", () => {
        // load info upon click
        ramenDetailImage.src = e.target.image.value
        ramenDetailName.innerText = e.target.name.value
        ramenDetailRest.innerText = e.target.restaurant.value
        ramenRating.innerText = `This scored ${e.target.rating.value}`
        ramenComment.innerText = e.target["new-comment"].value   
        })
    }


// update the rating and add new comments
let updateForm = document.getElementById("edit-ramen")
updateForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let addNewComment = document.createElement('p')
    let ramenRating = document.getElementById('rating-display')
    addNewComment.innerText = e.target["new-comment"].value
    ramenRating.innerText = `This scored ${e.target.rating.value}`
    ramenComment.appendChild(addNewComment)
})

// WAYS TO IMPROVE THIS CODE
// I have a few functions that run similar things. I think I could consolidate some of this 
// to make it more conscise
// I would make it so you don't get a new delete button if you click on a ramen multiple times
// in a row
// I would also make it so that a delete button would load upon page load since right now
// you have to click on a ramen to render the delete button


