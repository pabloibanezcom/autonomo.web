import { Company } from '@autonomo/common';
import { Form } from 'components/shared';
import {
  Autocomplete,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from 'material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCompanies, selectCompanies } from 'store';
import newClientFormDefinition from './newClient.form.json';

type IncomeClientSelectorProps = {
  client?: Company;
  onClientSelected?: (client: Company) => void;
};

const IncomeClientSelector = ({
  client,
  onClientSelected
}: IncomeClientSelectorProps) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<string>('existingCompany');
  const [selectedClient, setSelectedClient] = useState<Company>(null);
  const companies: Company[] = useSelector(selectCompanies);

  useEffect(() => {
    if (client) {
      setSelectedClient(client);
    }
  }, [client]);

  useEffect(() => {
    if (!companies.length) {
      dispatch(searchCompanies({ filter: null }));
    }
  }, [companies, dispatch]);

  const handleModeChanged = (selectedMode: string) => {
    setMode(selectedMode);
    setSelectedClient(null);
    onClientSelected(null);
  };

  const handleClientSelected = (_selectedClient: Company) => {
    setSelectedClient(_selectedClient);
    onClientSelected(_selectedClient);
  };

  const clearClient = () => {
    setSelectedClient(null);
  };

  const existingCompanyForm = (): JSX.Element => {
    return (
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={companies}
          getOptionLabel={(option: string | Company) =>
            typeof option === 'string' ? option : option.name
          }
          onChange={(event, value) =>
            handleClientSelected(value as unknown as Company)
          }
          renderInput={(params) => (
            <TextField {...params} autoFocus placeholder="Select a company" />
          )}
        />
      </div>
    );
  };

  const newCompanyForm = (): JSX.Element => {
    return (
      <Form
        formDefinition={newClientFormDefinition}
        onSubmit={handleClientSelected}
      />
    );
  };

  return (
    <div>
      {!selectedClient ? (
        <div>
          <RadioGroup
            row
            value={mode}
            onChange={(evt) => handleModeChanged(evt.target.value)}
          >
            <FormControlLabel
              value="existingCompany"
              control={<Radio />}
              label="Existing company"
            />
            <FormControlLabel
              value="newCompany"
              control={<Radio />}
              label="New company"
            />
          </RadioGroup>
          <div className="mt-4 mb-2">
            {mode === 'existingCompany'
              ? existingCompanyForm()
              : newCompanyForm()}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Typography className="fw-bold">{selectedClient.name}</Typography>
          {selectedClient.address && (
            <div className="mt-2">
              <Typography>{selectedClient.address.line1}</Typography>
              {selectedClient.address.line2 && (
                <Typography>{selectedClient.address.line2}</Typography>
              )}
              {selectedClient.address.line3 && (
                <Typography>{selectedClient.address.line3}</Typography>
              )}
              <div>
                <Typography component="span">
                  {selectedClient.address.town}
                </Typography>
                ,{' '}
                <Typography component="span">
                  {selectedClient.address.postalCode}
                </Typography>{' '}
                (
                <Typography component="span">
                  {selectedClient.address.country}
                </Typography>
                )
              </div>
            </div>
          )}
          {selectedClient.cifVat && (
            <div className="mt-2">
              VAT number{' '}
              <Typography component="span" className="fst-italic">
                {selectedClient.cifVat}
              </Typography>
            </div>
          )}
          <Button
            variant="text"
            size="small"
            className="mt-2"
            onClick={clearClient}
          >
            Choose another client
          </Button>
        </div>
      )}
    </div>
  );
};

export default IncomeClientSelector;
