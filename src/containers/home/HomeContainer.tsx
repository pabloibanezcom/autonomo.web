import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import PageHeader from '../../components/pageHeader/PageHeader';
import Panel from '../../components/panel/Panel';
import { UserContext } from '../../context/user';

const menuItems = [
  {
    content: 'Option 1'
  },
  {
    content: 'Option 2'
  }
];

const breadcrumbs = [
  {
    text: 'Dashboard',
    href: '/'
  },
  {
    text: 'Menu',
    href: '/'
  },
  {
    text: 'Home'
  }
];

const HomeContainer = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <PageHeader title="Home page" breadcrumbs={breadcrumbs} />
      <Panel title="Mobile / Desktop" menuItems={menuItems}>
        Home Container
        <p>
          <FormattedMessage id="myMessage" />
        </p>
        <p>User Info: {JSON.stringify(user)}</p>
      </Panel>
    </div>
  );
};

export default HomeContainer;
