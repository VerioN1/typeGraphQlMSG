import { IssueMessages } from './../entity/IssueMessages';
import { Messanger } from './../entity/Messanger';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { getMongoRepository } from 'typeorm';

// @InputType()
// class MessangerUpdateInput {
//     @Field(() => String)
//     fullName: string
// }

@Resolver()
export class MessageResolver{
    @Mutation(()=> Boolean)
    async addMessage(
        @Arg("fullName") fullName: string,
        @Arg("userName") userName:string,
        @Arg("message") message:string,
        @Arg("timeStamp") timeStamp: number,
        @Arg("IssueId") IssueId:number
    ) : Promise<Boolean>{
        let IssueMsg = false
        if(IssueId){
            const msg = new Messanger(fullName, userName, message, timeStamp)
            IssueMsg = await getMongoRepository(IssueMessages).findOneAndUpdate(
                {where: {
                    'IssueId' : {$eq: IssueId} 
                }},
                {$push : {
                    'messages' : {$eq: msg} 
                }}
            ).then(() => true).catch(() => false)
        }
        return IssueMsg
    }

    @Mutation(() => Boolean)
    async createIssueMessanger(
        @Arg("IssueId") IssueId: number,
    ) {
        const newIssue = IssueMessages.create({IssueId})
        const status = newIssue.save().then(() => true).catch(() => false)
        return status
    }

    @Query(() => [IssueMessages]) //2
    async IssueMessages(): Promise<IssueMessages[]> { 
        return await IssueMessages.find()// 3
 }
}