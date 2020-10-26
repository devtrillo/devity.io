import React from 'react';

const Header = () => {
  return (
    <header>
      <button
        onClick={() => {
          throw new Error('SO');
        }}
      >
        Break the world
      </button>
    </header>
  );
};

export default Header;
