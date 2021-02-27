import { Field, Int, ObjectType } from "type-graphql";
import { Column } from "typeorm";


@ObjectType()
export class Messanger {

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column()
  userName: string;

  @Field()
  @Column()
  message: string;
  
  @Field(() => Int)
  @Column()
  timeStamp: number;

  constructor(fullName: string, userName: string, message: string, timeStamp: number){
    this.fullName = fullName
    this.message = message
    this.userName = userName
    this.timeStamp = timeStamp
  }
}
