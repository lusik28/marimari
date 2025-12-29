const playButton = document.getElementById("playButton");
const replayButton = document.getElementById("replayButton");
const textContainer = document.getElementById("textContainer");
const music = document.getElementById("music");
const voice = document.getElementById("voice");

const paragraphs = [
  { text: "Oi…", time: 1800 },
  { text: "Se você está ouvindo isso agora,\né porque eu quis criar algo que fosse só nosso.", time: 3100 },
  { text: "Algo que não pudesse ser apressado.\nAlgo que tivesse o tempo certo de existir.", time: 3100 },
  { text: "Assim como eu nunca quis te apressar.", time: 2600 },
  { text: "Você apareceu na minha vida de um jeito simples,\nsem promessas exageradas,\nsem barulho,\nsem pressa.", time: 6500 },
  { text: "E mesmo assim,\nmudou absolutamente tudo.", time: 2500 },
  { text: "O seu sorriso…\né aquele tipo de coisa que ilumina até os dias mais silenciosos,\naqueles dias em que o mundo parece pesado demais.", time: 7500 },
  { text: "E os seus olhos…\nmeu Deus.", time: 2500 },
  { text: "Não é só a beleza.\nNunca foi só isso.", time: 2700 },
  { text: "É a paz que eles me trazem.\nÉ a calma.\nÉ o jeito como, por um segundo,\ntudo parece ficar no lugar quando eu penso em você.", time: 7500 },
  { text: "Eu poderia muito bem ouvir a sua risada\ntodos os dias da minha vida.", time: 3000 },
  { text: "E mesmo assim…\neu nunca me cansaria de você.", time: 2800 },
  { text: "Os seus detalhes\nsão a parte que mais me prende.", time: 2600 },
  { text: "O seu jeito tranquilo,\na forma como você fala,\ncomo você se expressa,\ncomo você transforma coisas simples\nem algo que vale a pena lembrar.", time: 8000 },
  { text: "Você tem esse dom raro\nde fazer um dia comum\nse tornar especial\nsem nem perceber.", time: 3000 },
  { text: "E talvez você nunca veja a si mesma\ncomo eu vejo.", time: 2700 },
  { text: "Mas eu queria,\nde verdade,\nque você conseguisse sentir\nnem que fosse por um instante\no quanto você é incrível pra mim.", time: 7000 },
  { text: "Isso aqui\nnão é só um site.\nNão é só um texto.\nNão é só uma voz.", time: 2900 },
  { text: "É um pedaço do que eu sinto por você", time: 2600 }
];


function playSequence() {
  let i = 0;
  textContainer.innerHTML = "";
  textContainer.style.opacity = 1;

  music.volume = 0.0020; // música ambiente
  voice.volume = 0.17; // voz mais clara

  music.currentTime = 0;
  voice.currentTime = 0;
  music.play();
  voice.play();

  function showNext() {
    if (i >= paragraphs.length) {
      replayButton.classList.remove("hidden");
      return;
    }

    textContainer.innerHTML = paragraphs[i].text;
    textContainer.style.opacity = 1;

    setTimeout(() => {
      textContainer.style.opacity = 0;
      setTimeout(() => {
        i++;
        showNext();
      }, 500);
    }, paragraphs[i].time);
  }

  showNext();
}

// Botão PLAY
playButton.addEventListener("click", () => {
  playButton.style.display = "none";
  playSequence();
});

// Botão REVER
replayButton.addEventListener("click", () => {
  replayButton.classList.add("hidden");
  playSequence();
});

// ------------- Partículas ----------------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particlesArray = [];

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', initCanvas);
initCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function createParticles() {
  particlesArray = [];
  for(let i=0;i<100;i++){
    particlesArray.push(new Particle());
  }
}
createParticles();

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update();p.draw()});
  requestAnimationFrame(animateParticles);
}
animateParticles();
