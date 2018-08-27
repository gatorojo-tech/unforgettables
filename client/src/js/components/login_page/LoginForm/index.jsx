import React from 'react';
import constants from '../../app_level/constants.jsx';
import './login_form.css';

function LoginForm() {
  return (
    <div className='login_form_wrapper'
         id='unf_app'>
      <div className='login_form_description'>{constants.loginPage.greeting}</div>

      <a className='login_form_button'
         href='/auth/google'>
        {constants.loginPage.loginButtonText}
      </a>
    </div>
  )
}

export default LoginForm;
