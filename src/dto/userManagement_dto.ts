export interface MeterReaderDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  area: string;
  households: number;
  status: string;
  lastActive: string;
  accountNumber: string;
}

export interface CustomerDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  meterNumber: string;
  accountNumber: string;
  status: string;
  registrationDate: string;
}

export interface UserManagementDTO {
  meterReaders: MeterReaderDTO[];
  customers: CustomerDTO[];
}
