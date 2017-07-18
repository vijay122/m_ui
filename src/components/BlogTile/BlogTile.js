import React, {Component, PropTypes} from 'react';
import Image from 'react-bootstrap/lib/Image';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Chip from 'material-ui/Chip';
import Button from 'react-bootstrap/lib/Button';
import {push} from 'react-router-redux';

export default class BlogTile extends Component {

	static propTypes = {
		user: PropTypes.object
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
		let items = this.props.post.items;
		let dateString = new Date(Date.parse(post.date)).toDateString();
		let url = (items[0] && items[0].image )?items[0].image : "http://news.gtp.gr/wp-content/uploads/2014/01/samos_muskat.jpg";
		const style = require('./BlogTile.scss');
		return (
			<div>
				<Row>
					<Col xs={12} md={4}>
						<Image src={url} responsive />
					</Col>
					<Col xs={12} md={8}>
						<PageHeader>{post.title} <small>{post.author}</small>
							<br/>
							<small>{dateString}</small>
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