import { IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  public firstName: string

  @IsString()
  public lastName: string

  @IsEmail()
  public email: string
}