import {gql} from "apollo-server"

export const typeDefs = gql `
   type Query {
       me:User
       ordens: [Orden!]!
       profile(userId:ID!):Profile
       autosQuery: [Autos]
       
   }
   type Mutation {
       ordenCreate(title:String!,content:String!):ordenPayload
       ordenDelete(ordenId:ID!):ordenPayload
       autosCreate(autos: autosInput!):autosPayload!
       autosUpdate(autosId:ID!,autos:autosInput!):autosPayload!
       autosDelete(autosId:ID!):autosPayload!
        signup(credentials: CredentialsInput!name: String!bio: String
        apellido:String!
    ): AuthPayload
    signin(credentials: CredentialsInput!):Token
  }
  type Token {
      token:String
  }
   type Orden {
       id:   ID!
       title:String!
       content:String!
       createdAt:String
       published: Boolean
       user:User!
   }
   
   type User {
       id:ID!
       apellido:String!
       name:String!
       email:String!
       password:String!
       ordens:[Orden!]!
   }
   type Profile {
       id:ID!
       bio:String
       isMyProfile:Boolean!
       user:User!
   }
   type UserErrors{
       message:String
   }
   type ordenPayload {
       userErrors: [UserErrors!]!
       orden:Orden
   }
   type Admin {
       id:ID!
       name:String!
       email:String!
       password:String!
       autos:  [Autos]
   }
   type Autos{
       id:          ID!
       titulo:      String!
       imagen:      String!
       descripcion: String!
       admin:       Admin
       stock:       Boolean

   }
   type autosPayload{
       adminErrors: [AdminsErrors]
       autos:Autos
   }
   type AdminsErrors {
       message:String
   }
   input autosInput {
       titulo: String
       imagen:String
       descripcion:String
       stock: String
   }
   type AuthPayload {
       userErrors: [UserErrors!]!
       token: String
   }
   input CredentialsInput {
       email: String!
       password: String!
   }
   type Error {
       path: String!
       message: String!
   }

 
   
`
