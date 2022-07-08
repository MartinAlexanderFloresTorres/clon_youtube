const body = document.querySelector("body")
const menu = document.querySelector("#menu")

menu.addEventListener("click", (e) =>{
  e.preventDefault()
  body.classList.toggle("active")
})