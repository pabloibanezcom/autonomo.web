import { InvoiceProductOrService } from '@autonomo/common';
import { CurrencyText, Form, IntlTypography } from 'components/shared';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material';
import { AddCircleIcon, HighlightOffIcon } from 'material/icons';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import invoiceProductFormDefinition from './invoiceProduct.form.json';

type InvoiceProductsProps = {
  invoiceProducts: InvoiceProductOrService[];
  onInvoiceProductsUpdated?: (products: InvoiceProductOrService[]) => void;
};

const invoiceProductTable = (
  invoiceProducts: InvoiceProductOrService[],
  onProductRemoved: (index: number) => void
) => (
  <Table aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell className="fst-italic">Description</TableCell>
        <TableCell align="right" className="fst-italic">
          Quantity
        </TableCell>
        <TableCell align="right" className="fst-italic">
          Unit price
        </TableCell>
        <TableCell align="right" className="fst-italic">
          Total price
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {invoiceProducts.map((product, i) => (
        <TableRow
          key={i}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>
            <div className="fw-bold">{product.descriptionLine1}</div>
            <div>{product.descriptionLine2}</div>
          </TableCell>
          <TableCell align="right">{product.quantity}</TableCell>
          <TableCell align="right">
            <CurrencyText value={product.unitPrice} />
          </TableCell>
          <TableCell align="right">
            <CurrencyText
              value={{
                ...product.unitPrice,
                amount: product.quantity * product.unitPrice.amount
              }}
            />
          </TableCell>
          <TableCell align="right">
            <IconButton onClick={() => onProductRemoved(i)}>
              <HighlightOffIcon fontSize="small" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const InvoiceProducts = ({
  invoiceProducts,
  onInvoiceProductsUpdated
}: InvoiceProductsProps) => {
  const [formShown, setFormShown] = useState<boolean>(false);

  const handleInvoiceProductSubmitted = (product: InvoiceProductOrService) => {
    const updatedInvoiceProducts = Array.isArray(invoiceProducts)
      ? [...invoiceProducts, product]
      : [product];
    onInvoiceProductsUpdated(updatedInvoiceProducts);
    setFormShown(false);
  };

  const handleInvoiceProductRemoved = (producIndex: number) => {
    onInvoiceProductsUpdated(
      invoiceProducts
        .slice(0, producIndex)
        .concat(invoiceProducts.slice(producIndex + 1))
    );
  };

  return (
    <div>
      <div className="mb-4">
        {invoiceProducts?.length ? (
          <div>
            {invoiceProductTable(invoiceProducts, handleInvoiceProductRemoved)}
          </div>
        ) : (
          <div className="text-center">
            <IntlTypography
              variant="subtitle2"
              id="invoice.add.noProductsMessage"
            />
          </div>
        )}
      </div>
      {!formShown ? (
        <div className="text-center">
          <Button
            variant="text"
            onClick={() => setFormShown(true)}
            startIcon={<AddCircleIcon />}
          >
            <FormattedMessage id="invoice.add.addProduct" />
          </Button>
        </div>
      ) : (
        <Form
          formDefinition={invoiceProductFormDefinition}
          onSubmit={handleInvoiceProductSubmitted}
          onCancel={() => setFormShown(false)}
        />
      )}
    </div>
  );
};

export default InvoiceProducts;
