import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateExchangeRate, updateExpense,
  updateCurrencies } from '../actions';
import ExpenseInput from '../Components/ExpenseInput';
import CoinInput from '../Components/CoinInput';
import MethodInput from '../Components/MethodInput';
import TagInput from '../Components/TagInput';
import DescriptionInput from '../Components/DescriptionInput';

const TAG_NAME = 'Alimentação';
class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: TAG_NAME,
      isEditExpenseOn: false,
    };
    this.onClick = this.onClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.onEditExpenseClick = this.onEditExpenseClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { expenseToEdit } = this.props;
    if (prevProps.expenseToEdit !== expenseToEdit) {
      this.updateExpense(expenseToEdit);
    }
  }

  onClick(event) {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { expensesOnState } = this.props;
    expensesOnState({ id, value, description, currency, method, tag });
    this.setState((oldState) => ({
      id: oldState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: TAG_NAME,
    }));
  }

  onEditExpenseClick(event) {
    event.preventDefault();
    const { editExpenseOnState, expenseToEdit,
      userExpenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const { id, exchangeRates } = expenseToEdit;
    const updatedExpense = { id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates };
    const newUserExpenses = [...userExpenses];
    const index = userExpenses.indexOf(expenseToEdit);
    const ELEMENT_NOT_FOUND = -1;
    newUserExpenses[index] = (index !== ELEMENT_NOT_FOUND)
      ? updatedExpense : userExpenses[index];
    editExpenseOnState(newUserExpenses);
    this.setState({
      isEditExpenseOn: false,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: TAG_NAME,
    });
  }

  updateExpense({ value, description, currency, method, tag }) {
    return this.setState({
      value, description, currency, method, tag, isEditExpenseOn: true,
    });
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag,
      isEditExpenseOn } = this.state;
    const { currencyList } = this.props;
    const editButton = (
      <button
        type="button"
        onClick={ this.onEditExpenseClick }
      >
        Editar despesa
      </button>);
    const addExpenseButton = (
      <button type="submit" onClick={ this.onClick }>Adicionar despesa</button>
    );
    return (
      <form className="expense-form" method="post">
        <ExpenseInput
          onInputChange={ this.handleInputChange }
          value={ value }
        />
        <DescriptionInput
          description={ description }
          onInputChange={ this.handleInputChange }
        />
        <CoinInput
          onInputChange={ this.handleInputChange }
          value={ currency }
          currencyList={ currencyList }
        />
        <MethodInput
          onInputChange={ this.handleInputChange }
          value={ method }
        />
        <TagInput
          onInputChange={ this.handleInputChange }
          value={ tag }
        />
        {isEditExpenseOn
          ? editButton
          : addExpenseButton}
      </form>);
  }
}

ExpensesForm.propTypes = {
  expensesOnState: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.objectOf(PropTypes.any).isRequired,
  editExpenseOnState: PropTypes.func.isRequired,
  userExpenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  currencyList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userExpenses: state.wallet.expenses,
  expenseToEdit: state.wallet.expenseToEdit,
  currencyList: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  expensesOnState: (state) => dispatch(updateExchangeRate(state)),
  editExpenseOnState: (state) => dispatch(updateExpense(state)),
  currenciesOnState: (state) => dispatch(updateCurrencies(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
