import type { Account} from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: Account.accessToken
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: Account.accessToken
  }
}
