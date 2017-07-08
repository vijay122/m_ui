import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Well from 'react-bootstrap/lib/Well';
import Media from 'react-bootstrap/lib/Media';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import {BlogTile} from '../../components';
import Pagination from 'react-bootstrap/lib/Pagination';
import {bindActionCreators} from 'redux';
import blogActions from '../../redux/modules/blog';
import {loadAllPosts,isProductExistInStore} from '../../redux/modules/blog';

/*
@asyncConnect([{
	deferred: true,
	promise: ({store: {dispatch, getState}}) => {
		return dispatch(loadAllPosts());
	}
}])
*/
export class BlogDetail extends Component {

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

	handleSelect(eventKey) {

	}

	handleSubmit = (event) => {
		event.preventDefault();
	}

	render() {
		const style = require('./BlogDetail.scss');
		let PostDetail = this.props.blogDetail;
		if(PostDetail)
		{
			//PostDetail.date =  PostDetail.date.toDateString();
		}
		return (
			<div>
				<Jumbotron className={style.headingstyle}>
					<PageHeader>{PostDetail.title} <small>{PostDetail.author}</small>
						<br/>
						<small>{PostDetail.date }</small>
					</PageHeader>
				</Jumbotron>
				<div>
					{PostDetail.md}
				</div>
				<Row>
					<h2>Opinions/Comments:</h2>
				</Row>
				<Row>
					<Well bsSize="large">
						{PostDetail && PostDetail.comments && PostDetail.comments.map(function (x) {

							return(
								<Media>
									<Media.Left>
										<img width={64} height={64} src="http://www.merricktowle.com/wp-content/themes/merricktowle/images/Your-Face-Here.gif" alt="Image"/>
									</Media.Left>
									<Media.Body>
										<Media.Heading>{x.name} writes: <span>commented on : {x.date }</span></Media.Heading>
										<p>{x.body}</p>
									</Media.Body>
								</Media>
							)
						})}
					</Well>
				</Row>
				<Row>
					<h2>Leave Another Comment:</h2>
				</Row>
				<Row>
					<Col>
					</Col>
					<Col>
					</Col>
				</Row>
				<Row>

				</Row>
			</div>

		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, blogActions), dispatch)
}

function mapStateToProps(state) {
	console.log('state ' + state);
	if (state.blog != undefined && state.blog.currentPost != null) {
		return {blogDetail: state.blog.currentPost};
	}
	var slug = qs('post');
	let detail;
	if (isProductExistInStore(state, slug)) {
		detail = state.blog.currentPost =  isProductExistInStore(state, slug);
	}
	else {

	}
	return {blogDetail:detail}
}
function qs(key) {
	var vars = [], hash;
	var hashes; // = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');
	if (typeof window != "undefined") {
		hashes = window.location.href.slice(window.location.href.indexOf('/') + 1).split('/');

	}
	else {
		hashes = 'id:57413ffe7a1d3a001111b3ec';
	}

	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split(':');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars[key];
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
