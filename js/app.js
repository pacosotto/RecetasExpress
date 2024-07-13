//Variables
const formulario = document.querySelector("#crear-recetas");
const listaIngredientes = document.querySelector("#lista-ingredientes");
const listaInstrucciones = document.querySelector("#lista-instrucciones");
const inputNombre = document.querySelector("#nombre");
const inputIngredientes = document.querySelector("#ingredientes");
const inputTiempo = document.querySelector("#tiempo");
const inputInstrucciones = document.querySelector("#instrucciones");
const btnAgregarIngrediente = document.querySelector("#btnAgregarIngrediente");
const btnAgregarInstruccion = document.querySelector("#btnAgregarInstruccion");
const btnCrearReceta = document.querySelector("#enviar-receta");
let ingredientesArray = [];
let instruccionesArray = [];
//Eventos
eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", function () {
    inputNombre.addEventListener("blur", validar);
    inputIngredientes.addEventListener("blur", validar);
    btnAgregarIngrediente.addEventListener("click", agregarIngrediente);
    btnAgregarInstruccion.addEventListener("click", agregarInstruccion);
    inputTiempo.addEventListener("blur", validar);
    inputInstrucciones.addEventListener("blur", validar);
    formulario.addEventListener("submit", crearReceta);
  });
}
//Clases
class Receta {
  constructor(nombre, ingredientes, tiempo, instrucciones) {
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.tiempo = tiempo;
    this.instrucciones = instrucciones;
  }
  setIngrediente(ingrediente) {
    this.ingredientes.push(ingrediente);
    inputIngredientes.value = "";
    btnAgregarIngrediente.disabled = true;
  }
  getIngredientes() {
    return this.ingredientes;
  }
  setInstruccion(instruccion) {
    this.instrucciones.push(instruccion);
    inputInstrucciones.value = "";
    btnAgregarInstruccion.disabled = true;
  }
  getInstrucciones() {
    return this.instrucciones;
  }
}

class UI {
  mostrarAlerta(mensaje, tipo, referencia) {
    const alert = document.createElement("p");
    const input = document.querySelector(`#${referencia}`);
    if (tipo === "error") {
      alert.classList.add("error");
      alert.textContent = mensaje;
      input.parentElement.appendChild(alert);
    } else {
      alert.textContent = mensaje;
      input.parentElement.appendChild(alert);
    }

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
  agregarIngredienteUI() {
    limpiarHTML(listaIngredientes);
    receta.getIngredientes().forEach((ingrediente) => {
      const li = document.createElement("li");
      li.innerHTML = `<p>${ingrediente}</p>`;
      listaIngredientes.appendChild(li);
    });
  }
  agregarInstruccionUI() {
    limpiarHTML(listaInstrucciones);
    receta.getInstrucciones().forEach((instruccion) => {
      const li = document.createElement("li");
      li.innerHTML = `<p>${instruccion}</p>`;
      listaInstrucciones.appendChild(li);
    });
  }
}

const ui = new UI();
let receta = new Receta(
  inputNombre.value,
  ingredientesArray,
  inputTiempo.value,
  instruccionesArray
);

//Funciones
function validar(e) {
  if (e.target.value === "") {
    ui.mostrarAlerta("Necesitas rellenar el campo", "error", e.target.id);
    return;
  }

  if (e.target.value !== "" && e.target.id === "ingredientes") {
    btnAgregarIngrediente.disabled = false;
    if (validarIngredientes()) {
      ui.mostrarAlerta("Agrega al menos 2 ingredientes", "", e.target.id);
    }
  }

  if (e.target !== "" && e.target.id === "instrucciones") {
    btnAgregarInstruccion.disabled = false;
  }

  btnCrearReceta.disabled = false;
}

function crearReceta(e) {
  e.preventDefault();
}

function agregarIngrediente(e) {
  e.preventDefault();
  receta.setIngrediente(inputIngredientes.value);
  ui.agregarIngredienteUI();
  console.log(receta.getIngredientes());
  console.log(receta);
  console.log(receta.getIngredientes().length);
}

function agregarInstruccion(e) {
  e.preventDefault();
  receta.setInstruccion(inputInstrucciones.value);
  ui.agregarInstruccionUI();
  console.log(receta.getInstrucciones());
}

function limpiarHTML(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function validarIngredientes() {
  if (receta.getIngredientes().length < 2) {
    return true;
  }
}
