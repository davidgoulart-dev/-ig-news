import NextAuth from "next-auth";

import GitHubProvider from "next-auth/providers/github";
import { query as q } from 'faunadb'
import { fauna } from "../../../services/fauna";


export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: { params: {
        scope: 'read:user',
      }}
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email;

      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email } }
          )
        )
      } catch (error) {
        console.error('Error creating user in FaunaDB:', error);
        return false;
      }

      return true;
    }
  }
})

