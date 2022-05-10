import { Business, Company } from '@autonomo/common';

export const checkIfClientExemptOfVat = (
  business: Business,
  client: Company
): boolean => {
  return (
    business?.country && client?.country && business.country !== client.country
  );
};
