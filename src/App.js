import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './actions/moviesActions';
import AddForm from './components/AddForm';
import ListResults from './components/ListResults';

class App extends Component {
  state = {}

  render() {
    const { getMovies } = this.props;
    return (
      <div className="container">
        <h1>Movie Search</h1>
        <AddForm search={query => getMovies(query)} />
        <ListResults />
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
