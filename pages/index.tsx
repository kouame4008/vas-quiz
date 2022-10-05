import { useRouter } from 'next/router';
import React from 'react';
import AppLayout from '../shared/layouts/AppLayout';


export default function () {
  const router = useRouter();

  const handleClick = () => {
    router.push('/about', undefined, { shallow: true })
  }

  return (
    <AppLayout title='Quiz' description='Quiz'>
      <>
        <h1>
          Welcome
          <button onClick={handleClick}>Click</button>
        </h1>
      </>
    </AppLayout>

  )
}
