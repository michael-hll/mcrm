import { Expose } from 'class-transformer';
export class UserDetailDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  cellphone: string;

  @Expose()
  country: string;

  @Expose()
  city: string;

  @Expose()
  address1: string;

  @Expose()
  address2: string;

  @Expose()
  zipcode: string;
}
