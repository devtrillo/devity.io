import React from 'react';
import { motion } from 'framer-motion';
import style from './Search.module.css';

const pageVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  close: {
    scaleY: 0,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const SearchPage = ({ open, toggleModal }) => {
  return (
    <motion.main
      className={style.search}
      variants={pageVariants}
      initial={false}
      animate={open ? 'open' : 'close'}
    >
      <h1>Search</h1>
      <h1>Animated After Page Mount</h1>
      <h1>Animated After Page Mount</h1>
      <h1>Animated After Page Mount</h1>
      <h1>Animated After Page Mount</h1>
      <button onClick={toggleModal}>CLOSE</button>
    </motion.main>
  );
};
export default SearchPage;
