const templateCardPokemon=(pokemon)=>{
    
    let template = document.querySelector('#card-pokemon').content.cloneNode(true);
    let img = template.querySelector('img');
    let title = template.querySelector('.card-title');
    let text = template.querySelector('.card-text');

    return template

}