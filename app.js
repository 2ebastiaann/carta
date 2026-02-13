const abrirBtn = document.getElementById("abrirBtn");
const modal = document.getElementById("modal");
const confirmarBtn = document.getElementById("confirmarBtn");
const passwordInput = document.getElementById("passwordInput");
const errorMsg = document.getElementById("errorMsg");

const videoInicial = document.getElementById("videoInicial");
const videoFinal = document.getElementById("videoFinal");
const videoContainer = document.getElementById("videoContainer");
const videoFinalContainer = document.getElementById("videoFinalContainer");

const clickableArea = document.getElementById("clickableArea");
const gifModal = document.getElementById("gifModal");
const volverBtn = document.getElementById("volverBtn");

const PASSWORD = "14022025";

// 🔥 Asegurar calidad y reinicio correcto
window.addEventListener("load", () => {
  videoInicial.pause();
  videoInicial.currentTime = 0;
  videoInicial.load();
  
  // 🔥 Forzar posición inicial
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  videoContainer.scrollTop = 0;
});

// Abrir modal
abrirBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// 🔥 Prevenir scroll cuando se abre el teclado
let originalScrollPos = 0;

passwordInput.addEventListener("focus", () => {
  originalScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  
  // 🔥 Prevenir scroll en Safari
  document.body.style.position = 'fixed';
  document.body.style.top = `-${originalScrollPos}px`;
  document.body.style.width = '100%';
});

passwordInput.addEventListener("blur", () => {
  // 🔥 Restaurar scroll
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  window.scrollTo(0, 0);
  videoContainer.scrollTop = 0;
});

// Confirmar contraseña
confirmarBtn.addEventListener("click", () => {
  if (passwordInput.value === PASSWORD) {
    // 🔥 Desactivar el blur del input manualmente
    passwordInput.blur();
    
    // 🔥 Forzar restauración de posición
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    modal.classList.add("hidden");
    errorMsg.textContent = "";
    
    // 🔥 Esperar un frame antes de abrir carta
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      videoContainer.scrollTop = 0;
      
      requestAnimationFrame(() => {
        abrirCarta();
      });
    });
  } else {
    errorMsg.textContent = "Fecha incorrecta 💔";
  }
});

function abrirCarta() {
  abrirBtn.style.display = "none";

  // 🔥 Asegurar posición arriba
  window.scrollTo(0, 0);
  videoContainer.scrollTop = 0;

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

function abrirGifModal() {
  gifModal.classList.remove("hidden");
  videoFinalContainer.classList.add("blurred");
  videoFinal.pause();
}

function cerrarGifModal() {
  gifModal.classList.add("hidden");
  videoFinalContainer.classList.remove("blurred");
  videoFinal.play().catch(err => {
    console.log("No se pudo reproducir automáticamente:", err);
  });
}

// Eventos para el área clickeable
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

clickableArea.addEventListener("touchstart", (e) => {
  e.preventDefault();
}, { passive: false });

clickableArea.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });

// Eventos para el botón volver
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