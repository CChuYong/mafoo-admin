import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token, req }: any) => {
      if (req.nextUrl.pathname.startsWith(`/_next`)
        || req.nextUrl.pathname.startsWith(`/api`)
        || req.nextUrl.pathname.startsWith(`/login`)
      || req.nextUrl.pathname.startsWith(`/images`)) {
        return true;
      }

      return token;
    },
  },
});
