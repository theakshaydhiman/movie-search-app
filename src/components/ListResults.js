import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/moviesActions';

class ListResults extends React.Component {
  state = {
    yearReverse: true,
  }

  handleReverse = () => {
    const { yearReverse } = this.state;
    this.setState({ yearReverse: !yearReverse });
  }

  render() {
    const { movies } = this.props;
    const { yearReverse } = this.state;
    let results = [];
    if (movies) {
      if (yearReverse) {
        movies.sort((a, b) => b.Year - a.Year);
      } else {
        movies.sort((a, b) => a.Year - b.Year);
      }
      results = movies.map(m => (
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
                Year:&nbsp;
                {m.Year}
              </p>
            </div>
          </div>
        </div>
      ));
    } else {
      results = 'Please search and the results shall show.';
    }
    return (
      <>
        {(results.length > 0 && results.constructor === Array) ? <span role="button" className="btn-small" tabIndex={0} onClick={this.handleReverse} onKeyDown={this.handleReverse}>Sort Year</span> : null}
        <div className="results-items">
          {results}
        </div>
      </>
    );
  }
}

ListResults.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

const mapStateToProps = state => ({
  movies: state.movies.movies,
});

export default connect(mapStateToProps, { ...actions })(ListResults);
