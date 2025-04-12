//Particles.js background configuration
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80, 
            "density": { "enable": true, "value_area": 800 }
        },
        "color": {"value": ["#008080", "#808080"] }, 
        "shape": { 
            "type": "circle"
        },
        "opacity": { 
            "value": 0.7, 
            "random": true
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": { "enable": true, "speed": 1, "size_min": 4 } 
        },
        "move": {
            "enable": true,
            "speed": 1, 
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
                "particles_nb": 8,
                "particles_size": 4 
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