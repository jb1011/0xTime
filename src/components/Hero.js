import React from 'react'
import { useMediaQuery } from 'react-responsive'

function Hero() {

    const isTablet = useMediaQuery({ query: '(max-width: 1410px)'})
    const isWideScreen = useMediaQuery({ query: '(min-width: 1411px)'})

    return (
    
        <div>
        {isWideScreen && 

            <div class="row w-100 hero1">
                <div class="c-width">
                    <img src="assets/img/day.jpeg" class="img-fluid" />
                </div>
                <div class="col-sm text-primary">
                <div class="vertical-center">
                    <div class="row">
                        <p>Welcome to 0xTime</p>
                    </div>
                    <div class="row pb-5 text-secondary ">
                        <h1 class="">Current Auction</h1>
                        
                        <h2 class="text-primary date-txt">11 November 2021</h2>
                    </div>
                    <div class="">
                        <div class="row ">
                            <div class="col">
                                <p>Current Bid</p>
                                <p class="text-danger">0.50 ETH</p>
                            </div>
                            <div class="col">
                                <p>End of auction</p>
                                <p class="text-danger">13hours 53 minutes</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col pt-5">
                            <button class="btn btn-primary btn-lg " >Place a bid</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        }
        {isTablet && 
        <div class="row hero2">
            <div class="c-width">
                <img src="assets/img/day.jpeg" class="img-fluid" />
            </div>
            <div class="col-sm text-primary">
            <div class="">
                <div class="row">
                    <p class="text-center">Welcome to 0xTime</p>
                </div>
                <div class="row text-secondary ">
                    <h1 class="text-center h1-small">Current Auction</h1>
                    
                    <h2 class="text-primary date-txt text-center h1-small">11 November 2021</h2>
                </div>
                <div class="">
                    <div class="row text-center">
                        <div class="col">
                            <p>Current Bid</p>
                            <p class="text-danger">0.50 ETH</p>
                        </div>
                        <div class="col">
                            <p>End of auction</p>
                            <p class="text-danger">13hours 53 minutes</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-center">
                        <button class="btn btn-primary btn-lg " >Place a bid</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        }
        </div> 
    )
}

export default Hero
