import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import {asyncConnect} from 'redux-async-connect';
import * as blogActions from '../../redux/modules/blog';


@asyncConnect([{
	deferred: true,
	promise: ({store: {dispatch, getState}}) => {
		var slugid = qs('id');
		return dispatch(blogActions.getPostBySlug(slugid));
	}
}])




export class BlogDetail extends Component {

	static propTypes = {
		user: PropTypes.object
	};

	componentDidMount() {

	}

	componentWillUnmount() {
	}

	onMessageReceived = (data) => {
		const messages = this.state.messages;
		messages.push(data);
		this.setState({messages});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const msg = this.state.message;

		this.setState({message: ''});
	}

	render() {
		const style = require('./BlogDetail.scss');
		const post = this.props.post;
		let post_text = post.md? post.md:"";
		return (
			<div className={style.chat + ' container'}>
				<h1>{post && post.title}</h1>
				<h4> {post.date}</h4>
			<p>
				{
					post_text
				}
			</p>
				<h1 className={style}>Opinions</h1>
				<h3>I'd love to hear from you</h3>
				<hr/>
				<h2>Leave One</h2>
				<Row>
				<Col xs={12} md={6}>
					<input type='text' id='comment-name' placeholder='Your name'></input>
				</Col>
					<Col xs={12} md={6}>
						<input type='text' id='comment-email' placeholder='Email(Optional)'></input>
					</Col>
				</Row>
				<Row>
<textarea></textarea>
				</Row>
				<Row>
					<Col xs={12} md={3}>
					</Col>
					<Col xs={12} md={3}>
					</Col>
					<Col xs={12} md={3}>
						<input type="button"></input>
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	console.log('state ' + state);
	var detailedPost ={};
	if(state.blog && state.blog.getPostDetail)
	{
		detailedPost = state.blog.getPostDetail;
	}
	return {post: detailedPost}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, blogActions), dispatch)
}

function qs(key) {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split(':');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars[key];
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
