import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React from 'react';
import PageHeader from '../../../components/pageHeader/PageHeader';
import Panel from '../../../components/panel/Panel';

const breadcrumbs = [
  {
    text: 'Home',
    href: '/'
  },
  {
    text: 'Invoices',
    href: '/invoices'
  },
  {
    text: 'Add invoice'
  }
];

const AddInvoiceContainer = () => {
  return (
    <div>
      <PageHeader title="Add invoice" breadcrumbs={breadcrumbs} />
      <Panel title="Invoice">
        <form>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
      </Panel>
    </div>
  );
};

export default AddInvoiceContainer;
