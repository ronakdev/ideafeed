var currentFilters = ["Javascript", "iOS"]
var posts = [{profile: {username: "i_am_not_a_condiment", image: "temp.png"}, content: "Uber for Waffles", upvotes: 3, comments: ["Wow Amazing"]}]
var currentUser = " i_am_not_a_condiment"
class App extends React.Component {
    render() {
        return (
            <div>
                <PostWriter />
                
                <Filters />
                {
                    posts.map(function(p) {
                        return (
                            <Post profile={p.profile} content={p.content} upvotes={p.upvotes} comments={p.comments} />
                        )

                    })
                }
                
            </div>
        )
    }
}

class Post extends React.Component {
    render() {
        return (
            <div className="row">
            <div className="col s12">
            <div className="card blue-grey darken-1 post">
                        <div className="card-content white-text">
                            <span className="card-title"><i className="fa fa-user-circle" aria-hidden="true"></i> {this.props.profile.username} </span>
                            <p>{this.props.content}</p>
                            
                        </div>
                        <div className="card-action">
                            
                            <div className="row">
                                <span className="image-caption">{this.props.upvotes} upvotes {this.props.comments.length} comments</span>
                            </div>
                        </div>
                        <div className="card-action center">
                            
                            <div className="row">
                                <div className="col s6">
                                    <a href="#">Comment</a>
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
                   currentFilters.map(function(filter) {
                       return (
                        <div className="chip">
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

class PostWriter extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.state = ({
            tags: "",
            content: ""
        })
        this.addPost = this.addPost.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleTagChange = this.handleTagChange(this)
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
                                  <textarea id="textarea1" className="materialize-textarea" value={this.state.content} onChange={this.handleContentChange} placeholder="Post Content"></textarea>
                                  <label for="textarea1">Content</label>
                                </div>
                              </div>
                                <div className="row">
                                <div className="input-field col s12">
                                  <input id="first_name" type="text" className="validate" value={this.state.tags} onChange={this.handleTagChange} placeholder="tags"/>
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



ReactDOM.render(<App/>, document.getElementById("main"))
ReactDOM.render(<Navbar/>, document.getElementById("navigation"))