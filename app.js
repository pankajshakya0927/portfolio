const salutationTextContainer = document.querySelector(".salutationTextContainer");
const salutationImgContainer = document.querySelector(".salutationImgContainer");
const jobTitleContainer = document.querySelector(".jobTitleContainer");
const skillsContainer = document.querySelector(".skillsContainer");
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    let offsetY = window.scrollY;
    salutationTextContainer.style.transform = `translateY(${offsetY * 0.5}px)`;
    salutationImgContainer.style.transform = `translateY(${offsetY * 0.5}px)`;
    jobTitleContainer.style.transform = `translateY(calc(190vh - ${offsetY}px))`;
    skillsContainer.style.transform = `translateX(calc(250vh - ${offsetY}px))`;

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
      
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