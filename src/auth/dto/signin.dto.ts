import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SigninDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
}
