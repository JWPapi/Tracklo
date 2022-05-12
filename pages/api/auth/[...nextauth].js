import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default NextAuth({
    adapter   : PrismaAdapter(prisma),
    providers : [
        FacebookProvider({
            clientId      : process.env.FACEBOOK_CLIENT_ID,
            clientSecret  : process.env.FACEBOOK_CLIENT_SECRET,
            authorization : 'https://www.facebook.com/v11.0/dialog/oauth?scope=email,ads_read'
        }),
        //ToDo: Remove EmailProvider
        EmailProvider({
            server : process.env.EMAIL_SERVER,
            from   : process.env.EMAIL_FROM
        })
    ],
    session   : {
        strategy : 'jwt'
    },
    callbacks : {
        async session({ session, token }) {
            session.sub = token.sub
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    },
    secret    : process.env.NEXTAUTH_SECRET
})