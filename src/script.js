const jokesUrl = "https://api.chucknorris.io/jokes/random";
const inputField = document.getElementById('input');
const actionButton = document.getElementById('action');
//Overlay references //
const overlay = document.querySelector('.overlay');
const gotItButton = document.querySelector('.got-it-btn');
const nextButton = document.querySelector('.next-btn');
const modalHeading = document.querySelector('.modal h2');
const modalContent = document.querySelector('.modal p');
//
const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
}
const handleInvalidEmail = () => {
    inputField.value = '';
    inputField.classList.add('invalid-email');
    inputField.placeholder = 'Email address invalid';
}
const clearField = () => {
    inputField.value = '';
    inputField.classList.remove('invalid-email');
    inputField.placeholder = 'Your work email';

}
const getJoke = async () => {
    try {
        const response = await fetch(jokesUrl);
        const joke = await response.json();
        overlay.style.display = 'block';
        overlay.classList.add('fade-in-overlay');
        return joke;
    } catch (err) {
        console.log(err.message);
    }
}
const handleAction = async () => {
    const email = inputField.value;
    if (!validateEmail(email)) return handleInvalidEmail();
    clearField();
    try {
        const joke = await getJoke();
        modalHeading.innerText = `Hello, ${email}!\nYour joke of the day is:`;
        modalContent.innerText = joke.value;

    } catch (err) {
        console.log(err.message)
    }
}
const handleGotIt = () => {
    overlay.style.display = 'none';
    document.getElementById("audio").play();
}
const handleNext = async () => {
    const anotherJoke = await getJoke();
    modalContent.innerText = anotherJoke.value;
}
actionButton.addEventListener('click', handleAction);
inputField.addEventListener('keydown', (ev) => {
    if(ev.key === 'Enter') {
        handleAction();
    }
}); 
gotItButton.addEventListener('click', handleGotIt);
nextButton.addEventListener('click', handleNext);