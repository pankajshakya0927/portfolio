const salutationTextContainer = document.querySelector(".salutationTextContainer");
const salutationImgContainer = document.querySelector(".salutationImgContainer");
const jobTitleContainer = document.querySelector(".jobTitleContainer");
const skillsContainer = document.querySelector(".skillsContainer");
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    let offsetY = window.scrollY;
    let docHeight = document.body.offsetHeight;
    let winHeight = window.innerHeight;
    let scrollPercent = offsetY / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);
    
    salutationTextContainer.style.transform = `translateY(${offsetY * 0.5}px)`;
    salutationImgContainer.style.transform = `translateY(${offsetY * 0.5}px)`;
    // jobTitleContainer.style.transform = `translateY(calc(200vh - ${offsetY}px))`;

    // if (scrollPercentRounded >= 38) {
    //     skillsContainer.className = "skillsContainer show";
    // } else {
    //     skillsContainer.className = "skillsContainer hide";
    // }
    // skillsContainer.style.transform = `translateX(calc(200vh - ${offsetY}px))`;

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
      
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
})

function scrollToView(elementWithClass) {
    document.querySelector(elementWithClass).scrollIntoView({behavior: 'smooth'});
}