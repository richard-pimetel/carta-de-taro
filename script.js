'use strict';

const API_ALL_CARDS = "https://tarotapi.dev/api/v1/cards";
const API_RANDOM_CARD = "https://tarotapi.dev/api/v1/cards/random";

// Listas de cartas dos Arcanos Maiores e Menores
const arcanosMaiores = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World"
];

const arcanosMenores = [
  "Ace of Wands", "Two of Cups", "Three of Swords", "Four of Pentacles",
  "Five of Wands", "Six of Cups", "Seven of Swords", "Eight of Pentacles",
  "Nine of Wands", "Ten of Cups", "Page of Swords", "Knight of Pentacles",
  "Queen of Wands", "King of Cups"
];

// Função para buscar uma carta aleatória
async function fetchRandomCard() {
  try {
    const response = await fetch(API_RANDOM_CARD);
    const data = await response.json();

    if (data.card) { // Garante que a API retornou uma carta corretamente
      document.getElementById('random-card-name').textContent = data.card.name;
      document.getElementById('random-card-description').textContent = data.card.meaning_up;
    } else {
      console.error("Erro: Nenhuma carta recebida da API.");
    }
  } catch (error) {
    console.error("Erro ao buscar carta aleatória:", error);
  }
}

// Função para pesquisar cartas
async function searchCards(query) {
  try {
    const response = await fetch(API_ALL_CARDS);
    const data = await response.json();
    const cards = data.cards || [];

    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    let filteredCards = [];

    if (query.toLowerCase() === "arcanos maiores") {
      filteredCards = cards.filter(card => arcanosMaiores.includes(card.name));
    } else if (query.toLowerCase() === "arcanos menores") {
      filteredCards = cards.filter(card => arcanosMenores.includes(card.name));
    } else {
      filteredCards = cards.filter(card => card.name.toLowerCase().includes(query.toLowerCase()));
    }

    if (filteredCards.length > 0) {
      filteredCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        cardElement.innerHTML = `
          <h3>${card.name}</h3>
          <p>${card.meaning_up}</p>
        `;
        searchResults.appendChild(cardElement);
      });
    } else {
      searchResults.innerHTML = '<p>Nenhuma carta encontrada.</p>';
    }
  } catch (error) {
    console.error("Erro ao pesquisar cartas:", error);
  }
}

// Eventos dos botões
document.getElementById('draw-card-button').addEventListener('click', fetchRandomCard);
document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-input').value;
  searchCards(query);
});
