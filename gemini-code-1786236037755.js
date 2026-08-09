// Desplazamiento Suave
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

/* ==========================================
   ACTIVIDAD 1: JUEGO COGNITIVO IQ (MEMORIA DE SECUENCIA)
   ========================================== */
let gameSequence = [];
let userSequence = [];
let level = 0;
let isPlaying = false;

function startIqGame() {
  gameSequence = [];
  userSequence = [];
  level = 0;
  isPlaying = true;
  document.getElementById('iq-status').innerText = '¡Memoriza la secuencia!';
  nextRound();
}

function nextRound() {
  userSequence = [];
  level++;
  document.getElementById('iq-score').innerText = `Nivel: ${level}`;
  gameSequence.push(Math.floor(Math.random() * 4));
  playSequence();
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashButton(gameSequence[i]);
    i++;
    if (i >= gameSequence.length) {
      clearInterval(interval);
    }
  }, 600);
}

function flashButton(index) {
  const btn = document.getElementById(`btn-${index}`);
  btn.classList.add('active');
  setTimeout(() => btn.classList.remove('active'), 300);
}

function userClick(index) {
  if (!isPlaying) return;

  flashButton(index);
  userSequence.push(index);

  const currentIndex = userSequence.length - 1;
  if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
    document.getElementById('iq-status').innerText = '❌ Secuencia incorrecta. ¡Inténtalo de nuevo!';
    isPlaying = false;
    return;
  }

  if (userSequence.length === gameSequence.length) {
    document.getElementById('iq-status').innerText = '✅ ¡Bien hecho! Siguiente nivel...';
    setTimeout(nextRound, 1000);
  }
}

/* ==========================================
   ACTIVIDAD 2: SIMULADOR DE CIBERSEGURIDAD (PHISHING)
   ========================================== */
function evaluatePhishing(isPhishingAnswer) {
  const resultElem = document.getElementById('cyber-result');
  if (isPhishingAnswer) {
    resultElem.style.color = '#22c55e';
    resultElem.innerText = '✅ ¡Correcto! Es Phishing. Señales de alerta: Dominio falso (soport-paypal-security.com), lenguaje de urgencia y un enlace acortado sospechoso.';
  } else {
    resultElem.style.color = '#ef4444';
    resultElem.innerText = '❌ Incorrecto. Este correo es peligroso. Muestra características típicas de suplantación de identidad.';
  }
}

/* ==========================================
   MATRIZ DE MÁS DE 50 BOTONES INTERACTIVOS
   ========================================== */
const totalButtons = 52;
let completedCount = 0;

// Lista de datos para la generación masiva de interacción
const generateButtonData = (id) => {
  if (id <= 26) {
    return {
      title: `IQ Ejercicio #${id}`,
      type: 'iq',
      prompt: `Desafío Cognitivo #${id}: `,
      content: [
        "Resuelve mentalmente: 17 x 8. (R: 136)",
        "Escribe 5 palabras al revés en tu mente rápidamente.",
        "Identifica el patrón: 2, 4, 8, 16, 32, __? (R: 64)",
        "Menciona 4 sinónimos de 'Perspicaz'.",
        "Encuentra la regla lógica: Si A=1, C=3, E=5, ¿G=? (R: 7)",
        "Visualiza un cubo de rubik y gíralo 90° en tu mente."
      ][id % 6]
    };
  } else {
    return {
      title: `Cyber Tip #${id - 26}`,
      type: 'cyber',
      prompt: `Reto de Seguridad #${id - 26}: `,
      content: [
        "Usa autenticación de dos factores (2FA) en todas tus cuentas.",
        "Nunca uses la misma contraseña para dos servicios diferentes.",
        "¿Qué significa HTTPS? La 'S' indica un protocolo seguro de cifrado.",
        "Evita conectarte a redes Wi-Fi públicas sin una VPN.",
        "Actualiza tu sistema operativo regularmente para parchar vulnerabilidades.",
        "Un gestor de contraseñas es mejor que recordarlas todas en papel."
      ][id % 6]
    };
  }
};

function initGrid() {
  const gridContainer = document.getElementById('buttons-grid');

  for (let i = 1; i <= totalButtons; i++) {
    const data = generateButtonData(i);
    const btn = document.createElement('button');
    btn.className = 'action-btn';
    btn.innerText = `${data.title}`;
    
    btn.onclick = () => {
      alert(`${data.prompt}\n\n${data.content}`);
      if (!btn.classList.contains('completed')) {
        btn.classList.add('completed');
        completedCount++;
        document.getElementById('completed-count').innerText = completedCount;
      }
    };

    gridContainer.appendChild(btn);
  }
}

// Inicializar la matriz cuando cargue el documento
document.addEventListener('DOMContentLoaded', initGrid);