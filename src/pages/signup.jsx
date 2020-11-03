import React from 'react';
import style from './signup.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import useInput from '../hooks/useInput';

const containerVariants = {
  initial: {
    y: -20,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  enter: { y: 0 },
  exit: {
    y: -20,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
const inputVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};
const Signup = () => {
  const email = useInput();
  const password = useInput();
  const confirmPassword = useInput();

  const submitForm = e => {
    e.preventDefault();
    if (password.value === confirmPassword.value)
      console.warn({ email: email.value, password: password.value });
  };
  return (
    <main className={clsx(style.main)}>
      <motion.h1 variants={inputVariants}>Hello user</motion.h1>
      <motion.div variants={containerVariants}>
        <form onSubmit={submitForm}>
          <input type="email" {...email} placeholder={'Email'} name="email" />
          <input
            type="password"
            {...password}
            placeholder={'Password'}
            name="password"
          />
          <input
            type="password"
            {...confirmPassword}
            placeholder={'Confirm password'}
            name="confirm-password"
          />
          <button type="submit" className={clsx(style.submit, style.button)}>
            Sign up
          </button>
        </form>
        <button className={clsx(style.button, style.google)}>
          Signup Google
        </button>
        <button className={clsx(style.button, style.google)}>
          Signup Apple
        </button>
        <button className={clsx(style.button, style.google)}>
          Signup Microsoft
        </button>
      </motion.div>
    </main>
  );
};

export default Signup;
