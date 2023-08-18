import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/database/mongo.config";
import { User } from "@/model/User";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
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
