/**
 * ============================================================================
 * REDA ELNAGGAR - PERSONAL PORTFOLIO SCRIPT
 * Vanilla JavaScript (No frameworks or external libraries)
 * ============================================================================
 */

'use strict';

/* ==========================================================================
   1. Dynamic Project Data System
   ========================================================================== */
/**
 * Project repository array.
 * As Reda is a student currently building his skills, this starts empty.
 * Adding an object here will immediately and automatically render the project card.
 *
 * Supported Structure:
 * {
 *   title: "Project Name",
 *   description: "Detailed description of the backend solution or API architecture.",
 *   technologies: ["C#", "ASP.NET Core", "SQL Server"],
 *   image: "projects/sample.jpg",
 *   github: "https://github.com/redaelnaggar/project", // If empty, GitHub button is omitted
 *   liveDemo: "https://project-demo.example.com"        // If empty, Live Demo button is omitted
 * }
 */
const projects = [];

/**
 * Renders the project cards into the DOM or shows a professional empty state.
 * @param {Array<Object>} projectList - Array of project objects
 */
function renderProjects(projectList) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  // Clear existing container content
  container.innerHTML = '';

  // 1. EMPTY STATE: When no projects are currently loaded
  if (!Array.isArray(projectList) || projectList.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'projects-empty-state';
    emptyState.innerHTML = `
      <div class="empty-state-icon-box" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
      </div>
      <span class="empty-state-tag">In Active Development</span>
      <h3 class="empty-state-title">Projects Coming Soon</h3>
      <p class="empty-state-description">
        I'm currently building practical .NET backend projects. New projects will be added here as I continue developing my skills.
      </p>
      <div class="empty-state-hint">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>System configured for automated project rendering</span>
      </div>
    `;
    container.appendChild(emptyState);
    return;
  }

  // 2. ACTIVE PROJECTS GRID: Dynamically create cards
  const grid = document.createElement('div');
  grid.className = 'projects-grid';

  projectList.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('aria-labelledby', `project-title-${index}`);

    // Build Technologies Badges
    const techBadges = Array.isArray(project.technologies)
      ? project.technologies.map(tech => `<span class="tech-tag">${escapeHTML(tech)}</span>`).join('')
      : '';

    // Build Action Buttons
    let actionsHTML = '';
    
    // GitHub Button (only rendered if a valid non-empty string is provided)
    if (project.github && typeof project.github === 'string' && project.github.trim() !== '') {
      actionsHTML += `
        <a href="${encodeURI(project.github)}" target="_blank" rel="noopener noreferrer" class="btn-project btn-project-github" aria-label="View source code on GitHub (opens in new tab)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          <span>GitHub</span>
        </a>
      `;
    }

    // Live Demo Button (only rendered if a valid non-empty string is provided)
    if (project.liveDemo && typeof project.liveDemo === 'string' && project.liveDemo.trim() !== '') {
      actionsHTML += `
        <a href="${encodeURI(project.liveDemo)}" target="_blank" rel="noopener noreferrer" class="btn-project btn-project-demo" aria-label="View live project deployment (opens in new tab)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          <span>Live Demo</span>
        </a>
      `;
    }

    // Card Inner Markup
    card.innerHTML = `
      <div class="project-image-wrapper" tabindex="0" role="button" aria-label="Click to enlarge image for ${escapeHTML(project.title)}">
        <img src="${escapeHTML(project.image)}" alt="Screenshot preview of ${escapeHTML(project.title)}" class="project-image" loading="lazy">
        <div class="project-image-overlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
          <span>Enlarge</span>
        </div>
      </div>
      <div class="project-content">
        <h3 id="project-title-${index}" class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-desc">${escapeHTML(project.description)}</p>
        <div class="project-tags">${techBadges}</div>
        ${actionsHTML ? `<div class="project-actions">${actionsHTML}</div>` : ''}
      </div>
    `;

    // Attach click & enter key event for Lightbox
    const imageWrapper = card.querySelector('.project-image-wrapper');
    if (imageWrapper) {
      const openModalHandler = () => {
        openLightbox(project.image, project.title);
      };
      imageWrapper.addEventListener('click', openModalHandler);
      imageWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModalHandler();
        }
      });
    }

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/**
 * Utility to escape HTML to prevent XSS.
 */
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


/* ==========================================================================
   2. Fullscreen Project Image Lightbox System
   ========================================================================== */
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
let previouslyFocusedElement = null;

/**
 * Opens the fullscreen image lightbox.
 * @param {string} src - Image source URL
 * @param {string} caption - Project title or caption
 */
function openLightbox(src, caption) {
  if (!lightboxModal || !lightboxImg) return;

  previouslyFocusedElement = document.activeElement;
  lightboxImg.src = src;
  lightboxImg.alt = caption ? `Full preview of ${caption}` : 'Full preview of project';
  if (lightboxCaption) {
    lightboxCaption.textContent = caption || '';
  }

  lightboxModal.classList.add('active');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling

  // Focus the close button for accessibility
  if (lightboxCloseBtn) {
    lightboxCloseBtn.focus();
  }
}

/**
 * Closes the fullscreen image lightbox.
 */
function closeLightbox() {
  if (!lightboxModal) return;

  lightboxModal.classList.remove('active');
  lightboxModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Restore scrolling

  if (lightboxImg) {
    lightboxImg.src = '';
  }

  // Restore previous user focus
  if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
    previouslyFocusedElement.focus();
  }
}

// Attach Lightbox event listeners
if (lightboxCloseBtn) {
  lightboxCloseBtn.addEventListener('click', closeLightbox);
}
if (lightboxOverlay) {
  lightboxOverlay.addEventListener('click', closeLightbox);
}

// Close on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
    closeLightbox();
  }
});


/* ==========================================================================
   3. Sticky Navigation & Active Section Highlight (ScrollSpy)
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  // 1. Scroll-triggered styling for sticky header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Hamburger Menu Toggle
  if (hamburgerBtn && navMenu) {
    const toggleMenu = () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      hamburgerBtn.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-active')) {
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          hamburgerBtn.classList.remove('is-active');
          navMenu.classList.remove('is-active');
        }
      });
    });
  }

  // 3. Active Nav Link Tracking with IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
  }
}


/* ==========================================================================
   4. Contact Form Validation & Feedback System
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const statusMsg = document.getElementById('form-status-msg');

  // Simple Email Regex Pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearErrors() {
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) input.classList.remove('invalid');
    });
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
    if (statusMsg) {
      statusMsg.className = 'form-status-msg';
      statusMsg.textContent = '';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal) {
      isValid = false;
      nameInput.classList.add('invalid');
      if (nameError) nameError.textContent = 'Please enter your name.';
    }

    // Validate Email
    const emailVal = emailInput ? emailInput.value.trim() : '';
    if (!emailVal) {
      isValid = false;
      emailInput.classList.add('invalid');
      if (emailError) emailError.textContent = 'Please enter your email address.';
    } else if (!emailRegex.test(emailVal)) {
      isValid = false;
      emailInput.classList.add('invalid');
      if (emailError) emailError.textContent = 'Please enter a valid email address format.';
    }

    // Validate Message
    const messageVal = messageInput ? messageInput.value.trim() : '';
    if (!messageVal) {
      isValid = false;
      messageInput.classList.add('invalid');
      if (messageError) messageError.textContent = 'Please enter a message.';
    }

    if (!isValid) return;

    // Professional Demonstration Success Feedback
    // Clearly informs user that the frontend validation succeeded and structure is ready for backend integration
    if (statusMsg) {
      statusMsg.classList.add('success');
      statusMsg.innerHTML = `
        <strong>Thank you, ${escapeHTML(nameVal)}!</strong><br>
        Your message passed frontend validation successfully. This portfolio is configured to connect with an ASP.NET Core backend or email service API.
      `;
    }

    form.reset();
  });
}


/* ==========================================================================
   5. Initialization on DOMContentLoaded
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Render projects (defaults to empty state)
  renderProjects(projects);

  // Initialize navigation & mobile drawer
  initNavigation();

  // Initialize contact form validation
  initContactForm();
});
