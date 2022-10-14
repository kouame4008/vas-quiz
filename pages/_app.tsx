import '../styles/globals.scss'
import type { AppProps } from 'next/app';
// import { useRouter } from 'next/router';
import * as React from 'react';
import Loading from '../shared/components/header/Loading';
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';


function MyApp({ Component, pageProps, router }: AppProps) {

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => { setLoading(false) }, 2000);
  })

  return (
    <React.Fragment>
      {loading ?
        <Loading />
        :
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      }
    </React.Fragment>
  )
}

export default MyApp
