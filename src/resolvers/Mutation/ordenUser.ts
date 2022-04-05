import DataLoader from "dataloader"
import {Context} from "../.."
import { userLoader } from "../../loaders/userLoader"


interface OrdenParentType {
    authorId:number
}

export const Orden = {
    user: (parent:OrdenParentType,__:any,{prisma}:Context) => {
    return userLoader.load(parent.authorId)
},
}
