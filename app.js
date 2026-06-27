/* ============================
   LEVEL 18 UNLOCKED — APP.JS
   ============================ */

// ── State ──────────────────────────────────────────────────────────────────────
const state = {
  currentSection: 0,
  totalSections: 7,
  soundOn: false,
  theme: localStorage.getItem('bday-theme') || 'dark',
  achievements: JSON.parse(localStorage.getItem('bday-achievements') || '[]'),
  wishHistory: JSON.parse(localStorage.getItem('bday-wishes') || '[]'),
  openedEnvelopes: JSON.parse(localStorage.getItem('bday-envelopes') || '[]'),
  gameHighScore: parseInt(localStorage.getItem('bday-highscore') || '0'),
  lightboxIndex: 0,
};

// ── Data ───────────────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  { icon:'✨', name:'Amazing Friend', rarity:'LEGENDARY', badge:'❤️',
    msg:"You radiate warmth and kindness wherever you go. Being your friend is one of the greatest gifts anyone could receive. You make every ordinary moment feel extraordinary. Truly legendary! ✨" },
  { icon:'🌈', name:'Dream Chaser', rarity:'EPIC', badge:'🌈',
    msg:"You never stop reaching for your dreams, no matter how big they seem. Your passion and determination inspire everyone around you. Keep chasing those colorful horizons — they're leading you somewhere wonderful! 🌈" },
  { icon:'📚', name:'Future Achiever', rarity:'RARE', badge:'🎓',
    msg:"The knowledge you're building today is your greatest treasure. Every page you turn, every lesson you learn, and every challenge you overcome shapes a brilliant future that's uniquely yours. The world is ready for what you'll bring! 📚" },
  { icon:'🌍', name:'Explorer', rarity:'EPIC', badge:'🗺️',
    msg:"You have an adventurer's soul — curious, brave, and always ready for what's next. Life is a vast and beautiful map, and at 18, you're just beginning to discover how far you can travel. Explore boldly! 🌍" },
  { icon:'🐦‍🔥', name:'Angry Bird', rarity:'LEGENDARY', badge:'🎯',
    msg:"You didn't just aim — you launched. Built like a cannonball and sharp as a slingshot, you hit your targets with terrifying accuracy. Others saw obstacles. You saw trajectories. The pigs never stood a chance. 🐷💥" },
  { icon:'🎂', name:'Officially 18', rarity:'LEGENDARY+', badge:'👑',
    msg:"18 years of being absolutely spectacular! You've grown from a tiny spark into a blazing star. This milestone belongs to you — wear it with pride, joy, and the quiet confidence of someone who knows the best is yet to come. Welcome to adulthood, champion! 🎂👑" },
];

const WISHES = [
  { emoji:'🌏', text:'An adventure so big it needs its own chapter', cat:'Adventure' },
  { emoji:'📖', text:'Academic success beyond your wildest expectations', cat:'Growth' },
  { emoji:'💼', text:'A career path that lights up your soul', cat:'Career' },
  { emoji:'🤝', text:'Friendships that grow richer with every year', cat:'Connection' },
  { emoji:'💰', text:'Financial abundance and the freedom it brings', cat:'Prosperity' },
  { emoji:'🌅', text:'Every morning filled with fresh possibilities', cat:'Hope' },
  { emoji:'💪', text:'Unshakeable confidence in your own greatness', cat:'Strength' },
  { emoji:'❤️', text:'Love — for yourself, from others, all around', cat:'Love' },
  { emoji:'🎨', text:'Creative breakthroughs that surprise even you', cat:'Creativity' },
  { emoji:'🏆', text:'Victories that make you proud of how far you have come', cat:'Achievement' },
  { emoji:'🌿', text:'Health and energy to live every moment fully', cat:'Wellbeing' },
  { emoji:'🔑', text:'New doors that open to rooms you never imagined', cat:'Opportunity' },
  { emoji:'🌙', text:'Rest that restores and dreams that inspire', cat:'Balance' },
  { emoji:'🧠', text:'Wisdom to navigate whatever comes your way', cat:'Wisdom' },
  { emoji:'✈️', text:'Journeys that expand your world and your mind', cat:'Exploration' },
];

const ENVELOPES = [
  { emoji:'🌟', wish:'You are braver than you believe, stronger than you seem, and smarter than you think. Never forget that.' },
  { emoji:'💕', wish:'May every person you meet this year either teach you something wonderful or become someone wonderful to you.' },
  { emoji:'🚀', wish:'Your potential has no ceiling. Dream as big as the universe, because that is exactly where you belong.' },
  { emoji:'🌺', wish:'Happiness is not a destination — it is woven into the moments you choose to fully embrace.' },
  { emoji:'📚', wish:'Every book you read, every skill you master, and every lesson you learn is a superpower added to your growing collection.' },
  { emoji:'🎵', wish:'May there always be a song in your heart and a rhythm in your step, even on the quietest days.' },
  { emoji:'🌈', wish:'After every storm in your life, look up. The rainbow was already being painted for you.' },
  { emoji:'💻', wish:'Your generation will build the future. Whatever you create, make it something the world truly needs.' },
  { emoji:'🍀', wish:'May good fortune find you in unexpected places and blessings arrive when you least expect them.' },
  { emoji:'🌙', wish:'Even on your darkest nights, remember: the stars only shine because of the darkness. So do you.' },
  { emoji:'🎯', wish:'Set your sights high, aim steady, and trust that every effort brings you measurably closer to your target.' },
  { emoji:'🤗', wish:'The kindness you show to others always finds its way back to you — multiplied beautifully.' },
  { emoji:'🦋', wish:'You are in a continuous state of becoming. Embrace every stage of your transformation with grace.' },
  { emoji:'🌊', wish:'Like the ocean, may your depth always amaze those who take the time to truly know you.' },
  { emoji:'🏆', wish:'You do not have to be perfect to be worthy of every amazing thing coming your way. You just have to be you.' },
  { emoji:'🌸', wish:'May your 18th year bloom with beautiful beginnings and may you tend them with patience and love.' },
  { emoji:'✨', wish:'The world is genuinely better because you are in it. Never let anyone — including yourself — tell you otherwise.' },
  { emoji:'🎂', wish:'Happy 18th Birthday! This is your moment. Blow out the candles, make your wish, and then go live it. We believe in you completely. 🎉💕' },
];

const MEMORY_PHOTOS = [
{
    emoji: "🎁",
    bg: "linear-gradient(135deg,#fbbf24,#f97316)",
    title: "Scratch Me!",
    reveal: "🎂 Wishing you endless happiness and unforgettable adventures!"
},
{
    emoji: "💌",
    bg: "linear-gradient(135deg,#ec4899,#db2777)",
    title: "Scratch Me!",
    reveal: "💕 You're one of the kindest people. Never stop smiling!"
},
{
    emoji: "✨",
    bg: "linear-gradient(135deg,#8b5cf6,#7c3aed)",
    title: "Scratch Me!",
    reveal: "⭐ Achievement Unlocked\nOfficial Adult!"
},
{
    emoji: "🌸",
    bg: "linear-gradient(135deg,#fb7185,#f43f5e)",
    title: "Scratch Me!",
    reveal: "🌸 Keep blooming beautifully wherever life takes you."
},
{
    emoji: "🎈",
    bg: "linear-gradient(135deg,#60a5fa,#2563eb)",
    title: "Scratch Me!",
    reveal: "🎈 +100 Birthday Happiness Points!"
},
{
    emoji: "🎵",
    bg: "linear-gradient(135deg,#06b6d4,#0891b2)",
    title: "Scratch Me!",
    reveal: "🎶 May your life always be filled with your favorite songs."
},
{
    emoji: "🌈",
    bg: "linear-gradient(135deg,#a78bfa,#7c3aed)",
    title: "Scratch Me!",
    reveal: "🌈 Every dream you chase is waiting for you."
},
{
    emoji: "❤️",
    bg: "linear-gradient(135deg,#ef4444,#dc2626)",
    title: "Scratch Me!",
    reveal: "❤️ Happy 18th Birthday! Stay amazing forever."
}
];

// ── Audio ──────────────────────────────────────────────────────────────────────
class SoundFX {
  constructor() { this.ctx = null; this.unlocked = false; }
  init() {
    if (this.ctx) return;
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); this.unlocked = true; } catch(e) {}
  }
  play(type) {
    if (!state.soundOn || !this.unlocked) return;
    this.init();
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    const now = ctx.currentTime;
    if (type === 'click') {
      o.type = 'sine'; o.frequency.setValueAtTime(880, now); o.frequency.exponentialRampToValueAtTime(440, now+0.1);
      g.gain.setValueAtTime(0.15, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.15);
      o.start(now); o.stop(now+0.15);
    } else if (type === 'unlock') {
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine'; osc.frequency.setValueAtTime(freq, now + i*0.08);
        gain.gain.setValueAtTime(0.12, now+i*0.08); gain.gain.exponentialRampToValueAtTime(0.001, now+i*0.08+0.3);
        osc.start(now+i*0.08); osc.stop(now+i*0.08+0.3);
      });
    } else if (type === 'confetti') {
      o.type = 'triangle'; o.frequency.setValueAtTime(440, now);
      o.frequency.exponentialRampToValueAtTime(880, now+0.1);
      g.gain.setValueAtTime(0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.2);
      o.start(now); o.stop(now+0.2);
    } else if (type === 'wish') {
      [392, 523, 659].forEach((f, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine'; osc.frequency.setValueAtTime(f, now+i*0.05);
        gain.gain.setValueAtTime(0.08, now+i*0.05); gain.gain.exponentialRampToValueAtTime(0.001, now+i*0.05+0.25);
        osc.start(now+i*0.05); osc.stop(now+i*0.05+0.25);
      });
    } else if (type === 'catch') {
      o.type = 'square'; o.frequency.setValueAtTime(660, now); o.frequency.exponentialRampToValueAtTime(1320, now+0.08);
      g.gain.setValueAtTime(0.08, now); g.gain.exponentialRampToValueAtTime(0.001, now+0.1);
      o.start(now); o.stop(now+0.1);
    }
  }
}
const sfx = new SoundFX();

// ── Three.js Particle Background ───────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas || !window.THREE) return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const count = 1200;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const clrs = [
    new THREE.Color(0xc084fc), new THREE.Color(0xf472b6),
    new THREE.Color(0x34d399), new THREE.Color(0x60a5fa), new THREE.Color(0xfbbf24)
  ];
  for (let i = 0; i < count; i++) {
    pos[i*3] = (Math.random()-0.5)*20;
    pos[i*3+1] = (Math.random()-0.5)*20;
    pos[i*3+2] = (Math.random()-0.5)*10;
    const c = clrs[Math.floor(Math.random()*clrs.length)];
    colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.7 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  let animId;
  function animate() {
    animId = requestAnimationFrame(animate);
    pts.rotation.x += 0.0003;
    pts.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

// ── Cursor ─────────────────────────────────────────────────────────────────────
function initCursor() {
  const cur = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  function animTrail() {
    tx += (mx - tx) * 0.12; ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();
  document.querySelectorAll('button, .achievement-card, .map-destination, .envelope, .polaroid').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.transform = 'translate(-50%,-50%) scale(2)'; trail.style.opacity = '0.2'; });
    el.addEventListener('mouseleave', () => { cur.style.transform = 'translate(-50%,-50%) scale(1)'; trail.style.opacity = '0.5'; });
  });
}

// ── Theme ──────────────────────────────────────────────────────────────────────
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('bday-theme', state.theme);
  });
}

// ── Sound Toggle ───────────────────────────────────────────────────────────────
function initSound() {
  const btn = document.getElementById('soundToggle');
  btn.addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    btn.textContent = state.soundOn ? '🔊' : '🔇';
    if (state.soundOn) { sfx.init(); sfx.play('click'); }
  });
}

// ── Navigation ─────────────────────────────────────────────────────────────────
const SECTION_NAMES = ['Unlock','Achievements','Wishes','Memories','Game','Envelopes','Finale'];

function initNav() {
  const nav = document.getElementById('navDots');
  for (let i = 0; i < state.totalSections; i++) {
    const dot = document.createElement('button');
    dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', SECTION_NAMES[i]);
    dot.setAttribute('title', SECTION_NAMES[i]);
    dot.dataset.index = i;
    dot.addEventListener('click', () => goToSection(i));
    nav.appendChild(dot);
  }
}

function goToSection(index) {
  if (index === state.currentSection) return;
  const sections = document.querySelectorAll('.section');
  sections[state.currentSection].classList.remove('active');
  sections[state.currentSection].classList.add('exit');
  setTimeout(() => sections[state.currentSection < state.totalSections ? state.currentSection : 0].classList.remove('exit'), 600);
  state.currentSection = index;
  sections[index].classList.add('active');
  document.querySelectorAll('.nav-dot').forEach((d,i) => d.classList.toggle('active', i === index));
  if (index === 6) { setTimeout(initFinale, 600); }
  AOS.refresh();
}

// ── Section 1: Unlock ──────────────────────────────────────────────────────────
function initUnlock() {
  initParticles();
  const giftBox = document.getElementById('giftBox');
  const unlockReveal = document.getElementById('unlockReveal');
  const preText = document.getElementById('preText');
  const giftWrapper = document.getElementById('giftWrapper');

  giftBox.addEventListener('click', () => {
    sfx.play('unlock');
    giftBox.classList.add('opened');
    spawnConfetti(60);
    setTimeout(() => {
      giftWrapper.style.opacity = '0';
      giftWrapper.style.transform = 'scale(0.8)';
      giftWrapper.style.transition = 'all 0.4s';
      preText.style.opacity = '0';
      preText.style.transition = 'opacity 0.3s';
    }, 400);
    setTimeout(() => {
      giftWrapper.style.display = 'none';
      preText.style.display = 'none';
      unlockReveal.classList.add('visible');
      spawnConfetti(80);
    }, 800);
  });

  document.getElementById('startJourney').addEventListener('click', () => {
    sfx.play('click');
    goToSection(1);
  });
}

function spawnConfetti(count) {
  const container = document.getElementById('confettiContainer');
  const colors = ['#c084fc','#f472b6','#34d399','#60a5fa','#fbbf24','#f97316','#fff'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.width = (6 + Math.random() * 6) + 'px';
    piece.style.height = (8 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.opacity = (0.7 + Math.random() * 0.3).toString();
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
}

// ── Section 2: Achievements ────────────────────────────────────────────────────
function initAchievements() {
  const cards = document.querySelectorAll('.achievement-card');
  cards.forEach((card, i) => {
    // Restore saved state
    if (state.achievements.includes(i)) {
      card.classList.remove('locked');
      card.classList.add('unlocked');
    } else {
      card.classList.add('locked');
    }
    card.addEventListener('click', () => {
      sfx.play('unlock');
      if (!state.achievements.includes(i)) {
        state.achievements.push(i);
        localStorage.setItem('bday-achievements', JSON.stringify(state.achievements));
        card.classList.remove('locked');
        card.classList.add('unlocked', 'animating');
        setTimeout(() => card.classList.remove('animating'), 500);
      }
      showAchievementModal(i);
    });
  });

  document.getElementById('unlockAllBtn').addEventListener('click', () => {
    sfx.play('unlock');
    spawnConfetti(50);
    cards.forEach((card, i) => {
      setTimeout(() => {
        if (!state.achievements.includes(i)) state.achievements.push(i);
        card.classList.remove('locked');
        card.classList.add('unlocked', 'animating');
        setTimeout(() => card.classList.remove('animating'), 500);
      }, i * 150);
    });
    localStorage.setItem('bday-achievements', JSON.stringify(state.achievements));
    // Auto-advance after all cards finish animating
    showAutoAdvanceToast('🏆 All achievements unlocked! Moving on…', cards.length * 150 + 900);
    setTimeout(() => { if (state.currentSection === 1) goToSection(2); }, cards.length * 150 + 900);
  });

  document.getElementById('modalClose').addEventListener('click', closeAchievementModal);
  document.getElementById('modalBackdrop').addEventListener('click', closeAchievementModal);
}

function showAchievementModal(i) {
  const a = ACHIEVEMENTS[i];
  document.getElementById('modalIcon').textContent = a.icon;
  document.getElementById('modalBadge').textContent = a.rarity;
  document.getElementById('modalTitle').textContent = a.name;
  document.getElementById('modalMsg').textContent = a.msg;
  document.getElementById('achievementModal').classList.add('open');
}
function closeAchievementModal() {
  document.getElementById('achievementModal').classList.remove('open');
}

// ── Section 4: Wish Generator ──────────────────────────────────────────────────
function initWishMachine() {
  renderWishHistory();
  document.getElementById('generateWish').addEventListener('click', generateWish);
}

function generateWish() {
  sfx.play('wish');
  const btn = document.getElementById('generateWish');
  btn.disabled = true;

  const slotEmojis = ['🌟','🎁','💫','✨','🎉','🌈','🏆','💕','🎂'];
  const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
  slots.forEach(s => { s.classList.add('spinning'); s.classList.remove('winner'); });

  let spins = 0;
  const spinInterval = setInterval(() => {
    slots.forEach(s => { s.querySelector('span').textContent = slotEmojis[Math.floor(Math.random()*slotEmojis.length)]; });
    spins++;
    if (spins > 18) {
      clearInterval(spinInterval);
      slots.forEach(s => s.classList.remove('spinning'));
      const wish = WISHES[Math.floor(Math.random() * WISHES.length)];
      const finalEmoji = slotEmojis[Math.floor(Math.random()*slotEmojis.length)];
      slots.forEach(s => { s.querySelector('span').textContent = finalEmoji; s.classList.add('winner'); });

      const display = document.getElementById('machineDisplay');
      display.innerHTML = `<div class="wish-result-emoji">${wish.emoji}</div><div class="wish-result-text">${wish.text}</div>`;

      // Save to history
      if (!state.wishHistory.find(w => w.text === wish.text)) {
        state.wishHistory.unshift(wish);
        if (state.wishHistory.length > 6) state.wishHistory.pop();
        localStorage.setItem('bday-wishes', JSON.stringify(state.wishHistory));
        renderWishHistory();
      }
      setTimeout(() => { btn.disabled = false; }, 1500);
      // Auto-advance to next section after collecting 3 wishes
      if (state.wishHistory.length >= 3 && state.currentSection === 2) {
        showAutoAdvanceToast('✨ 3 wishes collected! Heading to your memories…', 2000);
        setTimeout(() => goToSection(3), 2000);
      }
    }
  }, 80);
}

function renderWishHistory() {
  const container = document.getElementById('historyItems');
  container.innerHTML = state.wishHistory.map(w =>
    `<div class="history-item">${w.emoji} <span>${w.text}</span></div>`
  ).join('');
}
// Track how many scratch cards have been fully revealed
let scratchRevealedCount = 0;

function initMemories() {
  const gallery = document.getElementById('polaroidGallery');
  if (!gallery) return;
  gallery.innerHTML = '';
  scratchRevealedCount = 0;

  MEMORY_PHOTOS.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'polaroid-card scratch-wrapper';
    wrapper.style.cssText = `position:relative;display:inline-block;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.35);`;

    // Reveal layer (behind)
    const reveal = document.createElement('div');
    reveal.style.cssText = `
      width:170px;height:170px;
      background:${item.bg};
      display:flex;flex-direction:column;
      align-items:center;justify-content:center;
      color:#fff;text-align:center;padding:16px;
      border-radius:12px;
    `;
    reveal.innerHTML = `<div style="font-size:52px;margin-bottom:8px">${item.emoji}</div>
      <div style="font-size:13px;line-height:1.5;font-weight:600">${item.reveal}</div>`;

    // Canvas scratch layer (on top)
    const canvas = document.createElement('canvas');
    canvas.width = 170;
    canvas.height = 170;
    canvas.style.cssText = `position:absolute;inset:0;border-radius:12px;touch-action:none;cursor:crosshair;`;
    canvas.setAttribute('data-index', index);

    wrapper.appendChild(reveal);
    wrapper.appendChild(canvas);

    // Label under card
    const label = document.createElement('div');
    label.className = 'polaroid-caption';
    label.style.cssText = `text-align:center;font-size:11px;color:var(--text2);margin-top:6px;font-family:"JetBrains Mono",monospace;`;
    label.textContent = 'Scratch to reveal ✨';

    const outer = document.createElement('div');
    outer.style.cssText = `display:inline-flex;flex-direction:column;align-items:center;`;
    outer.appendChild(wrapper);
    outer.appendChild(label);
    gallery.appendChild(outer);

    // Fill canvas with grey scratch coating
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#b0b0b8';
    ctx.fillRect(0, 0, 170, 170);
    // Add hint text on top of grey
    ctx.fillStyle = '#7777aa';
    ctx.font = 'bold 18px Space Grotesk, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch Me!', 85, 75);
    ctx.font = '28px serif';
    ctx.fillText(item.emoji, 85, 115);

    let scratching = false;
    let revealed = false;

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      // Check how much is revealed
      if (!revealed) {
        const pixels = ctx.getImageData(0, 0, 170, 170).data;
        let transparent = 0;
        for (let i = 3; i < pixels.length; i += 4) {
          if (pixels[i] < 128) transparent++;
        }
        const ratio = transparent / (170 * 170);
        if (ratio > 0.55) {
          revealed = true;
          // Fade out the canvas entirely
          canvas.style.transition = 'opacity 0.5s';
          canvas.style.opacity = '0';
          label.textContent = '🎉 Revealed!';
          sfx.play('unlock');
          spawnConfetti(18);
          scratchRevealedCount++;
          // Auto-advance after all cards are scratched
          if (scratchRevealedCount >= MEMORY_PHOTOS.length) {
            setTimeout(() => {
              goToSection(state.currentSection + 1);
            }, 1200);
          }
        }
      }
    }

    // Mouse events
    canvas.addEventListener('mousedown', e => {
      scratching = true;
      const r = canvas.getBoundingClientRect();
      scratch(e.clientX - r.left, e.clientY - r.top);
    });
    canvas.addEventListener('mousemove', e => {
      if (!scratching) return;
      const r = canvas.getBoundingClientRect();
      scratch(e.clientX - r.left, e.clientY - r.top);
    });
    canvas.addEventListener('mouseup', () => { scratching = false; });
    canvas.addEventListener('mouseleave', () => { scratching = false; });

    // Touch events
    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      scratching = true;
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      scratch(t.clientX - r.left, t.clientY - r.top);
    }, { passive: false });
    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      if (!scratching) return;
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      scratch(t.clientX - r.left, t.clientY - r.top);
    }, { passive: false });
    canvas.addEventListener('touchend', () => { scratching = false; });
  });

  // Lightbox not used for scratch section, but keep close handlers
  document.getElementById('lightboxClose').onclick = () => {
    document.getElementById('lightbox').classList.remove('open');
  };
  document.getElementById('lightboxBackdrop').onclick = () => {
    document.getElementById('lightbox').classList.remove('open');
  };
}

// ── Section 6: Birthday Game ────────────────────────────────────────────────────
const ITEMS = ['🎂','🎈','⭐','🎁','🎉','🍰','🌟'];
const ITEM_POINTS = { '🎂':10, '🎈':5, '⭐':8, '🎁':15, '🎉':7, '🍰':10, '🌟':12 };
let gameState = { running: false, score: 0, timer: 30, interval: null, spawnInterval: null, items: [] };

function initGame() {
  gameState.best = state.gameHighScore;
  document.getElementById('gameBest').textContent = state.gameHighScore;
  document.getElementById('startGameBtn').addEventListener('click', startGame);
  document.getElementById('restartGameBtn').addEventListener('click', startGame);
  document.getElementById('closeSurpriseBtn').addEventListener('click', () => {
    document.getElementById('gameSurprise').style.display = 'none';
  });
}

function startGame() {
  const arena = document.getElementById('gameArena');
  document.getElementById('gameStartOverlay').style.display = 'none';
  document.getElementById('gameOverOverlay').style.display = 'none';
  // Clear old items
  arena.querySelectorAll('.falling-item').forEach(el => el.remove());
  gameState.running = true;
  gameState.score = 0;
  gameState.timer = 30;
  gameState.surpriseShown = false;
  document.getElementById('gameScore').textContent = 0;
  document.getElementById('gameTimer').textContent = 30;

  gameState.interval = setInterval(() => {
    gameState.timer--;
    document.getElementById('gameTimer').textContent = gameState.timer;
    if (gameState.timer <= 0) endGame();
  }, 1000);

  gameState.spawnInterval = setInterval(() => {
    if (gameState.running) spawnItem();
  }, 600);
}

function spawnItem() {
  const arena = document.getElementById('gameArena');
  const arenaW = arena.offsetWidth;
  const emoji = ITEMS[Math.floor(Math.random() * ITEMS.length)];
  const el = document.createElement('div');
  el.className = 'falling-item';
  el.textContent = emoji;
  el.style.left = (20 + Math.random() * (arenaW - 60)) + 'px';
  const duration = 2 + Math.random() * 2;
  el.style.animationDuration = duration + 's';

  el.addEventListener('click', () => {
    if (!gameState.running || el.classList.contains('caught')) return;
    sfx.play('catch');
    el.classList.add('caught');
    const pts = ITEM_POINTS[emoji] || 5;
    gameState.score += pts;
    document.getElementById('gameScore').textContent = gameState.score;
    // Score popup
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = '+' + pts;
    popup.style.left = el.style.left;
    popup.style.top = el.style.top;
    arena.appendChild(popup);
    setTimeout(() => popup.remove(), 800);
    setTimeout(() => el.remove(), 300);
    // Unlock surprise
    if (gameState.score >= 50 && !gameState.surpriseShown) {
      gameState.surpriseShown = true;
      document.getElementById('gameSurprise').style.display = 'flex';
    }
  });

  arena.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, duration * 1000);
}

function endGame() {
  gameState.running = false;
  clearInterval(gameState.interval);
  clearInterval(gameState.spawnInterval);
  const score = gameState.score;
  if (score > state.gameHighScore) {
    state.gameHighScore = score;
    localStorage.setItem('bday-highscore', score);
    document.getElementById('gameBest').textContent = score;
  }
  document.getElementById('finalScore').textContent = score;
  let msg = score >= 50 ? '🏆 Amazing! You unlocked the surprise!' :
            score >= 30 ? '🌟 Great job! So close to the surprise!' :
            score >= 15 ? '🎉 Nice try! Play again to beat your score!' :
            '🎂 Keep practicing — you\'ve got this!';
  document.getElementById('gameOverMsg').textContent = msg;
  document.getElementById('gameOverTitle').textContent = score >= 50 ? 'Incredible! 🎊' : 'Time\'s Up!';
  document.getElementById('gameOverOverlay').style.display = 'flex';
  // Auto-advance to envelopes section after a delay
  setTimeout(() => {
    if (state.currentSection === 4) {
      showAutoAdvanceToast('🎮 Game over! Heading to your wishes…', 4000);
      goToSection(5);
    }
  }, 4000);
}

// ── Section 7: 18 Envelopes ────────────────────────────────────────────────────
let envelopePopup = null;

function initEnvelopes() {
  const grid = document.getElementById('envelopesGrid');
  ENVELOPES.forEach((env, i) => {
    const el = document.createElement('div');
    el.className = 'envelope' + (state.openedEnvelopes.includes(i) ? ' opened' : '');
    el.innerHTML = `
      <div class="envelope-shine"></div>
      <div class="envelope-icon">${state.openedEnvelopes.includes(i) ? '💌' : '✉️'}</div>
      <div class="envelope-num">#${i+1}</div>`;
    el.addEventListener('click', (e) => openEnvelope(i, el, e, env));
    grid.appendChild(el);
  });
  updateEnvelopeProgress();
}

function openEnvelope(i, el, event, env) {
  sfx.play('click');
  if (!state.openedEnvelopes.includes(i)) {
    state.openedEnvelopes.push(i);
    localStorage.setItem('bday-envelopes', JSON.stringify(state.openedEnvelopes));
    el.classList.add('opened');
    el.querySelector('.envelope-icon').textContent = '💌';
    spawnConfetti(15);
    updateEnvelopeProgress();
  }
  showEnvelopePopup(i, el, event, env);
}

function showEnvelopePopup(i, el, event, env) {
  if (envelopePopup) envelopePopup.remove();
  const popup = document.createElement('div');
  popup.className = 'envelope-popup';
  popup.innerHTML = `
    <div class="envelope-popup-icon">${env.emoji}</div>
    <div class="envelope-popup-num">Wish #${i+1}</div>
    <div class="envelope-popup-text">${env.wish}</div>`;
  document.body.appendChild(popup);
  envelopePopup = popup;

  const rect = el.getBoundingClientRect();
  let top = rect.bottom + 10;
  let left = rect.left + rect.width / 2 - 140;
  if (left < 8) left = 8;
  if (left + 280 > window.innerWidth - 8) left = window.innerWidth - 288;
  if (top + popup.offsetHeight > window.innerHeight - 10) top = rect.top - popup.offsetHeight - 10;
  popup.style.top = top + 'px';
  popup.style.left = left + 'px';

  const close = (e) => {
    if (!popup.contains(e.target) && e.target !== el) {
      popup.remove();
      envelopePopup = null;
      document.removeEventListener('click', close);
    }
  };
  setTimeout(() => document.addEventListener('click', close), 100);
  setTimeout(() => { if (envelopePopup === popup) { popup.remove(); envelopePopup = null; } }, 5000);
}

function updateEnvelopeProgress() {
  const opened = state.openedEnvelopes.length;
  document.getElementById('openedCount').textContent = opened;
  document.getElementById('envelopeProgress').style.width = (opened / 18 * 100) + '%';
  // Auto-advance to finale when all 18 are opened
  if (opened >= 18 && state.currentSection === 5) {
    showAutoAdvanceToast('💌 All 18 wishes opened! The finale awaits…', 1500);
    setTimeout(() => goToSection(6), 1500);
  }
}

// ── Section 8: Finale ──────────────────────────────────────────────────────────
function initFinale() {
  spawnLanterns();
  startFireworks();
  animateFinaleMessage();
}

function spawnLanterns() {
  const container = document.getElementById('lanterns');
  container.innerHTML = '';
  for (let i = 0; i < 16; i++) {
    const lantern = document.createElement('div');
    lantern.className = 'lantern';
    lantern.style.left = (Math.random() * 100) + 'vw';
    lantern.style.animationDuration = (8 + Math.random() * 10) + 's';
    lantern.style.animationDelay = (Math.random() * 6) + 's';
    lantern.style.setProperty('--sway', (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 60) + 'px');
    const scale = 0.6 + Math.random() * 0.8;
    lantern.style.transform = `scale(${scale})`;
    lantern.innerHTML = `<div class="lantern-body"><div class="lantern-glow"></div></div>`;
    container.appendChild(lantern);
  }
  // Keep spawning
  setTimeout(spawnLanterns, 14000);
}

// Fireworks
function startFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const FW_COLORS = ['#c084fc','#f472b6','#34d399','#fbbf24','#60a5fa','#f97316','#ffffff'];

  function launchFirework() {
    const x = 100 + Math.random() * (canvas.width - 200);
    const y = 80 + Math.random() * (canvas.height * 0.5);
    const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
    const count = 60 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: 2 + Math.random() * 3,
        life: 0.012 + Math.random() * 0.008,
      });
    }
  }

  let fwInterval;
  fwInterval = setInterval(launchFirework, 1200);
  setTimeout(() => launchFirework(), 100);

  function fwLoop() {
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.04;
      p.vx *= 0.98;
      p.alpha -= p.life;
      if (p.alpha <= 0) { particles.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(fwLoop);
  }
  fwLoop();

  window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

function animateFinaleMessage() {
  const elements = document.querySelectorAll('#section-finale .finale-badge, #section-finale .finale-title, #section-finale .finale-text, #section-finale .finale-sub, #section-finale .finale-bigwish, #section-finale .finale-signature, #section-finale .finale-btns');
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    setTimeout(() => {
      el.style.transition = 'all 0.7s cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 180);
  });
}

// ── Auto-advance Toast ─────────────────────────────────────────────────────────
function showAutoAdvanceToast(msg, delay) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:40px;left:50%;transform:translateX(-50%) translateY(20px);
    background:rgba(124,58,237,0.92);color:#fff;padding:12px 24px;border-radius:50px;
    font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;
    z-index:9999;backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.2);
    opacity:0;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);pointer-events:none;
    white-space:nowrap;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, delay - 400);
}

// ── Replay & Share ─────────────────────────────────────────────────────────────
function initControls() {
  document.getElementById('replayBtn')?.addEventListener('click', () => {
    sfx.play('click');
    goToSection(0);
  });
  document.getElementById('shareBtn')?.addEventListener('click', () => {
    sfx.play('click');
    if (navigator.share) {
      navigator.share({ title: 'Level 18 Unlocked! 🎉', text: 'Check out this amazing birthday experience! 🎂✨', url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Link copied! Share it with everyone 💌');
    }
  });
}

// ── Touch support for game ─────────────────────────────────────────────────────
function initTouchGame() {
  document.getElementById('gameArena').addEventListener('touchstart', e => {
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target?.classList.contains('falling-item')) target.click();
  }, { passive: true });
}

// ── AOS Init ───────────────────────────────────────────────────────────────────
function initAOS() {
  AOS.init({ duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', once: true, offset: 20 });
}

// ── Bootstrap ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSound();
  initNav();
  initCursor();
  initAOS();
  initUnlock();
  initAchievements();
  initWishMachine();
  initMemories();
  initGame();
  initEnvelopes();
  initControls();
  initTouchGame();

  // Section nav via swipe — attach to each section so overflow-y:auto doesn't eat events
  let touchStartY = 0;
  let touchStartX = 0;
  let navCooldown = false;

  function tryNavSwipe(dy, dx) {
    if (navCooldown) return;
    // Only act when the vertical swipe is dominant and large enough
    if (Math.abs(dy) < 50 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
    navCooldown = true;
    setTimeout(() => { navCooldown = false; }, 600);
    if (dy > 0 && state.currentSection < state.totalSections - 1) goToSection(state.currentSection + 1);
    else if (dy < 0 && state.currentSection > 0) goToSection(state.currentSection - 1);
  }

  document.querySelectorAll('.section').forEach(sec => {
    sec.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    sec.addEventListener('touchend', e => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      const dx = touchStartX - e.changedTouches[0].clientX;
      tryNavSwipe(dy, dx);
    }, { passive: true });
  });



  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goToSection(Math.min(state.currentSection + 1, state.totalSections - 1));
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goToSection(Math.max(state.currentSection - 1, 0));
    if (e.key === 'Escape') { closeAchievementModal(); closeLightbox(); }
  });
});
