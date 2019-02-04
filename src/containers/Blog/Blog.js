import React, { Component } from 'react';
import axios from 'axios'

import Post from '../../components/Post/Post';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            //distribute the props of the post
            ...post,
            // and add hardcodded author
            author: 'Sorin'
          }
        })
        this.setState({ posts: updatedPosts })
      })
      .catch((error) => {
        // console.log('error', error)
        this.setState({ error: true })
      })
  }

  // id of post that was selected
  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id })
  }

  render() {
    let posts = <p>Something went wrong</p>

    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)} />
      });
    }
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/new-post">New Post</a></li>
            </ul>
          </nav>
        </header>
        <section className="Posts">
          {posts}
        </section>

      </div>
    );
  }
}

export default Blog;