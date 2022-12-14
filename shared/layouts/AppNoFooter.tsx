import React, { ReactNode } from 'react'
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import Footer from '../components/footer/Footer';


type Props = {
    children: ReactNode
    title: string
    description: string
}



const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}

const pathname = ['/','/verifier-otp'];

const AppNoFooter = ({ children, title, description }: Props): JSX.Element => {
    const router = useRouter()
    React.useEffect(() => {
        router.events.on('routeChangeStart', () => {
            NProgress.start()
        });

        router.events.on('routeChangeComplete', () => {
            NProgress.done()
        })
    })
    return (
        <div>
            <NextSeo title={title} description={description} openGraph={{ title, description }} />
            <motion.main
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: 'linear' }}
                className="
                    flex flex-col items-start w-full pt-10
                    px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96
                    pt-24 h-full
                "
            >
                <section>
                    <main>
                        {children}
                    </main>
                </section>
            </motion.main>
        </div>
    )
}

export default AppNoFooter;