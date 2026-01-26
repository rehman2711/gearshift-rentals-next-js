import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const auth = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "type email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "type password",
        },
      },
      // async authorize(credentials, req) {
      async authorize(credentials) {
        const TEST_USER = {
          id: "1",
          name: "Admin",
          email: "admin@gmail.com",
          password: "admin@1234",
        };

        if (!credentials) {
          return null;
        }

        if (
          credentials?.email === TEST_USER.email &&
          credentials?.password === TEST_USER.password
        ) {
          return {
            id: TEST_USER.id,
            name: TEST_USER.name,
            email: TEST_USER.email,
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
});
export { auth as GET, auth as POST };
