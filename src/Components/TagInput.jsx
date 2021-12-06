import PropTypes from 'prop-types';
import React from 'react';

class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { onInputChange, value } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          id="tag"
          name="tag"
          data-testid="tag-input"
          onChange={ onInputChange }
          value={ value }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

TagInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TagInput;
