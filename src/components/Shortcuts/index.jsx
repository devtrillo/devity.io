import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'gatsby';

import style from './shortcuts.module.css';
import Home from 'components/icons/Home';

const Shortcuts = () => {
  const [show, setShow] = useState(true);
  window.show = setShow;
  const reducedMotion = useReducedMotion();

  const navBarVariants = {
    hidden: { y: reducedMotion ? 0 : '100%', opacity: reducedMotion ? 0 : 1 },
    show: { y: 0, opacity: reducedMotion ? 1 : 1 },
  };

  const linkVariants = {
    hidden: {},
    show: {},
  };
  return (
    <motion.nav
      variants={navBarVariants}
      initial="hidden"
      animate={show ? 'show' : 'hidden'}
      className={style.navbar}
    >
      <motion.div variants={linkVariants}>
        <Home />
        <Link to="/"> Home</Link>
      </motion.div>
      <motion.div variants={linkVariants}>
        <Link to="/"> Home</Link>
      </motion.div>
      <motion.div variants={linkVariants}>
        <Link to="/"> Home</Link>
      </motion.div>
      <motion.div variants={linkVariants}>
        <Link to="/"> Home</Link>
      </motion.div>
    </motion.nav>
  );
};

export default Shortcuts;
