document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('dynamicNav');
  const timeBox = document.getElementById('time-display');
  const mainContent = document.querySelector('main');

  // 1. Detect Scroll Position
  window.addEventListener('scroll', () => {
    // If user scrolls more than 100px from the top
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // 2. Clock Logic for the Island
  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    if (timeBox) {
      timeBox.textContent = timeString;
    }
  }
  
  // Update every second and run immediately
  setInterval(updateClock, 1000);
  updateClock();

  // Scroll-reveal text animation
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSelector = [
    '.section-label',
    'main h2',
    'main h3',
    'main p',
    'main a'
  ].join(', ');

  const revealElements = mainContent
    ? Array.from(mainContent.querySelectorAll(revealSelector)).filter((element) => {
        return !element.closest('.about-image, .certification-image-wrap');
      })
    : [];

  revealElements.forEach((element, index) => {
    element.classList.add('scroll-reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 90}ms`);
  });

  if (prefersReducedMotion) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  // Falling words effect
  const container = document.getElementById('fallingWordsContainer');
  const words = [
    // Soft Skills
    'Tenacity', 'Growth Mindset', 'Problem Solver', 'Adaptability', 'Resilience', 'Creativity', 'Empathy', 'Leadership', 'Collaboration', 'Innovation', 'Focus', 'Discipline', 'Curiosity', 'Integrity', 'Passion',
    // HTML/CSS
    'display: flex;', '<section>', '@keyframes', 'grid-area', '<div>', 'position: absolute;', '::before', 'flex-wrap', 'border-radius', 'box-shadow', 'transform', 'transition', '<article>', 'margin: auto;', 'padding', 'z-index',
    // JavaScript
    'map()', '=>', 'async/await', 'const { data }', 'filter()', 'reduce()', 'Promise', 'setTimeout', 'addEventListener', 'querySelector', 'forEach()', 'let', 'const', 'arrow function', 'destructuring', 'spread operator',
    // Cybersecurity
    'SHA-256', 'Pen-Test', 'Zero Trust', 'SSH', '0day', 'Encryption', 'Firewall', 'VPN', 'Phishing', 'Malware', 'Ransomware', 'DDoS', 'SQL Injection', 'XSS', 'CSRF', 'Two-Factor', 'Biometrics', 'Hashing', 'AES', 'RSA',
    // Visual variety (short symbols)
    '#!', '//', '::after', '/* */', '{}', '[]', '()', '=>', '&&', '||', '===', '!==', '++', '--', '??', '?.'
  ];
  const maxWords = 20;
  const fallingWords = [];

  // Check for reduced motion preference
  function createFallingWord() {
    const word = words[Math.floor(Math.random() * words.length)];
    const element = document.createElement('div');
    element.className = 'falling-word';
    element.textContent = word;
    container.appendChild(element);

    return {
      element,
      x: Math.random() * (window.innerWidth - 150), // Extra margin for longer words
      y: -50,
      speed: prefersReducedMotion ? 0 : Math.random() * 1 + 0.5, // 0.5 to 1.5 px/frame
      opacity: Math.random() * 0.1 + 0.05, // 0.05 to 0.15
      fadeIn: 0
    };
  }

  // Staggered spawning
  let spawnIndex = 0;
  function spawnWord() {
    if (spawnIndex < maxWords) {
      fallingWords.push(createFallingWord());
      spawnIndex++;
      setTimeout(spawnWord, 2000); // Delay 2 seconds between spawns
    }
  }
  spawnWord(); // Start spawning

  function animate() {
    fallingWords.forEach(word => {
      if (!prefersReducedMotion) {
        word.y += word.speed;
        if (word.y > window.innerHeight) {
          word.y = -50;
          word.x = Math.random() * (window.innerWidth - 150);
          word.speed = Math.random() * 1 + 0.5;
          word.opacity = Math.random() * 0.09 + 0.05;
          word.fadeIn = 0;
        }

        // Fade in effect
        if (word.fadeIn < 1) {
          word.fadeIn += 0.02;
        }
      }

      word.element.style.left = word.x + 'px';
      word.element.style.top = word.y + 'px';
      word.element.style.opacity = word.opacity * word.fadeIn;
    });

    requestAnimationFrame(animate);
  }

  animate();
});
