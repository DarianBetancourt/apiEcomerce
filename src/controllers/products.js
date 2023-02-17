const {getProducts} = require('../services/products');

const list = async (req, res) => {
    try {
        const products = await getProducts();
        res.send(products);   
    } catch (error) {
        res.status(500).send( {msg :'error getting products', error : error} ); 
    }
}

const categories = async (req, res) => {
    try {
        const products   = await getProducts();
        /* If the product does not have a category, create a category "others"*/
        products.map((product) => (product.categoria || product.category) ? null : product.category = 'Others'); 
        
        const categories = [...new Set(products.map((product) => product.categoria || product.category))]
        
        res.send(categories);   
    } catch (error) {
        res.status(500).send( {msg :'error getting categories', error : error} ); 
    }
}

const productsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        console.log(category)
        const products = await getProducts();

        /* If the product does not have a category, create a category "Others"*/
        products.map((product) => (product.categoria || product.category) ? null : product.category = 'Others'); 

        const categoryProducts = products.filter(product => {
           return product.categoria === category || product.category === category
        });

        console.log(categoryProducts.length)

        res.send(categoryProducts);   
    } catch (error) {
        res.status(500).send( {msg :'error getting category products', error : error} ); 
    }
}

const filterProducts = async (req, res) => {
    try {
        let   products = await getProducts();
        const category = req.query.category || null
        const name     = req.query.name || null
        const price    = req.query.price || null
        
        /* If the product does not have a category, create a category "Others"*/
        products.map((product) => (product.categoria || product.category) ? null : product.category = 'Others'); 
        
        if(category){
            products = products.filter(product => {
               return product.categoria === category || product.category === category
            });
        }

        if(name){
            products = products.filter(product => {
                return product.nome === name || product.name === name
            });
        }
        
        if(price){
            const strPrice   = price.split('-');
            const lowerPrice = strPrice[0];
            const higherPrice = strPrice[1];

            products = products.filter(product => {
                const verifyPreco = product.preco >= lowerPrice && product.preco <= higherPrice
                const verifyPrice = product.price >= lowerPrice && product.price <= higherPrice
                return verifyPreco || verifyPrice
            });
        }
        

        res.send(categoryProducts);   
    } catch (error) {
        res.status(500).send( {msg :'error getting category products', error : error} ); 
    }
}

const show = async (req, res) => {
    try {
        console.log(req.query.provider || 'hola')
        const product_id  = req.params.id
        const provider_id = req.body.provider
        const products    = await getProducts();
        console.log(product_id)
        console.log(provider_id)
        console.log(products.length)
        
        const product =  products.find(({id, provider}) => {
            console.log(id +'-'+ provider.id)
            return id === product_id && provider.id === provider_id
        })
        console.log(product);

        res.send([
            {
                message : "getting product whit id " + product_id,
                product :  product
            }
        ])
    } catch (error) {
        res.status(500).send({message : "error" , error: error});
    }
};

const update = async (req, res) => {
    try {
        req.user = await User.findById(req.params.id);
        create_edit(req, res, 'update');
    } catch (error) {
        res.status(500).send({message : "error" , error: error});
    }
};

const remove = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send("User whit id:"+req.params.id+" deleted" )
    } catch (error) {
        res.status(500).send({message : "error" , error: error});
    }
   
};

module.exports = { list, show, update, remove, categories, productsByCategory ,filterProducts};