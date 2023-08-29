import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function validateFirstname(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+$/i.test(value)) {
    error = 'Invalid First name';
  }
  return error;
}

function validateLastname(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+$/i.test(value)) {
    error = 'Invalid Last name';
  }
  return error;
}

function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (value.length < 6) {
    error = 'Invalid Password!';
  }
  return error;
}

export default function Signup() {
  const [focusedFirstname, setFocusedFirstname] = useState(false);
  const [focusedLastname, setFocusedLastname] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const naviagtion = useNavigate();
  function handleUser(values) {
    axios.post('/user/register', values).then(res => naviagtion('/Account/Login'))
      .catch(err => console.log(err))
  }
  return (
    <>
      <Helmet>
        <title>Account - SignUp - BAROQUE</title>
      </Helmet>
      <Container className='text-center flex flex-col items-center pt-5 pb-20'>
        <nav className='text-5xl'>Create account</nav>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            password: '',
            email: '',
          }}
          onSubmit={values => handleUser(values)}
        >
          {({ errors, touched, isValidating }) => (
            <Form className='flex flex-col mt-10 w-full lg:w-1/2 md:w-3/4 sm:w-full'>
              <div className="mb-4 relative">
                <label className={'absolute left-4 text-xs transition-all duration-150 ' + (!focusedFirstname ? '-z-10 top-5' : 'top-1')}>
                  First name
                </label>
                <Field
                  className="border-2 border-black p-3 w-full"
                  name="firstname"
                  type="text"
                  placeholder={!focusedFirstname ? "First name" : ""}
                  validate={validateFirstname}
                  onFocus={() => setFocusedFirstname(true)}
                  onBlur={(ev) => {
                    ev.target.value ? '' :
                      setFocusedFirstname(false)
                  }}
                />
                {
                  errors.firstname && touched.firstname &&
                  <div className="text-red-500 absolute">
                    {errors.firstname}
                  </div>
                }
              </div>

              <div className="mb-4 relative">
                <label className={'absolute left-4 text-xs transition-all duration-150 ' + (!focusedLastname ? '-z-10 top-5' : 'top-1')}>
                  Last name
                </label>
                <Field
                  className="border-2 border-black p-3 w-full"
                  name="lastname"
                  type="text"
                  placeholder={!focusedLastname ? "Last name" : ""}
                  validate={validateLastname}
                  onFocus={() => setFocusedLastname(true)}
                  onBlur={(ev) => {
                    ev.target.value ? '' :
                      setFocusedLastname(false)
                  }
                  }
                />
                {
                  errors.lastname && touched.lastname &&
                  <div className="text-red-500 absolute">
                    {errors.lastname}
                  </div>
                }
              </div>
              <div className="mb-4 relative">
                <label className={'absolute left-4 text-xs transition-all duration-150 ' + (!focusedEmail ? '-z-10 top-5' : 'top-1')}>
                  Email
                </label>
                <Field
                  className="border-2 border-black p-3 w-full"
                  name="email"
                  type="email"
                  placeholder={!focusedEmail ? "Email" : ""}
                  validate={validateEmail}
                  onFocus={() => setFocusedEmail(true)}
                  onBlur={(ev) => {
                    ev.target.value ? '' :
                      setFocusedEmail(false)
                  }}
                />
                {
                  errors.email && touched.email &&
                  <div className="text-red-500 absolute">
                    {errors.email}
                  </div>
                }
              </div>

              <div className="mb-4 relative">
                <label className={'absolute left-4 text-xs transition-all duration-150 ' + (!focusedPassword ? '-z-10 top-5' : 'top-1')}>
                  Password
                </label>
                <Field
                  className="border-2 border-black p-3 w-full"
                  name="password"
                  type="password"
                  placeholder={!focusedPassword ? "Password" : ""}
                  validate={validatePassword}
                  onFocus={() => setFocusedPassword(true)}
                  onBlur={(ev) => {
                    ev.target.value ? '' :
                      setFocusedPassword(false)
                  }
                  }
                />
                {
                  errors.password && touched.password &&
                  <div className="text-red-500 absolute">
                    {errors.password}
                  </div>
                }
              </div>
              <div>
                <button className="bg-gray-500 px-2 py-2.5 w-28 text-white" type="submit">
                  Create
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  )
}