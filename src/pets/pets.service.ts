import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pets.entity';

@Injectable()
export class PetsService {

    constructor(
        @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>
    ){}

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find();
    }

    async createPet(createPetInput: CreatePetInput): Promise<Pet>{
        const newPet = this.petsRepository.create(createPetInput);
        return this.petsRepository.save(newPet);
    }

    async findOne(id: number): Promise<Pet>{
        return this.petsRepository.findOneOrFail({
            where: {id}
        })
    }
}
