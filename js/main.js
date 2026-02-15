/**
 * Oh My Codex (OMX) Website - Main JavaScript
 * Handles all interactive features and animations
 */

(function() {
  'use strict';

  // Application state
  const AppState = {
    initialized: false,
    scrollDirection: 'down',
    lastScrollY: 0,
    navVisible: true,
    mobileMenuOpen: false
  };

  /**
   * DOM Content Loaded - Main Entry Point
   */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    if (AppState.initialized) return;

    console.log('[OMX] Initializing...');

    // Initialize all features
    setupScrollReveal();
    setupFixedNav();
    setupMobileMenu();
    setupCopyButtons();
    setupSmoothScroll();
    hidePageLoader();
    fetchGitHubStats();
    fetchNpmDownloads();

    AppState.initialized = true;
    console.log('[OMX] Initialization complete');
  }

  /**
   * Scroll Reveal Animation
   * Uses IntersectionObserver to reveal elements on scroll
   */
  function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, [data-reveal]');

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      revealElements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /**
   * Fixed Navigation
   * Shows/hides navbar based on scroll direction
   */
  function setupFixedNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleNavScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    function handleNavScroll() {
      const currentScrollY = window.scrollY;

      // Add scrolled class for styling
      if (currentScrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Determine scroll direction
      if (currentScrollY > AppState.lastScrollY && currentScrollY > 100) {
        // Scrolling down
        AppState.scrollDirection = 'down';
        nav.classList.add('hidden');
        AppState.navVisible = false;
      } else {
        // Scrolling up
        AppState.scrollDirection = 'up';
        nav.classList.remove('hidden');
        AppState.navVisible = true;
      }

      AppState.lastScrollY = currentScrollY;
    }
  }

  /**
   * Mobile Menu
   * Handles hamburger menu toggle and overlay
   */
  function setupMobileMenu() {
    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks = document.querySelector('.nav__links');
    const overlay = document.querySelector('.nav__overlay');

    if (!hamburger || !navLinks) return;

    // Toggle menu
    hamburger.addEventListener('click', toggleMobileMenu);

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeMobileMenu);
    }

    // Close on link click
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && AppState.mobileMenuOpen) {
        closeMobileMenu();
      }
    });

    function toggleMobileMenu() {
      if (AppState.mobileMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }

    function openMobileMenu() {
      navLinks.classList.add('active');
      hamburger.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      AppState.mobileMenuOpen = true;
    }

    function closeMobileMenu() {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
      AppState.mobileMenuOpen = false;
    }
  }

  /**
   * Copy Code Buttons
   * Handles copying code snippets to clipboard
   */
  function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy]');

    copyButtons.forEach(button => {
      button.addEventListener('click', async function() {
        const codeBlock = this.closest('.code-block');
        const code = codeBlock ? codeBlock.querySelector('code') : null;

        if (!code) return;

        try {
          await navigator.clipboard.writeText(code.textContent.trim());

          // Visual feedback
          const originalText = this.textContent;
          this.textContent = 'Copied!';
          this.classList.add('copied');

          setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('[OMX] Failed to copy:', err);
          this.textContent = 'Failed';
          setTimeout(() => {
            this.textContent = 'Copy';
          }, 2000);
        }
      });
    });
  }

  /**
   * Smooth Scroll
   * Handles smooth scrolling for anchor links
   */
  function setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL without triggering scroll
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  /**
   * Hide Page Loader
   * Removes loading overlay when page is ready
   */
  function hidePageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 300);
      }, 100);
    }
  }

  /**
   * Counter Animation (Optional)
   * Animates numbers counting up
   */
  function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = Math.floor(target);
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  /**
   * Format Number
   * Converts large numbers to abbreviated form (1.2k, 1.2M)
   */
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  /**
   * Fetch GitHub Stats
   * Fetches GitHub stars and forks with caching
   */
  async function fetchGitHubStats() {
    const cacheKey = 'omx-github-stats';
    const cacheTTL = 5 * 60 * 1000; // 5 minutes

    try {
      // Check cache
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheTTL) {
          updateGitHubUI(data);
          return;
        }
      }

      // Fetch fresh data
      const response = await fetch('https://api.github.com/repos/Yeachan-Heo/oh-my-codex');
      if (!response.ok) throw new Error('GitHub API failed');

      const data = await response.json();
      const stats = {
        stars: data.stargazers_count,
        forks: data.forks_count
      };

      // Cache the result
      sessionStorage.setItem(cacheKey, JSON.stringify({
        data: stats,
        timestamp: Date.now()
      }));

      updateGitHubUI(stats);
    } catch (err) {
      console.error('[OMX] Failed to fetch GitHub stats:', err);
      updateGitHubUI({ stars: null, forks: null });
    }
  }

  function updateGitHubUI(stats) {
    const starsEl = document.querySelector('[data-stat="github-stars"]');
    const forksEl = document.querySelector('[data-stat="github-forks"]');

    if (starsEl) {
      starsEl.textContent = stats.stars !== null ? formatNumber(stats.stars) : '—';
    }
    if (forksEl) {
      forksEl.textContent = stats.forks !== null ? formatNumber(stats.forks) : '—';
    }
  }

  /**
   * Fetch NPM Downloads
   * Fetches npm download count with caching
   */
  async function fetchNpmDownloads() {
    const cacheKey = 'omx-npm-downloads';
    const cacheTTL = 5 * 60 * 1000; // 5 minutes

    try {
      // Check cache
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheTTL) {
          updateNpmUI(data);
          return;
        }
      }

      // Fetch fresh data
      const response = await fetch('https://api.npmjs.org/downloads/point/last-month/oh-my-codex');
      if (!response.ok) throw new Error('npm API failed');

      const data = await response.json();
      const downloads = data.downloads;

      // Cache the result
      sessionStorage.setItem(cacheKey, JSON.stringify({
        data: downloads,
        timestamp: Date.now()
      }));

      updateNpmUI(downloads);
    } catch (err) {
      console.error('[OMX] Failed to fetch npm downloads:', err);
      updateNpmUI(null);
    }
  }

  function updateNpmUI(downloads) {
    const downloadsEl = document.querySelector('[data-stat="npm-downloads"]');
    if (downloadsEl) {
      downloadsEl.textContent = downloads !== null ? formatNumber(downloads) : '—';
    }
  }

  // Expose public API for debugging
  window.OMX = {
    version: '0.3.5',
    state: AppState,
    refresh: init,
    fetchGitHubStats,
    fetchNpmDownloads
  };

})();
