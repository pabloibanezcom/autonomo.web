import {
  Business,
  Company,
  Income,
  InvoiceProductOrService
} from '@autonomo/common';
import {
  DeleteDialog,
  IntlTypography,
  ObjectContentInfo,
  PageHeader
} from 'components/shared';
import { InvoiceMainInfo, PageProps } from 'interfaces';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography
} from 'material';
import { ExpandMoreIcon } from 'material/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addIncome,
  clearIncome,
  deleteIncome,
  getIncome,
  selectBusiness,
  selectIncome,
  updateIncome
} from 'store';
import { updateIncomeTotals } from 'util/invoice';
import IncomeClientSelector from './income-client-selector/IncomeClientSelector';
import IncomeDocumentGenerator from './income-document-generator/IncomeDocumentGenerator';
import IncomeInfo from './income-info/IncomeInfo';
import IncomeProducts from './income-products/IncomeProducts';
import IncomeSummary from './income-summary/IncomeSummary';

type IncomeStep = {
  id: string;
  name: string;
  summary: JSX.Element;
  details: JSX.Element;
};

const IncomeManagePage = ({ breadcrumbs }: PageProps) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string | false>('client');
  const [income, setIncome] = useState<Income>(null);
  const [title, setTitle] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currencyRate, setCurrencyRate] = useState<number>(null);
  const business: Business = useSelector(selectBusiness);
  const existingIncome: Income = useSelector(selectIncome);

  useEffect(() => {
    if (id) {
      dispatch(getIncome({ id }));
      setIsEditMode(true);
    } else {
      setIncome((prevIncome) => {
        return {
          ...prevIncome,
          number: business.nextInvoiceNumber,
          issuedDate: new Date(new Date().setHours(0, 0, 0, 0))
        };
      });
    }

    return () => {
      dispatch(clearIncome());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (existingIncome) {
      setIncome(existingIncome);
      setTitle(existingIncome.number.slice());
      setExpanded(false);
    }
  }, [existingIncome]);

  const handleAddIncome = async () => {
    await dispatch(addIncome({ income }));
  };

  const handleUpdateIncome = async () => {
    await dispatch(updateIncome({ income }));
  };

  const handleDeleteIncome = async () => {
    setShowDeleteDialog(false);
    await dispatch(deleteIncome({ id: income._id.toString() }));
  };

  const handleClientSelected = (selectedClient: Company) => {
    setIncome((prevIncome) => {
      return {
        ...prevIncome,
        client: selectedClient,
        baseCurrency: (selectedClient as Company)?.defaultCurrency
      };
    });
    setIsEdited(true);
    if (selectedClient) setExpanded('incomeInfo');
  };

  const handleIncomeInfoUpdated = (data: InvoiceMainInfo) => {
    console.log(data);
    setIncome((prevIncome) => {
      return {
        ...prevIncome,
        number: data.number,
        issuedDate: data.issuedDate,
        baseCurrency: data.baseCurrency,
        categories: data.categories
      };
    });
    setIsEdited(true);
    setCurrencyRate(data.currencyRate);
  };

  const handleIncomeProductsUpdated = (products: InvoiceProductOrService[]) => {
    setIncome((prevIncome) => {
      return updateIncomeTotals(
        {
          ...prevIncome,
          productsOrServices: products
        },
        business
      );
    });
    setIsEdited(true);
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const isIncomeCompleted = () => {
    return !!(
      income &&
      income.client &&
      income.number &&
      income.issuedDate &&
      !!income.productsOrServices?.length
    );
  };

  const clientSummary = income?.client && (
    <Typography component="span" className="fw-bold">
      {(income.client as Company).name}
    </Typography>
  );

  const clientDetails = (
    <IncomeClientSelector
      client={existingIncome?.client as Company}
      onClientSelected={handleClientSelected}
    />
  );

  const incomeInfoSummary = income?.number && (
    <Typography component="span" className="fw-bold">
      {income.number}
    </Typography>
  );

  const incomeInfoDetails = (
    <IncomeInfo
      business={business}
      income={income}
      onIncomeInfoUpdated={handleIncomeInfoUpdated}
    />
  );

  const incomeProductsSummary = income?.productsOrServices?.length && (
    <IntlTypography
      component="span"
      className="fw-bold"
      id={
        income.productsOrServices.length > 1
          ? 'income.add.productsPlural'
          : 'income.add.productsSingular'
      }
      values={{ productsLength: income.productsOrServices.length }}
    />
  );

  const incomeProductsDetails = (
    <IncomeProducts
      incomeProducts={income?.productsOrServices}
      business={business}
      client={income?.client as Company}
      onIncomeProductsUpdated={handleIncomeProductsUpdated}
    />
  );

  const incomeSteps: IncomeStep[] = [
    {
      id: 'client',
      name: 'income.add.client',
      summary: clientSummary,
      details: clientDetails
    },
    {
      id: 'incomeInfo',
      name: 'income.add.incomeInfo',
      summary: incomeInfoSummary,
      details: incomeInfoDetails
    },
    {
      id: 'incomeProducts',
      name: 'income.add.incomeProductsOrServices',
      summary: incomeProductsSummary,
      details: incomeProductsDetails
    }
  ];

  return (
    <div>
      <PageHeader
        title={isEditMode ? `Invoice ${title}` : 'New Income'}
        breadcrumbs={breadcrumbs}
      />
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            {income &&
              incomeSteps.map((step) => (
                <Accordion
                  key={step.id}
                  expanded={expanded === step.id}
                  onChange={handleAccordionChange(step.id)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="w-100 d-flex justify-content-between me-4">
                      <IntlTypography component="span" id={step.name} />
                      {step.summary}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>{step.details}</AccordionDetails>
                </Accordion>
              ))}
            <Accordion expanded={isIncomeCompleted()}>
              <AccordionSummary>
                <div className="w-100 d-flex justify-content-between me-4">
                  <IntlTypography component="span" id="income.add.summary" />
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <IncomeSummary income={income} business={business} />
              </AccordionDetails>
            </Accordion>
            <div className="d-flex flex-row-reverse mt-4 gap-3">
              {!isEditMode ? (
                <>
                  {' '}
                  <Button
                    disabled={!isIncomeCompleted()}
                    onClick={handleAddIncome}
                  >
                    Add income
                  </Button>
                </>
              ) : (
                <>
                  <Button disabled={!isEdited} onClick={handleUpdateIncome}>
                    Save changes
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Delete income
                  </Button>
                </>
              )}
            </div>
            <div>
              <ObjectContentInfo obj={income} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <IncomeDocumentGenerator income={income} />
          </Grid>
        </Grid>
      </Box>
      {income && (
        <DeleteDialog
          title="income.delete.title"
          question="income.delete.question"
          deleteButtonLabel="income.delete.deleteButtonLabel"
          name={income.number}
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onDelete={handleDeleteIncome}
        />
      )}
    </div>
  );
};

export default IncomeManagePage;
