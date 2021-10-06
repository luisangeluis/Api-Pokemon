const btnGetApi = document.querySelector('#get-api');
const divFotos20Pokemon = document.querySelector('.primeros-veinte_fotos');

const fragment = document.createDocumentFragment();


const  getContainerImg=(pSrc)=>{

    let content =   `<div>
                        <img = ${pSrc}>
                    </div>`;
    
    fragment.appendChild(content);
}

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
            // console.log(res)
            // console.log(res.data)
            let pokemons = res.data;
            console.log(pokemons);


            // pokemons.results.forEach(element => {
            //     // console.log(element);
            //     const img = document.createElement('img');

            //     getApi(element.url)
            //         .then(res => {
            //             console.log(res);
            //              img.src = res.data.sprites.front_default; 
            //              img.setAttribute('class','foto_pokemon');
            //         })
            //     fragment.appendChild(img);
            // });
            pokemons.results.forEach(element=>{
                
                getApi(element.url)
                    .then(res=>{
                        console.log(res);
                        getContainerImg(res.data);

                    })

                 
                
            })

            divImg.appendChild(fragment);
            

        })
        .catch(error => {
            console.log(error);
        })
});

