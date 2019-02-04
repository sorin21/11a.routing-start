import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id) {
      // update the state if we loaded a new post to not get an infinite loop
      // if !this.state.loadedPost  means if we even don't have a post
      // check if loadedPost id is not the same that we got from props
      // becasue that will mean that the id that we want to fetch is the id that we loaded already
      // so we don't need to make a hhtp request
      // so check if we don't have any post or we have one but the id is diff from the one from props
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
        // then get data for a clicked post
        axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
          .then(response => {
            this.setState({ loadedPost: response.data })
          })
      }

    }
  }

  onDeleteHandler = () => {
    axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
      .then(response => {
        console.log(response)
      })
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.onDeleteHandler}>Delete</button>
          </div>
        </div>

      );
    }

    return post;
  }
}

export default FullPost;