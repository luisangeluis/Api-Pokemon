const btnGetApi = document.querySelector('#get-api');
const divFotos20Pokemon = document.querySelector('.primeros-veinte_fotos');

const getApi = async()  =>{
   const  info  = await axios({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon'
    })

    return info;
}

btnGetApi.addEventListener('click',()=>{
    //Entendi que para manejo de errores con el catch se pueden manejar
    getApi()
        .then(res=>{
            // console.log(res)
            // console.log(res.data)
            let pokemons = res.data.results;
            console.log(pokemons);

            pokemons.forEach(element => {
                axios({
                    method:'GET',
                    url: element.url
                })
                .then(res=>{
                    console.log(res);
                })
            });
            
            // return res;
        })
       
        .catch(error=>{
            console.log(error);
        })

});
