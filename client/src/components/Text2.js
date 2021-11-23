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
                <div data-aos="zoom-in-down" class="col">
                    <h1 class="text-secondary text-center">Earn Rewards</h1>
                    <p class="text-justify"><br />When you mint a day, it is uniquely yours. You become a Holder. <br /><br />
                This allows you to receive income on future auctions. Every day, 70% of the auction is spread among the Holders,
                according to the quantity of days they own. 15% go directly to the artists having collaborated on this day and
                15% goes to the team. <br /><br />
                <strong>You will generate a passive income over time while owning a piece of history.</strong>
                </p>
                </div>
            </div>
        }
        {isTablet &&
        <div class="row pt-5" data-aos="zoom-in-down">
            <div class="">
                <h1 class="text-secondary text-center h1-small">Earn Rewards</h1>
                <p class="text-justify"><br />When you mint a day, it is uniquely yours. You become a Holder. <br /><br />
                This allows you to receive income on future auctions. Every day, 70% of the auction is spread among the Holders,
                according to the quantity of days they own. 15% go directly to the artists having collaborated on this day and
                15% goes to the team. <br /><br />
                <strong>You will generate a passive income over time while owning a piece of history.</strong>
                </p>
            </div>
            <div class="text-center ">
                <img src="assets/video/rewards.gif" class="gif-home"/>
            </div>
        </div>
        }
        </div>
    )
}

export default Text2
