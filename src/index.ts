import { MessageResolver } from './resolvers/MessageResolver';
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

const startServer = async () => {
    await createConnection(); // 1
    const schema = await buildSchema({ // 2
        resolvers:[MessageResolver]
    }).catch((err) => console.log(err))
    const app = express() //3
    if(schema){
        const apolloServer = new ApolloServer({schema}) //4
        apolloServer.applyMiddleware({app}); // 5

    }
    app.listen(4000, () => {
     console.log('server started');
    })
   }
   startServer();