  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAU6CNPefTTPzXjC79mDwLUeUikMsLgBDg",
    authDomain: "ideafeed-4f92d.firebaseapp.com",
    databaseURL: "https://ideafeed-4f92d.firebaseio.com",
    projectId: "ideafeed-4f92d",
    storageBucket: "",
    messagingSenderId: "85638812859"
  };
  firebase.initializeApp(config);
var currentUser = prompt("Enter a username")

var currentFilters = ["Javascript", "iOS"]

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {posts: [/*{username: "i_am_not_a_condiment", content: "Uber for Waffles", upvotes: 3, comments: ["Wow Amazing"] ,tags: ["Javascript"]}*/]}
        this.getPosts = this.getPosts.bind(this)
        this.updatePosts = this.updatePosts.bind(this)
        

    }
    updatePosts(newPosts) {
        this.setState({posts: newPosts})
    }
    getPosts() {
        return this.state.posts
    }
    componentDidMount() {
      var that = this;
        console.log('before')
      firebase.database().ref("posts").on("child_added", (child) => {
        var p = that.state.posts;
        console.log(child.val());
        p.push(child.val());
        that.setState({
          posts: p,
        });
      }, (error) => {
        console.log("error");
      });
    }
    
    render() {
        return (
            <div>
                <TextForm handler={this}/>
                <br/>
                <Filters />
                {
                    
                    this.state.posts.reverse().map((p, index) => {
                        return (
                            <Post username={p.username} content={p.content} upvotes={p.upvotes} comments={p.comments} key={index} tags ={p.tags} handler={this}  getPosts={this.getPosts} updatePosts={this.updatePosts} />
                        )

                    })
                }
                
            </div>
        )
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.upvotePost = this.upvotePost.bind(this)
    
    }
    
    upvotePost() {
//                    var post = this.props.handler.state.posts[this.props.key]
//                    console.log(post)
//                    this.props.handler.state.posts.splice(this.props.key, 1)
        //post.upvotes = post.upvotes + 1
        //pushToServer(post)
    }
    render() {
        return (
            <div className="row">
            <div className="col s12">
            <div className="card blue-grey darken-1 post">
                        <div className="card-content white-text">
                            <span className="card-title"><i className="fa fa-user-circle" aria-hidden="true"></i> {this.props.username} </span>
                            <p>{this.props.content}</p>
                            
                        </div>
                        <div className="card-action">
                            {
                   this.props.tags.map(function(filter, index) {
                       return (
                        <div className="chip" key={index}>
                            {filter} <a href="#"><i className="fa fa-times" aria-hidden="true"></i></a>
                        </div>
                       )
                   })
               }    
                        </div>
                        <div className="card-action">
                            
                                <span className="image-caption">{this.props.upvotes} upvotes</span>
                            
                        </div>
                        <div className="card-action center">
                            
                            <div className="row">
                                <div className="col s6">
                                    <a href="#" onClick={this.upvotePost()}>Upvote</a>
                                </div>
                                <div className="col s6">
                                    <a href="#">Message</a>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        )
    }
}

class Filters extends React.Component {
   render() {
       return (
           <div className="row">
                <div className="col s12">
            <span>Current Filters: </span>
               {
                   currentFilters.map(function(filter, index) {
                       return (
                        <div className="chip" key={index}>
                            {filter} <a href="#"><i className="fa fa-times" aria-hidden="true"></i></a>
                        </div>
                       )
                   })
               }
              
        </div>
           </div>
       )
   } 
}

class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <ul className="left">
                        <li>
                            <a href="messages">
                                <i className="fa fa-comments-o" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                    <span className="brand-logo center">Idea Feed</span>

                    <ul className="right">
                        <li>
                            <a href="profile">
                                <i className="fa fa-user-circle" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>

                </div>
            </nav>

        )
    }
}

class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleTagChange(event) {
    this.setState({tags: event.target.value});
  }

  handleSubmit(event) {
      var t = this.state.tags.split(',')
      var post = {profile: {username: currentUser, image: "temp.png"}, content: this.state.content, upvotes: 0, comments: [], tags: t}

      //this.handler.state.posts.unshift(post)
    pushToServer(post)
    this.props.handler.forceUpdate()

    //firebase
    //pushToServer(this.state.header, this.state.content)

    event.preventDefault();
  }

  render() {
    return (
    <div className="row">
                <div className="col s12">
                    <div className="card blue">
                    <div className="card-content white-text">
      <form onSubmit={this.handleSubmit} >
          <div className="row">
                        <label for="tags-input">Tags</label>

          <input id="tags-input" type="text" value={this.state.header} onChange={this.handleTagChange} className="validate" />
          </div>
            <br />
          
          <div className="row">
            <label for="content-input">Post Content</label>
            
          <textarea id="content-input" className="materialize-textarea text-black" type="text" value={this.state.content} onChange={this.handleContentChange} />
        <br />
          </div>
        
        <button className="waves-effect waves-light btn" type="button" value="Submit" onClick={this.handleSubmit}>Post</button>      </form>
                        </div></div></div></div>
    );
  }
}



class PostWriter extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.state = ({
            value:''
        })
        
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleTagChange = this.handleTagChange(this)
        this.addPost = this.addPost.bind(this)
    }
    
    addPost() {
        var p = {
             profile: {username: currentUser, image: "temp.png"},
             content: this.state.content,
             tags: this.state.tags,
             upvotes: 0,
             comments: [""]
        }
        posts.append(p)
    }
    
    handleTagChange(event) {
        this.setState({tags: event.target.value})
    }
    
    handleContentChange(event) {
        this.setState({content: event.target.value})
    }
    
    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <div className="card blue">
                    <div className="card-content white-text">
                        <span className="card-title">Write a Post <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>

                        <div className="row">
                            <form className="col s12" onSubmit={this.addPost}>
                              
                              <div className="row">
                                <div className="input-field col s12">
                                  <textarea type="text" placeholder="Post Content" id="textarea1" className="materialize-textarea" value={this.state.content} onChange={this.handleContentChange.bind(this)}></textarea>
                                  <label for="textarea1">Content</label>
                                </div>
                              </div>
                                <div className="row">
                                <div className="input-field col s12">
                                  <input type="text" placeholder="tags" id="first_name" type="text" className="validate" value={this.state.tags} onChange={this.handleTagChange.bind(this)}/>
                                  <label for="first_name">Tags (seperate by commas)</label>
                                </div>
                              </div>
                              <div className="row">
                                <div className="input-field col s12">
                                  <a className="waves-effect waves-light btn" type="submit" >Post</a>
                                </div>
                              </div>
                              
                            </form>
                            

                          </div>
                        
                        
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

function pullFromServer() {
    var db = firebase.database();
    var children = []; // get all of the posts from firebase and return them
    db.ref("posts").once("child_added").then((child)=> {
      children.push(child);
    }).catch((error) => {
      console.log(error.message);
    });
    return children;
}

function pushToServer(post) {
    var db = firebase.database();

    db.ref("posts").push().set({
      content: post.content,
      username: post.profile.username,
      upvotes: post.upvotes,
      comments: post.comments,
      tags: post.tags
    });
    
}
//var posts = [{profile: {username: "i_am_not_a_condiment", image: "temp.png"}, content: "Uber for Waffles", upvotes: 3, comments: ["Wow Amazing"] ,tags: ["Javascript"]}]

ReactDOM.render(<App/>, document.getElementById("main"))
ReactDOM.render(<Navbar/>, document.getElementById("navigation"))