import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { Query, Mutation,Profile,Orden,User } from "./resolvers";
import { PrismaClient, Prisma } from "@prisma/client";
import { getUserFromToken } from "./resolvers/utiils/getUserFromToken";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: {
    userId: number;
  } | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    Orden,
    User

  },
  context: async ({ req }: any): Promise<Context> => {
    const userInfo = await getUserFromToken(req.headers.authorization);

    return {
      prisma,
      userInfo,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready on ${url}`);
});