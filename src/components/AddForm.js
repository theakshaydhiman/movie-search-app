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
          <div className="row">
            <div className="col s12 input-field">
              <label htmlFor="title">Search</label>
              <input type="text" name="title" id="title" value={title} onChange={this.handleChange} />
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
