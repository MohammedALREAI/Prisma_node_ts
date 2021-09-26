export interface ProvisionedComponent {
  boat: {
    hin: string;
    gelDate: string;
    model: string;
    modelYear: number;
    engineModel: string;
    dealershipCode: number;
  };
  device: { serial: string; region: 'NA' | 'ROW'; sim: string };
}
export interface RawProvisionedComponent {
  hin: string;
  serial: number;
  'region (NA for North America, ROW for Rest of World)': 'NA' | 'ROW';
  sim: string;
  gel_date: number;
  model: string;
  model_year: number;
  engine_model: string;
  dealership_id: number;
}

export interface Dealership {
  id: number;
  code: number;
  dealer: string;
  brand: string;
  region: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  websiteUrl: string;
  modifiedOn: string;
  createdOn: string;
}

export interface Boat {
  id: number;
  dealershipId: number;
  hin: string;
  model: string;
  modelYear: number;
  engineModel: string;
  gelDate: string;
  deliveryDate: string;
  deliveryEntryDate: string;
  modifiedOn: string;
  createdOn: string;
}

export interface Device {
  id: number;
  serial: string;
  sim: string;
  region: string;
  modifiedOn: string;
  createdOn: string;
}

export interface ProvisionedDevice {
  id: number;
  boatId: number;
  deviceId: number;
  createdOn: number;
}

/**
 * Request Body Types
 */

export interface UpdateDeviceBoatReqBody {
  id: number;
  hin: string;
}

export interface UpdateDeviceSimReqBody {
  id: number;
  sim: string;
}

export interface CreateDeviceReqBody {
  serial: string;
  sim: string;
  region: string;
}

export interface DeleteDeviceReqBody {
  id: number;
}
