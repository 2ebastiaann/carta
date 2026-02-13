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
  
  // 🔥 Asegurar que siempre empiece desde arriba
  videoContainer.scrollTop = 0;
  window.scrollTo(0, 0);
});

// Abrir modal
abrirBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// 🔥 Prevenir que el teclado mueva la cámara en móviles
passwordInput.addEventListener("focus", () => {
  // Pequeño delay para que el teclado aparezca
  setTimeout(() => {
    videoContainer.scrollTop = 0;
    window.scrollTo(0, 0);
  }, 300);
});

// 🔥 Cuando el teclado se oculta, volver arriba
passwordInput.addEventListener("blur", () => {
  setTimeout(() => {
    videoContainer.scrollTop = 0;
    window.scrollTo(0, 0);
  }, 100);
});

// Confirmar contraseña
confirmarBtn.addEventListener("click", () => {
  if (passwordInput.value === PASSWORD) {
    modal.classList.add("hidden");
    errorMsg.textContent = "";
    
    // 🔥 Forzar scroll arriba inmediatamente
    videoContainer.scrollTop = 0;
    window.scrollTo(0, 0);
    
    // 🔥 Asegurar que se mantenga arriba durante la transición
    setTimeout(() => {
      videoContainer.scrollTop = 0;
      window.scrollTo(0, 0);
    }, 50);
    
    abrirCarta();
  } else {
    errorMsg.textContent = "Fecha incorrecta 💔";
  }
});

function abrirCarta() {
  abrirBtn.style.display = "none";

  // 🔥 Una vez más antes de reproducir
  videoContainer.scrollTop = 0;
  window.scrollTo(0, 0);

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
  console.log("Abriendo GIF modal");
  gifModal.classList.remove("hidden");
  videoFinalContainer.classList.add("blurred");
  videoFinal.pause();
}

// 🔥 Función para cerrar el modal del GIF
function cerrarGifModal() {
  console.log("Cerrando GIF modal");
  gifModal.classList.add("hidden");
  videoFinalContainer.classList.remove("blurred");
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