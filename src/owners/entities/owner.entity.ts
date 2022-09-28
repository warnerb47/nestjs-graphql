import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from '../../pets/pets.entity';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Field(type => [Pet], {nullable: true})
  @OneToMany(()=>Pet, pet => pet.owner)
  pets?: Pet[];
}
