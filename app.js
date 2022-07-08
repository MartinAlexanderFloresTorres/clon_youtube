const body = document.querySelector("body");
const menu = document.querySelector("#menu");
const formulario = document.querySelector("#formulario");

menu.addEventListener("click", (e) => {
  e.preventDefault();
  body.classList.toggle("active");
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const busquedad = document.querySelector("#busquedad").value;

  if (busquedad.trim() != "") {
    let url = `https://www.youtube.com/results?search_query=${busquedad}`;

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.style.display = "none";
    a.classList.add("linkBusquedad");
    body.appendChild(a);
    const link = document.querySelector(".linkBusquedad");
    if (link) {
      link.click();
      link.remove();
    }
  } else {
    formulario.classList.add("error");
    setTimeout(() => {
      if (formulario.classList.contains("error")) {
        formulario.classList.remove("error");
      }
    }, 1000);
    console.log("ee");
  }
});
