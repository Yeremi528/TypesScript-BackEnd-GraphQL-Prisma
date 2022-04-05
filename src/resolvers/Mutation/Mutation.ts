import {OrdenResolvers} from "./orden"
import {autosResolvers} from "./autos"
import {signUpResolver} from "./auth/signup/signup"
import {signResolver} from "./auth/signinResolver/signin"

export const Mutation = {
    ...OrdenResolvers,
    ...autosResolvers,
    ...signUpResolver,
    ...signResolver
    

 

}
