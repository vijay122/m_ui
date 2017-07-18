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
import {BlogTile,ImageText} from '../../components';
import Pagination from 'react-bootstrap/lib/Pagination';
import {bindActionCreators} from 'redux';
import blogActions from '../../redux/modules/blog';
import {postComments,isProductExistInStore} from '../../redux/modules/blog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class BlogDetail extends Component {

	static propTypes = {
		user: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state ={};
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	componentDidMount() {

	}

	componentWillUnmount() {

	}

	onMessageReceived = (data) => {

	}

	handleSelect(eventKey) {

	}

	onChange(e) {
		this.state[e.target.attributes["data-ctrlid"].value] = e.currentTarget.value;
	}

	  resizeImage(url) {
 var filter =  'w_900/';
    var str = url;
    var index = str.indexOf("upload/") + 7;
    var rest = str.substr(0, index) + filter + str.substr(index);
    return rest;
  }

	handleSubmit = (event) => {
		event.preventDefault();
		var slugid= this.props.blogDetail.slug;
		var payload = {};
	payload.name = this.state.name;
	payload.body = this.state.comment;
	payload.email = this.state.email;
		//postComments(slugid,name,email,comment);

		fetch('http://localhost:5000/post/'+slugid+'/comment', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload
      }),
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        dispatch(loginSuccess(response));
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        dispatch(loginError(error));
        throw error;
      }
    })
    .catch(error => { console.log('request failed', error); });
	}

	render() {
		let self = this;
		const style = require('./BlogDetail.scss');
		let PostDetail = this.props.blogDetail;
				let dateString = new Date(Date.parse(PostDetail.date)).toDateString();
		if(PostDetail)
		{
			//PostDetail.date =  PostDetail.date.toDateString();
		}
		return (
			<div>
				<Jumbotron className={style.headingstyle}>
					<PageHeader>{PostDetail.title} <small>{PostDetail.author}</small>
						<br/>
						<small>{dateString }</small>
					</PageHeader>
				</Jumbotron>
				<div className={style.infoText}>
					{PostDetail.md}
				</div>
				<Row>
				<Col xs={12} md={9}>
				{PostDetail && PostDetail.items && PostDetail.items.map(function(x,index)
				{
return 			(
					<ImageText title={x.title} content={x.content} index={index} image={self.resizeImage(x.image)} />
				 )
					})
				}
				</Col>
				<Col xs={12} md={3}>
				</Col>
				</Row>
				
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
						<TextField
							hintText="Your name"
							data-ctrlid='name'
							onChange={this.onChange.bind(this)}
							value={this.state.name}/>
					</Col>
					<Col>
						<TextField
							hintText="Email (optional)"
							data-ctrlid='email'
							onChange={this.onChange.bind(this)}
							value={this.state.email}/>
					</Col>
				</Row>
				<Row>
					<TextField
						hintText="Comment text.."
						multiLine={true}
						data-ctrlid='comment'
						rows={2}
						onChange={this.onChange.bind(this)}
						rowsMax={4}
					/>
				</Row>
				<Row>
					<RaisedButton label="Submit Button" onClick={this.handleSubmit} primary={true}/>
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
