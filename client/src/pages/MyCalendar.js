import React, {useState} from 'react'
import Nav from '../components/Nav'
import Calendar from 'react-calendar'
import CardPres from '../components/CardPres'
import { BrowserRouter as Router,Link,Route } from 'react-router-dom'
import { date, events } from '../components/Dates'
import Footer from '../components/Footer'

function MyCalendar() {
    
    const[date, setDate] = useState(new Date());
    const[data, setData] = useState();

    const onChange = date => {
        // console.log(date)
        let pick = date.getUTCDate().toString() + date.getMonth().toString();
        let data = events.find(item => item.id === pick)
        setData(data);
        setDate(date);
    };
    

    
    return (
        <div className="container">
            <Nav />
            <div class="content row pt-5">
                <div class="col-sm pop-up-card">
                    <h1>Owner :</h1>
                    <h2>{data && data.name}</h2>
                    <h1>Date :</h1>
                    <h2>{data && data.event}</h2>

                

                </div>
                <div class="col-sm">
                    <Calendar className="react-calendar" onChange={onChange} value={date} />
                </div>
                    {/* <Router>
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
                 */}

            </div>
            <Footer />
        </div>
    )
}

export default MyCalendar
