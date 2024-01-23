import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  Request,
  UseGuards,
  Logger,
  Param,
} from '@nestjs/common';
// import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { AuthorizationGuard } from './authorization.guard';
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update_role/:id')
  @Roles(UserRoles.Admin)
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  updateRole( @Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Request() req) {
    return this.authService.updateRole(id, updateRoleDto);
  }
}
