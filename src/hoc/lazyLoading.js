import React, { Component } from 'react';

// Code spliting tehnique
// load this component asynchronously, only when is need it
// importComponent will be a function
const lazyLoading = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }

    // when the component was mounted
    componentDidMount() {
      importComponent()
        .then(cmp => {
          // console.log('cmp', cmp)
          this.setState({ component: cmp.default });
        });
    }

    render() {
      const Component = this.state.component;

      return Component ? <Component {...this.props} /> : null;
    }
  }
}

export default lazyLoading;