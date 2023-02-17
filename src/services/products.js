const fetch = require('node-fetch');
const config = require('../config');
const providers = config.PROVIDERS;

const getProductsProvider = async (provider) => {
    try {

        const response = await fetch(provider.URL);
        const products = await response.json();
        
        products.map((prod) => prod.provider = provider)
        
        return products
        //return { provider : provider , products : products}

    } catch (e) {
        console.log(e);
    }
}

module.exports.getProducts = async () => {
    try {
        const results = await Promise.all(providers.map(provider => getProductsProvider(provider)));
        let prodsAll = [];
        results.map((prds) => { prodsAll = prodsAll.concat(prds); });
        return prodsAll;
    } catch (error) {
        return console.log(error);
    }
}

module.exports.print = () => {
   console.log('teste print')
}
