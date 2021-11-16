import './App.css';
import "./fonts/BasierCircle-Bold.woff";
import "./fonts/BasierCircle-Regular.woff";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyCalendar from './pages/MyCalendar';
import Error from './pages/Error';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/MyCalendar" exact component={MyCalendar} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
