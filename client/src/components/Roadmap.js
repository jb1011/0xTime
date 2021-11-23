import React, { useEffect } from 'react'
import Aos from "aos"
import "aos/dist/aos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faUsers, faUniversity, faGem } from '@fortawesome/free-solid-svg-icons'
function Roadmap() {

   useEffect(() => {
      Aos.init({
          duration: 2000
      });
  }, []);

    return (
        <div>
        <div class="row">
        <div class="col-md-12">
            <div class="main-timeline">
                <div class="timeline" data-aos="fade-up">
                <div class="timeline-content">

                        <div class="timeline-year">2021</div>
                        <div class="timeline-icon"><FontAwesomeIcon icon={faRocket} /></div>
                        <h3 class="title">Launch</h3>
                        <p class="description">
                            Our goal is to conduct the first auction on December 1st, 2021 to initialize the eternal timeline of 0xTime.
                        </p>
                    </div>
                </div>
                <div class="timeline" data-aos="fade-up">
                    <div class="timeline-content">
                        <div class="timeline-year">2021</div>
                        <div class="timeline-icon"><FontAwesomeIcon icon={faUsers} /></div>
                        <h3 class="title">Collaborations</h3>
                        <p class="description">
                            We are actively involved in finding and managing collaborations. We want to give each day a reason to be lived. In order to become an autonomous and decentralized organization, we are already putting the community to work. Go vote every day in our discord for your favorite collaboration!
                        </p>
                    </div>
                </div>
                <div class="timeline" data-aos="fade-up">
                <div class="timeline-content">
                        <div class="timeline-year">2022</div>
                        <div class="timeline-icon"><FontAwesomeIcon icon={faUniversity} /></div>
                        <h3 class="title">Governance (DAO)</h3>
                        <p class="description">
                            As mentioned above, our goal is to eventually become an autonomous and decentralized organization. To do this we plan to first build a solid foundation in the coming months, and then gradually decentralize 0xTime, until the release of its governance token.
                        </p>
                    </div>
                </div>
                <div class="timeline" data-aos="fade-up">
                <div class="timeline-content">
                        <div class="timeline-year">2022</div>
                        <div class="timeline-icon"><FontAwesomeIcon icon={faGem} /></div>
                        <h3 class="title">Metaverse museum</h3>
                        <p class="description">
                        Launch of a metaverse museum to allow users to trace each day, historical events 
                        and their owner throughout the history.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </div>
    )
}

export default Roadmap
