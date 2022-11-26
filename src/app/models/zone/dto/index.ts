export class ZoneResponseDto {
  name: string;
  image: string;
  phone: string;
  email: string;
  description: string;
}

export class CreateZoneDto {
  id?: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  description: string;
}

export class CreateZoneAddrsDto {
  mesoregion_id: number;
  microregion_id: number;
  addrs_id: string;
  zone_id: string;
}

export class CreateZoneCategoryDto {
  zone_id: string;
  category_id: string;
}

export class UpdateZoneServiceDto extends CreateZoneDto {}
export class ShowZoneDetailsServiceDto {
  categoriesIds: string | string[];
  mesoregion_id: number;
  microregion_id: number;
}
