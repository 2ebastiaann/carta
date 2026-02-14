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

const floresBtn = document.getElementById("floresBtn");
const floresModal = document.getElementById("floresModal");
const floresGif = document.getElementById("floresGif");
const volverFloresBtn = document.getElementById("volverFloresBtn");

const audioCancion = document.getElementById("audioCancion");

// Cambiar la contraseña aquí (formato: DDMMYYYY)
const PASSWORD = "14102025";

// Variables de control
let cancionReproducida = false;
let audioDesbloqueado = false;
let primerGifVisto = false;
let floresGifReproducido = false;

window.addEventListener("load", () => {
  videoInicial.pause();
  videoInicial.currentTime = 0;
  videoInicial.load();
  audioCancion.load();
  
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  videoContainer.scrollTop = 0;
});

// Desbloquear audio para Safari iOS
function desbloquearAudio() {
  if (!audioDesbloqueado) {
    audioCancion.play().then(() => {
      audioCancion.pause();
      audioCancion.currentTime = 0;
      audioDesbloqueado = true;
    }).catch(err => {
      console.log("No se pudo desbloquear audio:", err);
    });
  }
}

abrirBtn.addEventListener("click", () => {
  desbloquearAudio();
  modal.classList.remove("hidden");
});

// Prevenir que Safari mueva la cámara cuando aparece el teclado
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
  desbloquearAudio();
  
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

// Reproducir canción solo una vez
function reproducirCancion() {
  if (cancionReproducida) {
    return;
  }

  audioCancion.currentTime = 0;
  
  const intentarReproducir = () => {
    const promesa = audioCancion.play();
    
    if (promesa !== undefined) {
      promesa
        .then(() => {
          cancionReproducida = true;
        })
        .catch(err => {
          // Reintentar si falla (importante para Safari)
          setTimeout(() => {
            audioCancion.play()
              .then(() => {
                cancionReproducida = true;
              })
              .catch(e => {
                setTimeout(() => {
                  audioCancion.play()
                    .then(() => {
                      cancionReproducida = true;
                    })
                    .catch(finalErr => {
                      console.log("No se pudo reproducir audio:", finalErr);
                    });
                }, 200);
              });
          }, 100);
        });
    }
  };
  
  intentarReproducir();
}

function abrirGifModal() {
  gifModal.classList.remove("hidden");
  videoFinalContainer.classList.add("blurred");
  videoFinal.pause();
  reproducirCancion();
}

function cerrarGifModal() {
  gifModal.classList.add("hidden");
  videoFinalContainer.classList.remove("blurred");
  videoFinal.play().catch(err => {
    console.log("No se pudo reproducir video:", err);
  });
  
  // Activar botón de flores después de cerrar el primer GIF
  if (!primerGifVisto) {
    primerGifVisto = true;
    floresBtn.classList.remove("hidden");
  }
}

function abrirFloresModal() {
  floresModal.classList.remove("hidden");
  videoFinalContainer.classList.add("blurred");
  videoFinal.pause();
  
  // Reproducir GIF de flores solo una vez
  if (!floresGifReproducido) {
    floresGif.src = "";
    floresGif.src = "assets/flores.gif?" + new Date().getTime();
    floresGifReproducido = true;
  }
  
  // Eliminar botón de flores permanentemente
  floresBtn.classList.add("hidden");
  floresBtn.remove();
}

function cerrarFloresModal() {
  floresModal.classList.add("hidden");
  videoFinalContainer.classList.remove("blurred");
  videoFinal.play().catch(err => {
    console.log("No se pudo reproducir video:", err);
  });
}

audioCancion.addEventListener("ended", () => {
  cancionReproducida = true;
});

// Eventos para área clickeable
clickableArea.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  desbloquearAudio();
  abrirGifModal();
}, { passive: false });

clickableArea.addEventListener("touchend", (e) => {
  e.preventDefault();
  e.stopPropagation();
  desbloquearAudio();
  abrirGifModal();
}, { passive: false });

clickableArea.addEventListener("touchstart", (e) => {
  e.preventDefault();
  desbloquearAudio();
}, { passive: false });

clickableArea.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });

// Eventos botón volver (primer GIF)
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

// Eventos botón de flores
floresBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  abrirFloresModal();
}, { passive: false });

floresBtn.addEventListener("touchend", (e) => {
  e.preventDefault();
  e.stopPropagation();
  abrirFloresModal();
}, { passive: false });

floresBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
}, { passive: false });

// Eventos botón volver (modal flores)
volverFloresBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  cerrarFloresModal();
}, { passive: false });

volverFloresBtn.addEventListener("touchend", (e) => {
  e.preventDefault();
  e.stopPropagation();
  cerrarFloresModal();
}, { passive: false });

volverFloresBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
}, { passive: false });