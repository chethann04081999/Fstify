import fastify = require("fastify")
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

const app = fastify()

app.register(require('@fastify/swagger'), {
    routePrefix:'/api-docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'http://swagger.io',
        description: 'Find more info'
      },
      host: 'localhost:3002',
      schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    }}) 


interface add{
    firstName:string,
    lastName:string,
    age:number
}
interface Params {
    id: string;
  }

  const opts ={
    schema:{
        body:{
            type:"object",
            required: ['firstName'],
            properties:{
                    firstName:{type:'string'},
                    lastName:{type:'string'},
                    age:{type:'number'}
            }
        
        },
    
        response:{
            201:{
                type:'object',
                properties:{

                    status: {type:"boolean"}
                }
            }
        }
    
    }
  }
  const opts1 = {
    schema: {
      querystring: {
        type: 'object',
        properties: {
            firstName:{type:'string',},
            lastName:{type:'string'},
            age:{type:'number'}
        },
      }
    }
  }

  const opts3={
    schema:{
        params:{
            type:'object',
            required: ['id'],
            properties:{
                id:{type:'number'}
            }
        }
    }
  }

app.get('/users' ,{
    schema: {
    response: {
        200: {
            type: 'object',
            properties: {
              firstName:{type:'string',},
              lastName:{type:'string'},
              age:{type:'number'}
            }
          }
    }
  }},async(req:fastify.FastifyRequest,res:fastify.FastifyReply)=>{
         const user = await User.find()
         res.send(user)
})

app.get('/users/:id',{
    schema: {
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'To get user with id'
          }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            firstName:{type:'string',},
            lastName:{type:'string'},
            age:{type:'number'}
          }
        }
      }
    }},async(req:fastify.FastifyRequest,res:fastify.FastifyReply)=>{
    const { id }:any = req.params as Params;

    try {
        const user=await User.findOne({where:{id}})
        return user
    } catch (error) {
        console.log(error)
        
    }
})

app.post('/users', opts,async(req:fastify.FastifyRequest,res:fastify.FastifyReply)=>{
         
         const {firstName,lastName,age}:any= req.body;
         console.log(req.body);
         try {
            const user = await User.save({
                firstName,
                lastName,
                age

            })
            const data =await User.save({id:user.id,firstName:user.firstName,lastName:user.lastName,age:user.age})
            res.status(201).send({status:true});
         } catch (error) {
            console.log(error)
         }
        })

app.put('/users/:id',{
    schema: {
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'user id'
          }
        }
      },
      body: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
          obj: {
            type: 'object',
            properties: {
                firstName:{type:'string',},
                lastName:{type:'string'},
                age:{type:'number'}
            },
            response: {
                200: {
                  type: 'object',
                  properties: {
                    firstName:{type:'string',},
                    lastName:{type:'string'},
                    age:{type:'number'}
                  }
                }
              }
          }
        }
      }}},async(req:fastify.FastifyRequest,res:fastify.FastifyReply)=>{
    const {id}:any= req.params as Params;
    try {
        const user = await User.findOne({where:{id}})
        const updateduser = User.merge(user,req.body)
        return User.save(updateduser)
    } catch (error) {
        console.log(error)
    }
})

app.delete('/users/:id',opts3,async(req:fastify.FastifyRequest,res:fastify.FastifyReply)=>{
       const {id}:any=req.params as Params;
       try {
        const user=await User.findOne({where:{id}})
        await User.remove(user)
        res.send(`user was deleted sucessfully`)
       } catch (error) {
        console.log(error)
       }
})

AppDataSource.initialize().then(async () => {
    console.log("DB Created Sucessfully")
    app.listen({
        port: 3002,
        host: 'localhost'
      },()=>{
        console.log("server is running at port 3002")
    })

}).catch(error => console.log(error))
