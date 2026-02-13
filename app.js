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
    
    // 🔥 Mantener scroll arriba antes de abrir carta
    videoContainer.scrollTop = 0;
    
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
    
    setTimeout(() => {
      videoFinalContainer.scrollTop = 10;
    }, 100);
  };
}

// 🔥 Función para abrir el modal del GIF
function abrirGifModal() {
  console.log("Abriendo GIF modal"); // Para debugging
  gifModal.classList.remove("hidden");
  videoFinalContainer.classList.add("blurred");
  videoFinal.pause();
}

// 🔥 Función para cerrar el modal del GIF
function cerrarGifModal() {
  console.log("Cerrando GIF modal"); // Para debugging
  gifModal.classList.add("hidden");
  videoFinalContainer.classList.remove("blurred");
  // 🔥 Safari requiere interacción del usuario para reproducir video
  videoFinal.play().catch(err => {
    console.log("No se pudo reproducir automáticamente:", err);
  });
}

// 🔥 Eventos para el área clickeable - Safari necesita ambos
clickableArea.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  abrirGifModal();
}, { passive: false });

clickableArea.addEventListener("touchend", (e) => {
  e.preventDefault();
  e.stopPropagation();
  abrirGifModal();
}, { passive: false });

// 🔥 Prevenir scroll accidental en Safari al tocar el área
clickableArea.addEventListener("touchstart", (e) => {
  e.preventDefault();
}, { passive: false });

clickableArea.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });

// 🔥 Eventos para el botón volver
volverBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  cerrarGifModal();
}, { passive: false });

volverBtn.addEventListener("touchend", (e) => {
  e.preventDefault();
  e.stopPropagation();
  cerrarGifModal();
}, { passive: false });

volverBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
}, { passive: false });