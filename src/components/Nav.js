import Web3 from 'web3';
import { NavLink } from 'react-router-dom'

// import {init} from './Web3Client'

function Nav() {
    let selectedAccount;

    const init = () => {
        let provider = window.ethereum;
    
        if (typeof provider !== 'undefined') {
            provider.request({ method: 'eth_requestAccounts' }).then((accounts) => {
            selectedAccount = accounts[0];
            console.log(`Selected account is ${selectedAccount}`);
          }).catch((err) => {
            console.log(err);
          });
          window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0];
            console.log(`New selected account is ${selectedAccount}`);
          });
        }
        else {
            console.log('coucou')
        }
        const web3 = new Web3(provider);
    }

    
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">
            {/* <div class="clock-loader navbar-brand"></div> */}
            <div class="clocknav navbar-brand"></div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <NavLink exact to="/" class="nav-link nav-font">0xTime <span class="sr-only">(current)</span></NavLink>
                </li>
                <li class="nav-item active">
                    <NavLink exact to="/" class="nav-link nav-font">Home <span class="sr-only">(current)</span></NavLink>
                </li>
                <li class="nav-item">
                    {/* <NavLink exact to="MyCalendar" class="nav-link">Calendar <span class="sr-only">(current)</span></NavLink> */}
                </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <button onClick={init} class="btn btn-primary my-2 my-sm-0 nav-font" >Connect Wallet</button>
                </form>
            </div>
            </nav>
        </div>
    )
 
}

export default Nav
