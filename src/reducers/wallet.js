// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { UPDATE_USER_WALLET, FAILED_REQUEST,
  UPDATE_API_CURRENCIES, DELETE_USER_EXPENSE,
  EDIT_EXPENSE, UPDATE_EXPENSE } from '../actions';

export const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  error: '',
  expenseToEdit: {},
  areExpensesUpdated: false,
};

export const currentExpenseValueinReais = (
  currentValue, currentCurrency, currentExchangeRates,
) => {
  const currentExpenseValue = parseFloat(currentValue);
  return (currentExchangeRates[currentCurrency].ask
  * currentExpenseValue).toFixed(2);
};

export const wallet = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case UPDATE_API_CURRENCIES:
    return { ...state,
      currencies: [...action.payload],
    };
  case UPDATE_USER_WALLET:
    return { ...state,
      expenses: [...state.expenses, {
        ...action.state, exchangeRates: action.payload,
      }],
      areExpensesUpdated: true,
    };
  case DELETE_USER_EXPENSE:
    return { ...state,
      expenses: action.state,
    };
  case EDIT_EXPENSE:
    return { ...state,
      expenseToEdit: action.expense,
      areExpensesUpdated: false };
  case UPDATE_EXPENSE:
    return { ...state,
      expenses: action.state,
      areExpensesUpdated: true };
  case FAILED_REQUEST:
    return { ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};
