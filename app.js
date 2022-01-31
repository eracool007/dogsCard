// API à utiliser pour les images de chiens: https://dog.ceo/api/breeds/image/random

//initialize
const url = 'https://dog.ceo/api/breeds/image/random/50';
const btn = document.querySelector('#btn-view');
const dogId = document.querySelector('#dogId');
const dogAge= document.querySelector('#dogAge');
const dogRegistry = document.querySelector('#dogRegistry');
const dogApi = document.querySelector('#dogsAPI');
let currentDog = 0;
const dogsArray = [];

const init = async () => {
    btn.addEventListener('click', function() {
        viewNext();
    });
    const dog = await fetchADog();

    let urlArray = dog.message
    .map((dog) => {
        const { dog_url } = dog;
    });
    createArray(dog);
    displayDog();
}

//fetch dog api
const fetchADog = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

//create dog information array
const createArray = (dog) => {
    let numId = 2100;
    let numRegistry = 100;
    let numAge;

    for (i=0; i < dog.message.length; i++) {
        numId++;
        numRegistry++;
        numAge = randomNumber(1, 12);
        let dogArray = [numId, numRegistry, numAge, dog.message[i]];
        dogsArray.push(dogArray);
    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

//display dog
const displayDog = (dog) =>{
    dogId.innerHTML=dogsArray[currentDog][0];
    dogRegistry.innerHTML = dogsArray[currentDog][1];
    dogAge.innerHTML = dogsArray[currentDog][2];
    dogsAPI.src= dogsArray[currentDog][3];
    currentDog++;
    if (currentDog > dogsArray.length - 1) {
        currentDog = 0;
    } 
}

function viewNext(){
    displayDog();
}

window.addEventListener('load', init);