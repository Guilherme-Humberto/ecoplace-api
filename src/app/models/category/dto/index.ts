export class CategoryListResponseDto {
  id: string;
  title: string;
  slug: string;
  image: string;
}

export class CreateCategoryDto {
  id: string;
  title: string;
  slug: string;
  image: string;
}

export class UpdateCategoryDto {
  title: string;
  slug: string;
  image: string;
}
