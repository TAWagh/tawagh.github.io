//Particles.js background configuration
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 65, 
            "density": { "enable": true, "value_area": 800 }
        },
        "color": {"value": ["#008080"] }, // Teal & Brown
        "shape": { 
            "type": "circle"
        },
        "opacity": { 
            "value": 0.4
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": { "enable": true, "speed": 1, "size_min": 2} // Increased size range
        },
        "line_linked": { 
            "enable": true,
            "distance": 145, 
            "color": "#808080", 
            "opacity": 0.5, 
            "width": 1.2 
        },
        "move": {
            "enable": true,
            "speed": 1.7, 
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out"
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { 
                "enable": true, 
                "mode": "repulse" 
            },
            "onclick": { 
                "enable": true, 
                "mode": "push" 
            }
        },
        "modes": {
            "repulse": { 
                "distance": 100, 
                "duration": 0.3 
            },
            "push": { 
                "particles_nb": 8, // Increased number of particles added on click
                "particles_size": 4 // Added more noticeable size change
            }
        }
    },
    "retina_detect": true
});

//Home Section title animation
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.querySelector(".headline").classList.add("animate");

        // Delay gradient effect until movement animation is done
        setTimeout(() => {
            document.querySelector(".business").classList.add("gradient");
            document.querySelector(".technology").classList.add("gradient");
        }, 1500); // Matches the transition duration
    }, 500);
});

//Toggle About Section tabs
function showContent(id) {
    const container = event.target.closest('.aboutme-tab-container');
    container.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(div => div.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

//Toggle Project Filter tabs
function filterProjects(category, event) {
    const container = event.target.closest('.project-tab-container');
    container.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.card').forEach(card => {
        card.style.display = (category === 'all' || card.getAttribute('data-category') === category) ? 'block' : 'none';
    });
}

//Project Detail Popups
function openPopup(id) {
    document.getElementById(id).style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'block';
}
function closePopup() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.style.display = 'none');
    document.getElementById('popup-overlay').style.display = 'none';
}