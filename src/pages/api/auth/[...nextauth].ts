import { config } from "@/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: config.googleClientID,
      clientSecret: config.gooleClientSecret,
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
};

export default NextAuth(authOptions);
