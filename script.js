// Pre-loader
document.addEventListener('DOMContentLoaded', () => {
    // Show preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 500);
    });
    
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
    
    // Add scroll to top button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // Add smooth scrolling to all nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
        
        // Close navbar collapse on mobile
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  
    // Initialize Typed.js
    if (document.querySelector('.typed-text')) {
      new Typed('.typed-text', {
        strings: ['Full Stack Developer', 'Mobile App Developer', 'UI/UX Designer', 'Software Engineer'],
        typeSpeed: 50,
        backSpeed: 20,
        backDelay: 2000,
        loop: true
      });
    }
  
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successToast = document.getElementById('successToast');
    
    if (contactForm && submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Reset validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
          input.classList.remove('is-invalid');
        });
        
        // Perform validation
        let isValid = true;
        
        // Name validation
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
          nameInput.classList.add('is-invalid');
          isValid = false;
        }
        
        // Email validation
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
          emailInput.classList.add('is-invalid');
          isValid = false;
        }
        
        // Message validation
        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) {
          messageInput.classList.add('is-invalid');
          isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
          // Store form data in localStorage (bonus feature)
          const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: messageInput.value.trim(),
            date: new Date().toISOString()
          };
          
          // Get existing form submissions or initialize empty array
          const savedSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
          savedSubmissions.push(formData);
          localStorage.setItem('contactSubmissions', JSON.stringify(savedSubmissions));
          
          // Reset form
          contactForm.reset();
          
          // Close modal
          const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
          contactModal.hide();
          
          // Show success toast
          const toast = new bootstrap.Toast(successToast);
          toast.show();
        }
      });
    }
  
    // Dark Mode Toggle
    const themeSwitch = document.getElementById('checkbox');
    const toggleText = document.querySelector('.toggle-text');
    
    // Check if user has a saved preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      document.body.classList.toggle('dark-mode', currentTheme === 'dark');
      themeSwitch.checked = currentTheme === 'dark';
      toggleText.textContent = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
    
    themeSwitch.addEventListener('change', function() {
      // Toggle dark mode class on body
      document.body.classList.toggle('dark-mode');
      
      // Update toggle text
      toggleText.textContent = this.checked ? 'Light Mode' : 'Dark Mode';
      
      // Save user preference
      const theme = this.checked ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
  
    // Initialize skill progress bars with animation
    const skillBars = document.querySelectorAll('.progress-bar');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = '0%';
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const cardImage = card.querySelector('.card-img-top');
        if (cardImage) {
          cardImage.style.transform = 'scale(1.05)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const cardImage = card.querySelector('.card-img-top');
        if (cardImage) {
          cardImage.style.transform = 'scale(1)';
        }
      });
    });
  
    // Add animation to tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  
    // Custom animated elements on scroll
    const animatedElements = document.querySelectorAll('.animated-element');
    const animateOptions = {
      threshold: 0.2
    };
    
    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animateObserver.unobserve(entry.target);
        }
      });
    }, animateOptions);
    
    animatedElements.forEach(element => {
      animateObserver.observe(element);
    });
  
    // Bootstrap tooltips initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  
    // Add year to copyright automatically
    const copyrightYear = document.querySelector('.copyright');
    if (copyrightYear) {
      const year = new Date().getFullYear();
      copyrightYear.innerHTML = `&copy; ${year} Jared A Cariaso. All rights reserved.`;
    }
  });
  
  // Memory Game
  class MemoryGame {
    constructor() {
        this.grid = document.querySelector('.memory-grid');
        this.startBtn = document.getElementById('start-memory');
        this.movesElement = document.getElementById('moves');
        this.timeElement = document.getElementById('time');
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.matches = 0;
        this.timer = null;
        this.startTime = null;
        this.gameStarted = false;

        this.startBtn.addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.resetGame();
        this.createCards();
        this.startTimer();
        this.gameStarted = true;
        this.startBtn.disabled = true;
    }

    resetGame() {
        this.grid.innerHTML = '';
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.matches = 0;
        this.movesElement.textContent = '0';
        this.timeElement.textContent = '0:00';
        clearInterval(this.timer);
    }

    createCards() {
        const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎨'];
        const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

        shuffledEmojis.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.value = emoji;
            card.addEventListener('click', () => this.flipCard(card));
            this.grid.appendChild(card);
            this.cards.push(card);
        });
    }

    flipCard(card) {
        if (!this.gameStarted || this.flippedCards.length >= 2 || card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        card.textContent = card.dataset.value;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesElement.textContent = this.moves;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const match = card1.dataset.value === card2.dataset.value;

        if (match) {
            this.matches++;
            this.flippedCards = [];
            if (this.matches === 8) this.endGame();
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                this.flippedCards = [];
            }, 1000);
        }
    }

    startTimer() {
        this.startTime = Date.now();
        this.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    endGame() {
        clearInterval(this.timer);
        this.gameStarted = false;
        this.startBtn.disabled = false;
        alert('Congratulations! You won!');
    }
}

// Speed Typing Game
class TypingGame {
    constructor() {
        this.textDisplay = document.getElementById('typing-text');
        this.input = document.getElementById('typing-input');
        this.startBtn = document.getElementById('start-typing');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
          this.words = [
            'The quick brown fox jumps over the lazy dog.',
            'Programming is the art of telling another human what one wants the computer to do.',
            'The best error message is the one that never shows up.',
            'Code is like humor. When you have to explain it, it\'s bad.',
            'First, solve the problem. Then, write the code.'
        ];
        
        this.startBtn.addEventListener('click', () => this.startGame());
        this.input.addEventListener('input', () => this.checkInput());
    }

    startGame() {
        this.currentText = this.words[Math.floor(Math.random() * this.words.length)];
        this.letters = this.currentText.split('');
        this.letterSpans = this.letters.map(letter => {
            const span = document.createElement('span');
            span.textContent = letter;
            return span;
        });
        
        this.textDisplay.innerHTML = '';
        this.letterSpans.forEach(span => this.textDisplay.appendChild(span));
        
        this.input.disabled = false;
        this.input.value = '';
        this.input.focus();
        this.startTime = Date.now();
        this.mistakes = 0;
        this.currentIndex = 0;
        
        this.startBtn.disabled = true;
        this.letterSpans[0].classList.add('current');
    }

    checkInput() {
        const inputText = this.input.value;
        const currentLetter = this.letters[this.currentIndex];
        
        if (inputText.charAt(inputText.length - 1) === currentLetter) {
            this.letterSpans[this.currentIndex].classList.add('correct');
            this.letterSpans[this.currentIndex].classList.remove('current');
            this.currentIndex++;
            
            if (this.currentIndex < this.letters.length) {
                this.letterSpans[this.currentIndex].classList.add('current');
            } else {
                this.endGame();
            }
        } else {
            this.mistakes++;
            this.letterSpans[this.currentIndex].classList.add('incorrect');
        }
        
        this.updateStats();
    }

    updateStats() {
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        const wordsTyped = this.input.value.length / 5; // assuming average word length of 5
        const wpm = Math.round(wordsTyped / timeElapsed);
        const accuracy = Math.round(((this.currentIndex - this.mistakes) / this.currentIndex) * 100);
        
        this.wpmDisplay.textContent = wpm || 0;
        this.accuracyDisplay.textContent = `${accuracy || 100}%`;
    }

    endGame() {
        this.input.disabled = true;
        this.startBtn.disabled = false;
        alert('Great job! Click Start Game to try again.');
    }
}

// Easter Eggs
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateMatrixMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateMatrixMode() {
    document.body.style.setProperty('--primary-color', '#00ff00');
    document.body.style.setProperty('--secondary-color', '#003300');
    
    const matrix = document.createElement('canvas');
    matrix.style.position = 'fixed';
    matrix.style.top = '0';
    matrix.style.left = '0';
    matrix.style.zIndex = '-1';
    matrix.style.opacity = '0.1';
    document.body.appendChild(matrix);

    const ctx = matrix.getContext('2d');
    matrix.width = window.innerWidth;
    matrix.height = window.innerHeight;

    const letters = '01';
    const fontSize = 10;
    const columns = matrix.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, matrix.width, matrix.height);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > matrix.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33);
}

// Drum Kit Easter Egg
const drumSounds = {
    'fa-js': 'https://cdn.freesound.org/previews/323/323102_5260872-lq.mp3',
    'fa-html5': 'https://cdn.freesound.org/previews/323/323101_5260872-lq.mp3',
    'fa-css3-alt': 'https://cdn.freesound.org/previews/323/323100_5260872-lq.mp3',
    'fa-python': 'https://cdn.freesound.org/previews/323/323099_5260872-lq.mp3',
    'fa-java': 'https://cdn.freesound.org/previews/323/323097_5260872-lq.mp3',
    'fa-php': 'https://cdn.freesound.org/previews/323/323096_5260872-lq.mp3'
};

document.querySelectorAll('.tech-item i').forEach(icon => {
    const audio = new Audio();
    const iconClass = Array.from(icon.classList).find(cls => cls.startsWith('fa-'));
    if (drumSounds[iconClass]) {
        audio.src = drumSounds[iconClass];
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            audio.currentTime = 0;
            audio.play();
            icon.classList.add('drum-hit');
            setTimeout(() => icon.classList.remove('drum-hit'), 200);
        });
    }
});

// Initialize games when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing code
    // ...existing code...

    // Initialize games
    const memoryGame = new MemoryGame();
    const typingGame = new TypingGame();
  });