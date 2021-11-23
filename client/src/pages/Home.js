import React from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Text from '../components/Text'
import Footer from '../components/Footer'
import LoadingBar from '../components/LoadingBar'
import Text2 from '../components/Text2'
import Text3 from '../components/Text3'
import Roadmap from '../components/Roadmap'
import Team from '../components/Team'
import Countdown from '../components/Countdown'

function Home() {
    return (
        // <div class="w-screen">
        <div className="container">
            <Countdown
            countdownTimestampMs={1640991600000}/>
            {/* <Nav /> */}
            {/* <Hero /> */}
            <Text />
            {/* <div class="pt-5 pb-5"></div>
            <LoadingBar /> */}
            <div class="pt-5 pb-5"></div>
            <Text2 />
            <div class="pt-5 pb-5"></div>
            <Text3 />
            <div class="pt-5 pb-5"></div>
            <Roadmap />
            <div class="pt-5 pb-5"></div>
            <Team />
            <Footer />
        </div>
        // </div>
    )
}

export default Home
