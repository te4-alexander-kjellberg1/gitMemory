const cards  = ["1_pig.png","2_squirrel.png", "3_rabbit.png", "4_frog.png", "5_fox.png", "6_bear.png", "7_monkey.png", "8_panda.png", "9_chick.png", "10_tiger.png", "11_penguin.png", "12_racoon.png"]
let i=0

function showCards(){
    let cardDivs = create_cards().concat(create_cards());
    
    shuffle(cardDivs).forEach((cardDiv) => {
        document.querySelector('main').appendChild(cardDiv);
    })
}

function create_cards(){
    let template = document.querySelector('#cardTemplate');
    let cardDivs = []
    
    cards.forEach((img,index) => { 
        
        let card = template.content.cloneNode(true);
        
        let cardDiv = card.querySelector('.card');
        cardDiv.setAttribute('data-pair-id', index);
        cardDiv.querySelector('.front').src = `img/${img}`; 
        cardDiv.addEventListener('click', toggleCard)
        
        cardDivs.push(cardDiv)
    })
    return cardDivs
}

function toggleCard(e){ 

  

    if(e.target.parentElement.classList.contains('matched')){
        return
    }
    
    e.target.parentElement.classList.toggle('flipped');


    if(e.target.parentElement.classList.contains('flipped')){
        i += 0.5;
        document.querySelector('.score').innerHTML = i
    }
    

    let openCards = document.querySelectorAll('.flipped');
    if(openCards.length >= 2){
        if(openCards[0].getAttribute('data-pair-id') == openCards[1].getAttribute('data-pair-id')){
            openCards[0].classList.add('matched')
            openCards[1].classList.add('matched')
        };
        setTimeout(()=> { 
            openCards[0].classList.remove('flipped')
            openCards[1].classList.remove('flipped')
        },500)
    };
};

function shuffle(list){
    let saveShuffleNumber = []
    let outputList = []
    while(saveShuffleNumber.length < list.length){
        let randNumber = Math.floor(Math.random()*list.length)
        
        if(saveShuffleNumber.indexOf(randNumber) < 0){
            saveShuffleNumber.push(randNumber);
            outputList.push(list[randNumber])
        }
    }
    // console.log(saveShuffleNumber)
    // console.log(list)
    return outputList
}

