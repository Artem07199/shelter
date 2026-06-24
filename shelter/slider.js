let allPets = [];
let currentVisiblePets = [];
let isAnimating = false;

const initialPetNames = ["Katrine", "Jennifer", "Woody"]; 

const cardsWrapper = document.querySelector('.cards-wrapper');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');

fetch('pets.json')
  .then(response => response.json())
  .then(data => {
    allPets = data;
    currentVisiblePets = allPets.filter(pet => initialPetNames.includes(pet.name));
    renderCards(currentVisiblePets);
  });

function getCardsCount() {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1280) return 2;
  return 3;
}

function generateRandomSet(count) {
  let availablePets = allPets.filter(pet => !currentVisiblePets.includes(pet));

  if (availablePets.length < count) {
    availablePets = [...allPets];
  }

  let resultSet = [];
  while (resultSet.length < count && availablePets.length > 0) {
    const randomIndex = Math.floor(Math.random() * availablePets.length);
    const randomPet = availablePets[randomIndex];
    
    resultSet.push(randomPet);
    availablePets.splice(randomIndex, 1);
  }
  return resultSet;
}

function renderCards(pets) {
  isAnimating = true;
  cardsWrapper.classList.add('fade-out');

  setTimeout(() => {
    cardsWrapper.innerHTML = '';
    pets.forEach(pet => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${pet.img}" alt="${pet.name}">
        <p>${pet.name}</p>
        <button class="card-btn">Learn more</button>
      `;
      cardsWrapper.appendChild(card);
    });
    
    cardsWrapper.classList.remove('fade-out');
    isAnimating = false;
  }, 300);
}

function handleNavigation() {
  if (isAnimating) return;
  currentVisiblePets = generateRandomSet(getCardsCount());
  renderCards(currentVisiblePets);
}

nextBtns.forEach(btn => btn.addEventListener('click', handleNavigation));
prevBtns.forEach(btn => btn.addEventListener('click', handleNavigation));

window.addEventListener('resize', () => {
  const newCount = getCardsCount();
  if (currentVisiblePets.length !== newCount) {
    currentVisiblePets = generateRandomSet(newCount);
    renderCards(currentVisiblePets);
  }
});