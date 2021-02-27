import { Messanger } from './Messanger';
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import { ObjectID } from "mongodb";

@ObjectType()
@Entity()
export class IssueMessages extends BaseEntity{
    @Field(() => ID) //4
    @ObjectIdColumn() //5
    id: ObjectID; 

    @Field(() => Int)
    @ObjectIdColumn()
    IssueId: number;

    @Field(() => Messanger, {nullable: true})
    @Column(() => Messanger)
    messages?: Messanger[];
}