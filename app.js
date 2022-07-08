//=============== variables ===============//
const body = document.querySelector("body");
const menu = document.querySelector("#menu");
const formulario = document.querySelector("#formulario");
const enlaces = document.querySelectorAll(".enlaces a");

//=============== eventos ===============//
function eventos() {
  menu.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.toggle("active");
  });

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const busquedad = document.querySelector("#busquedad").value;
    if (busquedad.trim() != "") {
      getBusquedad(busquedad);
    } else {
      formulario.classList.add("error");
      setTimeout(() => {
        if (formulario.classList.contains("error")) {
          formulario.classList.remove("error");
        }
      }, 1000);
    }
  });
  enlaces.forEach((item) => {
    item.addEventListener("click", () => {
      getBusquedad(item.textContent);
    });
  });
}
eventos();

//=============== url busqueda ===============//
function getBusquedad(q) {
  let url = `https://www.youtube.com/results?search_query=${q}`;
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
}

//=============== mostrar api videos ===============//
const contenedor = document.querySelector(".videos");
const mas = document.querySelector("#mas");

const API_KEY = "";
const API_VIDEO = "";

/* 
  cree su api key aqui : https://console.cloud.google.com/apis/
  consulte el api video list aqui : https://developers.google.com/youtube/v3/docs/videos/list
*/
let resultados = 20;

//=============== api ===============//
async function consultarApi() {
  try {
    const respuesta = await fetch(
      API_VIDEO +
        new URLSearchParams({
          key: API_KEY,
          part: "snippet",
          chart: "mostPopular",
          maxResults: resultados,
          regionCode: "ES",
        })
    );
    const data = await respuesta.json();
    paginacion(data);
    mostrarHtml(data);
  } catch (error) {
    console.log(error);
  }
}
consultarApi();

//=============== paginacion ===============//
function paginacion() {
  mas.addEventListener("click", () => {
    resultados = resultados + 10;
    if (resultados <= 50) {
      consultarApi();
    }
  });
  if (resultados >= 50) {
    mas.style.display = "none";
  }
}

//=============== mostrar html ===============//
function mostrarHtml(data) {
  limpiarHtml();
  const { items } = data;
  items.forEach((video) => {
    const {
      id,
      snippet: {
        channelTitle,
        title,
        thumbnails: {
          high: { url },
        },
      },
    } = video;

    const div = document.createElement("div");
    div.innerHTML = `
        <a title="${title}" class="video" target="_blank" href="https://www.youtube.com/watch?v=${id}">
          <img class="video__poster" src="${url}" alt="video">
          <div>
          <img class="usuario" src="${url}" alt="usuario">
          <div>
          <h2>
          ${title}
          </h2>
          <p>${channelTitle}</p>
          </div>
          </div>
        </a>
  `;
    contenedor.appendChild(div);
  });
}

//=============== limpiar html ===============//
function limpiarHtml() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}
