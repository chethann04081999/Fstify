import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "./data-source";
import { Description } from "./entity/Description";
import { Title } from "./entity/Title";



interface parms{
    id :number;
  }

  interface bodyy{
    title : string;
    
    description1: string;
    description2: string;
    description3: string;
  }


 export const posttitle={
    schema:{
        body: {
          type: 'object',
          properties: {
            title :{type: 'string'},
            description1: {type: 'string'},
            description2: {type: 'string'},
            description3: {type: 'string'}
          }
        },
        response:{
          200:{
            type:'object',
            properties:{
                title :{type: 'string'},
                description1: {type: 'string'},
                description2: {type: 'string'},
                description3: {type: 'string'}
            }
          }
        }
      },
      handler:async(req:FastifyRequest,res:FastifyReply)=>{
        const descriptions:Description[]=[];

        let body=req.body as bodyy;

        let disc1=new Description();
        disc1.description=body.description1;

        let disc2=new Description();
        disc2.description=body.description2;

        let disc3=new Description();
        disc3.description=body.description3;

        descriptions.push(disc1,disc2,disc3)

        let tit:any=new Title()
        tit.title=body.title;
        tit.descriprtions=descriptions;

        const title:any=AppDataSource.manager.save(tit);
        res.send(title)
    }
  }

export const gettitle = {
    schema:{
        response:{
          200:{
            type:'array',
            properties:{
                title :{type: 'string'},
                description1: {type: 'string'},
                description2: {type: 'string'},
                description3: {type: 'string'}
            }
          }
        }
      },
      handler:async(req:FastifyRequest,res:FastifyReply)=>{
        const titles=await Title.find()
        res.send(titles)
    }
}


export const getidtitle={
    schema:{
        params: {
          type: 'object',
          properties: {
            id: {type: 'string'}
          }
        },
        response:{
          200:{
            type:'array',
            properties:{
                title :{type: 'string'},
                description1: {type: 'string'},
                description2: {type: 'string'},
                description3: {type: 'string'}
            }
          }
        }
      },
      handler:async(req:FastifyRequest,res:FastifyReply)=>{
        const {id}:any=req.params as parms
        const title:any=await Title.findOne({where:{id}})
        res.send(title)
      }
    }

 export const puttitle={
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
            title :{type: 'string'}
          }
        },
        response:{
          200:{
            type:'object',
            properties:{
                title :{type: 'string'}
            }
          }
        }
      },
      handler:async(req:FastifyRequest,res:FastifyReply)=>{
        const {id}:any=req.params as parms;
        const update:any=await Title.findOne({where:{id}});
        const data=req.body as bodyy;
        update.title=data.title || update.title;
        AppDataSource.manager.save(update);
        res.send(update)
      }
 }

export const deleteidtitle={
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
          }
        }
      },
      handler:async(req:FastifyRequest,res:FastifyReply)=>{
        const {id}:any=req.params as parms
        await Title.delete(id);
        res.send('title is deleted')
      }
}