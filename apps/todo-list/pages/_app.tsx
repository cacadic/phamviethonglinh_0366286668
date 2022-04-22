import { AppProps } from 'next/app';
import Head from 'next/head';
import '@public/styles/tailwind.css';
import 'antd/dist/antd.css';
import 'simplebar/dist/simplebar.min.css';
import '@public/styles/app.scss';
import { AppContextProvider, MasterContext } from '@sotatek/contexts';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to todo-list!</title>
      </Head>
      <main className="app h-full overflow-auto lg:overflow-hidden">
        <MasterContext components={[[AppContextProvider]]}>
          <Component {...pageProps} />
        </MasterContext>
      </main>
    </>
  );
}

export default CustomApp;
