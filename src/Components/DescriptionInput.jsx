import PropTypes from 'prop-types';
import React from 'react';

class DescriptionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { description, onInputChange } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ onInputChange }
          value={ description }
        />
      </label>
    );
  }
}

DescriptionInput.propTypes = {
  description: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default DescriptionInput;
