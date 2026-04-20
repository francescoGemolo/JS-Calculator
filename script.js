// Dark Mode
const container = document.querySelector('.dark-mode');
const iconOn = document.querySelector('.hgi-idea');
const iconOff = document.querySelector('.hgi-lightbulb-off');

container.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    iconOn.classList.toggle('hidden');
    iconOff.classList.toggle('hidden');
});