import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/moviesActions';

class ListResults extends React.Component {
  state = {
    yearReverse: true,
    toyear: 0,
    fromyear: 0,
  }

  handleReverse = () => {
    const { yearReverse } = this.state;
    this.setState({ yearReverse: !yearReverse });
  }

  handleRange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  getYearOptions = () => {
    const years = [];
    for (let i = 2019; i > 1885; i -= 1) {
      years.push(i);
    }
    return years.map(y => <option key={y} value={y}>{y}</option>);
  }

  render() {
    let { movies } = this.props;
    const { yearReverse, fromyear, toyear } = this.state;
    let results = [];
    if (movies) {
      if (yearReverse) {
        movies.sort((a, b) => b.Year - a.Year);
      } else {
        movies.sort((a, b) => a.Year - b.Year);
      }
      if (fromyear > 0) {
        movies = movies.filter(m => m.Year > fromyear);
      }
      if (toyear > 0) {
        movies = movies.filter(m => m.Year < toyear);
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
        {(results.length > 0 && results.constructor === Array) ? (
          <>
            <div className="row">
              <div className="col s5 m2">
                <button type="button" className="btn-small" onClick={this.handleReverse} onKeyDown={this.handleReverse}>Sort By Year</button>
              </div>
              <div className="col s2 m1">
                <p>Filter by Year: </p>
              </div>
              <div className="input-field col s5 m3">
                <select defaultValue="0" onChange={this.handleRange} id="fromyear" style={{ display: 'unset' }}>
                  <option value="0" disabled>From</option>
                  {this.getYearOptions()}
                </select>
              </div>
              <div className="input-field col s5 m3">
                <select defaultValue="0" onChange={this.handleRange} id="toyear" style={{ display: 'unset' }}>
                  <option value="0" disabled>To</option>
                  {this.getYearOptions()}
                </select>
              </div>
            </div>
          </>
        ) : null}
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
