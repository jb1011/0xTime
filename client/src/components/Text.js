import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Aos from "aos"
import "aos/dist/aos.css"

function Text() {

    useEffect(() => {
        Aos.init({
            duration: 2000
        });
    }, []);

    const isTablet = useMediaQuery({ query: '(max-width: 1410px)'})
    const isWideScreen = useMediaQuery({ query: '(min-width: 1411px)'})

    return (
        <div>
        {isWideScreen && 
            <div class="row">
                <div class="col" data-aos="zoom-in-down" >
                    <h1 class="text-secondary text-center">0xTime</h1>
                    <p class="text-justify"><br />Welcome to 0xTime, a brand new decentralized NFT platform that allows you to mint each day as an nft. <br /><br />
                Is it your birthday today? Neil Armstrong stepped on the moon? Or simply you had a great day? 0xTime allows you to mint the time. <br /><br />
                The system is quite simple : each day is auctioned from the first second of its existence (00:00:01 UTC) and is then given out to the biggest 
                bider at the last second of the day. Because the present is good but the future is better, it does not stop there, you can also take profit from it!
            </p>
                </div>
                <div class="col text-center">
                    {/* <img src="assets/img/logo-min.png" class="img-fluid" /> */}
                    <div class="clock"><div class="dot"></div></div>
                </div>
            </div>
        }
        {isTablet &&
        <div class="row pt-5">
        <div class="" data-aos="zoom-in-down">
            <h1 class="text-secondary text-center h1-small">0xTime</h1>
            <p class="text-justify"><br />Welcome to 0xTime, a brand new decentralized NFT platform that allows you to mint each day as an nft. <br /><br />
                Is it your birthday today? Neil Armstrong stepped on the moon? Or simply you had a great day? 0xTime allows you to mint the time. <br /><br />
                The system is quite simple : each day is auctioned from the first second of its existence (00:00:01 UTC) and is then given out to the biggest 
                bider at the last second of the day. Because the present is good but the future is better, it does not stop there, you can also take profit from it!
            </p>
        </div>
        <div class="text-center" >
            {/* <img src="assets/img/logo-min.png" class="img-fluid" /> */}
            <div class="clock-small"><div class="dot-small"></div></div>
        </div>
        </div>
        }
        </div>
    )
}

export default Text
