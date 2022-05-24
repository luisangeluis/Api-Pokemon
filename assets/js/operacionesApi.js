
const urlBase = 'https://pokeapi.co/api/v2/pokemon';

const getData = async (url) => {
    let data = await fetch(urlBase);

    if (!data)
        throw new Error('Hay un error');
    else
        return data.json();
}

const printPokemons = async() => {
    try{
        let pokemons = await getData(urlBase);
        
        pokemons = pokemons.results;
        
        pokemons.forEach(element => {
            getData(element)
                .then(response=>{
                    console.log(response);
                })
                .catch(error=>{
                    console.log(error)
                })
        });

    }catch(error){
        console.log(error);
    }
    




}



export { printPokemons};
