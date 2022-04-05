import { Context } from "../..";

interface UserPayload {
  userId: number;
}

export const User = {
  ordens:async (_:any, {userId}: UserPayload, { userInfo, prisma }: Context) => {
     const user = await prisma.user.findUnique({
       where:{
         id: userId
       }
     })
     if(User){
       throw new Error("Usuario no encontrado")
     }
     if(user?.id.toString !== userInfo?.userId){
       throw new Error("No tienes las credenciales")
     }
     return{
       ordens:  await prisma.ordens.findMany({
         where:{
           userId:userInfo?.userId
         }
       })
     }
  },
};