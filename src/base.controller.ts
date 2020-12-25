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
      'd9Awn7_ORlmJy5Kx2RcYO7:APA91bGc1bAmo9K7q2-43oYPJTwLVb0VAOygX3bI8tNx-37SF0sQ9ssPSpnmUWsXFVN2wfPHmiZn56LHQ2lxREpRXuJGjXBB8kOKrY-1RC89JrUGNj18-AnJ7kotfOp8cJA2C3uNE7_3'
    ];

    admin
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
        console.log(res.results);
        return res;
      }).catch(error => console.log(error));

  }
}
