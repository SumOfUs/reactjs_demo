
var CommentBox = React.createClass({
  getInitialState() {
    return {comments: []};
  },

  componentDidMount() {
    $.get('/comments.json', function(comments){
      this.setState({comments: comments});
    }.bind(this))
  },

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList comments={this.state.comments} />
        <CommentForm />
      </div>
    )
  }
})

var CommentList = React.createClass({
  render() {
    var commentNodes = this.props.comments.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      )
    })

    return (
      <div className="commentList">
        { commentNodes }
      </div>
    )
  }
})

var CommentForm = React.createClass({
  render() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    )
  }
})

var Comment = React.createClass({
  render() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    )
  }
})
