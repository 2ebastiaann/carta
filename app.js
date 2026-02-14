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
// 🔥 Variable para saber si el audio está "desbloqueado" en Safari
let audioDesbloqueado = false;

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

// 🔥 Desbloquear audio en Safari iOS con la primera interacción
function desbloquearAudio() {
  if (!audioDesbloqueado) {
    // 🔥 Intentar reproducir y pausar inmediatamente (hack para Safari)
    audioCancion.play().then(() => {
      audioCancion.pause();
      audioCancion.currentTime = 0;
      audioDesbloqueado = true;
      console.log("Audio desbloqueado para Safari");
    }).catch(err => {
      console.log("No se pudo desbloquear audio:", err);
    });
  }
}

abrirBtn.addEventListener("click", () => {
  desbloquearAudio(); // 🔥 Desbloquear con el primer click
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
  desbloquearAudio(); // 🔥 Desbloquear también aquí
  
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

// 🔥 Función para reproducir audio (con reintentos para Safari)
function reproducirCancion() {
  if (cancionReproducida) {
    console.log("La canción ya fue reproducida");
    return;
  }

  console.log("Intentando reproducir canción...");
  audioCancion.currentTime = 0;
  
  // 🔥 Intento 1: Reproducir inmediatamente
  const intentarReproducir = () => {
    const promesa = audioCancion.play();
    
    if (promesa !== undefined) {
      promesa
        .then(() => {
          console.log("✅ Canción reproducida exitosamente");
          cancionReproducida = true;
        })
        .catch(err => {
          console.log("❌ Error al reproducir (intento 1):", err);
          
          // 🔥 Intento 2: Esperar un poco y reintentar
          setTimeout(() => {
            console.log("Reintentando reproducción...");
            audioCancion.play()
              .then(() => {
                console.log("✅ Canción reproducida en segundo intento");
                cancionReproducida = true;
              })
              .catch(e => {
                console.log("❌ Error en segundo intento:", e);
                
                // 🔥 Intento 3: Último recurso
                setTimeout(() => {
                  console.log("Último intento de reproducción...");
                  audioCancion.play()
                    .then(() => {
                      console.log("✅ Canción reproducida en tercer intento");
                      cancionReproducida = true;
                    })
                    .catch(finalErr => {
                      console.log("❌ No se pudo reproducir después de 3 intentos:", finalErr);
                    });
                }, 200);
              });
          }, 100);
        });
    }
  };
  
  intentarReproducir();
}

// 🔥 Función para abrir el modal del GIF
function abrirGifModal() {
  console.log("Abriendo GIF modal");
  gifModal.classList.remove("hidden");
  videoFinalContainer.classList.add("blurred");
  videoFinal.pause();
  
  // 🔥 Reproducir canción solo si no ha sonado
  reproducirCancion();
}

// 🔥 Función para cerrar el modal del GIF
function cerrarGifModal() {
  console.log("Cerrando GIF modal");
  gifModal.classList.add("hidden");
  videoFinalContainer.classList.remove("blurred");
  videoFinal.play().catch(err => {
    console.log("No se pudo reproducir video automáticamente:", err);
  });
}

// 🔥 Cuando la canción termina
audioCancion.addEventListener("ended", () => {
  console.log("✅ Canción terminó de reproducirse");
  cancionReproducida = true;
});

// 🔥 Eventos para el área clickeable - IMPORTANTE: desbloquear audio aquí también
clickableArea.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  desbloquearAudio(); // 🔥 Crítico para Safari
  abrirGifModal();
}, { passive: false });

clickableArea.addEventListener("touchend", (e) => {
  e.preventDefault();
  e.stopPropagation();
  desbloquearAudio(); // 🔥 Crítico para Safari
  abrirGifModal();
}, { passive: false });

clickableArea.addEventListener("touchstart", (e) => {
  e.preventDefault();
  desbloquearAudio(); // 🔥 Desbloquear en el primer toque
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