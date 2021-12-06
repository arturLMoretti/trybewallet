import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { updateUserEmail, updateCurrencies } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoginButtonDisabled: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeLoginButtonStatus = this.changeLoginButtonStatus.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { email } = this.state;
    const { userEmailOnState, currenciesOnState, history } = this.props;
    event.preventDefault();
    userEmailOnState(email);
    currenciesOnState();
    history.push('/carteira');
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.changeLoginButtonStatus();
  }

  changeLoginButtonStatus() {
    this.setState({}, () => {
      const { email, password } = this.state;
      const MIN_PASSWORD_LENGTH = 6;
      const isEmailValid = this.validateEmail(email);
      this.setState({
        isLoginButtonDisabled: !(isEmailValid && password.length >= MIN_PASSWORD_LENGTH),
      });
    });
  }

  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    const { email, password, isLoginButtonDisabled } = this.state;
    return (
      <Container>
        <form method="post" onSubmit={ this.onSubmit }>
          <label htmlFor="email">
            <input
              placeholder="Email"
              data-testid="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleInputChange }
            />

          </label>
          <label htmlFor="password">
            <input
              placeholder="Password"
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleInputChange }
            />
          </label>
          <Button
            type="submit"
            disabled={ isLoginButtonDisabled }
          >
            Entrar
          </Button>
        </form>
      </Container>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  userEmailOnState: PropTypes.func.isRequired,
  currenciesOnState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEmailOnState: (state) => dispatch(updateUserEmail(state)),
  currenciesOnState: (state) => dispatch(updateCurrencies(state)),
});

export default connect(null, mapDispatchToProps)(Login);
