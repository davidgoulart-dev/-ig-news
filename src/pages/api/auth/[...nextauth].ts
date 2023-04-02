import NextAuth from "next-auth";

import GitHubProvider from "next-auth/providers/github";

interface Session {
    scope: string;
    user: {
        name: string;
        email: string;
        image: string;
    };
    }
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
})




