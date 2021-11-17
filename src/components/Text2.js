import React, { useEffect } from 'react'
import Aos from "aos"
import "aos/dist/aos.css"
import { useMediaQuery } from 'react-responsive'

function Text2() {
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
                <div class="col text-center">
                    <img src="assets/video/rewards.gif"/>
                </div>
                <div data-aos="fade-left" class="col">
                    <h1 class="text-secondary text-center">Earn Rewards</h1>
                    <p class="text-justify"><br />When you mint a day, it is uniquely yours. You become a Holder. <br /><br />
                This allows you to receive income on future auctions. Every day, 70% of the auction is redistributed to the Holders.
                According to the quantity of days they own. 15% go directly to the artists having collaborated on this day. 
                15% goes for to the team. <br /><br />
                You will generate a passive income over time while owning a piece of history.
                </p>
                </div>
            </div>
        }
        {isTablet &&
        <div class="row pt-5" data-aos="fade-right">
            <div class="">
                <h1 class="text-secondary text-center h1-small">Earn Rewards</h1>
                <p class="text-justify"><br />When you mint a day, it is uniquely yours. You become a Holder. <br /><br />
                This allows you to receive income on future auctions. Every day, 70% of the auction is redistributed to the Holders.
                According to the quantity of days they own. 15% go directly to the artists having collaborated on this day. 
                15% goes for to the team. <br /><br />
                You will generate a passive income over time while owning a piece of history.
                </p>
            </div>
            <div class="text-center">
                <img src="assets/video/rewards.gif"/>
            </div>
        </div>
        }
        </div>
    )
}

export default Text2
