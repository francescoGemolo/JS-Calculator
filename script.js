// Dark Mode
const header = document.querySelector('.header');
const iconOff = document.querySelector('.hgi-lightbulb-off');
const iconOn = document.querySelector('.hgi-idea');

header.addEventListener('click', () => {
    iconOff.classList.toggle('hidden');
    iconOn.classList.toggle('hidden');
});