import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faInstagram, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <div class="border-top footer mt-5">
            <div class="row justify-content-center text-center pt-4 ">
            <a href="https://instagram.com/0xtime" target="_blank" rel="noopener norefferer" class="col col-1">
            <FontAwesomeIcon icon={faInstagram} className="icon-footer" />
            </a>
            <a href="https://discord.gg/fGUYR8AC" target="_blank" rel="noopener norefferer" class="col col-1">
            <FontAwesomeIcon icon={faDiscord} className="icon-footer" />
            </a>
            <a href="https://twitter.com/0xTime_io" target="_blank" rel="noopener norefferer" class="col col-1">
            <FontAwesomeIcon icon={faTwitter} className="icon-footer" />
            </a>


            </div>
            <div class="row justify-content-center pt-4 text-muted">
                <a class="col col-4 text-right border-right">smart contract</a>
                <a class="col col-4 ">white paper</a>
            </div>
            <div class="row justify-content-center pt-4 text-muted pb-4">
                ©2021 - 0xTime all right reserved
            </div>
        </div>
    )
}

export default Footer
