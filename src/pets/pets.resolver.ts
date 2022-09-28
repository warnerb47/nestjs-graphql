import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Owner } from '../owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pets.entity';
import { PetsService } from './pets.service';

@Resolver(of => Pet)
export class PetsResolver {

    constructor(private readonly petsService: PetsService){}

    @Query(returns => [Pet])
    pets(): Promise<Pet[]> {
        return this.petsService.findAll();
    }

    @Query(returns => Pet)
    pet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
        return this.petsService.findOne(id);
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet>{
        return this.petsService.createPet(createPetInput);
    }

    @ResolveField(returns => Owner)
    owner(@Parent() pet: Pet): Promise<Owner> {
        return this.petsService.getOwner(pet.ownerId);
    }
    
}
