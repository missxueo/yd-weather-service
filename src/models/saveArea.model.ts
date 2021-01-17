import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, Min, IsNumber } from "class-validator";

export class SaveAreaModel {
  
  @ApiProperty()
  areaCode: string;

  @ApiProperty()
  @IsNotEmpty()
  areaName: string;

  @ApiProperty()
  @IsNumber()
  sortNo: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  level: number;

  @ApiPropertyOptional()
  parentAreaCode?: string;

}
