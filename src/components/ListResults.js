import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/moviesActions';

class ListResults extends React.Component {
  state = {}

  render() {
    const { movies } = this.props;
    movies.sort((a, b) => b.Year - a.Year);
    const results = movies.map(m => (
      <div className="results-item" key={m.imdbID}>
        <div className="card">
          <div className="card-image">
            <img src={m.Poster} alt={m.Title} />
          </div>
          <div className="card-content">
            <p>
              <strong>
                {m.Title}
              </strong>
            </p>
            <p>
              Year: {m.Year}
            </p>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="results-items">
        {results}
      </div>
    );
  }
}

ListResults.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps, { ...actions })(ListResults);
