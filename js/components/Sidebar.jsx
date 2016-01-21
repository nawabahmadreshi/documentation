var React = require('react'),
	R = require('ramda'),
	cx = require('../support/utils').cx;

var PlatformStore = require('../stores/PlatformStore'),
	PlatformActions = require('../actions/PlatformActions');

var SectionStore = require('../stores/SectionStore'),
  SectionActions = require('../actions/SectionActions');

function getStateFromStore() {
	return PlatformStore.getState();
}

var LinkInternal = React.createClass({
	componentDidMount: function() {
		var page_key = this.props.page_key,
			path = this.props.directory ? [ this.props.directory, page_key ] : [ page_key ],
			isCurrentPath = this.props.current_path == path.join('/');
		if (isCurrentPath) {
			this.props.set_selected();
		}
	},
  _handleClick: function(key) {
    return function() { SectionActions.updateSection(key); }
  },
	render: function() {
		var self = this;
		var props = this.props,
			page_key = props.page_key;
		if (!props.group_data || !props.group_data[page_key]) {
			/*console.log(page_key + " pagekey");*/
			return (<a href="#">{ page_key }</a>);
		}
		var page = props.group_data[page_key],
			path = props.directory ? [ props.directory, page_key ] : [ page_key ],
			isCurrentPath = props.current_path == path.join('/');
		/*if (page.platforms[props.platform]) {
			path.push(props.platform);
		}*/
		if (page.sections[props.section]) {
			path.push(props.section);
		}
		/*console.log(props.group_data);*/
		return (<a href={ '/' + path.join('/') } className={ isCurrentPath ? 'sidebar-link-selected' : '' } onClick={ self._handleClick('overview') }>{ page.title }</a>);
	}
});

var LinkGroup = React.createClass({
	getInitialState: function() {
		return {
			selected: false,
			expand: (this.props.directory == this.props.current_path.split('/')[this.props.level])
		};
	},
	_toggle: function() {
		/*console.log(this);*/
		this.setState({
			expand: !this.state.expand
		});
	},
	_setSelected: function() {
		this.setState({
			selected: true,
			expand: true
		});
	},
	render: function() {
		var props = this.props;
		var links = R.mapObjIndexed(function(link, index) {
			if (link.children) {
				return (<li key={ index }>
					<LinkGroup group={ link } level={ props.level + 1 }
					           directory={ props.directory }
					           current_path={ props.current_path }
					           group_data={ props.group_data }
					           platform={ props.platform }
					           section='overview'
					           set_selected={this._setSelected} />
				</li>);
			}
			else {
				return (<li key={ index }>
					<LinkInternal directory={props.directory}
					              page_key={link}
					              group_data={props.group_data}
					              platform={props.platform}
					              section='overview'
					              current_path={props.current_path}
					              set_selected={this._setSelected} />
				</li>);
			}
		}.bind(this));
		if (props.group.children) {
			var selectedClass = '',
				groupClass = 'sidebar-group',
				arrowClass = 'fa fa-caret-right';
				plusContent = '+'
			if (this.state.expand) {
				groupClass += ' sidebar-group--expand';
				arrowClass = 'fa fa-caret-down';
				plusContent = '-'
			}
			if (this.state.selected) {
				selectedClass += 'sidebar-group-selected';
			}
			return (<div className={ selectedClass }>
				<h4 className="sidebar-group-title" onClick={ this._toggle }>
					{ props.level == 0 ? <i className={ arrowClass } /> : <span className="plus-minus">{ plusContent }</span> } { props.group.title }
				</h4>
				<ul className={ groupClass }>{ links(props.group.children) }</ul>
			</div>);
		}
		else {
			return (<ul className="sidebar-group">
				<li>
					<LinkInternal directory={props.directory}
					              page_key={props.group}
					              group_data={props.group_data}
					              platform={props.platform}
					              section='overview'
					              current_path={props.current_path}
					              set_selected={this._setSelected} />
				</li>
			</ul>);
		}
	}
});

var Sidebar = React.createClass({
	getInitialState: function() {
		/*return getStateFromStore();*/
	  var storeState = getStateFromStore();
	  /*storeState.push({windowWidth: window.innerWidth});*/
	  /*console.log(storeState);*/
	  return storeState;
		/*return {windowWidth: window.innerWidth, storeState};*/
	},
	handleScroll: function(e) {
  },
	componentDidMount: function() {
		window.addEventListener('scroll', this.handleResize);
		PlatformStore.listen(this._onChange);
	},
	componentWillUnmount: function() {
		window.removeEventListener('scroll', this.handleResize);
		PlatformStore.unlisten(this._onChange);
	},
	_onChange: function() {
		this.setState(getStateFromStore());
	},
	render: function() {
		var groups = R.mapObjIndexed(function(group, index) {
			return (<LinkGroup
				key={ index }
				group={ group }
				level={ 0 }
				directory={ group.directory }
				current_path={ this.props.current_path }
				group_data={ this.props.site_map[group.directory] }
				platform={ this.state.platform }
				section='overview' />);
		}.bind(this));
		return (<div className="sidebar-wrapper">
			{ groups(this.props.layout) }
		</div>);
	}
});

module.exports = Sidebar;
