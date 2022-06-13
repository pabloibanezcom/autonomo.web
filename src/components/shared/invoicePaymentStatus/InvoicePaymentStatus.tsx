import { Chip } from 'material';

type InvoicePaymentStatusProps = {
  paymentDate?: Date;
};

const InvoicePaymentStatus = ({ paymentDate }: InvoicePaymentStatusProps) => (
  <Chip
    label={paymentDate ? 'Payed' : 'Awaiting payment'}
    color={paymentDate ? 'success' : 'warning'}
    variant={paymentDate ? 'filled' : 'filled'}
  />
);

export default InvoicePaymentStatus;
