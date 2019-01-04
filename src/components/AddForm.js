import React from 'react';
import PropTypes from 'prop-types';

class AddForm extends React.Component {
  state = {
    title: '',
  }

  handleSubmit = (e) => {
    const { search } = this.props;
    const { title } = this.state;
    e.preventDefault();
    search(title);
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="movie-title">
              Search
              <input type="text" name="title" id="movie-title" value={title} onChange={this.handleChange} />
            </label>
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
