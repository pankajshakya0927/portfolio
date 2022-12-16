const salutationTextContainer = document.querySelector(".salutationTextContainer");
const salutationImgContainer = document.querySelector(".salutationImgContainer");
const nameContainer = document.querySelector(".nameContainer");
const profilePicContainer = document.querySelector(".profilePicContainer");
const jobTitleContainer = document.querySelector(".jobTitleContainer");
const skillsContainer = document.querySelector(".skillsContainer");
const projectsTitle = document.querySelector(".projectsTitle");

window.addEventListener("scroll", () => {
    let offsetY = window.scrollY;
    salutationTextContainer.style.transform = `translateY(${offsetY * 0.5}px)`;
    salutationImgContainer.style.transform = `translateY(${offsetY * 0.5}px)`;
    nameContainer.style.transform = `translateX(${offsetY * 0.1}px)`;
    profilePicContainer.style.transform = `translateX(${-offsetY * 0.1}px)`;
    jobTitleContainer.style.transform = `translateY(calc(200vh - ${offsetY}px))`;
    skillsContainer.style.transform = `translateX(calc(250vh - ${offsetY}px))`;
    projectsTitle.style.transform = `translateX(calc(-300vh + ${offsetY}px))`;
})