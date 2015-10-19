import React from 'react'
var remote = window.require('remote'),
SubList = require('./SubList.js');

var SeriesList = React.createClass({
  displayName: 'SeriesList',
  getInitialState: function() {
    return {
      loading: true,
      subtitles: []
    };
  },
  getSubs: function(index, callback) {
    remote.require('./src/index.js')(index, function(found) {
      var subs = [];
      found.forEach(function(item){
        subs.push(item.text)
      });
      callback(subs);
    });
  },
  componentDidMount: function() {
    var that = this;
    that.getSubs(0, function(subs){
      if(that.isMounted())
        that.setState({
          subtitles: subs,
          loading: false
        });
    });
  },
  getSeries: function() {
      return remote.require('./data.json').series;
  },
  handleClick: function(i) {
    var that = this;
    that.setState({
      loading: true,
      subtitles: []
    });
    that.getSubs(i, function(subs){
      that.setState({
        subtitles: subs,
        loading: false
      });
    });
  },
  render: function() {
    return (
      <div className="pane-group">
        <div className="pane pane-sm sidebar">
          <nav className="nav-group">
            <h5 className="nav-group-title">Series</h5>
            {this.getSeries().map(function(item, i) {
              return (<a onClick={this.handleClick.bind(this, i)} key={i}>
                <span className="nav-group-item">
                {item.name}
              </span></a>);
            }, this)}
          </nav>
        </div>
        <SubList items={this.state.subtitles} loading={this.state.loading} />
      </div>
    );
  }
});

module.exports = SeriesList;
