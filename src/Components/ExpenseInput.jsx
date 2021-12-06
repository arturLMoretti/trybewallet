import PropTypes from 'prop-types';
import React from 'react';

class ExpenseInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { onInputChange, value } = this.props;
    return (
      <label htmlFor="value">
        Despesa:
        <input
          id="value"
          type="number"
          className="Input"
          name="value"
          data-testid="value-input"
          onChange={ onInputChange }
          value={ value }
        />
      </label>
    );
  }
}

ExpenseInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ExpenseInput;
