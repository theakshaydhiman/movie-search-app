import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class AddForm extends React.Component {
  state = {
    title: '',
    suggestions: [],
  }

  searchMovies = (title) => {
    const { search } = this.props;
    search(title);
  }

  handleSubmit = (e) => {
    const { title } = this.state;
    e.preventDefault();
    this.searchMovies(title);
    this.setState({ suggestions: [] });
  }

  handleTitleChange = (e) => {
    const searchText = e.target.innerText;
    this.setState({ title: searchText, suggestions: [] });
    this.searchMovies(searchText);
  }

  handleChange = (e) => {
    const { value } = e.target;
    let suggestions = [];
    this.setState({ title: value, suggestions });
    axios.get(`http://www.omdbapi.com/?s=${e.target.value}&apikey=5ce2c41a&type=movie&page=1`)
      .then((res) => {
        if (res.data.Response === 'True' && value.length > 0) {
          suggestions = res.data.Search.map(m => m.Title);
          this.setState({ suggestions });
        } else {
          this.setState({ suggestions: [] });
        }
      });
  }

  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) return null;
    return (
      <ul className="sugg-items">
        {suggestions.map(s => <li key={s} onClick={this.handleTitleChange} className="sugg-item">{s}</li>)}
      </ul>
    )
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12 input-field">
              <label htmlFor="title">Search</label>
              <input type="text" name="title" id="title" value={title} onChange={this.handleChange} onKeyDown={this.handleChange} />
              {this.renderSuggestions()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddForm.propTypes = {
  search: PropTypes.func.isRequired,
};

export default AddForm;
