/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';
import { MenuDto } from './menu.dto';
export class ItemDto {
 
  id: string;
  name: string;
  tier:string;
  serialNumber:string;
  buttonType:string;
  navigationTo:string;
  description:string;
  menu: MenuDto|null;

}
export class CreateItemDto {
  @ApiProperty({ description: 'Name of the item' })
  @IsString()
  @IsNotEmpty()
  name: string;
 @ApiProperty({ description: 'Tier of the Item' })
  @IsString()
  tier: string;
  @ApiProperty({ description: 'serialNumber of the SubItem' })
  @IsString()
  serialNumber: string;
  @ApiProperty({ description: 'buttonType of the SubItem' })
  @IsString()
  buttonType: string;
  @ApiProperty({ description: 'navigationTo of the SubItem' })
  @IsString()
  navigationTo: string;
  @ApiProperty({ description: 'Description of the SubItem' })
  @IsString()
  description: string;
  @ApiProperty({ description: 'Menu ID' })
  @IsString()
  @IsNotEmpty()
  menuId: string;
}