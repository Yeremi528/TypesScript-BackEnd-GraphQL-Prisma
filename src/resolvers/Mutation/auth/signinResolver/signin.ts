import { Context } from "../../../../index";
import * as bcrypt from "bcryptjs";
import * as JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../../../../keys";



interface SigninArgs {
    credentials: {
      email: string;
      password: string;
    };
  }
  
  interface UserPayload {
    userErrors: {
      message: string;
    }[];
    token: string | null;
  }
  

export const signResolver = {signin: async (
    _: any,
    { credentials }: SigninArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        userErrors: [{ message: "Invalid credentials" }],
        token: null,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        userErrors: [{ message: "Invalid credentials" }],
        token: null,
      };
    }

    return {
      userErrors: [],
      token: JWT.sign({ userId: user.id }, JSON_SIGNATURE, {
        expiresIn: 3600000,
      }),
    };
  },
}