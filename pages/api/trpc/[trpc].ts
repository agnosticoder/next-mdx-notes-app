import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { withSessionRoute } from '../../../lib/withSession';
import createContext from '../../../server/context';
import appRouter from '../../../server/routers/_app';


//Todo: make cors work may be try cors library
const withCors = (handler:NextApiHandler) => {
    return async (req:NextApiRequest, res:NextApiResponse) => {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            //? : change this later maybe
            origin: 'https://next-mdx-blog-app.vercel.app',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
            credentials: true,
         });
         return handler(req, res);
    }
}

//Todo: try this after some time if cors still not working, figure something out
export default withCors(withSessionRoute(trpcNext.createNextApiHandler({ router: appRouter, createContext})));