import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Answer } from '../answer/answer.entity';
import { User } from '../user/user.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public title: string;

  @Column({ type: 'varchar', length: 120 })
  public description: string;

  @Column({default: 0})
  public rating: number;

  @ManyToOne(type => User, user => user.questions)
  user: User;
  
  @OneToMany(type => Answer, answer => answer.question)
  answers: Answer[];
  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}