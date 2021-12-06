// Coloque aqui suas actions
export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';
export const UPDATE_USER_WALLET = 'UPDATE_USER_WALLET';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const UPDATE_API_CURRENCIES = 'UPDATE_API_CURRENCIES';
export const DELETE_USER_EXPENSE = 'DELETE_USER_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const updateUserEmail = (state) => ({
  type: UPDATE_USER_EMAIL,
  state,
});

export const updateUserExpenses = (state, json) => ({
  type: UPDATE_USER_WALLET,
  payload: json,
  state,
});

export const deleteUserExpense = (state, deletedExpenseValueinReais) => ({
  type: DELETE_USER_EXPENSE,
  state,
  deletedExpenseValueinReais,
});

export const failedRequest = (err) => ({
  type: FAILED_REQUEST,
  payload: err,
});

export const updateAPICurrencies = (payload) => ({
  type: UPDATE_API_CURRENCIES,
  payload,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const updateExpense = (state) => ({
  type: UPDATE_EXPENSE,
  state,
});

export const fetchAPI = async () => fetch('https://economia.awesomeapi.com.br/json/all');

export function updateCurrencies() {
  return async (dispatch) => {
    const r = await fetchAPI();
    r.json()
      .then(
        (json) => dispatch(updateAPICurrencies(Object
          .keys(json).filter((currency) => currency !== 'USDT'))),
        (error) => dispatch(failedRequest(error)),
      );
  };
}

export function updateExchangeRate(state) {
  return async (dispatch) => {
    const r = await fetchAPI();
    r.json()
      .then(
        (json) => dispatch(updateUserExpenses(state, json)),
        (error) => dispatch(failedRequest(error)),
      );
  };
}
