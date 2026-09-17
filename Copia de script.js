let preguntas = [
  {
    pregunta: "¿Cuál es el color de la sangre?",
    opciones: ["Amariilo", "Rojo", "Azul", "Verde"],
    correcta: 1
  },
  {
    pregunta: "¿Cuál de estos NO es un mamífero?",
    opciones: ["Tigre", "Ballena", "Ornitorrinco", "Cocodrilo"],
    correcta: 3
  },
  {
    pregunta: "¿Cuánto es 10 * 10?",
    opciones: ["25", "100", "15", "40"],
    correcta: 1
  },
  {
    pregunta: "¿Cuál es un país de Asia",
    opciones: ["Francia", "Colombia", "Japón", "Nueva York"],
    correcta: 2
  },
  {
    pregunta: "¿Cuál NO es un planeta?",
    opciones: ["Venus", "Júpiter", "Fobos", "Saturno"],
    correcta: 2
  }
];

///////////////////////////////////////////

let preguntaActual = 0;

let respuestasCorrectas = 0;

let respuestaSeleccionada = null;

const inicio = document.querySelector("#inicio");

const quiz = document.querySelector("#quiz");

const editor = document.querySelector("#editor");

const resultado = document.querySelector("#resultado-final");

const btnIniciarQuiz = document.querySelector("#btn-iniciar-quiz");

const btnEditarPreguntas = document.querySelector("#btn-editar-preguntas");

const btnVolverInicioQuiz = document.querySelector("#btn-volver-inicio-quiz");

const btnSiguiente = document.querySelector("#btn-siguiente");

const btnVolverInicioEditor = document.querySelector("#btn-volver-inicio-editor");

const btnGuardarPreguntas = document.querySelector("#btn-guardar-preguntas");

const btnAgregarPregunta = document.querySelector("#btn-agregar-pregunta");

const btnReiniciarQuiz = document.querySelector("#btn-reiniciar-quiz");

const btnVolverInicioResultado = document.querySelector("#btn-volver-inicio-resultado");

const contenedorPregunta = document.querySelector("#contenedor-pregunta");

const contenedorOpciones = document.querySelector("#contenedor-opciones");

const resultadoRespuesta = document.querySelector("#resultado-respuesta");

const numeroPregunta = document.querySelector("#numero-pregunta");

const cantidadCorrectas = document.querySelector("#cantidad-correctas");

const contenedorEditor = document.querySelector("#contenedor-editor");

const textoResultado = document.querySelector("#texto-resultado-final");

/////////////////////////////////////////////////////////////

function mostrarSeccion(seccion) {

  const pantallas = document.querySelectorAll(".pantalla");

  pantallas.forEach(function (pantalla) {

    pantalla.classList.add("d-none");

  });

  seccion.classList.remove("d-none");
}

/////////////////////////////////////////////////////////////

function mostrarPregunta() {

  const pregunta = preguntas[preguntaActual];

  respuestaSeleccionada = null;

  resultadoRespuesta.innerHTML = "";

  numeroPregunta.textContent =
    `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

  cantidadCorrectas.textContent =
    `Correctas: ${respuestasCorrectas}`;

  contenedorPregunta.innerHTML = `<h3>${pregunta.pregunta}</h3>`;

  contenedorOpciones.innerHTML = "";

  pregunta.opciones.forEach(function (opcion, indice) {

    const boton = document.createElement("button");

    boton.type = "button";
    boton.className = "btn btn-outline-primary";

    boton.textContent = opcion;

    boton.addEventListener("click", function () {

      seleccionarRespuesta(indice, boton);

    });

    contenedorOpciones.appendChild(boton);

  });
}

//////////////////////////////////////////////////////////////

function iniciarQuiz() {

  preguntaActual = 0;
  respuestasCorrectas = 0;
  respuestaSeleccionada = null;

  mostrarSeccion(quiz);

  mostrarPregunta();
}

/////////////////////////////////////////////////

function seleccionarRespuesta(indice, botonSeleccionado) {

  respuestaSeleccionada = indice;

  const botones =
    contenedorOpciones.querySelectorAll("button");

  botones.forEach(function (boton) {

    boton.classList.remove("btn-primary");
    boton.classList.add("btn-outline-primary");

  });

  botonSeleccionado.classList.remove("btn-outline-primary");
  botonSeleccionado.classList.add("btn-primary");
}

///////////////////////////////////////////////

btnSiguiente.addEventListener("click", function () {

  if (respuestaSeleccionada === null) {

    resultadoRespuesta.innerHTML = `
      <div class="alert alert-warning">
        Debe seleccionar una respuesta.
      </div>
    `;

    return;
  }

  const pregunta = preguntas[preguntaActual];

  if (respuestaSeleccionada === pregunta.correcta) {

    respuestasCorrectas++;

  }

  preguntaActual++;

  if (preguntaActual < preguntas.length) {

    mostrarPregunta();

  } else {

    mostrarResultado();

  }

});

//////////////////////////////////////////////////

function mostrarResultado() {

  mostrarSeccion(resultado);

  textoResultado.textContent =
    `Tienes ${respuestasCorrectas} de ${preguntas.length} respuestas correctas.`;
}
///////////////////////////////////////////////////

function mostrarEditor() {

  mostrarSeccion(editor);

  contenedorEditor.innerHTML = "";

  preguntas.forEach(function (pregunta, indicePregunta) {

    const tarjeta = document.createElement("div");

    tarjeta.className = "card mb-4";

    let opcionesHTML = "";

    pregunta.opciones.forEach(function (opcion, indiceOpcion) {

      opcionesHTML += `
        <div class="input-group mb-2">

          <div class="input-group-text">

            <input
              class="form-check-input mt-0 opcion-correcta"
              type="radio"
              name="correcta-${indicePregunta}"
              value="${indiceOpcion}"
              ${pregunta.correcta === indiceOpcion ? "checked" : ""}
            >

          </div>

          <input
            type="text"
            class="form-control opcion"
            value="${opcion}"
          >

        </div>
      `;

    });

    tarjeta.innerHTML = `
      <div class="card-body">

        <h5 class="card-title">
          Pregunta ${indicePregunta + 1}
        </h5>

        <div class="mb-3">

          <label class="form-label">
            Pregunta
          </label>

          <input
            type="text"
            class="form-control enunciado"
            value="${pregunta.pregunta}"
          >

        </div>

        <label class="form-label">
          Opciones
        </label>

        <p class="text-muted">
          Seleccione el círculo correspondiente a la respuesta correcta.
        </p>

        ${opcionesHTML}

      </div>
    `;

    contenedorEditor.appendChild(tarjeta);

  });
}

/////////////////////////////////////////////////////////

btnGuardarPreguntas.addEventListener("click", function () {

  const tarjetas =
    contenedorEditor.querySelectorAll(".card");

  const preguntasActualizadas = [];

  tarjetas.forEach(function (tarjeta) {

    const enunciado =
      tarjeta.querySelector(".enunciado").value;

    const camposOpciones =
      tarjeta.querySelectorAll(".opcion");

    const opciones = [];

    camposOpciones.forEach(function (campo) {

      opciones.push(campo.value);

    });

    const opcionCorrecta =
      tarjeta.querySelector(".opcion-correcta:checked");

    let correcta = 0;

    if (opcionCorrecta) {

      correcta = Number(opcionCorrecta.value);

    }

    const preguntaActualizada = {
      pregunta: enunciado,
      opciones: opciones,
      correcta: correcta
    };

    preguntasActualizadas.push(preguntaActualizada);

  });

  preguntas = preguntasActualizadas;

  alert("Las preguntas se guardaron correctamente.");

  mostrarSeccion(inicio);

});

/////////////////////////////////////////////////////////

btnAgregarPregunta.addEventListener("click", function () {

  const nuevaPregunta = {
    pregunta: "",
    opciones: ["", "", "", ""],
    correcta: 0
  };

  preguntas.push(nuevaPregunta);

  mostrarEditor();

});

////////////////////////////////////////////////////////

btnIniciarQuiz.addEventListener("click", function () {
  iniciarQuiz();
});

btnEditarPreguntas.addEventListener("click", function () {
  mostrarEditor();
});

btnVolverInicioQuiz.addEventListener("click", function () {
  mostrarSeccion(inicio);
});

btnVolverInicioEditor.addEventListener("click", function () {
  mostrarSeccion(inicio);
});

btnReiniciarQuiz.addEventListener("click", function () {
  iniciarQuiz();
});

btnVolverInicioResultado.addEventListener("click", function () {
  mostrarSeccion(inicio);
});