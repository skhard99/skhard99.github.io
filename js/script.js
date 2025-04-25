async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();

        // Hero Section
        document.querySelector('#hero-name').textContent = data.hero.name;
        document.querySelector('#hero-title').textContent = data.hero.title;
        document.querySelector('#hero-description').textContent = data.hero.description;

        // About Section
        document.querySelector('#bio-1').textContent = data.about.bio[0];
        document.querySelector('#bio-2').textContent = data.about.bio[1];
        const skillsContainer = document.querySelector('#skills-container');
        data.about.skills.forEach(skill => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';
            categoryDiv.innerHTML = `<h3>${skill.category}</h3><div class="skill-tags"></div>`;
            const tagsDiv = categoryDiv.querySelector('.skill-tags');
            skill.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'skill-tag';
                tagSpan.textContent = tag;
                tagsDiv.appendChild(tagSpan);
            });
            skillsContainer.appendChild(categoryDiv);
        });

        // Experience Section
        const experienceContainer = document.querySelector('#experience-container');
        data.experience.forEach(exp => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `
                <h3 class="card-title">${exp.title}</h3>
                <h4 class="card-subtitle">${exp.company}</h4>
                <div class="card-date">${exp.date}</div>
                <div class="card-content"><ul></ul></div>
            `;
            const ul = cardDiv.querySelector('ul');
            exp.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                ul.appendChild(li);
            });
            experienceContainer.appendChild(cardDiv);
        });

        // Projects Section
        const projectContainer = document.querySelector('#project-container');
        data.projects.forEach(project => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `
                <h3 class="card-title">${project.title}</h3>
                <h4 class="card-subtitle">${project.subtitle}</h4>
                <div class="card-date">${project.date}</div>
                <div class="card-content"></div>
            `;
            const contentDiv = cardDiv.querySelector('.card-content');
            if (project.details) {
                const ul = document.createElement('ul');
                project.details.forEach(detail => {
                    const li = document.createElement('li');
                    li.textContent = detail;
                    ul.appendChild(li);
                });
                contentDiv.appendChild(ul);
            } else if (project.description) {
                contentDiv.innerHTML = `<p>${project.description}</p>`;
            }
            projectContainer.appendChild(cardDiv);
        });

        // Education Section
        const educationContainer = document.querySelector('#education-container');
        data.education.forEach(edu => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `
                <h3 class="card-title">${edu.title}</h3>
                <h4 class="card-subtitle">${edu.institution}</h4>
                <div class="card-date">${edu.date}</div>
                <div class="card-content"></div>
            `;
            const contentDiv = cardDiv.querySelector('.card-content');
            edu.details.forEach(detail => {
                const p = document.createElement('p');
                p.textContent = detail;
                contentDiv.appendChild(p);
            });
            educationContainer.appendChild(cardDiv);
        });

        // Achievements Section
        const achievementsContainer = document.querySelector('#achievements-container');
        data.achievements.forEach(ach => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `
                <h3 class="card-title">${ach.title}</h3>
                <div class="card-content"><ul></ul></div>
            `;
            const ul = cardDiv.querySelector('ul');
            ach.items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            });
            achievementsContainer.appendChild(cardDiv);
        });

        // Footer
        document.querySelector('#footer-title').textContent = data.footer.title;
        document.querySelector('#footer-description').textContent = data.footer.description;
        document.querySelector('#footer-copyright').textContent = data.footer.copyright;
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Load content when DOM is ready
window.addEventListener('DOMContentLoaded', loadContent);