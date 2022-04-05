
/*

import { Prisma, Autos} from "@prisma/client"

import {Context} from "../.."

interface AutosArgs{
    autos:{
        //Signo de interrogacion para decir que no son obligatorios
            titulo:     string
            descripcion:string
            imagen:     string
    }
  
}
interface AutosPayloadType{
    adminErrors:{
        message:String
    }[],
    autos: Autos |  Prisma.Prisma__AutosClient<Autos> | null
}
export const autosResolvers={
    autosCreate:async(_:any,{autos}:AutosArgs,{prisma}:Context):Promise<AutosPayloadType> => {
        //Desenstructurar
        const {descripcion,imagen,titulo} = autos
            if(!descripcion && !imagen && !titulo){
                return{
                    adminErrors:[{
                        message:"Falta informacion"
                    }],
                    autos:null
                }
            }
           
            return {
                adminErrors:[],
                autos:    
           prisma.autos.create({
                data:{
                    titulo,
                    descripcion,
                    imagen,
                    adminId:2
            }
        })
        }
    },
                //Antes de desenstructurar como constantes lo sacamos desde los propios argumentos de nuestra funcion
        autosUpdate: async (_:any,{autos,autosId}: {autosId:string,autos:AutosArgs["autos"]},{prisma}:Context):Promise<AutosPayloadType> => {
            const { descripcion,imagen,titulo }= autos
    
            if(!titulo && !descripcion && !imagen){
                return{
                    adminErrors:[{
                        message:"Falta informacion para actualizar"
                    }],autos:null
                } 
            }
            //Hay que corroborar que existen autos antes de actualizarlo
            const existenAutos = await prisma.autos.findUnique({
                //Where la propiedad de prisma para buscar
                where:{
                    id: Number(autosId)
                }
            })
            if(!existenAutos){
                return{
                    adminErrors:[{
                        message:"No existen autos de ese tipo"
                    }],autos:null
                }
            }
            let payloadToUpdate={
                titulo,
                descripcion,
                imagen
            }
            return {
                adminErrors:[],
                autos: prisma.autos.update({
                    data:{
                        ...payloadToUpdate
                    },
                    where:{
                        id:Number(autosId)
                    }
                })
            }
            
        },
        autosDelete:async(_:any,
            {autosId}:{autosId:string},
            {prisma}:Context):Promise<AutosPayloadType> => {
                const autos= await prisma.autos.findUnique({
                    where:{
                        id: Number(autosId)
                    }
                })
            if(!autos){
                return{
                    adminErrors:[{
                        message:"El auto no existe"
                    }],autos:null
                }
            }
            await prisma.autos.delete({
                where:{
                    id: Number(autosId)
                }
            })
            return{
                adminErrors:[],
                autos
            }
            },
    
}

*/