/* =========================================================
   SNEHA PATIL — PORTFOLIO JAVASCRIPT
   CodSoft Internship Task
   =========================================================
   This file handles:
   1. Sticky navbar shadow on scroll
   2. Mobile hamburger menu toggle
   3. Smooth active link highlighting
   4. Contact form submit with success message
   5. Back to top button
   6. Scroll reveal animations (fade in on scroll)
   7. Skill bar animation
   8. Project detail modal (open / close / keyboard)
   ========================================================= */

/* ─── 1. NAVBAR SHADOW ON SCROLL ─── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ─── 2. HAMBURGER MENU (MOBILE) ─── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* ─── 3. ACTIVE NAV LINK HIGHLIGHTING ─── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const highlightNav = () => {
  let currentSection = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
};

window.addEventListener('scroll', highlightNav);
highlightNav();


/* ─── 4. CONTACT FORM ─── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  console.log('Message sent:', { name, email, message });
  formSuccess.classList.remove('hidden');
  contactForm.reset();
  setTimeout(() => formSuccess.classList.add('hidden'), 5000);
});


/* ─── 5. BACK TO TOP BUTTON ─── */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ─── 6. SCROLL REVEAL ANIMATION ─── */
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);

const revealElements = document.querySelectorAll(
  '.card, .skill-card, .project-card, .about-card, .home-text, .home-avatar, .section-title'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealElements.forEach(el => revealObserver.observe(el));


/* ─── 7. SKILL BAR ANIMATION ─── */
const skillBars = document.querySelectorAll('.skill-fill');
skillBars.forEach(bar => {
  bar.dataset.width = bar.style.width;
  bar.style.width   = '0%';
});

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => { entry.target.style.width = entry.target.dataset.width; }, 200);
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
skillBars.forEach(bar => barObserver.observe(bar));


/* ─── 8. AUTO-UPDATE FOOTER YEAR ─── */
const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  footerCopy.textContent = `© ${new Date().getFullYear()} Sneha Patil. All rights reserved.`;
}


/* =========================================================
   ─── 9. PROJECT DETAIL MODAL ───
   
   Data for all 3 projects is stored here in one place.
   When a user clicks "View Project", openModal(id) is called,
   the matching data is injected into the modal HTML,
   and the modal animates into view.
   ========================================================= */

/* --- Project Data Object ---
   Each key matches the id passed to openModal().
   Edit this object to update project details. */
const projectData = {

  portfolio: {
    badge:       'Project 01',
    title:       'Personal Portfolio Website',
    emoji:       '🌐',
    bgColor:     'linear-gradient(135deg, #DBEAFE 0%, #EDE9FE 100%)',
    description: `A fully responsive personal portfolio website designed to present my skills,
                  projects, and contact information in a clean and professional way.
                  The site features smooth scrolling, animated sections, a working contact form,
                  and is optimized for both desktop and mobile devices.`,
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox', 'CSS Grid', 'Google Fonts', 'Font Awesome'],
    features: [
      'Sticky navigation bar with frosted-glass blur effect',
      'Animated hero section with floating decorative shapes',
      'Skills section with animated progress bars on scroll',
      'Projects section with modal pop-up for each project',
      'Functional contact form with validation and success message',
      'Fully responsive layout — works on mobile, tablet, and desktop',
      'Smooth scroll-reveal animations for all sections',
      'Back-to-top button that appears after scrolling down',
    ]
  },

  todo: {
    badge:       'Project 02',
    title:       'To-Do List Web App',
    emoji:       '✅',
    bgColor:     'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
    description: `A clean and interactive task management web application that lets users
                  create, complete, and delete daily tasks. All tasks are saved to the
                  browser's local storage so your list is preserved even after closing or
                  refreshing the tab. Built entirely with vanilla JavaScript — no frameworks needed.`,
    tools: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage API', 'DOM Manipulation'],
    features: [
      'Add new tasks by typing and pressing Enter or clicking the Add button',
      'Mark tasks as complete with a single click — adds a strikethrough style',
      'Delete individual tasks using the remove button on each task card',
      'Tasks automatically saved to localStorage — persist across page reloads',
      'Filter tasks by: All, Active (pending), and Completed',
      'Task counter showing how many tasks remain',
      'Empty state message displayed when the list is clear',
      'Responsive design — works smoothly on phones and tablets',
    ]
  },

  weather: {
    badge:       'Project 03',
    title:       'Weather App',
    emoji:       '⛅',
    bgColor:     'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    description: `A real-time weather application powered by the OpenWeatherMap API.
                  Users can search for any city in the world to instantly view current
                  temperature, weather conditions, humidity levels, and wind speed.
                  The app also displays a dynamic weather icon that changes based on
                  the current sky conditions (sunny, cloudy, rainy, etc.).`,
    tools: ['HTML5', 'CSS3', 'JavaScript', 'OpenWeatherMap API', 'Fetch API', 'JSON'],
    features: [
      'Search weather for any city worldwide using a live API call',
      'Displays current temperature in °C with a feels-like reading',
      'Shows weather condition description (e.g. "Clear sky", "Light rain")',
      'Humidity percentage and wind speed displayed in real time',
      'Dynamic weather icons that change based on current conditions',
      'Error handling for invalid city names with a friendly message',
      'Loading indicator shown while fetching data from the API',
      'Clean card layout with responsive design for all screen sizes',
    ]
  }

};

/* --- DOM references for the modal elements --- */
const backdrop    = document.getElementById('modalBackdrop');
const modalImg    = document.getElementById('modalImg');
const modalBadge  = document.getElementById('modalBadge');
const modalTitle  = document.getElementById('modalTitle');
const modalDesc   = document.getElementById('modalDesc');
const modalTags   = document.getElementById('modalTags');
const modalFeat   = document.getElementById('modalFeatures');

/* --- openModal(projectId) ---
   Called when user clicks "View Project" on a card.
   Injects the matching project data and shows the modal. */
function openModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  /* Fill in image banner */
  modalImg.style.background = data.bgColor;
  modalImg.textContent       = data.emoji;

  /* Fill in text content */
  modalBadge.textContent = data.badge;
  modalTitle.textContent = data.title;
  modalDesc.textContent  = data.description;

  /* Build tech tags */
  modalTags.innerHTML = data.tools
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  /* Build features list */
  modalFeat.innerHTML = data.features
    .map(f => `<li>${f}</li>`)
    .join('');

  /* Show the modal */
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';  /* Prevent background scroll */

  /* Scroll modal to top in case it was scrolled before */
  document.getElementById('modalBox').scrollTop = 0;
}

/* --- closeModal() ---
   Hides the modal. Called by the × button, backdrop click, or Escape key. */
function closeModal() {
  backdrop.classList.remove('active');
  document.body.style.overflow = '';         /* Restore background scroll */
}

/* Close modal when Escape key is pressed */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

