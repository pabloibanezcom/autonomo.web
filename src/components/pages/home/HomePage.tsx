import { PageHeader, Panel } from 'components/shared';
import { PageProps } from 'interfaces';

const menuItems = [
  {
    content: 'Option 1'
  },
  {
    content: 'Option 2'
  }
];

// const breadcrumbs = [
//   {
//     text: 'Dashboard',
//     href: '/'
//   },
//   {
//     text: 'Menu',
//     href: '/'
//   },
//   {
//     text: 'Home'
//   }
// ];

const HomePage = ({ title, breadcrumbs }: PageProps) => {
  return (
    <div>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <Panel title="Mobile / Desktop" menuItems={menuItems}>
        Home Container
        <p>New message</p>
      </Panel>
    </div>
  );
};

export default HomePage;
