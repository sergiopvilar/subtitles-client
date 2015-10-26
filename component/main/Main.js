var React = require('react')
  , SeriesList = require('./SeriesList.js')
  , SubList = require('./SubList.js')
  , remote = window.require('remote')
  , that;

var Main = React.createClass({

  displayName: 'Main',

  getInitialState: function() {
    that = this;
    return {
      loading: true,
      subtitles: []
    };
  },

  componentDidMount: function() {
    var that = this;
    that.getSubs(0, function(subs){
      if(that.isMounted())
        that.__change(subs, false);
    });
  },

  getSubs: function(index, callback) {
    remote.require('./src/index.js')(index, function(found) {
      callback(found);
    });
  },

  getSeries: function() {
      return remote.require('./data.json').series;
  },

  updateSerie: function(index) {
    that.__change([], true);
    that.getSubs(index, subs => {
      that.__change(subs, false);
    });
  },

  __change: function(subs, load) {
    that.setState({
      subtitles: subs,
      loading: load
    });
  },

  render: function() {
    return (
      <div className="window-content">
        <div className="pane-group">
          <SeriesList getData={this.getSeries} callback={this.updateSerie} />
          <SubList items={this.state.subtitles} loading={this.state.loading} />
        </div>
      </div>
    );
  },
});

module.exports = Main;
