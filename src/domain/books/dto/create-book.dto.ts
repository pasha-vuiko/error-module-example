export class CreateBookDto {
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}
