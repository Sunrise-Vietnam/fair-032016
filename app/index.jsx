require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");
require('./main201609.css');
require('./callbutton.css');
require('bootstrap-select');
require('!style!css!bootstrap-select/dist/css/bootstrap-select.min.css');

require('./photos/world-study-fair032016.jpg');

import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App.jsx';

import Home from './components/pages/Home.jsx';
import Thanks from './components/pages/Thanks.jsx';

import { Router, Route, browserHistory } from 'react-router';

import createHistory from 'history/lib/createBrowserHistory'
import useScroll from 'scroll-behavior/lib/useStandardScroll'

const history = useScroll(createHistory)()


history.listen(location => {
    setTimeout(() => {
        if (location.action === 'POP') {
            return;
        }
        var hash = location.hash;
        // console.log(hash);
        if(hash){
            $('html, body').animate({
                scrollTop: ($(hash).offset().top - 0)
            }, 1000);
        }else{
            window.scrollTo(0, 0);
        }
    });
});


ReactDom.render((
    <Router history={history}>
        <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="/thanks-you" component={Thanks}/>
        </Route>
    </Router>
), document.getElementById('app'))
