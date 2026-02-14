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

// 🔥 AUDIO
const audioCancion = document.getElementById("audioCancion");

const PASSWORD = "14022025";

// 🔥 Variable para controlar si la canción ya sonó
let cancionReproducida = false;

window.addEventListener("load", () => {
  videoInicial.pause();
  videoInicial.currentTime = 0;
  videoInicial.load();
  
  // 🔥 Precargar el audio
  audioCancion.load();
  
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  videoContainer.scrollTop = 0;
});

abrirBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

let originalScrollPos = 0;

passwordInput.addEventListener("focus", () => {
  originalScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${originalScrollPos}px`;
  document.body.style.width = '100%';
});

passwordInput.addEventListener("blur", () => {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, 0);
  videoContainer.scrollTop = 0;
});

confirmarBtn.addEventListener("click", () => {
  if (passwordInput.value === PASSWORD) {
    passwordInput.blur();
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    modal.classList.add("hidden");
    errorMsg.textContent = "";
    
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

// 🔥 Función para abrir el modal del GIF
function abrirGifModal() {
  console.log("Abriendo GIF modal");
  gifModal.classList.remove("hidden");
  videoFinalContainer.classList.add("blurred");
  videoFinal.pause();
  
  // 🔥 REPRODUCIR CANCIÓN SOLO SI NO HA SONADO ANTES
  if (!cancionReproducida) {
    console.log("Reproduciendo canción por primera vez");
    audioCancion.currentTime = 0;
    
    // 🔥 Intentar reproducir con manejo de errores para Safari
    const reproducirPromesa = audioCancion.play();
    
    if (reproducirPromesa !== undefined) {
      reproducirPromesa
        .then(() => {
          console.log("Canción reproducida exitosamente");
          cancionReproducida = true; // 🔥 Marcar como reproducida
        })
        .catch(err => {
          console.log("Error al reproducir audio:", err);
          // 🔥 En Safari, si falla, intentar de nuevo después de un breve delay
          setTimeout(() => {
            audioCancion.play()
              .then(() => {
                console.log("Canción reproducida en segundo intento");
                cancionReproducida = true;
              })
              .catch(e => console.log("No se pudo reproducir:", e));
          }, 100);
        });
    }
  } else {
    console.log("La canción ya fue reproducida anteriormente");
  }
}

// 🔥 Función para cerrar el modal del GIF
function cerrarGifModal() {
  console.log("Cerrando GIF modal");
  gifModal.classList.add("hidden");
  videoFinalContainer.classList.remove("blurred");
  videoFinal.play().catch(err => {
    console.log("No se pudo reproducir video automáticamente:", err);
  });
  
  // 🔥 NO pausar la canción, dejar que termine
  // La canción sigue sonando aunque se cierre el GIF
}

// 🔥 Cuando la canción termina, asegurar que está marcada como reproducida
audioCancion.addEventListener("ended", () => {
  console.log("Canción terminó de reproducirse");
  cancionReproducida = true;
});

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