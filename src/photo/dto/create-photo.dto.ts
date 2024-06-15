import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, isNotEmpty } from "class-validator";

export class CreatePhotoDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  filename: string;

  @ApiProperty()
  @IsString()
  views: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsBoolean()
  isPublished: boolean;
}
