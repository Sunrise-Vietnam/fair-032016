import React from 'react';

export default class App extends React.Component{
    componentDidMount(){
        /*var ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        ogImage.content = require('../../app/photos/world-study-fair032016.jpg');
        var head = document.getElementsByTagName('head')[0];
        if(head) head.appendChild(ogImage);*/
    }
    render(){
        return this.props.children;
    }
}