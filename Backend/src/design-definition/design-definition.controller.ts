/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
 
 
 
 
 
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors,Req} from '@nestjs/common';
import { DesignDefinitionService } from './design-definition.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { DesignDefinition } from './design-defination.entity/design-definition.entity';
import { CreateDesignDefinitionDto, DesignDefinitionResponseDto } from './design-definition.dto/design.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('Design Definitions')
@Controller('design-definitions')
export class DesignDefinitionController {
   constructor(private readonly designDefService: DesignDefinitionService) {}
   // Upload file and return public URL only
 @Post('upload')
  @ApiOperation({ summary: 'Upload file and return public URL' })
  @ApiResponse({ status: 201, description: 'File uploaded and public URL returned.' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<{ imageUrl: string }> {
    // Determine protocol from proxy headers or request security
    const protocol =
      (req.headers['x-forwarded-proto'] as string) ||
      (req.secure ? 'https' : 'http');

    // Get the host header or fallback
    const host = req.get('host') || 'localhost:3000';

    // Construct the base URL
    const baseUrl = `${protocol}://${host}`;

    // Construct public URL of uploaded file
    const imageUrl = `${baseUrl}/uploads/${file.filename}`;

    return { imageUrl };
  }

 @Post("add")
  @ApiOperation({ summary: 'Create a new Design Definition' })
  @ApiResponse({ status: 201, description: 'Design Definition created.' })
  async create(
    @Body() dto: CreateDesignDefinitionDto,
  ): Promise<DesignDefinitionResponseDto> {
    return this.designDefService.create(dto);
  }

  @Get("getAll")
  @ApiOperation({ summary: 'Get all Design Definitions' })
  async findAll(): Promise<DesignDefinitionResponseDto[]> {
    return this.designDefService.findAll();
  }

  @Get('get:id')
  @ApiOperation({ summary: 'Get a Design Definition by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DesignDefinitionResponseDto> {
    return this.designDefService.findOne(id);
  }

  @Put('update:id')
  @ApiOperation({ summary: 'Update a Design Definition by ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateDesignDefinitionDto>,
  ): Promise<DesignDefinitionResponseDto> {
    return this.designDefService.update(id, dto);
  }

  @Delete('delete:id')
  @ApiOperation({ summary: 'Delete a Design Definition by ID' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.designDefService.remove(id);
  }
}


