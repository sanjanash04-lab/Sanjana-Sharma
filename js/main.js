/**
 * SANJANA SHARMA - PORTFOLIO SCRIPTS
 * Design: Clean, Elegant, Pretty Pastel Purple & Lilac
 * Libraries: jQuery, Bootstrap 5.3, Slick Slider, WOW.js, Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize WOW.js for scroll-triggered animations
  initWowAnimation();

  // 2. Initialize Typing Effect in Hero
  initTypingEffect();

  // 3. Navbar scroll & active link state
  initNavbarBehavior();

  // 4. Initialize Slick Sliders (Projects, Testimonials, Skills Ticker)
  initSlickSliders();

  // 5. Project View Switcher & Category Filter
  initProjectInteractions();

  // 6. Copy to Clipboard Toast
  initClipboardActions();

  // 7. Stats Counter Animation
  initStatsCounters();

  // 8. Contact Form Handling
  initContactForm();

  // 9. Back To Top
  initBackToTop();
});

/* ==========================================================================
   1. WOW.JS ANIMATION INITIALIZATION
   ========================================================================== */
function initWowAnimation() {
  if (typeof WOW !== 'undefined') {
    const wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animate__animated',
      offset: 50,
      mobile: true,
      live: true
    });
    wow.init();
  } else {
    document.querySelectorAll('.wow').forEach(el => {
      el.style.visibility = 'visible';
    });
  }
}

/* ==========================================================================
   2. DYNAMIC TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const words = [
    'Shopify Developer & Liquid Expert',
    'WordPress & Elementor Pro Specialist',
    'Frontend Developer (HTML5/CSS3/JS)',
    'Figma to Responsive Web Architect',
    'High-Conversion Store Builder'
  ];
  const typingTarget = document.getElementById('typingText');
  if (!typingTarget) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 85;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1900; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 450; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVBAR BEHAVIOR & SCROLL SPY
   ========================================================================== */
function initNavbarBehavior() {
  const navbar = document.querySelector('.custom-navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-custom');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Auto-collapse mobile navbar on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.getElementById('navbarContent');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* ==========================================================================
   4. SLICK SLIDERS INITIALIZATION (PROJECTS, REVIEWS, TECH TICKER)
   ========================================================================== */
function initSlickSliders() {
  if (typeof jQuery === 'undefined' || typeof jQuery.fn.slick === 'undefined') {
    return;
  }

  // 1. Featured Projects Slider
  if ($('.projects-slick-slider').length) {
    $('.projects-slick-slider').slick({
      dots: true,
      arrows: true,
      infinite: true,
      speed: 600,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4500,
      pauseOnHover: true,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    });
  }

  // 2. Client Testimonials Slider
  if ($('.testimonials-slick-slider').length) {
    $('.testimonials-slick-slider').slick({
      dots: true,
      arrows: true,
      infinite: true,
      speed: 550,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  // 3. Skills Ticker Slider (Continuous Flow)
  if ($('.skills-ticker-slider').length) {
    $('.skills-ticker-slider').slick({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 3500,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      cssEase: 'linear',
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 4 }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 3 }
        },
        {
          breakpoint: 480,
          settings: { slidesToShow: 2 }
        }
      ]
    });
  }
}

/* ==========================================================================
   5. PROJECT VIEW SWITCHER & CATEGORY FILTER
   ========================================================================== */
function initProjectInteractions() {
  const switchSliderBtn = document.getElementById('viewSliderBtn');
  const switchGridBtn = document.getElementById('viewGridBtn');
  const sliderView = document.getElementById('projectsSliderView');
  const gridView = document.getElementById('projectsGridView');

  if (switchSliderBtn && switchGridBtn && sliderView && gridView) {
    switchSliderBtn.addEventListener('click', () => {
      switchSliderBtn.classList.add('active');
      switchGridBtn.classList.remove('active');
      sliderView.classList.remove('d-none');
      gridView.classList.add('d-none');
      if (typeof jQuery !== 'undefined' && $('.projects-slick-slider').length) {
        $('.projects-slick-slider').slick('setPosition');
      }
    });

    switchGridBtn.addEventListener('click', () => {
      switchGridBtn.classList.add('active');
      switchSliderBtn.classList.remove('active');
      gridView.classList.remove('d-none');
      sliderView.classList.add('d-none');
    });
  }

  // Grid Category Filter
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. COPY TO CLIPBOARD & TOAST
   ========================================================================== */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('customToast');
  const toastMsg = document.getElementById('toastMessage');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Copied to clipboard!';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(label);
        }).catch(err => {
          fallbackCopy(textToCopy, label);
        });
      } else {
        fallbackCopy(textToCopy, label);
      }
    });
  });

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(label);
    } catch (e) {
      console.error('Fallback copy error:', e);
    }
    document.body.removeChild(tempInput);
  }

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* ==========================================================================
   7. STATS NUMBER COUNTER
   ========================================================================== */
function initStatsCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  let started = false;

  function countUp() {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target > 50 ? 25 : 60;
      const increment = Math.ceil(target / (1200 / speed)) || 1;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = count + suffix;
        }
      }, speed);
    });
  }

  const statsSection = document.getElementById('statsSection');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      countUp();
    }
  }, { threshold: 0.25 });

  observer.observe(statsSection);
}

/* ==========================================================================
   8. CONTACT FORM SIMULATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formSuccessAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Inquiry Sent!';
      submitBtn.classList.remove('btn-gradient');
      submitBtn.classList.add('btn-success');

      if (alertBox) {
        alertBox.classList.remove('d-none');
      }

      form.reset();
      form.classList.remove('was-validated');

      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.classList.add('btn-gradient');
        submitBtn.classList.remove('btn-success');
        submitBtn.disabled = false;
        if (alertBox) {
          alertBox.classList.add('d-none');
        }
      }, 5500);
    }, 1100);
  });
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
