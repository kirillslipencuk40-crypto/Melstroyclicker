/* =====================================================================
   MELLSTROY — TAP TO EARN
   Все игровые настройки собраны в CONFIG ниже.
   Меняйте цифры/тексты/картинки тут — остальной код трогать не нужно.
   ===================================================================== */

const CONFIG = {

  gameName: "MellStroyClicker",
  currencyName: "MELLcoin",
  storageKey: "mellstroy_save_v1",

  // ---- базовая механика тапа ----
  baseClickPower: 1,          // сколько $MELL за тап на уровне 1 "Силы клика"

  // ---- аватар в центре (замените файл webapp/assets/mellstroy-avatar.png) ----
  avatarSrc: "assets/mellstroy-avatar.png",

  // ---- звуки (замените файлы в webapp/assets/) ----
  sounds: { tap: true, coin: true },

  // ---- музыка на время мем-буста ----
  // играет с самого начала буста, зацикливается на всю его длительность
  // (даже если буст длиннее трека) и выключается ровно когда буст кончается
  boostMusic: {
    enabled: true,
    src: "assets/boost-music.mp3"
  },

  // ---- мем-картинки, всплывающие рядом с кнопкой при тапе ----
  // положите PNG без фона в webapp/assets/ и впишите пути сюда
  memePopups: {
    enabled: true,
    images: [
      "assets/meme1.png",
      "assets/meme2.png",
      "assets/meme3.png"
    ],
    every: 3,            // всплывает ровно на каждый 3-й тап
    sizePx: 84,          // размер картинки во всплытии
    lifetimeMs: 1300     // сколько висит на экране
  },

  // ---- улучшения ----
  upgrades: {
    clickPower: {
      name: "Сила клика",
      desc: "Увеличивает MELLcoin за один тап",
      icon: "👊",
      baseCost: 50,
      costGrowth: 1.55,      // цена растёт в X раз за уровень
      valuePerLevel: 1,      // +1 к клику за уровень
      maxLevel: 50
    },
    autoClicker: {
      name: "Автокликер",
      desc: "Приносит MELLcoin каждую секунду сам",
      icon: "🤖",
      baseCost: 100,
      costGrowth: 1.6,
      valuePerLevel: 1,      // +1 $MELL/сек за уровень
      maxLevel: 50
    },
    memeBoostPower: {
      name: "Мем-буст+",
      desc: "Усиливает и продлевает эффект Мелл-буста",
      icon: "⚡",
      baseCost: 300,
      costGrowth: 1.8,
      valuePerLevel: 1,      // +1 к множителю буста, +5с к длительности
      maxLevel: 10
    }
  },

  // ---- мем-буст (кнопка на главном экране) ----
  memeBoost: {
    baseDurationSec: 20,
    baseMultiplier: 2,       // x2 доход пока активен
    cooldownSec: 60
  },

  // ---- ежедневный бонус (7-дневный цикл) ----
  dailyBonus: [100, 250, 500, 1000, 2500, 5000, 10000],

  // ---- достижения ----
  achievements: [
    { id: "first_click", name: "Первый клик", desc: "Сделай 1 клик", icon: "🖱️", reward: 50,
      check: s => s.totalClicks >= 1 },
    { id: "novice", name: "Новичок", desc: "Заработай 1 000 $MELL", icon: "🌱", reward: 100,
      check: s => s.totalEarned >= 1000 },
    { id: "meme_mogul", name: "Мемный магнат", desc: "Заработай 100 000 $MELL", icon: "💰", reward: 5000,
      check: s => s.totalEarned >= 100000 },
    { id: "clicker", name: "Кликер", desc: "Сделай 10 000 кликов", icon: "🔥", reward: 2000,
      check: s => s.totalClicks >= 10000 },
    { id: "builder", name: "Меллстроитель", desc: "Купи 10 улучшений", icon: "🏗️", reward: 1500,
      check: s => totalUpgradesBought(s) >= 10 },
  ],

  // ---- мемные фразы для бегущей строки сверху ----
  tickerPhrases: [
    "Будь лучшим!",
    "Тапай больше,зарабатывай больше",
    "делись тапалкой с друзьями",
    "ЮРА ГЕЙ",
    "Делись с друзьями через реферальную ссылку",
    "ты победитель",
    "ещё один тап — и ты лучший "
  ],

  // ---- фразы, всплывающие под кнопкой при тапе ----
  tapHints: [
    "БЫСТРЕЕ!!!",
    "тапай!",
    "не останавливайся",
    "деньги сами себя не заработают",
    "выходи в топ лучших",
    "тапай по кнопке,а не по столу"
  ],

  // ---- редкие мемные всплывающие сообщения при тапе (шанс 1 на N тапов) ----
  rareEvents: {
    chance: 60, // 1 из 60 тапов
    messages: [
      { icon: "🎲", title: "Редкий дроп!", text: "MellStroy кинул тебе бонус: +500 $MELL", bonus: 500 },
      { icon: "📦", title: "Мелстрой кейс", text: "Внутри оказалось +250 $MELL", bonus: 250 },
      { icon: "🚀", title: "Ты на высотах", text: "Донат-эффект принёс +1500 $MELL", bonus: 1500 },
      { icon: "🐸", title: "Пепе услышал тебя", text: "+300 $MELL просто так", bonus: 300 }
    ]
  },

  // ---- живой лидерборд (только реальные игроки, без ботов) ----
  // Заполните ключи Firebase-проекта — как получить, см. README, раздел
  // "Живой лидерборд". Без них вкладка "Лидеры" покажет инструкцию вместо таблицы.
  firebase: {
    apiKey: "AIzaSyDQlJdGVIkEz5UHUwad88fd0LwDsHdZWGs",
    authDomain: "project-780e1.firebaseapp.com",
    projectId: "project-780e1",
    storageBucket: "project-780e1.firebasestorage.app",
    messagingSenderId: "1096496388341",
    appId: "1:1096496388341:web:6241b4a91d1757fe76cdbc"
  },
  leaderboard: {
    collection: "mellstroy_players", // коллекция в Firestore
    topN: 50,                        // сколько игроков показывать
    syncIntervalMs: 20000            // как часто отправлять свой баланс на сервер
  },

  // ---- колесо фортуны ----
  // spinCost — цена одного прокрута в $MELL.
  // segments — призы на колесе. "weight" задаёт шанс выпадения (больше вес —
  // чаще выпадает), сумма весов может быть любой, они нормализуются сами.
  // Порядок segments = порядок секторов на колесе по часовой стрелке от верха.
  wheelOfFortune: {
    spinCost: 100000,
    segments: [
      { label: "1К",   value: 1000,    weight: 22 },
      { label: "2К",   value: 2000,    weight: 19 },
      { label: "5К",   value: 5000,    weight: 16 },
      { label: "10К",  value: 10000,   weight: 13 },
      { label: "20К",  value: 20000,   weight: 10 },
      { label: "30К",  value: 30000,   weight: 8  },
      { label: "50К",  value: 50000,   weight: 6  },
      { label: "100К", value: 100000,  weight: 4  },
      { label: "200К", value: 200000,  weight: 1.5},
      { label: "500К", value: 500000,  weight: 0.5}
    ]
  }
};

/* =====================================================================
   STATE
   ===================================================================== */

function defaultState(){
  return {
    balance: 0,
    totalEarned: 0,
    totalClicks: 0,
    playerName: (window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name) || "Игрок",
    levels: { clickPower: 1, autoClicker: 0, memeBoostPower: 0 },
    achievementsUnlocked: [],
    dailyBonus: { day: 1, lastClaim: null },
    memeBoost: { activeUntil: 0, cooldownUntil: 0 },
    _tapSinceRare: 0,
    _saveVersion: 1
  };
}

let state = loadState();
const playerId = getPlayerId();

function getPlayerId(){
  // отдельный от игрового прогресса устойчивый ID — используется только
  // для лидерборда, чтобы не путать реальных игроков между собой
  const key = "mellstroy_pid_v1";
  const tgId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
  if(tgId) return "tg_" + tgId; // если открыто в Telegram — берём настоящий ID пользователя

  let pid = localStorage.getItem(key);
  if(!pid){
    pid = "web_" + (crypto.randomUUID ? crypto.randomUUID() : Date.now() + "_" + Math.random().toString(36).slice(2));
    localStorage.setItem(key, pid);
  }
  return pid;
}

function loadState(){
  try{
    const raw = localStorage.getItem(CONFIG.storageKey);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    // защита от битого/неполного сохранения: докладываем недостающие поля
    return Object.assign(defaultState(), parsed, {
      levels: Object.assign(defaultState().levels, parsed.levels || {}),
      dailyBonus: Object.assign(defaultState().dailyBonus, parsed.dailyBonus || {}),
      memeBoost: Object.assign(defaultState().memeBoost, parsed.memeBoost || {})
    });
  }catch(e){
    console.warn("Save corrupted, starting fresh", e);
    return defaultState();
  }
}

let saveTimer = null;
function saveState(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(()=>{
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
  }, 150); // небольшой debounce, чтобы не писать в storage на каждый тап
}

/* =====================================================================
   HELPERS
   ===================================================================== */

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function fmt(n){
  n = Math.floor(n);
  if(n < 1000) return String(n);
  if(n < 1_000_000) return (n/1000).toFixed(n%1000===0?0:1) + "K";
  if(n < 1_000_000_000) return (n/1_000_000).toFixed(2) + "M";
  return (n/1_000_000_000).toFixed(2) + "B";
}

function upgradeLevel(key){ return state.levels[key] || 0; }

function upgradeCost(key){
  const cfg = CONFIG.upgrades[key];
  const lvl = upgradeLevel(key);
  return Math.round(cfg.baseCost * Math.pow(cfg.costGrowth, lvl));
}

function totalUpgradesBought(s = state){
  return Object.values(s.levels).reduce((a,b)=>a+b,0) - 1; // -1 т.к. clickPower стартует с уровня 1
}

function clickPower(){
  // уровень 1 = базовая сила, дальше +valuePerLevel за уровень
  const cfg = CONFIG.upgrades.clickPower;
  const lvl = upgradeLevel("clickPower");
  return CONFIG.baseClickPower + (lvl - 1) * cfg.valuePerLevel;
}

function autoIncomePerSec(){
  const cfg = CONFIG.upgrades.autoClicker;
  return upgradeLevel("autoClicker") * cfg.valuePerLevel;
}

function isBoostActive(){ return Date.now() < state.memeBoost.activeUntil; }

function currentMultiplier(){
  if(!isBoostActive()) return 1;
  return CONFIG.memeBoost.baseMultiplier + upgradeLevel("memeBoostPower");
}

function addCurrency(amount){
  const gained = Math.round(amount * (isBoostActive() ? currentMultiplier() : 1));
  state.balance += gained;
  state.totalEarned += gained;
  return gained;
}

/* =====================================================================
   RENDER
   ===================================================================== */

function renderBalance(){
  $("#balanceAmount").textContent = fmt(state.balance);
  $("#perTapValue").textContent = "+" + fmt(clickPower());
  $("#perSecValue").textContent = "+" + fmt(autoIncomePerSec());
  renderWheelButton();
}

function renderTicker(){
  const track = $("#tickerTrack");
  const one = CONFIG.tickerPhrases.map(p => `<span>${escapeHtml(p)}</span><span class="dot">•</span>`).join("");
  // дублируем набор ровно один раз подряд — анимация двигает трек ровно на
  // половину его ширины, поэтому переход между копиями не заметен
  track.innerHTML = one + one;
}

function escapeHtml(str){
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function renderUpgrades(){
  const list = $("#upgradesList");
  list.innerHTML = "";
  Object.entries(CONFIG.upgrades).forEach(([key, cfg])=>{
    const lvl = upgradeLevel(key);
    const maxed = lvl >= cfg.maxLevel;
    const cost = upgradeCost(key);
    const canAfford = state.balance >= cost;

    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div class="card__icon">${cfg.icon}</div>
      <div class="card__body">
        <div class="card__name">${escapeHtml(cfg.name)}</div>
        <div class="card__desc">${escapeHtml(cfg.desc)}</div>
        <div class="card__level">${maxed ? "МАКС. уровень" : `Уровень ${lvl} → ${lvl+1}`}</div>
      </div>
      <button class="card__buy" ${(!canAfford || maxed) ? "disabled" : ""}>
        ${maxed ? "MAX" : fmt(cost) + " " + CONFIG.currencyName}
      </button>
    `;
    if(!maxed){
      el.querySelector(".card__buy").addEventListener("click", ()=> buyUpgrade(key));
    }
    list.appendChild(el);
  });
}

// ===== ЖИВОЙ ЛИДЕРБОРД (Firebase Firestore, только реальные игроки) =====
// Настройка: README, раздел "Живой лидерборд". Пока ключи не вписаны в
// CONFIG.firebase — вкладка покажет инструкцию вместо таблицы, никаких
// ботов/демо-записей нет в принципе.

let leaderboardState = "not_configured"; // not_configured | loading | ready | error
let realLeaders = []; // приходит только из Firestore — реальные записи реальных игроков
let fbDb = null;

function firebaseIsConfigured(){
  return CONFIG.firebase.apiKey && !CONFIG.firebase.apiKey.includes("ВСТАВЬ СЮДА");
}

function initLeaderboard(){
  if(!firebaseIsConfigured()){
    leaderboardState = "not_configured";
    return;
  }
  if(typeof firebase === "undefined"){
    leaderboardState = "error";
    return;
  }
  try{
    firebase.initializeApp(CONFIG.firebase);
    fbDb = firebase.firestore();
    leaderboardState = "loading";

    fbDb.collection(CONFIG.leaderboard.collection)
      .orderBy("balance", "desc")
      .limit(CONFIG.leaderboard.topN)
      .onSnapshot(
        snap => {
          realLeaders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          leaderboardState = "ready";
          if($('[data-screen="leaders"]').classList.contains("active")) renderLeaderboard();
        },
        err => { console.warn("Leaderboard error", err); leaderboardState = "error"; renderLeaderboard(); }
      );
  }catch(e){
    console.warn("Firebase init failed", e);
    leaderboardState = "error";
  }
}

function syncPlayerScore(){
  if(!fbDb) return;
  fbDb.collection(CONFIG.leaderboard.collection).doc(playerId).set({
    name: state.playerName,
    balance: state.balance,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true }).catch(err => console.warn("Sync failed", err));
}

function renderLeaderboard(){
  const list = $("#leaderboardList");

  if(leaderboardState === "not_configured" || leaderboardState === "error"){
    list.innerHTML = `<div class="lb-empty">Пока тут пусто — стань первым в таблице!</div>`;
    return;
  }
  if(leaderboardState === "loading" && realLeaders.length === 0){
    list.innerHTML = `<div class="lb-empty">Загрузка…</div>`;
    return;
  }

  // берём реальных игроков из Firestore, свою запись подменяем на актуальный
  // локальный баланс (чтобы не ждать сети), дублей не создаём.
  // ВАЖНО: innerHTML тут всегда ПЕРЕЗАПИСЫВАЕТСЯ (=), а не дополняется (+=) —
  // иначе при каждом обновлении снапшота из Firestore строки дублировались бы.
  const entries = realLeaders
    .filter(l => l.id !== playerId)
    .map(l => ({ name: (l.name && l.name.trim()) || "Игрок", amount: l.balance || 0, me:false }));
  entries.push({ name: (state.playerName || "Игрок") + " (ты)", amount: state.balance, me:true });
  entries.sort((a,b)=> b.amount - a.amount);

  if(entries.length === 0){
    list.innerHTML = `<div class="lb-empty">Пока тут пусто — стань первым в таблице!</div>`;
    return;
  }

  list.innerHTML = entries.map((e,i)=>`
    <div class="lb-row ${e.me ? "lb-row--me":""}">
      <div class="lb-rank">${i+1}</div>
      <div class="lb-name">${escapeHtml(e.name)}</div>
      <div class="lb-amount">${fmt(e.amount)}</div>
    </div>
  `).join("");
}

function renderProfile(){
  $("#profileName").textContent = state.playerName;
  const level = 1 + Math.floor(state.totalEarned / 5000); // условный уровень игрока
  $("#profileLevel").textContent = `Уровень ${level}`;

  const stats = [
    { label: "Баланс", value: fmt(state.balance) },
    { label: "Всего заработано", value: fmt(state.totalEarned) },
    { label: "Кликов сделано", value: fmt(state.totalClicks) },
    { label: "Улучшений куплено", value: totalUpgradesBought() },
  ];
  $("#profileStats").innerHTML = stats.map(s=>`
    <div class="profile-stat">
      <div class="profile-stat__value">${s.value}</div>
      <div class="profile-stat__label">${s.label}</div>
    </div>
  `).join("");

  renderAchievements();
}

function renderAchievements(){
  const list = $("#achievementsList");
  list.innerHTML = CONFIG.achievements.map(a=>{
    const unlocked = state.achievementsUnlocked.includes(a.id);
    return `
      <div class="ach ${unlocked ? "unlocked":""}">
        <div class="ach__icon">${a.icon}</div>
        <div>
          <div class="ach__name">${escapeHtml(a.name)}</div>
          <div class="ach__desc">${escapeHtml(a.desc)}${unlocked ? " ✓" : ""}</div>
        </div>
      </div>
    `;
  }).join("");
}

function renderDailyDot(){
  const eligible = isDailyBonusAvailable();
  $("#dailyDot").classList.toggle("show", eligible);
}

function renderAll(){
  renderBalance();
  renderUpgrades();
  renderLeaderboard();
  renderProfile();
  renderDailyDot();
}

/* =====================================================================
   TAP HANDLER
   ===================================================================== */

const tapBtn = $("#tapBtn");
const floatLayer = $("#floatLayer");

tapBtn.addEventListener("click", onTap);

function onTap(e){
  state.totalClicks++;
  const gained = addCurrency(clickPower());

  spawnFloatNumber(gained, e);
  maybeSpawnMemePopup();
  pulseButton();
  playSound("tap");
  maybeShowHint();
  checkAchievements();
  renderBalance();
  renderDailyDot();
  saveState();

  // редкое случайное событие
  state._tapSinceRare++;
  if(state._tapSinceRare >= CONFIG.rareEvents.chance){
    state._tapSinceRare = 0;
    if(Math.random() < 0.5) triggerRareEvent();
  }
}

function pulseButton(){
  tapBtn.classList.remove("tap-btn--pulse");
  void tapBtn.offsetWidth; // restart animation
  tapBtn.classList.add("tap-btn--pulse");
}

function spawnFloatNumber(amount, e){
  const el = document.createElement("div");
  el.className = "float-num";
  el.textContent = "+" + fmt(amount);
  el.style.setProperty("--dx", (Math.random()*60-30) + "px");
  el.style.left = (45 + Math.random()*10) + "%";
  floatLayer.appendChild(el);
  setTimeout(()=> el.remove(), 1000);
}

// Мем-картинка выскакивает рядом с кнопкой ровно на каждый 3-й тап (CONFIG.memePopups.every),
// каждый раз в новом месте по кругу, затем плавно исчезает.
function maybeSpawnMemePopup(){
  const cfg = CONFIG.memePopups;
  if(!cfg.enabled || !cfg.images.length) return;
  if(state.totalClicks % cfg.every !== 0) return;

  const src = randomFrom(cfg.images);
  const img = document.createElement("img");
  img.src = src;
  img.className = "float-meme";
  img.style.width = cfg.sizePx + "px";
  img.style.height = cfg.sizePx + "px";

  // случайная позиция по кругу вокруг кнопки, не перекрывая её центр
  const angle = Math.random() * Math.PI * 2;
  const radius = 46 + Math.random() * 14; // % от контейнера
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius * 0.8;
  img.style.left = clamp(x, 6, 94) + "%";
  img.style.top = clamp(y, 4, 96) + "%";
  img.style.setProperty("--rot", (Math.random()*24 - 12) + "deg");

  // если файла ещё нет на диске — просто не показываем (не ломаем игру)
  img.onerror = () => img.remove();

  floatLayer.appendChild(img);
  setTimeout(()=> img.remove(), cfg.lifetimeMs);
}

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function maybeShowHint(){
  if(Math.random() < 0.08){
    $("#memeBubble").textContent = randomFrom(CONFIG.tapHints);
  }
}

function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function triggerRareEvent(){
  const ev = randomFrom(CONFIG.rareEvents.messages);
  state.balance += ev.bonus;
  state.totalEarned += ev.bonus;
  saveState();
  renderBalance();
  showModal({ emoji: ev.icon, title: ev.title, text: ev.text, btnText: "Забрать" });
}

/* =====================================================================
   SOUND
   ===================================================================== */

function playSound(name){
  if(!CONFIG.sounds[name]) return;
  const el = name === "tap" ? $("#sfxTap") : $("#sfxCoin");
  if(!el) return;
  try{
    el.currentTime = 0;
    el.play().catch(()=>{}); // игнорируем, если браузер блокирует автозвук
  }catch(_){}
}

/* =====================================================================
   UPGRADES — покупка
   ===================================================================== */

function buyUpgrade(key){
  const cfg = CONFIG.upgrades[key];
  const lvl = upgradeLevel(key);
  if(lvl >= cfg.maxLevel) return;

  const cost = upgradeCost(key);
  if(state.balance < cost) return;

  state.balance -= cost;
  state.levels[key] = lvl + 1;

  playSound("coin");
  checkAchievements();
  renderUpgrades();
  renderBalance();
  saveState();
}

/* =====================================================================
   AUTO INCOME (тик раз в секунду)
   ===================================================================== */

setInterval(()=>{
  const income = autoIncomePerSec();
  if(income > 0){
    addCurrency(income);
    renderBalance();
    saveState();
  }
}, 1000);

// периодически отправляем свой баланс в общий лидерборд
setInterval(syncPlayerScore, CONFIG.leaderboard.syncIntervalMs);

/* =====================================================================
   MEME BOOST
   ===================================================================== */

const memeBoostBtn = $("#memeBoostBtn");
memeBoostBtn.addEventListener("click", activateMemeBoost);

function activateMemeBoost(){
  const now = Date.now();
  if(now < state.memeBoost.cooldownUntil) return;

  const duration = (CONFIG.memeBoost.baseDurationSec + upgradeLevel("memeBoostPower")*5) * 1000;
  const cooldown = CONFIG.memeBoost.cooldownSec * 1000;

  state.memeBoost.activeUntil = now + duration;
  state.memeBoost.cooldownUntil = now + duration + cooldown;
  saveState();
  updateBoostButton();
  playBoostMusic(duration);

  showModal({
    emoji:"⚡", title:"Мем-буст активен!",
    text:`Доход ×${currentMultiplier()} на ${Math.round(duration/1000)} секунд`,
    btnText:"Погнали"
  });
}

let boostMusicTimer = null;

// Играет трек всё время, пока активен буст: если трек короче буста — зацикливается,
// если длиннее — обрезается. Выключается ровно в момент окончания буста.
function playBoostMusic(durationMs){
  if(!CONFIG.boostMusic.enabled) return;
  const audio = $("#sfxBoost");
  if(!audio) return;

  clearTimeout(boostMusicTimer);
  audio.loop = true;
  audio.currentTime = 0;
  audio.play().catch(()=>{}); // если браузер блокирует автозвук — просто без музыки

  boostMusicTimer = setTimeout(()=>{
    audio.pause();
    audio.currentTime = 0;
  }, durationMs);
}

function updateBoostButton(){
  const now = Date.now();
  if(now < state.memeBoost.activeUntil){
    const left = Math.ceil((state.memeBoost.activeUntil-now)/1000);
    memeBoostBtn.textContent = `⚡ Буст активен (${left}с)`;
    memeBoostBtn.disabled = true;
  } else if(now < state.memeBoost.cooldownUntil){
    const left = Math.ceil((state.memeBoost.cooldownUntil-now)/1000);
    memeBoostBtn.textContent = `⏳ Буст через ${left}с`;
    memeBoostBtn.disabled = true;
  } else {
    memeBoostBtn.textContent = "⚡ Мем-буст";
    memeBoostBtn.disabled = false;
  }
}
setInterval(updateBoostButton, 1000);

/* =====================================================================
   DAILY BONUS
   ===================================================================== */

function isDailyBonusAvailable(){
  if(!state.dailyBonus.lastClaim) return true;
  const last = new Date(state.dailyBonus.lastClaim);
  const now = new Date();
  return !isSameCalendarDay(last, now);
}

function isSameCalendarDay(a,b){
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}

$("#dailyBonusBtn").addEventListener("click", claimDailyBonus);

function claimDailyBonus(){
  if(!isDailyBonusAvailable()){
    showModal({ emoji:"⏳", title:"Уже забрано", text:"Бонус за сегодня уже получен. Заходи завтра!", btnText:"Ок" });
    return;
  }

  const now = new Date();
  if(state.dailyBonus.lastClaim){
    const last = new Date(state.dailyBonus.lastClaim);
    const diffDays = Math.round((startOfDay(now) - startOfDay(last)) / 86400000);
    if(diffDays === 1){
      state.dailyBonus.day = (state.dailyBonus.day % CONFIG.dailyBonus.length) + 1;
    } else {
      state.dailyBonus.day = 1; // пропустил день — цикл начинается заново
    }
  } else {
    state.dailyBonus.day = 1;
  }

  const reward = CONFIG.dailyBonus[state.dailyBonus.day - 1];
  state.balance += reward;
  state.totalEarned += reward;
  state.dailyBonus.lastClaim = now.toISOString();

  saveState();
  renderBalance();
  renderDailyDot();
  playSound("coin");

  showModal({
    emoji:"🎁", title:`День ${state.dailyBonus.day}!`,
    text:`Ты получил ${fmt(reward)} ${CONFIG.currencyName}`,
    btnText:"Забрать"
  });
}

function startOfDay(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

/* =====================================================================
   ACHIEVEMENTS
   ===================================================================== */

function checkAchievements(){
  CONFIG.achievements.forEach(a=>{
    if(state.achievementsUnlocked.includes(a.id)) return;
    if(a.check(state)){
      state.achievementsUnlocked.push(a.id);
      state.balance += a.reward;
      state.totalEarned += a.reward;
      saveState();
      showModal({
        emoji: a.icon, title:"Достижение открыто!",
        text:`${a.name} — награда ${fmt(a.reward)} ${CONFIG.currencyName}`,
        btnText:"Круто"
      });
    }
  });
}

/* =====================================================================
   MODAL
   ===================================================================== */

const modalBackdrop = $("#modalBackdrop");
function showModal({emoji,title,text,btnText}){
  $("#modalEmoji").textContent = emoji;
  $("#modalTitle").textContent = title;
  $("#modalText").textContent = text;
  $("#modalBtn").textContent = btnText || "Ок";
  modalBackdrop.classList.add("show");
}
$("#modalBtn").addEventListener("click", ()=> modalBackdrop.classList.remove("show"));
modalBackdrop.addEventListener("click", (e)=>{ if(e.target===modalBackdrop) modalBackdrop.classList.remove("show"); });

/* =====================================================================
   WHEEL OF FORTUNE
   ===================================================================== */

let wheelRotation = 0;      // накопленный угол поворота колеса (градусы)
let wheelSpinning  = false; // блокировка повторного клика во время анимации

function buildWheelSVG(segments){
  const n = segments.length;
  const anglePer = 360 / n;
  const cx = 150, cy = 150, R = 150;
  const bgColors = ["#241945", "#32204f"];

  let inner = "";
  segments.forEach((seg, i) => {
    const start = i * anglePer - 90;          // -90: сектор 0 стартует сверху
    const end   = start + anglePer;
    const x1 = cx + R * Math.cos(start * Math.PI / 180);
    const y1 = cy + R * Math.sin(start * Math.PI / 180);
    const x2 = cx + R * Math.cos(end   * Math.PI / 180);
    const y2 = cy + R * Math.sin(end   * Math.PI / 180);
    const largeArc = anglePer > 180 ? 1 : 0;
    const fill = bgColors[i % 2];

    inner += `<path d="M${cx},${cy} L${x1.toFixed(2)},${y1.toFixed(2)} A${R},${R} 0 ${largeArc} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z" fill="${fill}" stroke="#362757" stroke-width="2"/>`;

    const midAngle = start + anglePer / 2;
    const labelR = R * 0.64;
    const lx = cx + labelR * Math.cos(midAngle * Math.PI / 180);
    const ly = cy + labelR * Math.sin(midAngle * Math.PI / 180);
    const rot = midAngle + 90;
    inner += `<text x="${lx.toFixed(2)}" y="${ly.toFixed(2)}" transform="rotate(${rot.toFixed(2)} ${lx.toFixed(2)} ${ly.toFixed(2)})" text-anchor="middle" dominant-baseline="middle" fill="#FFD23D" font-family="'Rubik Mono One', monospace" font-size="15">${escapeHtml(seg.label)}</text>`;
  });

  inner += `<circle cx="${cx}" cy="${cy}" r="${R-2}" fill="none" stroke="#362757" stroke-width="4"/>`;
  inner += `<circle cx="${cx}" cy="${cy}" r="14" fill="#0F0A1E" stroke="#FF2E9A" stroke-width="3"/>`;
  return `<svg viewBox="0 0 300 300" width="100%" height="100%" style="display:block;">${inner}</svg>`;
}

function initWheel(){
  const wheelEl = $("#wheel");
  if(!wheelEl) return;
  wheelEl.innerHTML = buildWheelSVG(CONFIG.wheelOfFortune.segments);
  $("#wheelCostLabel").textContent = fmt(CONFIG.wheelOfFortune.spinCost) + " " + CONFIG.currencyName;
  $("#wheelSpinBtn").addEventListener("click", spinWheel);
  renderWheelButton();
}

function pickWeightedSegmentIndex(segments){
  const total = segments.reduce((sum, s) => sum + (s.weight || 1), 0);
  let r = Math.random() * total;
  for(let i = 0; i < segments.length; i++){
    r -= (segments[i].weight || 1);
    if(r <= 0) return i;
  }
  return segments.length - 1;
}

function renderWheelButton(){
  const btn = $("#wheelSpinBtn");
  if(!btn || wheelSpinning) return;
  btn.disabled = state.balance < CONFIG.wheelOfFortune.spinCost;
}

function spinWheel(){
  if(wheelSpinning) return;

  const cost = CONFIG.wheelOfFortune.spinCost;
  if(state.balance < cost){
    showModal({
      emoji: "🎡", title: "Недостаточно $MELL",
      text: `Нужно ${fmt(cost)} ${CONFIG.currencyName} для прокрута.`,
      btnText: "Ок"
    });
    return;
  }

  state.balance -= cost;
  renderBalance();
  saveState();

  wheelSpinning = true;
  $("#wheelSpinBtn").disabled = true;
  $("#wheelSpinBtn").textContent = "🎡 Крутится…";

  const segments = CONFIG.wheelOfFortune.segments;
  const n = segments.length;
  const anglePer = 360 / n;
  const winIndex = pickWeightedSegmentIndex(segments);

  // угол центра выигрышного сектора от верха (по часовой стрелке)
  const segCenterFromTop = winIndex * anglePer + anglePer / 2;
  const targetMod = (360 - segCenterFromTop) % 360;
  const currentMod = ((wheelRotation % 360) + 360) % 360;
  const delta = ((targetMod - currentMod) + 360) % 360;
  const extraSpins = 5;

  wheelRotation += extraSpins * 360 + delta;

  const wheelEl = $("#wheel");
  wheelEl.style.transform = `rotate(${wheelRotation}deg)`;

  setTimeout(() => {
    const seg = segments[winIndex];
    state.balance += seg.value;
    state.totalEarned += seg.value;
    saveState();
    renderBalance();
    checkAchievements();
    playSound("coin");

    wheelSpinning = false;
    $("#wheelSpinBtn").textContent = "🎡 Крутить — " + fmt(cost) + " " + CONFIG.currencyName;
    renderWheelButton();

    showModal({
      emoji: "🎉", title: "Приз!",
      text: `Колесо принесло тебе ${fmt(seg.value)} ${CONFIG.currencyName}!`,
      btnText: "Забрать"
    });
  }, 4600);
}

/* =====================================================================
   NAVIGATION
   ===================================================================== */

$$(".navbtn").forEach(btn=>{
  btn.addEventListener("click", ()=> switchScreen(btn.dataset.target));
});

function switchScreen(name){
  $$(".screen").forEach(s => s.classList.toggle("active", s.dataset.screen === name));
  $$(".navbtn").forEach(b => b.classList.toggle("active", b.dataset.target === name));
  if(name === "leaders"){ renderLeaderboard(); syncPlayerScore(); }
  if(name === "profile") renderProfile();
  if(name === "upgrades") renderUpgrades();
}

/* =====================================================================
   RESET (защита от случайного сброса — двойное подтверждение)
   ===================================================================== */

$("#resetBtn").addEventListener("click", ()=>{
  if(!confirm("Точно сбросить весь прогресс? Это нельзя отменить.")) return;
  if(!confirm("Ты уверен на 100%? Баланс, улучшения и достижения будут удалены.")) return;
  localStorage.removeItem(CONFIG.storageKey);
  state = defaultState();
  renderAll();
  updateBoostButton();
});

/* =====================================================================
   INIT
   ===================================================================== */

function init(){
  // Telegram Mini App setup
  const tg = window.Telegram?.WebApp;
  if(tg){
    tg.ready();
    tg.expand();
    try{ tg.setHeaderColor("#0F0A1E"); tg.setBackgroundColor("#0F0A1E"); }catch(_){}
  }

  renderTicker();
  renderAll();
  updateBoostButton();
  initLeaderboard();
  syncPlayerScore();
  initWheel();

  // сохраняем прогресс перед закрытием/сворачиванием
  document.addEventListener("visibilitychange", ()=>{ if(document.hidden){ saveState(); syncPlayerScore(); } });
  window.addEventListener("beforeunload", saveState);
}

init();
