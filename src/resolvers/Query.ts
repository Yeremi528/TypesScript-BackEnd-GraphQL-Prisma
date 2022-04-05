import {Context} from ".."
//  El orden en que queremos obtener las cosas con el Query
interface AutosArgs{
    autos:{
        //Signo de interrogacion para decir que no son obligatorios
            titulo:     string
            descripcion:string
            imagen:     string
    }
  
}

export const Query = {
    me:(_:any,__:any,{prisma,userInfo}:Context) => {
        if(!userInfo) return null;
        return prisma.user.findUnique({
            where:{
                id: userInfo.userId
            }
        })
    },
    profile:async(_:any,{userId}:{userId:string},{prisma,userInfo}:Context) => {

        const isMyProfile= Number(userId) === userInfo?.userId

        const profile = await prisma.profile.findUnique({
            where:{
                userId:Number(userId),
            }
        })
        if(!profile)return null
        return{
            ...profile,
            isMyProfile
        }
    },
    ordens:(_:any,__:any,{prisma}:Context) => {
        return prisma.orden.findMany({
            where: {
                published:true
            },
            orderBy: [
                {
                    createdAt: "asc"
                },
               
            ]
        });
     
    },
    autosQuery :(_:any,{adminId}:{adminId:number},{prisma}:Context) => {
        return prisma.autos.findMany({
            where:{
                adminId:2
            }
        })
    }
}