const abrirBtn = document.getElementById("abrirBtn");
const modal = document.getElementById("modal");
const confirmarBtn = document.getElementById("confirmarBtn");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");

const videoInicial = document.getElementById("videoInicial");
const videoFinal = document.getElementById("videoFinal");
const videoContainer = document.getElementById("videoContainer");
const videoFinalContainer = document.getElementById("videoFinalContainer");

// 🔥 Elementos del GIF modal
const clickableArea = document.getElementById("clickableArea");
const gifModal = document.getElementById("gifModal");
const volverBtn = document.getElementById("volverBtn");

const PASSWORD = "14022025";

// 🔥 Asegurar calidad y reinicio correcto
window.addEventListener("load", () => {
  videoInicial.pause();
  videoInicial.currentTime = 0;
  videoInicial.load();
});

// Abrir modal
abrirBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Confirmar contraseña
confirmarBtn.addEventListener("click", () => {
  if (passwordInput.value === PASSWORD) {
    modal.classList.add("hidden");
    errorMsg.textContent = "";
    abrirCarta();
  } else {
    errorMsg.textContent = "Fecha incorrecta 💔";
  }
});

function abrirCarta() {
  abrirBtn.style.display = "none";

  videoInicial.currentTime = 0;
  videoInicial.play();

  videoInicial.onended = () => {
    videoContainer.classList.add("hidden");
    videoFinalContainer.classList.remove("hidden");
    videoFinal.play();
    
    // 🔥 Centra el scroll verticalmente después de mostrar el video
    setTimeout(() => {
      videoFinalContainer.scrollTop = 10;
    }, 100);
  };
}

// 🔥 Abrir GIF modal al hacer click en el área
clickableArea.addEventListener("click", (e) => {
  console.log("Click detectado en área clickeable"); // 🔥 Para debugging
  e.stopPropagation(); // Previene propagación del evento
  gifModal.classList.remove("hidden");
  videoFinalContainer.classList.add("blurred");
  videoFinal.pause();
});

// 🔥 También detectar touch events para móviles
clickableArea.addEventListener("touchstart", (e) => {
  console.log("Touch detectado en área clickeable"); // 🔥 Para debugging
  e.preventDefault(); // Previene comportamiento por defecto
  e.stopPropagation();
  gifModal.classList.remove("hidden");
  videoFinalContainer.classList.add("blurred");
  videoFinal.pause();
});

// 🔥 Cerrar GIF modal y volver
volverBtn.addEventListener("click", () => {
  gifModal.classList.add("hidden");
  videoFinalContainer.classList.remove("blurred");
  videoFinal.play();
});

volverBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  gifModal.classList.add("hidden");
  videoFinalContainer.classList.remove("blurred");
  videoFinal.play();
});