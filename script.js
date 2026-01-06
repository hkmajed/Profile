document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    // --- TYPING ANIMATION ---
    const roles = ["Cloud Engineer", "DevOps Enthusiast", "Software Developer", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    const roleElement = document.querySelector('.hero-role');

    // Initial text
    const staticText = "I build things for the ";

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = staticText + currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = staticText + currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
        }
    }

    // Start typing animation
    // roleElement.textContent = staticText; // Reset initially
    // type(); // Uncomment to enable typing animation if desired, but the static text "I build things for the cloud" is also fine. 
    // Let's stick to the static text in HTML for now to avoid layout shifts, or implement a cursor.

    // --- TERMINAL LOGIC ---
    const terminalBody = document.getElementById('terminal-body');
    const cmdInput = document.getElementById('cmd-input');

    const commands = {
        'help': 'Available commands: about, skills, experience, projects, contact, clear, whoami',
        'about': 'I am a Software Developer transitioning into Cloud & DevOps. I love automating things!',
        'skills': 'Cloud: AWS, Docker, K8s, Terraform | Dev: Java, Python, JS, React, SQL',
        'experience': 'IT Specialist (7 yrs) -> Supply Planner (2 yrs) -> Aspiring Cloud Engineer',
        'projects': 'Check out my Task Management System and Weather App in the Projects section!',
        'contact': 'Email: hkmajed@hotmail.com | LinkedIn: /in/hussein-majed',
        'whoami': 'visitor@hussein-portfolio',
        'sudo': 'Permission denied: You are not in the sudoers file. This incident will be reported.'
    };

    cmdInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const input = this.value.trim().toLowerCase();

            // Create old command line
            const oldLine = document.createElement('div');
            oldLine.className = 'output-line';
            oldLine.innerHTML = `<span class="prompt">visitor@hussein-portfolio:~$</span> ${this.value}`;
            terminalBody.insertBefore(oldLine, this.parentElement);

            // Process command
            if (input === 'clear') {
                // Remove all output lines except the input line
                const lines = terminalBody.querySelectorAll('.output-line');
                lines.forEach(line => line.remove());
                // Add welcome message back
                const welcome = document.createElement('div');
                welcome.className = 'output-line';
                welcome.textContent = 'Terminal cleared.';
                terminalBody.insertBefore(welcome, this.parentElement);
            } else if (commands[input]) {
                const response = document.createElement('div');
                response.className = 'output-line';
                response.textContent = commands[input];
                response.style.color = '#ccd6f6'; // Light text for response
                terminalBody.insertBefore(response, this.parentElement);
            } else if (input !== '') {
                const error = document.createElement('div');
                error.className = 'output-line';
                error.textContent = `Command not found: ${input}. Type 'help' for available commands.`;
                error.style.color = '#ff5f56'; // Red for error
                terminalBody.insertBefore(error, this.parentElement);
            }

            // Clear input and scroll to bottom
            this.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    // Focus input when clicking on terminal
    document.querySelector('.terminal-window').addEventListener('click', () => {
        cmdInput.focus();
    });

    // --- SMOOTH SCROLLING FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- SCROLL REVEAL ANIMATION ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('section, .skill-category, .project-card, .timeline-item');
    hiddenElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}