document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('dynamicNav');
  const timeBox = document.getElementById('time-display');

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
});