import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './actions/moviesActions';

class App extends Component {
  componentDidMount() {
    const { getMovies } = this.props;
    getMovies();
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Search</h1>
      </div>
    );
  }
}

App.propTypes = {
  getMovies: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps, { ...actions })(App);
