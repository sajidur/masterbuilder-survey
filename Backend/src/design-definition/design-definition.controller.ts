/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
 
 
 
 
 
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors,Req, BadRequestException} from '@nestjs/common';
//import { DesignDefinitionService } from './design-definition.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { DesignDefinition } from './design-defination.entity/design-definition.entity';
import { CreateDesignDefinitionDto, DesignDefinitionResponseDto } from './design-definition.dto/design.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@ApiTags('Design Definitions')
@Controller('design-definitions')
export class DesignDefinitionController {
  // constructor(private readonly designDefService: DesignDefinitionService) {}
   // Upload file and return public URL only
 @Post('uploadPhoto')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads');
          // Create uploads folder if not exists
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const fileExt = extname(file.originalname).toLowerCase();
          const allowedExtensions = ['.png', '.jpg', '.jpeg', '.ico', '.gif'];

          if (!allowedExtensions.includes(fileExt)) {
            return cb(
              new BadRequestException(
                'Invalid file type. Only .png, .jpg, .jpeg, .ico, .gif files are allowed.',
              ),
              '',
            );
          }

          const uniqueName = `${uuidv4()}${fileExt}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Additional safeguard for file type filtering if needed
        const fileExt = extname(file.originalname).toLowerCase();
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.ico', '.gif','.pdf','docx'];
        if (allowedExtensions.includes(fileExt)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              'Invalid file type. Only .png, .jpg, .jpeg, .ico, .gif files are allowed.',
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    if (!file || file.size === 0) {
      throw new BadRequestException('No file uploaded or file is empty.');
    }

    // Build the public URL for the uploaded file
    const protocol =
      (req.headers['x-forwarded-proto'] as string) ||
      (req.secure ? 'https' : 'http');
    const host = req.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    const publicUrl = `${baseUrl}/uploads/${file.filename}`;

    return {
      message: 'File uploaded successfully.',
      photoUrl: publicUrl,
    };
  }

//  @Post("add")
//   @ApiOperation({ summary: 'Create a new Design Definition' })
//   @ApiResponse({ status: 201, description: 'Design Definition created.' })
//   async create(
//     @Body() dto: CreateDesignDefinitionDto,
//   ): Promise<DesignDefinitionResponseDto> {
//     return this.designDefService.create(dto);
//   }

//   @Get("getAll")
//   @ApiOperation({ summary: 'Get all Design Definitions' })
//   async findAll(): Promise<DesignDefinitionResponseDto[]> {
//     return this.designDefService.findAll();
//   }

//   @Get('get:id')
//   @ApiOperation({ summary: 'Get a Design Definition by ID' })
//   async findOne(@Param('id', ParseIntPipe) id: string): Promise<DesignDefinitionResponseDto> {
//     return this.designDefService.findOne(id);
//   }

//   @Put('update:id')
//   @ApiOperation({ summary: 'Update a Design Definition by ID' })
//   async update(
//     @Param('id', ParseIntPipe) id: string,
//     @Body() dto: Partial<CreateDesignDefinitionDto>,
//   ): Promise<DesignDefinitionResponseDto> {
//     return this.designDefService.update(id, dto);
//   }

//   @Delete('delete:id')
//   @ApiOperation({ summary: 'Delete a Design Definition by ID' })
//   async remove(@Param('id', ParseIntPipe) id:string): Promise<void> {
//     return this.designDefService.remove(id);
//   }
 }


