import GoogleProvider from 'next-auth/providers/google'
import type { JWT } from 'next-auth/jwt'
import type { Account, Session, User } from 'next-auth'

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, account }: {
      token: JWT,
      account: Account | null,
    }): Promise<JWT> {
      if (account) {
        token.accessToken = account.access_token // 예: OAuth 토큰 저장
      }

      return token
    },
    async session({ session, token }: {session: Session, token: JWT, user: User}): Promise<Session> {
      session.accessToken = token.accessToken // 세션에 토큰 추가

      return session
    }
  }
}
