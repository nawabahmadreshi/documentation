var React = require('react'),
	R = require('ramda'),
	cx = require('../support/utils').cx;

var PlatformStore = require('../stores/PlatformStore'),
	PlatformActions = require('../actions/PlatformActions');

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
	render: function() {
		var props = this.props,
			page_key = props.page_key;
		if (!props.group_data || !props.group_data[page_key]) {
			//console.log(page_key + " pagekey");
			return (<a href="#">{ page_key }</a>);
		}
		var page = props.group_data[page_key],
			path = props.directory ? [ props.directory, page_key ] : [ page_key ],
			isCurrentPath = props.current_path == path.join('/');
		if (page.platforms[props.platform]) {
			path.push(props.platform);
		}
		//console.log(props.group_data);
		return (<a href={ '/' + path.join('/') } className={ isCurrentPath ? 'sidebar-link-selected' : '' }>{ page.title }</a>);
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
		console.log(this);
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
					           set_selected={this._setSelected} />
				</li>);
			}
			else {
				return (<li key={ index }>
					<LinkInternal directory={props.directory}
					              page_key={link}
					              group_data={props.group_data}
					              platform={props.platform}
					              current_path={props.current_path}
					              set_selected={this._setSelected} />
				</li>);
			}
		}.bind(this));
		if (props.group.children) {
			var selectedClass = '',
				groupClass = 'sidebar-group',
				arrowClass = 'fa fa-caret-right';
			if (this.state.expand) {
				groupClass += ' sidebar-group--expand';
				arrowClass = 'fa fa-caret-down';
			}
			if (this.state.selected) {
				selectedClass += 'sidebar-group-selected';
			}
			return (<div className={ selectedClass }>
				<h4 className="sidebar-group-title" onClick={ this._toggle }>
					{ props.level == 0 ? <i className={ arrowClass } /> : null} { props.group.title }
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
					              current_path={props.current_path}
					              set_selected={this._setSelected} />
				</li>
			</ul>);
		}
	}
});

var Sidebar = React.createClass({
	getInitialState: function() {
		return getStateFromStore();
	},
	componentDidMount: function() {
		PlatformStore.listen(this._onChange);
	},
	componentWillUnmount: function() {
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
				platform={ this.state.platform } />);
		}.bind(this));
		return (<div className="sidebar-wrapper">
			{ groups(this.props.layout) }
		</div>);
	}
});

module.exports = Sidebar;
