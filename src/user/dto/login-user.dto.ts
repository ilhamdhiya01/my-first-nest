import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  username!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  password!: string;
}
