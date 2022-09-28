import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../owners/entities/owner.entity';
import { OwnersService } from '../owners/owners.service';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pets.entity';

@Injectable()
export class PetsService {

    constructor(
        @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
        private readonly ownersService: OwnersService
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

    async getOwner(ownerId: number): Promise<Owner> {
        return this.ownersService.findOne(ownerId);
    }
}
