const overlay = document.getElementById('surprise-overlay');
const openButton = document.getElementById('open-surprise');
const revealItems = document.querySelectorAll('.reveal-up');
const reasonCards = document.querySelectorAll('.reason-card');
const reasonTitle = document.getElementById('reasonTitle');
const reasonText = document.getElementById('reasonText');
const letterEnvelope = document.getElementById('openLetter');
const letterPaper = document.getElementById('letterPaper');
const countdownTitle = document.getElementById('countdownTitle');
const countdownBox = document.getElementById('countdownBox');
const surpriseBurst = document.getElementById('surpriseBurst');

if (openButton) {
  openButton.addEventListener('click', () => {
    overlay.classList.add('hidden');
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

reasonCards.forEach((card) => {
  card.addEventListener('click', () => {
    reasonCards.forEach((button) => button.classList.remove('active'));
    card.classList.add('active');
    reasonTitle.textContent = card.dataset.title;
    reasonText.textContent = card.dataset.text;
  });
});

if (letterEnvelope) {
  letterEnvelope.addEventListener('click', () => {
    letterEnvelope.style.transform = 'translateY(18px) scale(0.98)';
    letterEnvelope.style.opacity = '0';
    letterEnvelope.style.pointerEvents = 'none';
    letterPaper.classList.add('visible');
  });
}

function getNextBirthday() {
  const birthday = new Date('2004-10-07T00:00:00');
  const today = new Date();
  const upcoming = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
    0,
    0,
    0,
    0
  );

  if (upcoming < today) {
    upcoming.setFullYear(today.getFullYear() + 1);
  }

  return upcoming;
}

function updateCountdown() {
  const target = getNextBirthday();
  const diffMs = target.getTime() - Date.now();

  if (diffMs <= 0) {
    countdownTitle.textContent = 'Today is YOUR day ❤️';
    countdownBox.innerHTML = '<div class="time-box"><strong>Today</strong><span>Love</span></div>';
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownTitle.textContent = 'Counting down to your birthday';
  countdownBox.innerHTML = `
    <div class="time-box"><strong>${days}</strong><span>Days</span></div>
    <div class="time-box"><strong>${hours}</strong><span>Hours</span></div>
    <div class="time-box"><strong>${minutes}</strong><span>Minutes</span></div>
    <div class="time-box"><strong>${seconds}</strong><span>Seconds</span></div>
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);

function createFloatingHearts() {
  const fragment = document.createDocumentFragment();
  const heartCount = 16;

  for (let i = 0; i < heartCount; i += 1) {
    const heart = document.createElement('span');
    heart.textContent = i % 2 === 0 ? '❤' : '✨';
    heart.className = 'floating-particle';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;
    heart.style.setProperty('--size', `${Math.random() * 18 + 16}px`);
    heart.style.animationDuration = `${Math.random() * 4 + 5}s`;
    fragment.appendChild(heart);
  }

  document.body.appendChild(fragment);
}

if (surpriseBurst) {
  surpriseBurst.addEventListener('click', () => {
    const existingHearts = document.querySelectorAll('.floating-particle');
    existingHearts.forEach((heart) => heart.remove());
    createFloatingHearts();
    setTimeout(() => {
      document.querySelectorAll('.floating-particle').forEach((heart) => heart.remove());
    }, 5500);
  });
}

const particleStyles = document.createElement('style');
particleStyles.textContent = `
  .floating-particle {
    position: fixed;
    bottom: -2rem;
    left: 0;
    font-size: var(--size);
    z-index: 30;
    color: rgba(210, 83, 122, 0.82);
    pointer-events: none;
    animation: riseUp linear forwards;
  }

  @keyframes riseUp {
    0% {
      opacity: 0;
      transform: translateY(0) scale(0.7) rotate(0deg);
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-72vh) scale(1.2) rotate(18deg);
    }
  }
`;
document.head.appendChild(particleStyles);
