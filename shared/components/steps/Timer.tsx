import Cookies from 'js-cookie';
import * as React from 'react';
import { useTimer } from 'react-timer-hook';


const Timer = () => {
    const expiryTimestamp = new Date();
    const session: string = typeof Cookies.get('time_in_minuterie') === 'undefined' ? '' + 10 : '' + Cookies.get('time_in_minuterie');
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(session));

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => handleExpirerTimer() });

    React.useEffect(() => {
        Cookies.set('time_in_minuterie', `${seconds}`);
        if (Cookies.get('time_in_minuterie') === '0') {
            console.log('Vous session a expirer')
        }
    }, [seconds])

    const handleExpirerTimer = () => {
        console.log('Vous session a expirer')
    }

    return (
        <div>
            {minutes} : {seconds}
        </div>
    )
}

export default Timer;