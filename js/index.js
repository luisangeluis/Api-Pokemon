const btnDesplegar = document.querySelector('.desplegar-btn');
const mainNav = document.querySelector('.header_main-nav');

//HEADER
//Navegacion principal
btnDesplegar.addEventListener('click', () => {

    //GRID
    mainNav.classList.toggle('main-nav_show');

    // mainNav.setAttribute('style', 'display:block');



});

addEventListener('resize', e => {
    ancho = document.documentElement.clientWidth;
    console.log(ancho);
    if (ancho > 900) {
        mainNav.classList.remove('d-flex');
    }
})

//API POKEMON
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

            pokemons.forEach(element => {

                // console.log(element);
                const divImg = document.createElement('div');
                const imgPokemon = document.createElement('img');
                const spanImg = document.createElement('span');

                getApi(element.url)
                    .then(result => {
                        // console.log(result);
                        divImg.className = 'div-img';
                        spanImg.textContent = result.data.name;
                        imgPokemon.src = result.data.sprites.front_default;

                    })
                    .catch(error => {
                        console.log(error);

                    })
                divImg.appendChild(imgPokemon);
                divImg.appendChild(spanImg);

                fragment.appendChild(divImg);
            })



            divImg.appendChild(fragment);
        })
        .catch(error => {
            console.log(error);
        })
});
/*Evento click a los primeros 20 pokemon*/
const primerosVeinte = document.querySelector('.primeros-veinte');

const getTemplateModal = (pJson) => {
    let templateModal = document.querySelector('#template-modal').content.cloneNode(true);
    let img = templateModal.querySelector('img');
    let span = templateModal.querySelector('span');

    img.src = pJson.data.sprites.front_default;
    span.textContent = pJson.data.name;

    return templateModal;
}

const activarBTNCerrar = (pParentELement, pSonElement) => {

    if (document.querySelector('.modal-ventana') != null) {
        const btnCloseModal = document.querySelector('.close-modal');

        btnCloseModal.addEventListener('click', () => {
            pParentELement.removeChild(pSonElement);
        })
    }
}

divFotos20Pokemon.addEventListener('click', (e) => {
    // console.log(e);
    let element = e;
    if (element.target && element.target.localName == 'img') {

        console.log(element);

        let nombrePokemon = element.target.nextSibling.textContent;

        getApi(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)

        .then(result => {
            console.log(result);
            let template = getTemplateModal(result);
            primerosVeinte.appendChild(template);


            const modal = primerosVeinte.querySelector('.modal-ventana');

            modal.classList.add('d-flex');
            activarBTNCerrar(primerosVeinte, modal);
        }).catch(error => console.log(error.message))

    } else {
        // console.log('no es un img');
    }
})