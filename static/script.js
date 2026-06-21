const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const backToTop = document.querySelector("[data-back-to-top]");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-nav a");
const profilePhoto = document.querySelector(".profile-photo img");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const githubProjectsContainer = document.getElementById("github-projects");
const logoSpan = document.querySelector(".brand span");
const typingName = document.getElementById("typing-name");
const particlesCanvas = document.getElementById("particles-canvas");
const preloader = document.getElementById("preloader");

// Preloader - hide immediately for testing
window.addEventListener("load", () => {
  if (preloader) {
    preloader.classList.add("is-hidden");
  }
  body.classList.add("is-loaded");
  console.log("Preloader hidden immediately, body loaded");
});

// Fallback: ensure content is visible after 3 seconds even if preloader fails
setTimeout(() => {
  if (preloader) {
    preloader.classList.add("is-hidden");
  }
  body.classList.add("is-loaded");
  console.log("Fallback: forcing preloader hide");
}, 3000);

// Show preloader when clicking navigation links
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      e.preventDefault();
      
      // Show preloader
      if (preloader) {
        preloader.classList.remove("is-hidden");
      }
      body.classList.remove("is-loaded");
      
      // Hide preloader and scroll to section after short delay
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add("is-hidden");
        }
        body.classList.add("is-loaded");
        
        // Scroll to target section
        targetSection.scrollIntoView({ behavior: "smooth" });
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove("is-active"));
        link.classList.add("is-active");
      }, 800);
    }
  });
});

// Logo Animation
logoSpan.addEventListener("click", () => {
  logoSpan.classList.add("is-expanded");
  logoSpan.textContent = "Lamarana Diallo";
  
  setTimeout(() => {
    logoSpan.classList.remove("is-expanded");
    setTimeout(() => {
      logoSpan.textContent = "LD";
    }, 300);
  }, 3000);
});

// Typing Effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Particle Background Animation
class ParticleNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    
    this.init();
    this.animate();
    this.addEventListeners();
  }
  
  init() {
    this.resize();
    this.createParticles();
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  createParticles() {
    this.particles = [];
    const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < numberOfParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
      
      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          particle.x += dx * force * 0.02;
          particle.y += dy * force * 0.02;
        }
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
      this.ctx.fill();
      
      // Draw connections
      this.particles.slice(index + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
  
  addEventListeners() {
    window.addEventListener("resize", () => {
      this.resize();
      this.createParticles();
    });
    
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    
    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
}

// Initialize particle network
if (particlesCanvas) {
  new ParticleNetwork(particlesCanvas);
}

function updateHeaderState() {
  const scrolled = window.scrollY > 20;
  header.classList.toggle("is-scrolled", scrolled);
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
}


function closeMobileNav() {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-label", "Ouvrir le menu");
}

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

// Theme toggle removed - dark theme is now default

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      if (entry.target.classList.contains("skill")) {
        const level = entry.target.dataset.level;
        const label = entry.target.querySelector(".skill > span");
        const bar = entry.target.querySelector(".progress span");
        label.dataset.value = `${level}%`;
        bar.style.width = `${level}%`;
      }

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeLink = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
      navLinks.forEach((link) => link.classList.remove("is-active"));

      if (activeLink) {
        activeLink.classList.add("is-active");
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

profilePhoto.addEventListener("error", () => {
  const sources = profilePhoto.dataset.sources.split(",");
  const currentIndex = sources.indexOf(profilePhoto.getAttribute("src"));
  const nextSource = sources[currentIndex + 1];

  if (nextSource) {
    profilePhoto.src = nextSource;
    return;
  }

  profilePhoto.hidden = true;
  profilePhoto.nextElementSibling.hidden = false;
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  
  if (!name || !email || !message) {
    formStatus.textContent = "Veuillez remplir tous les champs.";
    formStatus.style.color = "var(--accent)";
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.textContent = "Veuillez entrer une adresse email valide.";
    formStatus.style.color = "var(--accent)";
    return;
  }
  
  formStatus.textContent = "Merci pour votre message ! Je vous répondrai bientôt.";
  formStatus.style.color = "var(--accent)";
  contactForm.reset();
});

async function fetchGitHubProjects() {
  const username = "nito12973-hue";
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des projets GitHub");
    }
    
    const repos = await response.json();
    
    if (repos.length === 0) {
      githubProjectsContainer.innerHTML = "<p class='loading-message'>Aucun projet trouvé sur GitHub.</p>";
      return;
    }
    
    githubProjectsContainer.innerHTML = "";
    
    repos.forEach((repo, index) => {
      const projectCard = document.createElement("a");
      projectCard.className = "project-card project-card--link reveal";
      projectCard.href = repo.html_url;
      projectCard.target = "_blank";
      projectCard.rel = "noopener noreferrer";
      projectCard.dataset.projectName = repo.name;
      projectCard.setAttribute("aria-label", `Voir le projet ${repo.name} sur GitHub`);
      
      const languages = repo.language ? [repo.language] : [];
      const topics = repo.topics ? repo.topics.slice(0, 3) : [];
      const allTags = [...languages, ...topics];
      
      const tagsHtml = allTags.length > 0 
        ? `<div class="tags">${allTags.map(tag => `<span>${tag}</span>`).join("")}</div>`
        : "";
      
      const updatedAt = new Date(repo.updated_at).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      
      projectCard.innerHTML = `
        <svg class="icon-card"><use href="#icon-code"></use></svg>
        <h3>${repo.name}</h3>
        <p>${repo.description || "Aucune description disponible."}</p>
        ${tagsHtml}
        <div class="project-meta">
          <span class="project-date">Mis à jour le ${updatedAt}</span>
        </div>
        <span class="project-link">
          Voir sur GitHub
          <svg class="icon"><use href="#icon-external"></use></svg>
        </span>
      `;
      
      githubProjectsContainer.appendChild(projectCard);
      
      projectCard.addEventListener("click", (event) => {
        event.preventDefault();
        projectCard.classList.add("is-opening");
        window.setTimeout(() => {
          window.open(projectCard.href, "_blank", "noopener,noreferrer");
          projectCard.classList.remove("is-opening");
        }, 650);
      });
      
      setTimeout(() => {
        projectCard.classList.add("is-visible");
      }, 100 * index);
    });
    
  } catch (error) {
    console.error("Erreur GitHub API:", error);
    githubProjectsContainer.innerHTML = "<p class='loading-message'>Impossible de charger les projets depuis GitHub. Veuillez réessayer plus tard.</p>";
  }
}

fetchGitHubProjects();
