validate_n_cards();



function validate_n_cards(){
    let n_cards = Number(prompt("Com quantas cartas quer jogar?"));
    while(true){
        if(n_cards == "") {
            alert("Insira um número par entre 4 e 14!");
        }
        else if(n_cards % 2 === 0 && n_cards >= 4 && n_cards <= 14) break;
        else {
            alert("O número selecionado deve ser par e entre 4 e 14!");
        } 
        n_cards =  Number(prompt("Com quantas cartas quer jogar?"));
    }
    create_cards(n_cards);
}

function create_cards(n) {
    const container = document.getElementById('card_container');
    for(let i=0; i<n; i++){
        const card = document.createElement('div');
        card.classList.add('card');
        const card_img = document.createElement('img');
        card_img.setAttribute('src', 'assets/back.png');
        card.appendChild(card_img);
        container.appendChild(card);
    }
}