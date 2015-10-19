import React from 'react'

var SubList = React.createClass({
  displayName: 'SubList',
  handleClick: function(i) {
    console.log('You clicked: ' + this.props.items[i]);
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
                <td>{item}</td>
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
