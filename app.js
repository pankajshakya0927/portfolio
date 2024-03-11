function scrollToView(elementWithClass) {
    document.querySelector(elementWithClass).scrollIntoView({ behavior: 'smooth' });
}

const inViewport = (entries, observer) => {
    entries.forEach(entry => {
        entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

// Attach observer to every [data-inviewport] element:
const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
    Obs.observe(EL, obsOptions);
});

// Trigger toggleControlCenter function on window resize
window.addEventListener('resize', function () {
    toggleControlCenter();
});

// Function to toggle control center visibility
function toggleControlCenter() {
    var controlCenter = document.getElementById("control-center");
    var headerHeight = document.querySelector("header").offsetHeight;

    if (controlCenter.style.top === headerHeight + "px") {
        // Close the control center
        controlCenter.style.top = "-100%";
        controlCenter.style.height = "auto"; // Reset height to auto
    } else {
        // Open the control center
        controlCenter.style.top = headerHeight + "px"; // Position below header
        controlCenter.style.height = "calc(70% - " + headerHeight + "px)"; // Adjust height as needed
    }
}

function updateTimer() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    document.getElementById('timer').textContent = time;
}

// Update timer every second
setInterval(updateTimer, 1000);

// Call updateTimer once immediately to display the initial time
updateTimer();

// Get the slider and value span elements
const slider = document.getElementById('brightness-slider');
const sliderValue = document.getElementById('brightness-value');

// Add an event listener to update the displayed value when slider value changes
slider.addEventListener('input', () => {
    // Update the displayed value with the current slider value
    const value = slider.value;
    const gradient = `linear-gradient(to right, #007bff 0%, #007bff ${value}%, #ddd ${value}%, #ddd 100%)`;
    slider.style.background = gradient;
    const brightnessValue = slider.value;
    document.documentElement.style.filter = `brightness(${brightnessValue}%)`;
});

