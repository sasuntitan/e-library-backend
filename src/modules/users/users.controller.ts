import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { HasRoles } from '../shared/decorators/has-role.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { EditUserDto } from './dto/edit-user.dto';
import { GetUsersRequestDto } from './dto/get-users-request.dto';
import { UserRole } from './models/user-role.enum';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Get()
  getUsers(@Query() query: GetUsersRequestDto) {
    return this.usersService.getUsers(query);
  }

  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  editCategory(@Param('id') id: number, @Body() body: EditUserDto) {
    return this.usersService.editUser(id, body);
  }

  @HasRoles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.usersService.deleteUserById(id);
  }
}
