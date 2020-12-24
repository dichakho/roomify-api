import { Controller, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { unlinkSync } from 'fs';
import { UploadFilePropertyDto } from './models/property/upload-file.dto';
import { uploads } from './plugins/cloudinary.plugin';
import { imageFileFilter } from './utils/file-upload';
import admin from 'firebase-admin';
import { NotificationMessageEnum } from './common/enums/notification.enum';

@ApiTags('Base')
@Controller('')
export class BaseController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      dest: 'uploads',
      preservePath: true,
      fileFilter: imageFileFilter
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Get URL image of property',
    type: UploadFilePropertyDto
  })
  async uploadImage(@UploadedFile() file) {
    const image = await uploads(file.path, 'property');
    unlinkSync(file.path);
    return image;
  }

  @Post('/test')
  async test() {
    const registrationTokens = [
      'eTyVhzVwRuyPRBMNPKAU5w:APA91bG2yYlDraGp7a60s4C_ZdoFM8WGYdYEAN8vMy0Fx9G1iGdOnVeM1GFRCxMXB5W1cKQaHg4wwRqjIRxGMcL-R0ldqTTRQTuYlDDXm_K1fK-IOrcNcuvx4hTy2jgkN4UUuNg4J-z0'
    ];
    
    await admin
      .messaging()
      .sendToDevice(
        registrationTokens,
        {
          data: { content: NotificationMessageEnum.Description_Owner_Upgrade }
        },
        {
          // Required for background/quit data-only messages on iOS
          contentAvailable: true,
          // Required for background/quit data-only messages on Android
          priority: 'high'
        }
      )
      .then(res => {
        console.log(res);
        return res;
      });
      
  }
}
