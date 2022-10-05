import '../styles/globals.scss'
import type { AppProps } from 'next/app';
// import { useRouter } from 'next/router';
import * as React from 'react';
import Loading from '../shared/components/header/Loading';


function MyApp({ Component, pageProps,router }: AppProps) {

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
     setTimeout(() => {setLoading(false)}, 2000);
  })

  return (
    <React.Fragment>
      {loading ?
        <Loading />
        : <Component {...pageProps} />}
    </React.Fragment>
  )
}

export default MyApp
