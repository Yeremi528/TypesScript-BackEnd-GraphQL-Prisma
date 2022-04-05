import {Context} from "../.."


interface ProfileParentType {
    id:number,
    bio:string,
    userId:number
}

export const Profile = {
    user: (parent:ProfileParentType,{userId}:{userId:string},{prisma}:Context) => {
    return prisma.user.findUnique({
        where:{
            id: parent.userId
        }
    })
},
}
