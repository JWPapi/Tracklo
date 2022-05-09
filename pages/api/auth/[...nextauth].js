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
            scope : "email,ads_read,ads_management,public_profile,business_management, read_insights"
        }),
        //ToDo: Remove EmailProvider
        EmailProvider({
            server : process.env.EMAIL_SERVER,
            from   : process.env.EMAIL_FROM
        })
    ],
    //ToDo: Redirect works wrong
    callbacks : {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return '/facebook/adAccountOverview'
        },
        async session({ session, user, token }) {
            session.user.id = user.id
            session.user.access_token = user.access_token
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        },
        async signOut({ session, user, account, profile }) {
            return '/'
        }
    },
    secret    : process.env.NEXTAUTH_SECRET
})