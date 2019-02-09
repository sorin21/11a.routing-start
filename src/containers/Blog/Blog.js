import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';

import Posts from './Posts/Posts';
// import lazyLoading from '../../hoc/lazyLoading';
import './Blog.css';

// const AsyncNewPost = lazyLoading(() => {
//   return import('../../components/NewPost/NewPost');
// });

const LazyLoading = (loader) => Loadable({
  loader,
  loading: ({ error, pastDelay }) => {
    if (error) {
      console.error('react-loadable error!', error);
      return null;
    }
    // pastDelay will be true if real delay > 100ms
    return pastDelay && <h3>Loading...</h3>;
  },
  delay: 100
});

const NewPost = LazyLoading(() => import('../../components/NewPost/NewPost'))

class Blog extends Component {
  state = {
    auth: true
  }

  render() {

    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink exact to="/posts/">Posts</NavLink></li>
              <li><NavLink to={{
                pathname: '/new-post',
                hash: '#submit',
                search: '?quikck-submit=true'
              }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Not found</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
