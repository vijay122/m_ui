import React, {Component, PropTypes} from 'react';
import Image from 'react-bootstrap/lib/Image';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Chip from 'material-ui/Chip';
import {connect} from 'react-redux';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import {push} from 'react-router-redux';

export default class BlogTile extends Component {

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

	handleSubmit = (event) => {
		event.preventDefault();
	}
	viewDetails(data, fn, st) {
		var that = this;
		var placeid = data.slug;
		fn.props.dispatch(push('/blog/post:' + placeid));
	}

	render() {
		let post = this.props.post;
		let that = this;
		const style = require('./BlogTile.scss');
		return (
			<div>
				<Row>
					<Col xs={12} md={4}>
						<Image src="http://news.gtp.gr/wp-content/uploads/2014/01/samos_muskat.jpg" responsive />
					</Col>
					<Col xs={12} md={8}>
						<PageHeader>{post.title} <small>{post.author}</small>
							<br/>
							<small>{post.date}</small>
							{post.tags&& post.tags.map(function (tag) {
								return <Chip>{tag}</Chip>
							})}
						</PageHeader>

						<p className={style.changesDetail}>
							{post.md}
						</p>
						<Button bsStyle="primary" onClick={that.viewDetails.bind(this, post, that)}>>Continue reading..</Button>
					</Col>
				</Row>
				<Row>
					<Col>

					</Col>
				</Row>
			</div>
		);
	}
}