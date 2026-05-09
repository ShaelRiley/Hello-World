type Phase = 'title' | 'battle' | 'shop' | 'over';

type Tank = {
  x: number; y: number; vy: number; angle: number; power: number;
  hp: number; cash: number; alive: boolean; isAI: boolean; name: string; color: string; wins: number;
};

type Projectile = { x: number; y: number; vx: number; vy: number; owner: number; damage: number };

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const hud = document.getElementById('hud');
if (!ctx || !hud) throw new Error('UI init failed');

let w = 0;
let h = 0;
const terrain: number[] = [];
const tanks: Tank[] = [];

let phase: Phase = 'title';
let round = 1;
let wind = 0;
let turn = 0;
let projectile: Projectile | null = null;
let message = 'Press Enter to start';
let shopGranted = false;

const gravity = 240;

function resize(): void {
  w = window.innerWidth;
  h = window.innerHeight - 48;
  canvas.width = w;
  canvas.height = h;
  if (phase !== 'title') {
    generateTerrain();
    placeTanks();
  }
}
window.addEventListener('resize', resize);

function generateTerrain(): void {
  terrain.length = w;
  let y = h * 0.62;
  for (let x = 0; x < w; x += 1) {
    y += (Math.random() - 0.5) * 3;
    y = Math.max(h * 0.35, Math.min(h * 0.9, y));
    terrain[x] = y;
  }
}

function groundY(x: number): number {
  return terrain[Math.max(0, Math.min(w - 1, x | 0))] ?? h * 0.7;
}

function placeTanks(resetWins = false): void {
  const seeds = [0.2, 0.5, 0.8];
  const names = ['Regular', 'Heir AI', 'Bureau AI'];
  const colors = ['#ffd166', '#90caf9', '#f48fb1'];
  if (!tanks.length) {
    for (let i = 0; i < 3; i += 1) {
      tanks.push({ x: 0, y: 0, vy: 0, angle: -0.9, power: 220, hp: 100, cash: 120, alive: true, isAI: i > 0, name: names[i], color: colors[i], wins: 0 });
    }
  }
  tanks.forEach((t, i) => {
    t.x = w * seeds[i];
    t.y = groundY(t.x) - 8;
    t.vy = 0;
    t.hp = 100;
    t.alive = true;
    t.power = 220;
    t.angle = i === 0 ? -0.9 : -2.2;
    if (resetWins) t.wins = 0;
  });
  turn = 0;
  wind = (Math.random() - 0.5) * 90;
}

function deformTerrain(cx: number, cy: number, r: number): void {
  const start = Math.max(0, Math.floor(cx - r));
  const end = Math.min(w - 1, Math.ceil(cx + r));
  for (let x = start; x <= end; x += 1) {
    const dx = x - cx;
    const dy = Math.sqrt(Math.max(0, r * r - dx * dx));
    terrain[x] = Math.max(terrain[x], cy + dy);
  }
}

function fireShot(owner: number): void {
  if (projectile) return;
  const t = tanks[owner];
  if (!t.alive) return;
  const speed = t.power;
  projectile = {
    x: t.x + Math.cos(t.angle) * 12,
    y: t.y + Math.sin(t.angle) * 12,
    vx: Math.cos(t.angle) * speed,
    vy: Math.sin(t.angle) * speed,
    owner,
    damage: 35
  };
  message = `${t.name} fired Baby IOU`;
}

function applyExplosion(x: number, y: number, owner: number): void {
  deformTerrain(x, y, 34);
  tanks.forEach((t, i) => {
    if (!t.alive) return;
    const d = Math.hypot(t.x - x, t.y - y);
    if (d < 72) {
      t.hp -= Math.max(0, 35 * (1 - d / 72));
      if (t.hp <= 0) {
        t.alive = false;
        if (i !== owner) tanks[owner].cash += 50;
      }
    }
  });
}

function startBattle(): void {
  round = 1;
  generateTerrain();
  placeTanks(true);
  phase = 'battle';
  message = 'Civic Audit begins';
}

function nextTurn(): void {
  projectile = null;
  const alive = tanks.filter((t) => t.alive);
  if (alive.length <= 1) {
    const winner = alive[0];
    if (winner) winner.wins += 1;
    if (winner && winner.wins >= 3) {
      phase = 'over';
      message = `${winner.name} secured the future, temporarily.`;
      return;
    }
    phase = 'shop';
    shopGranted = false;
    message = 'Redistribution Screen: Enter for next Civic Audit';
    return;
  }
  do { turn = (turn + 1) % tanks.length; } while (!tanks[turn].alive);
  message = `${tanks[turn].name} turn`;
  if (tanks[turn].isAI) window.setTimeout(aiAct, 450);
}

function aiAct(): void {
  if (phase !== 'battle' || !tanks[turn]?.isAI || projectile) return;
  const me = tanks[turn];
  const target = tanks.find((t, i) => i !== turn && t.alive);
  if (!target) return;
  const dx = target.x - me.x;
  me.angle = Math.atan2(-130, dx);
  me.power = Math.min(320, Math.max(140, Math.abs(dx) * 1.1));
  fireShot(turn);
}

window.addEventListener('keydown', (e) => {
  if (phase === 'title' && e.key === 'Enter') return startBattle();
  if (phase === 'over' && e.key === 'Enter') {
    phase = 'title';
    message = 'Press Enter to start';
    return;
  }
  if (phase === 'shop' && e.key === 'Enter') {
    if (!shopGranted) {
      tanks.forEach((t) => { if (t.alive) { t.cash += 40; t.hp = Math.min(100, t.hp + 20); } });
      shopGranted = true;
    }
    round += 1;
    wind = (Math.random() - 0.5) * 90;
    generateTerrain();
    placeTanks(false);
    phase = 'battle';
    message = `Civic Audit ${round} begins`;
    return;
  }
  if (phase !== 'battle') return;
  const t = tanks[turn];
  if (!t || t.isAI || !t.alive) return;
  if (e.key === 'ArrowLeft' || e.key === 'a') t.angle -= 0.06;
  if (e.key === 'ArrowRight' || e.key === 'd') t.angle += 0.06;
  if (e.key === 'ArrowUp' || e.key === 'w') t.power = Math.min(360, t.power + 8);
  if (e.key === 'ArrowDown' || e.key === 's') t.power = Math.max(100, t.power - 8);
  if (e.key === ' ') fireShot(turn);
});

function update(dt: number): void {
  if (phase !== 'battle') return;

  tanks.forEach((t) => {
    if (!t.alive) return;
    t.vy += gravity * dt;
    t.y += t.vy * dt;
    const gy = groundY(t.x) - 8;
    if (t.y > gy) {
      const impact = Math.max(0, t.vy - 90);
      t.hp -= impact * 0.03;
      if (t.hp <= 0) t.alive = false;
      t.y = gy;
      t.vy = 0;
    }
  });

  if (projectile) {
    projectile.vy += gravity * dt;
    projectile.vx += wind * dt * 0.2;
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;

    const collide = projectile.x < 0 || projectile.x >= w || projectile.y >= h || projectile.y >= groundY(projectile.x);
    if (collide) {
      applyExplosion(projectile.x, projectile.y, projectile.owner);
      nextTurn();
    }
  } else if (tanks[turn]?.isAI) {
    aiAct();
  }
}

function draw(): void {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#2b3143';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#4f5f30';
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x < w; x += 1) ctx.lineTo(x, terrain[x] ?? h);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  tanks.forEach((t, i) => {
    if (!t.alive) return;
    ctx.fillStyle = t.color;
    ctx.fillRect(t.x - 10, t.y - 8, 20, 10);
    ctx.strokeStyle = '#111';
    ctx.beginPath();
    ctx.moveTo(t.x, t.y - 3);
    ctx.lineTo(t.x + Math.cos(t.angle) * 16, t.y - 3 + Math.sin(t.angle) * 16);
    ctx.stroke();
    if (i === turn && phase === 'battle') {
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(t.x - 12, t.y - 10, 24, 14);
    }
  });

  if (projectile) {
    ctx.fillStyle = '#ffd36a';
    ctx.beginPath();
    ctx.arc(projectile.x, projectile.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#f5e6b5';
  ctx.fillText("ScoreCard 34518: Uncle's Cheeseborger War", 10, 18);
  ctx.fillText(message, 10, 36);

  hud.innerHTML = `<strong>Civic Audit ${round}</strong><span>Market Volatility: ${wind.toFixed(1)}</span><span>Phase: ${phase}</span>`
    + tanks.map((t, i) => `<span style="color:${t.color}">${i === turn ? '▶ ' : ''}${t.name} Dignity:${Math.max(0, Math.floor(t.hp))} Uncle Money:${t.cash} Wins:${t.wins}</span>`).join('');

  if (phase === 'title') ctx.fillText('Enter: Start | Arrows/WASD: Aim+Power | Space: Fire', 10, 56);
  if (phase === 'shop') ctx.fillText('Redistribution Screen: Press Enter to grant +40 money and +20 dignity, then next round', 10, 56);
  if (phase === 'over') ctx.fillText('Future Secured, Temporarily. Press Enter to restart match.', 10, 56);
}

function loop(now: number): void {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

let last = performance.now();
resize();
generateTerrain();
requestAnimationFrame(loop);
