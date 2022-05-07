const getCards = () => {
    return document.querySelectorAll(".card")
}

const getMainContainer = () => {
    return document.getElementById("main")
}

const getCardText = (card) => {
    return card.querySelector(".cardText")
}

const setCardText = (cardText, text) => {
    cardText.innerHTML = text
}

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

const cardsArray = []

const shuffleCards = (container) => {
    const reachedIndexes = []
    let randomIndex = getRandomNumber(cardsArray.length)
    while (reachedIndexes.length < cardsArray.length) {
        if (!reachedIndexes.includes(randomIndex)) {
            const cardToAddToContainer = cardsArray[randomIndex]
            container.appendChild(cardToAddToContainer)
            reachedIndexes.push(randomIndex)
        }
        randomIndex = getRandomNumber(cardsArray.length)
    }
}

const setUpGame = (words) => {
    const numCards = words.length
    const [card] = getCards()
    const container = getMainContainer()
    for (let i = 0; i < numCards; i++) {
        const cardClone = card.cloneNode(true)
        const cardText = getCardText(cardClone)
        setCardText(cardText, words[i])
        if (i % 2 === 0) {
            cardClone.setAttribute("answer", words[i + 1])
        } else {
            cardClone.setAttribute("answer", words[i - 1])
        }
        cardsArray.push(cardClone)
    }
    container.removeChild(card)
    shuffleCards(container)
}

const setCardBgColor = (card, color) => {
    card.style.backgroundColor = color
}

const setCardsCorrect = (cardQuestion, cardAnswer) => {
    setCardBgColor(cardQuestion, "lightgreen")
    setCardBgColor(cardAnswer, "lightgreen")
}
const setCardsWrong = (cardQuestion, cardAnswer) => {
    setCardBgColor(cardQuestion, "red")
    setCardBgColor(cardAnswer, "red")
}

const setCardSelected = (card) => {
    setCardBgColor(card, "lightblue")
}

let cardsSelected = []

const selectCard = (card) => {
    cardsSelected.push(card)
    setCardSelected(card)
    if (cardsSelected.length === 2) {
        const [question, answer] = cardsSelected
        const answerText = getCardText(answer).innerHTML
        if (question.getAttribute("answer") === answerText) {
            setCardsCorrect(question, answer)
        } else {
            setCardsWrong(question, answer)
        }
        cardsSelected = []
    }
}

fetch('./words.json')
    .then(response => response.json())
    .then(words => setUpGame(words))