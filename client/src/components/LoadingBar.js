import React, { useEffect } from 'react'
import Aos from "aos"
import "aos/dist/aos.css"

function LoadingBar() {

    useEffect(() => {
        Aos.init({
            duration: 2000
        });
    }, []);
    return (
          <div class="row justify-content-center text-center">
            <div class="progress text-center">
                <div class="progress-value">
                    <p class="text-center text-light txt-bar">70%</p>
                </div>
            </div>
            </div>
    )
}

export default LoadingBar
