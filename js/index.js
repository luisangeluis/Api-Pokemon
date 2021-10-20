const btnGetApi = document.querySelector('#get-api');
const divFotos20Pokemon = document.querySelector('.primeros-veinte_fotos');

const fragment = document.createDocumentFragment();

const getApi = async pURL => {
    const info = await axios({
        method: 'GET',
        url: pURL
    });
    return info;
}
//Mostrar los primeros 20 pokemon
btnGetApi.addEventListener('click', () => {
    //Entendi que para manejo de errores con el catch se pueden manejar
    const divImg = document.querySelector('.primeros-veinte_fotos');

    getApi('https://pokeapi.co/api/v2/pokemon')

        .then(res => {
            let pokemons = [...res.data.results]
            console.log(pokemons);

            const fragment = document.createDocumentFragment();

            pokemons.forEach(element =>{

                console.log(element);
                const divImg = document.createElement('div');
                const imgPokemon = document.createElement('img');
                const spanImg = document.createElement('span');

                getApi(element.url)
                    .then(result=>{
                        console.log(result);
                        divImg.className = 'hola';
                        spanImg.textContent = result.data.name;
                        imgPokemon.src = result.data.sprites.front_default;
                        
                    })
                    .catch(error=>{
                        console.log(error);

                    })
                    divImg.appendChild(spanImg);
                    divImg.appendChild(imgPokemon);
                    fragment.appendChild(divImg);   
            })

           
            
            divImg.appendChild(fragment);
        })
        .catch(error => {
            console.log(error);
        })
});

