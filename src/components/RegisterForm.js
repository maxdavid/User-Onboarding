import React from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import moment from 'moment';

function RegisterForm({ values, errors, touched }) {
  return (
    <Form className='form'>
      <h1>Register!</h1>
      <div className='input-group'>
        {touched.username && errors.username && <p>{errors.username}</p>}
        <div className='label-input'>
          <label>Username</label>
          <Field type='text' name='username' placeholder='Username' />
        </div>
      </div>
      <div className='input-group'>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <div className='label-input'>
          <label>Email Address</label>
          <Field type='email' name='email' placeholder='You@website.com' />
        </div>
      </div>
      <div className='input-group'>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <div className='label-input'>
          <label>Password</label>
          <Field type='password' name='password' placeholder='Password' />
        </div>
      </div>
      <div className='input-group'>
        {touched.tosAgree && errors.tosAgree && <p>{errors.tosAgree}</p>}
        <div className='checkbox-input'>
          <label>I agree to the Terms of Service</label>
          <Field type='checkbox' name='tosAgree' checked={values.tosAgree} />
        </div>
      </div>
      <button type='submit'>Submit</button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues({ username, email, password, tosAgree }) {
    return {
      username: username || '',
      email: email || '',
      password: password || '',
      tosAgree: tosAgree || false
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter a username.'),
    email: Yup.string()
      .email()
      .required('Please enter your email address.'),
    password: Yup.string()
      .min(6)
      .required(),
    tosAgree: Yup.bool()
      .test(
        'tosAgree',
        'Please agree to our Terms of Service',
        value => value === true
      )
      .required('Please agree to our Terms of Service')
  }),

  handleSubmit: values => {
    console.log(values);
    axios
      .post('https:reqres.in/api/users', values)
      .then(res => {
        window.alert(
          `The user ${res.data.username} was signed up at ${moment(
            res.data.createdAt
          ).format('MMMM Do YYYY, h:mm:ss a')}`
        );
      })
      .catch(err => console.log(err));
  }
})(RegisterForm);
