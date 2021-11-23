import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getRemainingTimeUntilMsTimestamp } from './CountdownUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faInstagram, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import Aos from "aos"
import "aos/dist/aos.css"

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',

}

const Countdown = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs])

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    useEffect(() => {
        Aos.init({
            duration: 2000
        });
    }, []);


    const isTablet = useMediaQuery({ query: '(max-width: 1000px)'})
    const isWideScreen = useMediaQuery({ query: '(min-width: 1001px)'})

    return (
        <div>
        {isWideScreen && 
        <div>
            <h2 class="text-center mt-3">0xTime</h2>
            <div class="countdown" data-aos="zoom-in">
                <h1 class="">Coming Soon</h1>
                <div class="countdown-timer">
                    <span className="two-numbers">{remainingTime.days}</span>
                    <span>days</span>
                    <span className="two-numbers">{remainingTime.hours}</span>
                    <span>hours</span>
                    <span className="two-numbers">{remainingTime.minutes}</span>
                    <span>minutes</span>
                    <span className="two-numbers">{remainingTime.seconds}</span>
                    <span>seconds</span>
                </div>
                <div class="text-center pt-2">
                    <p>The Website will launch the 1st of december - scroll down to learn about the project</p>
                    <p>Join us on our social media.</p>
                </div>
                <div class="row justify-content-center text-center pt-4 ">
                    <a href="https://instagram.com/0xtime" target="_blank" rel="noopener norefferer" class="col">
                    <FontAwesomeIcon icon={faInstagram} className="icon-footer" />
                    </a>
                    <a href="https://discord.gg/fGUYR8AC" target="_blank" rel="noopener norefferer" class="col">
                    <FontAwesomeIcon icon={faDiscord} className="icon-footer" />
                    </a>
                    <a href="https://twitter.com/0xTime_io" target="_blank" rel="noopener norefferer" class="col">
                    <FontAwesomeIcon icon={faTwitter} className="icon-footer" />
                    </a>
                </div>
            </div>
            </div>
            }
            {isTablet && 
        <div>
            <h2 class="text-center mt-3">0xTime</h2>
            <div class="countdown" data-aos="zoom-in">
                <h1 class="text-center">Coming Soon</h1>
                <div class="countdown-timer-small">
                    <span className="two-numbers">{remainingTime.days}</span>
                    <span>days</span>
                    <span className="two-numbers">{remainingTime.hours}</span>
                    <span>hours</span>
                    <span className="two-numbers">{remainingTime.minutes}</span>
                    <span>minutes</span>
                    <span className="two-numbers">{remainingTime.seconds}</span>
                    <span>seconds</span>
                </div>
                <div class="text-center pt-2">
                    <p class="text-small">The Website will launch the 1st of december - scroll down to learn about the project</p>
                    <p class="text-small">Join us on our social media.</p>
                </div>
                <div class="row justify-content-center text-center pt-4 ">
                    <a href="https://instagram.com/0xtime" target="_blank" rel="noopener norefferer" class="col">
                    <FontAwesomeIcon icon={faInstagram} className="icon-footer" />
                    </a>
                    <a href="https://discord.gg/fGUYR8AC" target="_blank" rel="noopener norefferer" class="col">
                    <FontAwesomeIcon icon={faDiscord} className="icon-footer" />
                    </a>
                    <a href="https://twitter.com/0xTime_io" target="_blank" rel="noopener norefferer" class="col">
                    <FontAwesomeIcon icon={faTwitter} className="icon-footer" />
                    </a>
                </div>
            </div>
            </div>
            }
        </div>
    )
}

export default Countdown