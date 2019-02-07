import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

  render() {

    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to={{
                pathname: '/new-post',
                hash: '#submit',
                search: '?quikck-submit=true'
              }}>New Post</Link></li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/new-post" exact component={NewPost} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
