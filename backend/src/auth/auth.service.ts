import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(emailOrUsername: string, password: string): Promise<any> {
    let user: User | undefined;

    // Verifica se o emailOrUsername é um email válido
    if (this.isEmail(emailOrUsername)) {
      user = await this.usersService.findUsernameOrEmail(
        undefined,
        emailOrUsername,
      );
    } else {
      user = await this.usersService.findUsernameOrEmail(emailOrUsername);
    }

    if (user && compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      // console.log(user);
      return result;
    }
    return null;
  }

  findById(id: string) {
    const user = this.usersService.findOneId(id);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return user;
  }

  private isEmail(input: string): boolean {
    try {
      // Utiliza o decorator IsEmail do class-validator para validar o email
      return !!input && !!input.length && !!input.match(/^\S+@\S+\.\S+$/);
    } catch (error) {
      return false;
    }
  }
}
