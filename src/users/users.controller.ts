import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { UpdateUserSettingsDto } from './dtos/UpdateUserSettingsDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers()
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id)
    if (!user) throw new HttpException('User not found', 404)
    return user
  }

  @Patch(":id")
  updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserById(id, updateUserDto)
  }

  @Delete(":id")
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserById(id)
  }

  //PATCH users/:id/settings
  @Patch(':id/settings')
  updateUserSettingsByUserId(@Param('id', ParseIntPipe) id: number, @Body() updateUserSettingsDto: UpdateUserSettingsDto) {
    return this.usersService.updateUserSettings(id, updateUserSettingsDto)
  }

} 
