import React, { useEffect } from 'react'
import Aos from "aos"
import "aos/dist/aos.css"
import { useMediaQuery } from 'react-responsive'


function Text3() {
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
                <div class="col" data-aos="zoom-in-down">
                    <h1 class="text-secondary text-center">Collaborations</h1>
                    <p class="text-justify"> <br />We have decided to collaborate with many artists, 
            associations, brands and movements around the world to make each day even more unique
             and exceptional. <br /><br />Each day will be personalized by external actors, chosen each day
              by our team and the community. <br /><br />Just like the blockchain, the collaborations
               have no limits, ranging from independent artists to world famous artists, from public
                figures to associations... each day will be highlighted.</p>
                </div>
                <div class="col text-center">
                	<img src="assets/video/collabs.gif"/>
		</div>
            </div>
        }
        {isTablet &&
        <div class="row pt-5">
        <div class="" data-aos="zoom-in-down">
            <h1 class="text-secondary text-center h1-small" >Collaborations</h1>
            <p class="text-justify"> <br />We have decided to collaborate with many artists, 
            associations, brands and movements around the world to make each day even more unique
             and exceptional. <br /><br />Each day will be personalized by external actors, chosen each day
              by our team and the community. <br /><br />Just like the blockchain, the collaborations
               have no limits, ranging from independent artists to world famous artists, from public
                figures to associations... each day will be highlighted.</p>
        </div>
        <div class="text-center ">
        <img src="assets/video/collabs.gif" class="gif-home"/>
	</div>
        </div>
        }
        </div>
    )
}

export default Text3
