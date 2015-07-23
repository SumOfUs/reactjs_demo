
var CommentBox = React.createClass({
  getInitialState() {
    return {comments: []};
  },

  componentDidMount() {
    $.get('/comments.json', function(comments){
      this.setState({comments: comments});
    }.bind(this))
  },

  handleCommentSubmit(comment) {
    var comments = this.state.comments;
    var newComments = comments.concat([comment]);
    this.setState({comments: newComments});
  },

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList comments={this.state.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
  handleSubmit(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();

    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },

  render() {
    return (
      <div className="commentForm">
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
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
