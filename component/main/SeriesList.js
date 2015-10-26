import React from 'react'

var SeriesList = React.createClass({

  displayName: 'SeriesList',

  handleClick: function(i) {
    this.props.callback(i);
  },
  render: function() {
    return (
        <div className="pane pane-sm sidebar">
          <nav className="nav-group">
            <h5 className="nav-group-title">Series</h5>
            {this.props.getData().map(function(item, i) {
              return (<a onClick={this.handleClick.bind(this, i)} key={i}>
                <span className="nav-group-item">
                {item.name}
              </span></a>);
            }, this)}
          </nav>
        </div>
    );
  }
});

module.exports = SeriesList;
