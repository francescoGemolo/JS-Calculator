const container = document.querySelector('.dark-mode-container');
const iconOn = document.querySelector('.hgi-idea');
const iconOff = document.querySelector('.hgi-lightbulb-off');

container.addEventListener('click', () => {
    iconOn.classList.toggle('hidden');
    iconOff.classList.toggle('hidden');
});