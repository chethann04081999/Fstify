import { AppDataSource } from "./data-source"
import { deleteidswag, getidswag, getswag, postswag, putswag } from "./server"
import { deleteidtitle, getidtitle, gettitle, posttitle, puttitle } from "./titleserver"


const fastify = require('fastify')()

fastify.register(require('@fastify/swagger'))

fastify.register(require('@fastify/swagger-ui'), {
 routePrefix: '/documentation',
 uiConfig: {
   docExpansion: 'full',
   deepLinking: false
 },
 uiHooks: {
   onRequest: function (request, reply, next) { next() },
   preHandler: function (request, reply, next) { next() }
 },
 staticCSP: true,
 transformStaticCSP: (header) => header,
 transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
 transformSpecificationClone: true
})


fastify.post('/user',postswag)
fastify.get('/user',getswag)
fastify.get('/user/:id',getidswag)
fastify.put('/user/:id',putswag)
fastify.delete('/user/:id',deleteidswag)


fastify.post('/title',posttitle)
fastify.get('/title',gettitle)
fastify.get('/title/:id',getidtitle)
fastify.put('/title/:id',puttitle)
fastify.delete('/title/:id',deleteidtitle)

// fastify.post('/title',postdescription)
// fastify.get('/title',getdescription)
// fastify.get('/title/:id',getiddescription)
// fastify.put('/title/:id',putdescription)
// fastify.delete('/title/:id',deleteiddescription)

AppDataSource.initialize().then(async()=>{
    console.log('DB Created')
})
const start = async () => {
    try {
      await fastify.listen({port:3001});
      console.log(`Serverasdas running on ${fastify.server.address().port}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  start();