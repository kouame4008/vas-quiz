import { useRouter } from 'next/router';
import Image from 'next/image';
import Spinner from '../../../public/assets/spinner.svg';



export default function () {

    return (
        <section className='Loader'>
            <div style={{ width: '150px', height: '150px' }}>
                <Image
                    src={Spinner.src}
                    width={150}
                    height={150}
                    alt={"Loader"}
                />
            </div>
        </section>
    )
}
