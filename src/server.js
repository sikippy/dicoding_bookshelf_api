var hapi = require('@hapi/hapi');
var routes = require('./routes');

const server = hapi.server({
    port:9000,
    host:process.env.NODE_ENV!=='production'?'localhost':'0.0.0.0',
    routes:{
        cors:{
            origin:['*'],
        },
    },
});

const init = async()=>{
    server.route(routes);
    await server.start();
    console.log(`Server run at : ${server.info.uri}`);
}
init();
