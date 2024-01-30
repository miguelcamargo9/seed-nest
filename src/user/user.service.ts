import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsNull, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ where: { deletedAt: IsNull() } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      id,
      deletedAt: IsNull(),
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.update(id, { deletedAt: new Date() });
  }

  async restore(id: number): Promise<void> {
    await this.usersRepository.update(id, { deletedAt: null });
  }
}
