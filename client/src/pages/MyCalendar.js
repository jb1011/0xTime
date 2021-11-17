import React from 'react'
import Nav from '../components/Nav'
import Calendar from 'react-calendar'
import CardPres from '../components/CardPres'
import { BrowserRouter as Router,Link,Route } from 'react-router-dom'
import { date } from '../components/Dates'
import Footer from '../components/Footer'

function MyCalendar() {
    

    return (
        <div className="container">
            <Nav />
            <div class="content row pt-5">
            <Router>
                    <div>
                        <h1>dynamic router</h1>
                        {
                            date.map((item) =>
                            <div> <Link to={"/MyCalendar/date/"+item.id+"/"+item.date} > {item.date} </Link> </div> )
                        }
                    </div>
                    <div class="col-sm">
                        <Route path="/MyCalendar/date/:id/:date"><CardPres /></Route>
                    </div>
                    </Router>
                
                    <div class="col-sm">
                        <Calendar className="react-calendar"/>

                    </div>
                    

            </div>
            <Footer />
        </div>
    )
}

export default MyCalendar
