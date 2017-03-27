

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
			if (page_key.url) {
				return (<a target="_blank" href={ page_key.url }>{ page_key.title }</a>);
			}
			else {
				return (<a href="#">{ page_key.title }</a>);
			}
		}
		var page = props.group_data[page_key],
			path = props.directory ? [ props.directory, page_key ] : [ page_key ],
			isCurrentPath = props.current_path == path.join('/');
		if (page.sections) {
			path.push(Object.keys(page.sections)[0]);
		}
		if ((page.platforms[props.platform]) && (Object.keys(page.sections)[0] != 'overview')) {
			path.push(props.platform);
		}

		if (page_key == 'journeys' || page_key == 'deep-linked-feeds') { // Yuck...fix this with page.is_premium
			return (<a href={ '/' + path.join('/') } className={ isCurrentPath ? 'sidebar-link-selected' : '' } onClick={ self._handleClick(Object.keys(page.sections)[0]) }>{ page.title } <i className="fa fa-star premium" aria-hidden="true"></i></a>);
		}
		else {
			return (<a href={ '/' + path.join('/') } className={ isCurrentPath ? 'sidebar-link-selected' : '' } onClick={ self._handleClick(Object.keys(page.sections)[0]) }>{ page.title }</a>);
		}
	}
});

var LinkGroup = React.createClass({
	getInitialState: function() {
		return {
			selected: false,
			expand: true
		};
	},
	_toggle: function() {
		this.setState({
			expand: true
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
					<LinkGroup group={ link }
							   level={ props.level + 1 }
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
				groupClass = 'sidebar-group'
				if (props.group.is_premium) {
					return (<div className={ selectedClass }>
						<h4 className="sidebar-group-title" onClick={ this._toggle }>
							{ props.group.title } <i className="fa fa-star premium" aria-hidden="true"></i>
						</h4>
						<ul className={ groupClass }>{ links(props.group.children) }</ul>
					</div>);
				}
				else {
					if (!props.level) {
						return (<div className={ selectedClass }>
							<a href={'/' + props.directory }>
								<h4 className="sidebar-group-title" onClick={ this._toggle }>
									{ props.group.title }
								</h4>
							</a>
							<ul className={ groupClass }>{ links(props.group.children) }</ul>
						</div>);
					}
					else {
						return (<div className={ selectedClass }>
							<h4 className="sidebar-group-title" onClick={ this._toggle }>
								{ props.group.title }
							</h4>
							<ul className={ groupClass }>{ links(props.group.children) }</ul>
						</div>);
					}
				}
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
	  var storeState = getStateFromStore();
	  return storeState;
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
