import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import {BlogTile} from '../../components';
import Pagination from 'react-bootstrap/lib/Pagination';
import {bindActionCreators} from 'redux';
import blogActions from '../../redux/modules/blog';
import {loadAllPosts} from '../../redux/modules/blog';
import {push} from 'react-router-redux';
@asyncConnect([{
	deferred: true,
	promise: ({store: {dispatch, getState}}) => {
		let p=getBlogPage();
			return dispatch(loadAllPosts(p));
	}
}])
export class Blog extends Component {

constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  static propTypes = {
    user: PropTypes.object
  };

  state = {
    message: '',
    messages: []
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onMessageReceived = (data) => {

  }

	handleSelect(eventKey,self) {
    this.props.dispatch(push('/posts/'+eventKey));
	}

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
  	var that = this;
    const style = require('./Blog.scss');
    return (
    	<div>
		<Jumbotron className={style.headingstyle}>
			<h1>Blogs</h1>
			<p>"Here's to books, the cheapest vacation you can buy" - Charlaine Harris . My only vacation</p>
		</Jumbotron>
			<div>
				{this.props && this.props.posts && this.props.posts.getPostsResult && this.props.posts.getPostsResult.posts.map(function(post)
					{
						return <BlogTile post={post} dispatch ={that.props.dispatch}/>
					}
				)}

			</div>
			<Row>
				<Col>
				<Pagination
					bsSize="medium"
					items={10}
					activePage={1}
					onSelect={this.handleSelect} />
				</Col>
				<br />
			</Row>
		</div>

    );
  }
}

function getBlogPage(key) {
	var vars = [], hash;
	var hashes; // = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
	if (typeof window != "undefined") {
		hash = window.location.href.split('posts/')[1];
		//hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
	}
		
	return hash;
}

function mapStateToProps(state) {
	console.log('state ' + state);
	return {posts: state.blog}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, blogActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
