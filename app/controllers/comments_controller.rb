class CommentsController < ApplicationController
  def index
    render json: [
      {author: "Pete Hunt", text: "This is one comment"},
      {author: "Jordan Walke", text: "This is *another* comment"}
    ]
  end
end
