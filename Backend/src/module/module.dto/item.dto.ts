/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';
import { MenuDto } from './menu.dto';
export class ItemDto {
 
  id: string;
  name: string;
  menu: MenuDto|null;

}
export class CreateItemDto {
  @ApiProperty({ description: 'Name of the item' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Menu ID' })
  @IsString()
  @IsNotEmpty()
  menuId: string;
}