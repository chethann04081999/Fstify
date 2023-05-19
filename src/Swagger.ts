const swaggerObject=()=>({
    routePrefix: '/swagger',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Fastify API Demo App',
        description: 'Fastify API Demo with Postgres',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    }
  })

  module.exports = swaggerObject;