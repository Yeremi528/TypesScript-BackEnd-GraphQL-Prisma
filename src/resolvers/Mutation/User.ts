import { Context } from "../..";

interface UserParentType {
  id: number;
}

export const User = {
  ordens: (parent: UserParentType, __: any, { userInfo, prisma }: Context) => {
    const isOwnProfile = parent.id === userInfo?.userId;

    if (isOwnProfile) {
      return prisma.orden.findMany({
        where: {
          authorId: parent.id,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    } else {
      return prisma.orden.findMany({
        where: {
          authorId: parent.id,
          published: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    }
  },
};