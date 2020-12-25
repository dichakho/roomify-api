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

    // admin
    //   .messaging()
    //   .sendToDevice(
    //     registrationTokens,
    //     {
    //       data: { content: NotificationMessageEnum.Description_Owner_Upgrade }
    //     }
    //   )
    //   .then(res => {
    //     console.log(res);
    //     return res;
    //   }).catch(error => console.log(error));
    const message = {
      data: { score: '850', time: '2:45' },
      tokens: registrationTokens
    };

    admin
      .messaging()
      .sendMulticast(message)
      .then(response => {
        console.log(response);
        
        if (response.failureCount > 0) {
          const failedTokens = [];
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              failedTokens.push(registrationTokens[idx]);
            }
          });
          console.log('List of tokens that caused failures: ' + failedTokens);
        }
      });
  }
}
