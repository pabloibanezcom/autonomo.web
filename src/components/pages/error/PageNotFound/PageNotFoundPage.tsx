import React from 'react';
import BaseErrorPage from '../BaseError/BaseErrorPage';

const PageNotFoundPage = () => {
  return (
    <BaseErrorPage
      code="404"
      header="Page not found."
      subheader="The page you are looking for might have been removed."
    />
  );
};

export default PageNotFoundPage;
