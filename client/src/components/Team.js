import React, { useEffect } from 'react'
import Aos from "aos"
import "aos/dist/aos.css"

function Team() {

    useEffect(() => {
        Aos.init({
            duration: 2000
        });
    }, []);
    return (
        <div data-aos="zoom-in">
            <section class="team text-center pt-5">
            <div >
                <div class="header my-5">
                <h1 class="h1-small">Our Team </h1>
                <p class="text-muted">Composed of an artist/dev, historian/dev and a dev, 
                  our team is mostly anonymous, born from the DeFi and NFT Community. Our goal is to become a 
                  Decentralized Autonomous Organization</p>
                </div>
                <div class="row row justify-content-center text-center">
                    <div class="col-md-6 col-lg-3 ">
                        <div class="img-block mb-5">
                        <img src="assets/img/nat.jpg" class="img-fluid  img-thumbnail rounded-circle" alt="image1"/>
                        <div class="content mt-2">
                           <a href="https://twitter.com/0xatyo" target="_blank" rel="noopener noreferer"><h4>@0xAtyo</h4></a>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="img-block mb-5">
                        <img src="assets/img/jjj.jpg" class="img-fluid img-thumbnail rounded-circle" alt="image1"/>
                        
                        <div class="content mt-2">
                            <h4>@0xKiloshi</h4>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="img-block mb-5">
                        <img src="assets/img/show2.png" class="img-fluid  img-thumbnail rounded-circle" alt="image1"/>
                        <div class="content mt-2">
                            <h4>@Show_Kay</h4>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
    )
}

export default Team
