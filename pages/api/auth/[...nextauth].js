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
            clientId     : process.env.FACEBOOK_CLIENT_ID,
            clientSecret : process.env.FACEBOOK_CLIENT_SECRET
        }),
        //ToDo: Remove EmailProvider
        EmailProvider({
            server : process.env.EMAIL_SERVER,
            from   : process.env.EMAIL_FROM
        })
    ],
    callbacks : {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            session.user.id = user.id
            session.user.access_token = user.access_token
            console.log(token)
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    }
})