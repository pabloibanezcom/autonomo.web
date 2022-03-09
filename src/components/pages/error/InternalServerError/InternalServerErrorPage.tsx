import React from 'react';
import BaseErrorPage from '../BaseError/BaseErrorPage';

const InternalServerErrorPage = () => {
  return (
    <BaseErrorPage
      code="500"
      header="Internal server error."
      subheader="The server encountered something unexpected that didn't allow it to complete the request."
    />
  );
};

export default InternalServerErrorPage;
