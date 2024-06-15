import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ length: 500 })
  name: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @Column()
  filename: string;

  @ApiProperty()
  @Column('int')
  views: number;

  @ApiProperty()
  @Column()
  isPublished: boolean;
}
