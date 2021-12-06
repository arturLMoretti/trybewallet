import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteUserExpense, editExpense } from '../actions';

const tableHeader = (
  <thead>
    <tr>
      <th>Descrição</th>
      <th>Tag</th>
      <th>Método de pagamento</th>
      <th>Valor</th>
      <th>Moeda</th>
      <th>Câmbio utilizado</th>
      <th>Valor convertido</th>
      <th>Moeda de conversão</th>
      <th>Editar/Excluir</th>
    </tr>
  </thead>
);
class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  editExpense({ target }) {
    const { userExpenses, dispatch } = this.props;
    dispatch(editExpense(userExpenses[target.name]));
  }

  deleteExpense({ target }) {
    const { userExpenses, dispatch } = this.props;
    const deletedExpenseValueinReais = userExpenses
      .filter((expense) => expense.id === parseInt(target.name, 10)).map((expense) => {
        const { value, currency,
          exchangeRates } = expense;
        return (exchangeRates[currency].ask * value).toFixed(2);
      });
    const newUserExpenses = (userExpenses
      .filter((expense) => expense.id !== parseInt(target.name, 10)));
    dispatch(deleteUserExpense(newUserExpenses, deletedExpenseValueinReais));
  }

  render() {
    const { userExpenses } = this.props;
    const tableRows = userExpenses.map((expense) => {
      const { id, value, description, currency,
        method, tag, exchangeRates } = expense;
      const expenseValueinReais = exchangeRates[currency].ask * value;
      const currencyValueinReais = exchangeRates[currency].ask;
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{exchangeRates[currency].name.replace('/Real Brasileiro', '')}</td>
          <td>{parseFloat(currencyValueinReais).toFixed(2)}</td>
          <td>{parseFloat(expenseValueinReais).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              type="submit"
              data-testid="edit-btn"
              onClick={ (e) => this.editExpense(e) }
              name={ id }
            >
              Editar
            </button>
            <button
              type="submit"
              data-testid="delete-btn"
              onClick={ (e) => this.deleteExpense(e) }
              name={ id }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
    return (
      <table>
        {tableHeader}
        <tbody>
          {tableRows}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userExpenses: state.wallet.expenses,
  areExpensesUpdated: state.wallet.areExpensesUpdated,
});

export default connect(mapStateToProps)(ExpensesTable);
