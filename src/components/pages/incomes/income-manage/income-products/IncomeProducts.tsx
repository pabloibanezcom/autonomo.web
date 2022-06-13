import {
  Business,
  Company,
  InvoiceProductOrService,
  Money
} from '@autonomo/common';
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
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { checkIfClientExemptOfVat } from 'util/tax';
import incomeProductFormDefinition from './incomeProduct.form.json';

type IncomeProductsProps = {
  incomeProducts: InvoiceProductOrService[];
  business: Business;
  client: Company;
  onIncomeProductsUpdated?: (products: InvoiceProductOrService[]) => void;
};

const populateProduct = (
  product: InvoiceProductOrService
): InvoiceProductOrService => {
  const subtotal = Money.multiply(product.unitPrice, product.quantity);
  const tax = Money.percentage(subtotal, product.taxPct);
  const total = Money.add(subtotal, tax);
  return {
    ...product,
    subtotal,
    tax,
    total
  };
};

const incomeProductTable = (
  incomeProducts: InvoiceProductOrService[],
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
          Subtotal
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {incomeProducts.map((product, i) => (
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
            <CurrencyText value={product.subtotal} />
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

const IncomeProducts = ({
  incomeProducts,
  business,
  client,
  onIncomeProductsUpdated
}: IncomeProductsProps) => {
  const [formShown, setFormShown] = useState<boolean>(false);
  const [zeroVat, setZeroVat] = useState<boolean>(false);

  useEffect(() => {
    setZeroVat(checkIfClientExemptOfVat(business, client));
  }, [business, client]);

  const handleIncomeProductSubmitted = (product: InvoiceProductOrService) => {
    const updatedIncomeProducts = Array.isArray(incomeProducts)
      ? [...incomeProducts, product]
      : [product];
    onIncomeProductsUpdated(updatedIncomeProducts);
    setFormShown(false);
  };

  const handleIncomeProductRemoved = (producIndex: number) => {
    onIncomeProductsUpdated(
      incomeProducts
        .slice(0, producIndex)
        .concat(incomeProducts.slice(producIndex + 1))
    );
  };

  return (
    <div>
      {!formShown ? (
        <>
          <div className="mb-4">
            {incomeProducts?.length ? (
              <div>
                {incomeProductTable(incomeProducts, handleIncomeProductRemoved)}
              </div>
            ) : (
              <div className="text-center">
                <IntlTypography
                  variant="subtitle2"
                  id="income.manage.noProductsMessage"
                />
              </div>
            )}
          </div>
          <div className="text-center">
            <Button
              variant="text"
              onClick={() => setFormShown(true)}
              startIcon={<AddCircleIcon />}
            >
              <FormattedMessage id="income.manage.addProduct" />
            </Button>
          </div>
        </>
      ) : (
        formShown && (
          <Form
            formDefinition={incomeProductFormDefinition}
            values={{ taxPct: zeroVat ? 0 : undefined }}
            onSubmit={(p) => handleIncomeProductSubmitted(populateProduct(p))}
            onCancel={() => setFormShown(false)}
          />
        )
      )}
    </div>
  );
};

export default IncomeProducts;
