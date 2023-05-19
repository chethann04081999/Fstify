import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";



interface parms{
    id :number;
  }
  interface bodyy{
    Name : string;
    email: string;
    password : string;
    age : number
  }

export const postswag={
    schema:{
      body: {
        type: 'object',
        properties: {
          Name:{type:'string'},
          email:{type:'string'},
          password:{type:'string'},
          age:{type:'number'}
        }
      },
      response:{
        200:{
          type:'object',
          properties:{
            Name:{type:'string'},
            email:{type:'string'},
            password:{type:'string'},
            age:{type:'number'}
          }
        }
      }
    },
    handler:async(req:FastifyRequest,res:FastifyReply)=>{
      const user:any = new User();
      const body=req.body as bodyy
      user.Name=body.Name 
      user.email=body.email
      user.password=body.password
      user.age=body.age
  
      AppDataSource.manager.save(user);
      res.send(user);
  }
  }
  
  
 export const getswag={
    schema:{
      response:{
        200:{
          type:'array',
          properties:{
            Name:{type:'string'},
            email:{type:'string'},
            password:{type:'string'},
            age:{type:'number'}
          }
        }
      }
    },
    handler:async(req:FastifyRequest,res:FastifyReply)=>{
      const users=await User.find()
      res.send(users)
  }
  }
  
 export const putswag={
    schema:{
      params: {
        type: 'object',
        properties: {
          id: {type: 'string'}
        }
      },
      body: {
        type: 'object',
        properties: {
          Name:{type:'string'},
          email:{type:'string'},
          password:{type:'string'},
          age:{type:'number'}
        }
      },
      response:{
        200:{
          type:'object',
          properties:{
            Name:{type:'string'},
            email:{type:'string'},
            password:{type:'string'},
            age:{type:'number'}
          }
        }
      }
    },
    handler:async(req:FastifyRequest,res:FastifyReply)=>{
      const {id}:any=req.params as parms;
      const update:any=await User.findOne({where:{id}});
      const data=req.body as bodyy;
      update.Name=data.Name || update.Name;
      update.email=data.email || update.email;
      update.password=data.password || update.password;
      update.age=data.age || update.age;
      AppDataSource.manager.save(update);
      res.send(update)
    }
      
  }
  
export const getidswag={
    schema:{
      params: {
        type: 'object',
        properties: {
          id: {type: 'string'}
        }
      },
      // body: {
      //   type: 'object',
      //   properties: {
      //     Name:{type:'string'},
      //     email:{type:'string'},
      //     password:{type:'string'},
      //     age:{type:'number'}
      //   }
      // },
      response:{
        200:{
          type:'object',
          properties:{
            Name:{type:'string'},
            email:{type:'string'},
            password:{type:'string'},
            age:{type:'number'}
          }
        }
      }
    },
    handler:async(req:FastifyRequest,res:FastifyReply)=>{
      const {id}:any=req.params as parms
      const user=await User.findOne({where:{id}})
      res.send(user)
    }
  }
  
 export const deleteidswag={
    schema:{
      params: {
        type: 'object',
        properties: {
          id: {type: 'string'}
        }
      },
      response:{
        200:{
          type:'object',
          properties:{
            Name:{type:'string'},
            email:{type:'string'},
            password:{type:'string'},
            age:{type:'number'}
          }
        }
      }
    },
    handler:async(req:FastifyRequest,res:FastifyReply)=>{
      const {id}:any=req.params as parms
      const user=await User.findOne({where:{id}})
      AppDataSource.manager.remove(user)
      res.send('user is deleted')
    }
  }
  