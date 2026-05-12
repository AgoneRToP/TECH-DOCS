import { Protected, Roles } from '@/common/decorators';
import { UserRoles } from '@/core';
import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, UploadedFile } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  @Protected(true)
  @Roles([UserRoles.admin])
  @Get()
  async getAll() {
    return [];
  }

  // @Protected(true)
  // @Roles([UserRoles.admin, UserRoles.user])
  // @Patch('/:id/profile-imge')
  // @UserInterception(FileInterceptor('image'))
  // async updateProfileImage(
  //   @Param ('id', ParseObjectIdPipe) id: string,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       fileIsRequired: true,
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 5 * 1000 * 1024}),
  //         new FileTypeValidator({ fileType: 'image/*' }),
  //       ]
  //     })
  //   )
  //   file: Express.Multer
  // )
}
