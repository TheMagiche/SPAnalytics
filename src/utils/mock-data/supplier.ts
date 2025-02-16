import { company } from './company';
import { fullAddress, country } from './address';
import { fullName } from './name';
import { role } from './role';
import { email } from './email';
import { phoneNumber } from './phoneNumber';
import { rating } from './number';

const generateSupplier = (index: number) => ({
  id: `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  companyName: company[index],
  address: fullAddress[index],
  country: country[index],
  contactPerson: {
    name: fullName[index],
    role: role[index],
    email: email[index],
    phone: phoneNumber[index]
  },
  taxId: `TAX-${Math.floor(1000000 + Math.random() * 9000000)}`,
  status: Math.random() > 0.2 ? 'active' : 'inactive', // 80% chance of being active
  rating: rating[index]
});

export const exportSuppliers = Array.from({ length: 40 }, (_, index) => generateSupplier(index));

export type Supplier = typeof exportSuppliers[number];
