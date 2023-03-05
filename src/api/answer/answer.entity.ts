import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Question } from '../question/question.entity';
@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public description: string;

  @Column({default: 0})
  public rating: number;

  @ManyToOne(type => User, user => user.answers)
  public user: User;

  @ManyToOne(type => Question, question => question.answers)
  public question: Question;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}