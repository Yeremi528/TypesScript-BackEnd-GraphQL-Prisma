import { Context } from "../..";

interface CanUserMutateOrden {
  userId: number;
  ordenId: number;
  prisma: Context["prisma"];
}

export const canUserMutateOrden = async ({
  userId,
  ordenId,
  prisma,
}: CanUserMutateOrden) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      orden: null,
    };
  }

  const orden = await prisma.orden.findUnique({
    where: {
      id: ordenId,
    },
  });

  if (orden?.authorId !== user.id) {
    return {
      userErrors: [
        {
          message: "La orden no es del usuario",
        },
      ],
      orden: null,
    };
  }
};