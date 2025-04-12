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