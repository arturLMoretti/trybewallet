import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ExpensesForm from './ExpensesForm';
import ExpensesTable from './ExpensesTable';
import { currentExpenseValueinReais } from '../reducers/wallet';
import { updateCurrencies } from '../actions';
import './styles/wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCurrency: 'BRL',
    };
  }

  componentDidMount() {
    const { currenciesOnState } = this.props;
    currenciesOnState();
  }

  render() {
    const { userEmail, allUserExpenses } = this.props;
    const { currentCurrency } = this.state;
    // const sumOfUserExpenses = Math.round(totalUserExpenses * 100) / 100;
    // console.log(currentExpenseValueinReais(currentvalue, currentCurrency, currentExchangeRates));
    const currentTotalValue = allUserExpenses
      .reduce((acc, actual) => acc + parseFloat(currentExpenseValueinReais(actual
        .value, actual.currency, actual.exchangeRates)), 0);
    return (
      <div className="wallet-container">
        <header>
          <p data-testid="email-field">{userEmail}</p>
          <div className="wallet-total-expense">
            <p>
              Gasto total:
              {' '}
            </p>
            <p data-testid="total-field">
              {currentTotalValue}
            </p>
            <p data-testid="header-currency-field">{currentCurrency}</p>
          </div>
        </header>
        <ExpensesForm />
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  allUserExpenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  currenciesOnState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  allUserExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesOnState: (state) => dispatch(updateCurrencies(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
