let n_cards;
let allow_click = true;
let n_plays = 0;
let right_plays = 0;

const front_cards = ["assets/bobrossparrot.gif", "assets/explodyparrot.gif", "assets/fiestaparrot.gif", "assets/metalparrot.gif", "assets/revertitparrot.gif", "assets/tripletsparrot.gif", "assets/unicornparrot.gif"];

validate_n_cards();

function validate_n_cards(){
    n_cards = Number(prompt("Com quantas cartas você quer jogar?"));
    while(true){
        if(n_cards == "") {
            alert("Insira um número par entre 4 e 14!");
        }
        else if(n_cards % 2 === 0 && n_cards >= 4 && n_cards <= 14) break;
        else {
            alert("O número selecionado deve ser par e entre 4 e 14!");
        } 
        n_cards =  Number(prompt("Com quantas cartas você quer jogar?"));
    }
    create_cards(n_cards);
}

function comparer() { 
	return Math.random() - 0.5; 
}

function checkEndGame(){
    if(right_plays == n_cards/2) {
        alert(`Você ganhou em ${n_plays} jogadas!`);
        location.reload();
    }
}

function randomize_cards_gifs(n){
    let random_cards = front_cards.slice(0, n);
    /* Duplicate gifs */
    for(let j=0; j<n; j++){
        random_cards.push(random_cards[j]);
    }
    /* Sort gifs */
    random_cards.sort(comparer);
    return random_cards;
}

function create_cards(n) {
    const container = document.getElementById('card_container');
    const random_gifs = randomize_cards_gifs(n/2);
    for(let i=0; i<n; i++){
        let gif = random_gifs[i];
        /* Creating card element */
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-test', 'card');

        
        const inner = document.createElement('div');
        inner.classList.add('inner');
        card.appendChild(inner);

        const back = document.createElement('div');
        const back_img = document.createElement('img');
        back_img.setAttribute('src', 'assets/back.png');
        back_img.setAttribute('data-test', 'face-down-image');
        back.classList.add('back');
        back.appendChild(back_img);
        inner.appendChild(back);

        const front = document.createElement('div');
        const front_img = document.createElement('img');
        front_img.setAttribute('src', gif);
        front_img.setAttribute('data-test', 'face-up-image');
        front.appendChild(front_img);
        front.classList.add('front');
        inner.appendChild(front);

        container.appendChild(card);
    }


    const cards = document.querySelectorAll('.inner');
    [...cards].forEach((card)=>{
        card.addEventListener('click', function(){
            if(!allow_click) return;
            n_plays++;
            const first = document.querySelector('.first');
            const second = document.querySelector('.second');
            /* If no cards are turned up, this card is set as first and turned */
            if(first === null){
                card.classList.add('first');
                card.style.transform = "rotateY(180deg)";
            }
            /* If only the first card is turned up, this card is set as second and turned */
            else if(first !== null && second === null){
                /* The click should not be permited until both cards are checked if they maytch */
                allow_click = false;
                card.classList.add('second');
                const first_img = first.querySelector('.inner .front img').getAttribute('src');
                const card_img = card.querySelector('.inner .front img').getAttribute('src');
                card.style.transform = "rotateY(180deg)";
                /* Check if the cards match */
                setTimeout(function(){
                    /* If cards don't match: turn both cards again*/
                    if(first_img !== card_img){
                        first.style.transform = "rotateY(360deg)";
                        card.style.transform = "rotateY(360deg)";
                    } else{ /* If cards match: increase right plays count and check if game ended */
                        right_plays++;
                        checkEndGame();
                    }
                    /* After the match is checked, we allow the clicking again */
                    allow_click = true;
                    /* Removing the first and second classes to allow next cards to be stored*/
                    first.classList.remove('first');
                    card.classList.remove('second');
                }, 1000);
            }
        })
    });
}