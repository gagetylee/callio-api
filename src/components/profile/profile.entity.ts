import { Entity, EntityRepositoryType, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { User } from "../user/user.entity";
import { ProfileCreateDto } from "./dto/profileCreate.dto";
import { ProfileRepository } from "./profile.repository";

@Entity({ customRepository: () => ProfileRepository })
export class Profile {
  [EntityRepositoryType]?: ProfileRepository
  
  constructor({ firstName, lastName }: ProfileCreateDto){
    this.firstName = firstName
    this.lastName = lastName
  }

  @PrimaryKey()
    id: number

  @OneToOne({ type: 'User', mappedBy: 'profile' })
    user!: User
  
  @Property({ nullable: true })
    firstName?: string

  @Property({ nullable: true })
    lastName?: string

  @Property({ nullable: true })
    bio?: string
  
  @Property({ nullable: true })
    location?: string

}