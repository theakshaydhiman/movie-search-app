import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class AddForm extends React.Component {
  state = {
    title: '',
    suggestions: [],
  }

  // Calls search method.
  searchMovies = (title) => {
    const { search } = this.props;
    search(title);
  }

  // Calls method to search for movies on submit and empties the suggestions state.
  handleSubmit = (e) => {
    const { title } = this.state;
    e.preventDefault();
    this.searchMovies(title);
    this.setState({ suggestions: [] });
  }

  // Handles clicks event of the suggestion item and sets the value to the local state.
  // Then, clears the suggestions state and calls method to search movies.
  handleTitleChange = (e) => {
    const searchText = e.target.innerText;
    this.setState({ title: searchText, suggestions: [] });
    this.searchMovies(searchText);
  }

  // Sets the input field value to the local state.
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ title: value, suggestions: [] });
    this.getSuggestions();
  }

  // Fetches suggestions from the API and sets them to the local state.
  getSuggestions = () => {
    let suggestions = [];
    const { title } = this.state;
    axios.get(`http://www.omdbapi.com/?s=${title}&apikey=5ce2c41a&type=movie&page=1`)
      .then((res) => {
        if (res.data.Response === 'True' && title.length > 0) {
          suggestions = res.data.Search.map(m => m.Title);
          suggestions.sort();
          this.setState({ suggestions });
        } else {
          this.setState({ suggestions: [] });
        }
      });
  }

  // Renders suggestions as list items.
  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) return null;
    return (
      <ul className="sugg-items">
        {suggestions.map(s => <li key={s} onClick={this.handleTitleChange} className="sugg-item">{s}</li>)}
      </ul>
    );
  }

  // Handles onFocus and onBlur events of the input field.
  handleClick = (e) => {
    const { title } = this.state;
    if (e.type === 'blur') {
      this.setState({ suggestions: [] });
    } else if (e.type === 'focus' && title.length > 0) {
      this.getSuggestions();
    }
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12 input-field">
              <i className="material-icons prefix">search</i>
              <input type="text" name="title" id="title" value={title} onChange={this.handleChange} onKeyDown={this.handleChange} onFocus={this.handleClick} onBlur={this.handleClick} />
              <label htmlFor="title">Search</label>
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
