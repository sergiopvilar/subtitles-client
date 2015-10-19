var React = require('react'),
ReactDOM = require('react-dom'),
Main = require('./main/Main.js'),
SeriesList = require('./main/SeriesList.js');
var remote = window.require('remote');
window.React = React;

ReactDOM.render(
  <div className="window-content">
    <SeriesList />
  </div>
  , document.querySelector('.window'));
