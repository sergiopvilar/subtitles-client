import React from 'react'

var SubList = React.createClass({
  displayName: 'SubList',
  handleClick: function(i) {
    var remote = window.require('remote');
    var shell = remote.require('shell');
    shell.openExternal(this.props.items[i].url);
  },
  render: function() {

    var loading;
    if (this.props.loading) {
      loading = <tr><td>Loading...</td></tr>;
    } else {
      if(this.props.items.lenght == 0) {
        loading = <tr><td>No subtitles found.</td></tr>;
      } else {
        loading = <tr></tr>;
      }
    }

    return (
      <div className="pane">
        <table className="table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
          { this.props.items.map(function(item, i) {
            return (
              <tr key={i}>
                <td>
                <a onClick={this.handleClick.bind(this, i)} key={i}>{item.text}</a></td>
              </tr>);
          }, this)}
          {loading}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = SubList;
