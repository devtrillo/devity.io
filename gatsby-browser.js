import Layout from 'components/Layout';
import React from 'react';

export const wrapRootElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
