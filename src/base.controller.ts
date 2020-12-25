import { Controller, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { unlinkSync } from 'fs';
import admin from 'firebase-admin';
import { UploadFilePropertyDto } from './models/property/upload-file.dto';
import { uploads } from './plugins/cloudinary.plugin';
import { imageFileFilter } from './utils/file-upload';
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
      'fEXaehDDRXyB6RVdWI_vVP:APA91bE6Hc_e6P1rk4jeDluSU0S4eOOIMI3HF3qRTKxQRn9p6H1EQ_JVOup7Cu4-V6T95krYAfEXpcdvChmcxIN_RThZuZCwy46JmV1ORswLKqgh22DWFtE7xrrYiMiGr0F7yg4K0bnP'
    ];

    const a = admin
      .messaging()
      .sendToDevice(
        registrationTokens,
        {
          data: {
            content: NotificationMessageEnum.Description_Owner_Upgrade
          }
        }
      )
      .then(res => {
        console.log(res);
      }).catch(error => console.log(error));
    return a;
  }
}
