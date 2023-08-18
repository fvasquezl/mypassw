import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/database/mongo.config";
import { User } from "@/model/User";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        connect();

        const findUser = await User.findOne({ email: user.email });
        if (findUser) {
          return true;
        }
        await User.create({ name: user.name, email: user.email });
        return true;
      } catch (error) {
        console.log("Sign In error", error);
        return false;
      }
    },
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        connect();

        const user = await User.findOne({
          email: credentials?.email,
        });
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
};
export default authOptions;
