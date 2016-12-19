//helper functions
var h = {
  rando: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  getTime: function () {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var d = new Date();
    var mon = month[d.getMonth()];
    var day = d.getDate();
    var year = d.getFullYear();
    var dateAll = mon + " " + day + ", " + year;

    return dateAll;
  },
  getTaggedName: function () {
    var adjectives = ['trusted', 'secure', 'hot', 'new', 'interesting', 'best practice', 'exciting'];

    var nouns = ['es6', 'browserify', 'webpack', 'gulp', 'reactDOM', 'devTools'];

    return this.rando(adjectives) + ' ' + this.rando(nouns);
  }
}

// App
var App = React.createClass({
  getInitialState: function () {
    return {
      posts: {}
    }
  },
  addPost: function (post) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.posts['post-' + timestamp] = post;
    // set the state
    this.setState({posts: this.state.posts});
  },
  renderPost: function (key) {
    return <NewPost key={key} index={key} details={this.state.posts[key]}/>
  },
  render: function () {
    var imgOne = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Balaton_Hungary_Landscape.jpg/1024px-Balaton_Hungary_Landscape.jpg";
    var imgTwo = "https://c2.staticflickr.com/8/7432/9087815445_1a14743549_b.jpg";
    var imgThree = "https://c2.staticflickr.com/6/5738/23929500196_b6a1ce1dfb_b.jpg";
    var imgFour = "https://pixabay.com/static/uploads/photo/2015/09/14/19/15/aerial-landscape-939963_960_720.jpg";
    var dummyPost = "Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus.";
    return (
      <div>
        <Banner />
        <div className="row medium-8 large-7 columns">
          <Post ptitle="Flux flack" pimg={imgOne} date="Nov 2, 2015" postbody={dummyPost} author="Fred Armisen"
                comments="2" tags=""/>
          <Post ptitle="Inline Styles Aren't Necessary" pimg={imgTwo} postbody={dummyPost} date="Aug 15, 2015"
                author="Amy Schumer" comments="5"/>
          <Post ptitle="Webpack and ES6" pimg={imgThree} date="Mar 9, 2015" postbody={dummyPost} author="Victoria Bell"
                comments="3"/>
          <Post ptitle="No More Goobers" pimg={imgFour} date="Jan 11, 2015" postbody={dummyPost} author="Jack Sherlock"
                comments="7"/>

          <div className="list-of-posts">
            {Object.keys(this.state.posts).map(this.renderPost)}
          </div>
          <AddPostForm addPost={this.addPost}/>
        </div>
      </div>
    )
  }

});

/*
 Add Post Form
 <AddPostForm />
 */
var AddPostForm = React.createClass({
  createPost: function (event) {
    event.preventDefault();
    // take the data from the form and create an object
    var post = {
      title: this.refs.title.value,
      name: this.refs.name.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    }
    // add the post to the App State
    this.props.addPost(post);
    this.refs.postForm.reset();
  },
  render: function () {
    return (
      <div className="callout secondary form-area">
        <h5>Add a Post to the React Blog</h5>
        <form className="post-edit" ref="postForm" onSubmit={this.createPost}>
          <label>Post Title
            <input type="text" ref="title" placeholder="Post Title" required/>
          </label>
          <label>Author Name
            <input type="text" ref="name" placeholder="Full Name required" required/>
          </label>
          <label>Post Body
            <textarea
              ref="desc"
              placeholder="Write your post here" required/>
          </label>
          <label>Image URL - <span className="highlight">use this one to test 'http://bit.ly/1P9prpc'</span>
            <input type="url" ref="image" placeholder="The URL of the featured image for your post" required/>
          </label>
          <button type="submit" className="button">Add Post</button>
        </form>
      </div>
    )
  }
});


/*
 NewPost
 <NewPost />
 */
var NewPost = React.createClass({
  render: function () {
    var details = this.props.details;
    return (
      <div className="blog-post">
        <h3 className="ptitle">{details.title}
          <small>{h.getTime()}</small>
        </h3>
        <img className="thumbnail" src={details.image} alt={details.name}/>
        <p>{details.desc}</p>
        <div className="callout callout-post">
          <ul className="menu simple">
            <li><a href="#">Author: {details.name}</a></li>
            <li><a href="#">Comments: 0</a></li>
            <li><a href="#">Tags: {h.getTaggedName()}</a></li>
          </ul>
        </div>
      </div>
    )
  }
});


// Nav component
var Nav = React.createClass({

  render: function () {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">React Blog</li>
            <li><a href="#">One</a></li>
            <li><a href="#">Two</a></li>
            <li><a href="#">Three</a></li>
          </ul>
        </div>
      </div>
    )
  }

});

//
// Banner component
var Banner = React.createClass({

  render: function () {
    return (
      <div>
        <Nav />
        <div className="big-banner">
          <div className="callout large primary">
            <div className="row column text-center">
              <h1>React Blog</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }

});


// Blog Post
var Post = React.createClass({
  tryClick: function () {
    alert('just trying out click events lalala');
  },
  render: function () {
    var com = "Comments";
    return (
      <div className="blog-post">
        <h3 className="ptitle">{this.props.ptitle}
          <small>{this.props.date}</small>
        </h3>
        <img className="thumbnail" src={this.props.pimg}/>
        <p>{this.props.postbody}</p>
        <div className="callout callout-post">
          <ul className="menu simple">
            <li><a href="#" onClick={this.tryClick}>Author: {this.props.author}</a></li>
            <li><a href="#">{com}: {this.props.comments}</a></li>
            <li><a href="#">Tags: {h.getTaggedName()}</a></li>
          </ul>
        </div>
      </div>
    )
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

//instead of ReactDOM like in the video:
//React.render(<App/>, document.querySelector("#main"));

//polyfill for key
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

//header scroll stuff
window.onscroll = function (e) {
  var nav = document.getElementsByClassName("top-bar")[0],
    banner = document.getElementsByClassName("big-banner")[0],
    range = 70,
    scrollTop = document.body.scrollTop;

  if (scrollTop > range) {
    nav.classList.add("scrollNav");
    banner.classList.add("blurred");
  }
  else {
    nav.classList.remove("scrollNav");
    banner.classList.remove("blurred");
  }
};

