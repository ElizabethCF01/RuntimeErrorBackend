
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getUser(id: number): Promise<User> {
    return await this.repository.findOne({where:{ id }, relations: ['questions', 'answers']});
  }
  public async findUsers(): Promise<User[]> {
    return await this.repository.find({relations: ['questions', 'answers']})
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.password = body.password;
    user.email = body.email;

    return await this.repository.save(user);
  }
  async updateUser(id: number, body: CreateUserDto): Promise<User> {
    let toUpdate = await this.repository.findOneBy({ id });

    let updated = Object.assign(toUpdate, body);

    return this.repository.save(updated);
  }
  public async delete(id: number): Promise<any> {
    return await this.repository.delete({ id })
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email });
  }
}