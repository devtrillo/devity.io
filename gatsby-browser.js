import React from 'react';
import { PageLayout, RootLayout } from './src/components/Layout';

const transitionDelay = 500;

export const wrapRootElement = ({ element, props }) => {
  return <RootLayout {...props}>{element}</RootLayout>;
};
export const wrapPageElement = ({ element, props }) => {
  return <PageLayout {...props}>{element}</PageLayout>;
};

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
  } else {
    const savedPosition = getSavedScrollPosition(location);
    window.setTimeout(
      () => window.scrollTo(...(savedPosition || [0, 0])),
      transitionDelay,
    );
  }
  return false;
};
