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
import {BlogTile,TextImageUploader,ImageText} from '../../components';
import Pagination from 'react-bootstrap/lib/Pagination';
import {bindActionCreators} from 'redux';
import blogActions from '../../redux/modules/blog';
import {postComments,isProductExistInStore,updatePostItem} from '../../redux/modules/blog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

/*
@asyncConnect([{
	deferred: true,
	promise: ({store: {dispatch, getState}}) => {
		return dispatch(loadAllPosts());
	}
}])
*/

let ItemList = [];
var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;
	@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    // if (!isLoaded(getState())) {
    //   return dispatch(load());
    //   return dispatch(load());
    // }
  }
}])
export class AddBlogPost extends Component {

	constructor(props) {
		super(props);
		this.state ={};
		this.state.items =[];
		this.handleSubmit = this.handleSubmit.bind(this);
				this.addNewItem = this.addNewItem.bind(this);
	this.todos = [];
	this.count =0;
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
	addNewItem()
	{
		let refProd = this.refs['newLineItem'];
		var st = {};
		st.image = refProd.refs['image'].state.images[0];
		st.title = refProd.state.title;
		st.content = refProd.state.content;

			if(refProd.refs['image'] && refProd.refs['image'].state && refProd.refs['image'].state.images)
			{
				st.image = refProd.refs['image'].state.images[0];
			}

		this.todos = this.todos.concat({
			image: st.image,
			title: st.title,
			content: st.content
		});
		this.refs['newLineItem'].refs['image'].state.images.length =0;
		this.setState({items:this.todos});
	}

	handleSubmit = (event) => {
		var self = this;
		event.preventDefault();
		var payload = {};
	payload.title = this.state.title;
	payload.block = this.state.block;
	payload.secret = this.state.secret;
		payload.md = this.state.content;
		payload.body = this.state.content;
		payload.items = this.state.items;
		payload.published = true;
		//postComments(slugid,name,email,comment);

		fetch('http://localhost:5000/new', {
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
    	self.setState({title:"",
			block:"",
			content:"",
			items:[]})
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
      
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .catch(error => { console.log('request failed', error); });
	}

	render() {
		var self = this;
		const style = require('./AddBlogPost.scss');
		let PostDetail = this.props.blogDetail;
		if(PostDetail)
		{
			//PostDetail.date =  PostDetail.date.toDateString();
		}
		return (
			<div className={style.layoutWidth}>
				<Jumbotron className={style.headingstyle}>
					<PageHeader>Simple Blog
					</PageHeader>
				</Jumbotron>
				<Row>
					<Col>
						<TextField
							className={style.inputFullWidth}
							 floatingLabelText="Title of the post"
      						floatingLabelFixed={true}
							hintText="Post Title"
							data-ctrlid='title'
							onChange={this.onChange.bind(this)}
							value={this.state.title}/>
					</Col>
					<Col>
						<TextField
						className={style.inputFullWidth}
							floatingLabelText="Tags"
      						floatingLabelFixed={true}
							hintText="Foo, Bar"
							data-ctrlid='block'
							onChange={this.onChange.bind(this)}
							value={this.state.block}/>
					</Col>
				</Row>
				<Row>
				<Col>
						<TextField
							className={style.inputFullWidth}
							floatingLabelText="Secret Code(only applicable for production)"
      						floatingLabelFixed={true}
							hintText="Secret"
							data-ctrlid='secret'
							onChange={this.onChange.bind(this)}
							value={this.state.secret}/>
					</Col>
				</Row>
				<Row>
					<TextField
						className={style.inputFullWidth}
						floatingLabelText="Main content:"
      					floatingLabelFixed={true}
						hintText="Blog Content"
						multiLine={true}
						data-ctrlid='content'
						rows={2}
						onChange={this.onChange.bind(this)}
						rowsMax={4}
					/>
				</Row>
				{this && this.state && this.state.items && this.state.items.map(function(x,index)
					{
						let refid="nItem"+index;
					return <ImageText refs={refid} title={x.title} content={x.content} image={x.image} />
					})
				}
				<Row>
				<TextImageUploader ref='newLineItem'/>
				</Row>
				<Row>
       <RaisedButton label="New Item" onClick={this.addNewItem} primary={true}/>
       </Row>
				<Row>
					<RaisedButton label="Submit Button" onClick={this.handleSubmit} primary={true}/>
				</Row>
			</div>

		);
	}
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
	return {blogDetail:detail, post : state.blog.newPostItems}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, blogActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlogPost);
