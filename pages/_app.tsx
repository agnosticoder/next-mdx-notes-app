import '../styles/main.css';
import Layout from '../components/Layout';
import { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '../server/routers/_app';
import 'highlight.js/styles/atom-one-dark.css';

function MyApp({ Component, pageProps }: AppProps) {
// function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
    );
}

export default withTRPC<AppRouter>({
    config: ({ctx}) => {
        const url = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc` : 'http://localhost:3000/api/trpc';

        console.log('console.log(url)', url);

        return {
            url,
        }
    },
    ssr: true,
})(MyApp);
