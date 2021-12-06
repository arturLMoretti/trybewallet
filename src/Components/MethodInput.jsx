import PropTypes from 'prop-types';
import React from 'react';

class MethodInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { onInputChange, value } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          data-testid="method-input"
          onChange={ onInputChange }
          value={ value }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

MethodInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MethodInput;
