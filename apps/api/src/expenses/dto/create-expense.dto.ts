import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;

  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds: string[];
}
