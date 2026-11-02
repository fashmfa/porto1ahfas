/**
 * PORTFOLIO NAHIDH AHFASH MU'AFA, S.Sos
 * Modern Interactive Animations, Video Player Modal & Photo Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Initialize Lucide Icons
  // ------------------------------------------------------------------------
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ------------------------------------------------------------------------
  // 2. Scroll Progress Bar
  // ------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scrollProgress');

  const updateScrollProgress = () => {
    if (!scrollProgressBar) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercentage))}%`;
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ------------------------------------------------------------------------
  // 3. Interactive Ambient Cursor Follower Glow
  // ------------------------------------------------------------------------
  const cursorGlow = document.getElementById('ambientCursorGlow');

  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        cursorGlow.classList.add('active');
        isMoving = true;
      }
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
      isMoving = false;
    });

    // Smooth lerp animation loop (60fps)
    const animateGlow = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(animateGlow);
    };
    requestAnimationFrame(animateGlow);
  }

  // ------------------------------------------------------------------------
  // 4. Active Nav Link Tracking & Smooth Scrolling
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const updateActiveNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ------------------------------------------------------------------------
  // 5. Mobile Navigation Drawer Toggle
  // ------------------------------------------------------------------------
  const btnMobileMenu = document.getElementById('btnMobileMenu');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (btnMobileMenu && mobileDrawer) {
    btnMobileMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('hidden');
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !btnMobileMenu.contains(e.target)) {
        mobileDrawer.classList.add('hidden');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Scroll Reveal Animations (Intersection Observer)
  // ------------------------------------------------------------------------
  const animateElements = document.querySelectorAll('.card-glass, .portfolio-card, .photo-card, .photo-card-hero, .doc-item');

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => {
    el.classList.add('animate-on-scroll');
    // Immediately reveal if already in or near the viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('is-visible');
    } else {
      scrollObserver.observe(el);
    }
  });

  // ------------------------------------------------------------------------
  // 7. Subtle 3D Card Tilt Effect on Hover
  // ------------------------------------------------------------------------
  if (window.matchMedia('(pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll('.portfolio-card, .card-glass');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Subtle tilt angles (max ~4.5 degrees)
        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ------------------------------------------------------------------------
  // 8. Video Player Modal (Embedded YouTube + Direct Link)
  // ------------------------------------------------------------------------
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoMeta = document.getElementById('modalVideoMeta');
  const btnModalOpenYouTube = document.getElementById('btnModalOpenYouTube');
  const btnCloseVideoModal = document.getElementById('btnCloseVideoModal');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  const openVideoModal = (card) => {
    const videoId = card.getAttribute('data-video-id');
    const videoUrl = card.getAttribute('data-video-url');
    const title = card.getAttribute('data-title');
    const role = card.getAttribute('data-role');
    const institution = card.getAttribute('data-institution');

    if (!videoId) return;

    if (modalVideoTitle) modalVideoTitle.textContent = title || 'Pratinjau Video';
    if (modalVideoMeta) modalVideoMeta.textContent = `${role || 'Cameramen'} • ${institution || 'Karya Portofolio'}`;
    
    if (btnModalOpenYouTube) {
      btnModalOpenYouTube.href = videoUrl || `https://www.youtube.com/watch?v=${videoId}`;
    }

    // Embed with privacy-enhanced YouTube player and autoplay
    if (videoIframe) {
      videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    if (videoModal) {
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    if (videoIframe) videoIframe.src = '';
    document.body.style.overflow = '';
  };

  portfolioCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openVideoModal(card);
    });
  });

  if (btnCloseVideoModal) {
    btnCloseVideoModal.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 9. Photo Lightbox Modal
  // ------------------------------------------------------------------------
  const photoLightbox = document.getElementById('photoLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const btnCloseLightbox = document.getElementById('btnCloseLightbox');
  const photoItems = document.querySelectorAll('.photo-card, .photo-card-hero, .doc-item');

  const openPhotoLightbox = (item) => {
    const photoSrc = item.getAttribute('data-photo-src');
    const caption = item.getAttribute('data-caption');

    if (!photoSrc || !lightboxImg) return;

    lightboxImg.src = photoSrc;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || 'Karya Dokumentasi & Fotografi';
    }

    if (photoLightbox) {
      photoLightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closePhotoLightbox = () => {
    if (!photoLightbox) return;
    photoLightbox.classList.remove('active');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  photoItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      openPhotoLightbox(item);
    });
  });

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', closePhotoLightbox);
  }

  if (photoLightbox) {
    photoLightbox.addEventListener('click', (e) => {
      if (e.target === photoLightbox) {
        closePhotoLightbox();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 10. Global Escape Key Listener for Modals
  // ------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoModal && videoModal.classList.contains('active')) {
        closeVideoModal();
      }
      if (photoLightbox && photoLightbox.classList.contains('active')) {
        closePhotoLightbox();
      }
    }
  });
});
