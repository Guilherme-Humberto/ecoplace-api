export class AddressDto {
  id: string;
  addrs_name: string;
  addrs_number: number;
  zip_code: string;
  district: string;
}

export class IRegionsIds {
  mesoregion_id: number
  microregion_id: number
}

export class CreateAddressDto extends AddressDto {}
export class UpdateAddressDto extends AddressDto {
  readonly id: string
}