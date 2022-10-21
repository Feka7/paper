import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli} chainRpc={{ 5: process.env.ALCHEMY_URL }}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
