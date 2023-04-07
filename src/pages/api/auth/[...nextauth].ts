import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { query as q } from 'faunadb';
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
      const { email } = user;

      if (!email) {
        return false;
      }

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(email)
              )
            )
          )
        );
        return true;
      } catch {
        return false;
      }
    },
  },
});
