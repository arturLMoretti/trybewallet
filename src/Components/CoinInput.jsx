import PropTypes from 'prop-types';
import React from 'react';

class CoinInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { onInputChange, value, currencyList } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          data-testid="currency-input"
          onChange={ onInputChange }
          value={ value }
        >
          {currencyList.map((coin) => (
            <option
              data-testid={ coin }
              value={ coin }
              key={ coin }
            >
              {coin}
            </option>))}
        </select>
      </label>
    );
  }
}

CoinInput.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  currencyList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CoinInput;
