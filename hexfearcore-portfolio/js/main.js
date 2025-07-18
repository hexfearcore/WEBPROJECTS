// DOM Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section');
const projectGrid = document.querySelector('.project-grid');
const statNumbers = document.querySelectorAll('.stat-number');
const skillLevels = document.querySelectorAll('.skill-level');
const chartItems = document.querySelectorAll('.chart-item');
const contactForm = document.querySelector('.contact-form');

// Sample project data
const projects = [
    {
        title: "Interactive Dashboard",
        description: "A responsive admin dashboard with real-time data visualization using Chart.js and interactive UI components.",
        tags: ["JavaScript", "Chart.js", "CSS Grid"],
        link: "#",
        repo: "#"
    },
    {
        title: "E-commerce Platform",
        description: "Full-featured online store with product catalog, cart functionality, and secure checkout process.",
        tags: ["React", "Node.js", "MongoDB"],
        link: "#",
        repo: "#"
    },
    {
        title: "Weather App",
        description: "Real-time weather application with location detection and 5-day forecast using OpenWeather API.",
        tags: ["API", "JavaScript", "Geolocation"],
        link: "#",
        repo: "#"
    },
    {
        title: "Task Manager",
        description: "Productivity application for managing tasks with drag-and-drop functionality and local storage.",
        tags: ["HTML5", "CSS3", "JavaScript"],
        link: "#",
        repo: "#"
    },
    {
        title: "Portfolio Website",
        description: "Modern portfolio website with animated elements and responsive design.",
        tags: ["GSAP", "CSS Animations", "Responsive"],
        link: "#",
        repo: "#"
    },
    {
        title: "Social Media Dashboard",
        description: "Analytics dashboard for social media metrics with dark/light mode toggle.",
        tags: ["React", "Chart.js", "Context API"],
        link: "#",
        repo: "#"
    }
];

// Mobile Navigation
burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
    
    // Animate Links
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Smooth Scrolling for Navigation
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.querySelector('a').getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Sticky Navigation on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Animate Stats Counter
const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-count');
        const count = +stat.innerText;
        const increment = target / 100;
        
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(animateStats, 20);
        } else {
            stat.innerText = target;
        }
    });
};

// Animate Skill Bars
const animateSkills = () => {
    skillLevels.forEach(level => {
        const skill = level.parentElement;
        const percent = skill.getAttribute('data-level');
        level.style.width = percent + '%';
    });
};

// Animate Chart Items
const animateCharts = () => {
    chartItems.forEach(item => {
        const percent = item.getAttribute('data-percent');
        const color = item.getAttribute('data-color');
        
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", "45");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("stroke", color);
        circle.setAttribute("stroke-width", "10");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke-dasharray", "283");
        circle.setAttribute("stroke-dashoffset", "283");
        circle.style.strokeDashoffset = 283 - (283 * percent / 100);
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.appendChild(circle);
        
        item.prepend(svg);
    });
};

// Generate Project Cards
const generateProjects = () => {
    projectGrid.innerHTML = '';
    
    // Tech-specific image mapping
    const techImages = {
        javascript: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600",
        react: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
        node: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=600",
        html: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600",
        css: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=600",
        api: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
        chart: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
        default: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600"
    };

    projects.forEach(project => {
        // Get the most relevant image based on first tag
        const primaryTag = project.tags[0].toLowerCase();
        const imageUrl = techImages[primaryTag] || techImages.default;
        
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${imageUrl}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.link}" target="_blank">Live Demo</a>
                    <a href="${project.repo}" target="_blank">View Code</a>
                </div>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });
};

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the data to a server
    console.log({ name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'about') {
                animateStats();
            }
            
            if (entry.target.id === 'skills') {
                animateSkills();
                animateCharts();
            }
            
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
sections.forEach(section => {
    observer.observe(section);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateProjects();
    
    // Animate hero elements
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    setTimeout(() => {
        heroContent.classList.add('slide-in-left');
        heroImage.classList.add('slide-in-right');
    }, 500);
});
