import { Prisma, Orden } from "@prisma/client"
import {Context} from "../.."
import { canUserMutateOrden } from "../utiils/canUserMutateOrden"



interface OrdenCreateArgs{
 
        title:string,
        content:string,
        User: string
    
        
    
}
interface OrdenPayloadType {
    userErrors:{
        message:string
    }[];
    orden: Orden | Prisma.Prisma__OrdenClient<Orden> | null;
}

export const OrdenResolvers={
    ordenCreate: async (_:any,{content,title,User}:OrdenCreateArgs,{prisma,userInfo}:Context):Promise<OrdenPayloadType> => {
          
       if(!userInfo){
           return{
               userErrors:[{
                   message : "No has accedido"
               }],orden:null
           }
       }
        //Desestructurar el objeto
        
        //Validacion    
        if( !title && !content) {
            return {
                userErrors: [{
                    message:"Falta informacion"
                }],
                orden:null
            }
        }
        ///Creacion de ordenes por usuarios
                
         return {
             userErrors: [],
            orden: prisma.orden.create({
                data:{
                    title,
                    content,
                    authorId: userInfo.userId, 
            }
        })
        }
    },
    ordenDelete:async(_:any,{ordenId}:{ordenId:string},{prisma,userInfo}:Context):Promise<OrdenPayloadType>=>{
        if (!userInfo) {
            return {
              userErrors: [
                {
                  message: "Forbidden access (unauthenticated)",
                },
              ],
              orden: null,
            };
          }
        
        const error = await  canUserMutateOrden({
            userId: userInfo.userId,
            ordenId: Number( ordenId),
            prisma,
        });
        if (error)
        if(!userInfo){
            return{
                userErrors:[{
                    message:"Error"
                }],orden:null
            }
        }

        const orden = await prisma.orden.findUnique({
            where:{
                id: Number(ordenId)
            }
        })
        if(!orden){
            return{
                userErrors:[{
                    message:"Orden no encontrada"
                }],orden:null
            }
        }
        await prisma.orden.delete({
            where:{
                id: Number(ordenId)
            }
        })
        return{
            userErrors:[],
            orden

        }

    },

}
