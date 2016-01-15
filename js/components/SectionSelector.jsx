var React = require('react'),
  R = require('ramda'),
  utils = require('../support/utils');
var cx = utils.cx;

var SectionStore = require('../stores/SectionStore'),
  SectionActions = require('../actions/SectionActions');

function getSectionStateFromStore() {
  return SectionStore.getState();
}

var SectionSelector = React.createClass({
  getInitialState: function() {
    console.log('hello');
    console.log(getSectionStateFromStore());
    return getSectionStateFromStore();
  },

  componentDidMount: function() {
    SectionStore.listen(this._onChange);
  },
  componentWillUnmount: function() {
    SectionStore.unlisten(this._onChange);
  },
  _onChange: function() {
    this.setState(getSectionStateFromStore());
  },
  _handleClick: function(key) {
    return function() { SectionActions.updateSection(key); }
  },
  render: function() {
    var self = this;
    var sections = R.map(function(section) {
      console.log(section);
      classes = {
        'btn btn-default': true,
        'btn-inactive': self.state.section != section.key
      }
      var section_path = utils.pageHasSection(self.props.site_map, self.props.current_path, section.key) ? section.key : '';
      return (
        <a
          className={ cx(classes) }
          key={ section.key }
          href={ '/' + self.props.current_path + '/' + section_path }
          onClick={ self._handleClick(section.key) }>
          { section.name }
        </a>);
    });

    return (
      <div className="text-center section-selector">
        <div className="btn-group">
          { sections(this.props.sections) }
        </div>
      </div>);
  }
});

module.exports = SectionSelector;
