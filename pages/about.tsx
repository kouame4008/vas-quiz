import { useRouter } from 'next/router';
import React from 'react';
import NProgress from 'nprogress';
import AppLayout from '../shared/layouts/AppLayout';


export default function () {
  const router = useRouter();



  const handleClick = () => {
    router.push('/', undefined, { shallow: true })
  }
  return (
    <AppLayout title='Quiz' description='Quiz'>
      <>
        <h1>About</h1>
        <button onClick={handleClick}>Click</button>
      </>
    </AppLayout>
  )
}
