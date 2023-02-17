require('dotenv/config');

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    //HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 5000,
    PROVIDERS : [
        {
            id : 1,
            URL : 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'
        },
        {
            id : 2,
            URL : 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'
        }
    ],
    
}