import { ApolloServer } from "apollo-server-express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema, Query, Resolver } from "type-graphql";
import { AppDataSource } from "./data-source";
import { AuthResolver } from "./resolvers/AuthResolver";
import { ConfirmUserResolver } from "./resolvers/ConfirmUserResolver";
import { UserResolver } from "./resolvers/UserResolver";

dotenv.config();

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}

(async () => {
  try {
    const schema = await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        AuthResolver,
        ConfirmUserResolver,
      ],
    });

    await AppDataSource.initialize();

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }: any) => ({ req }),
    });

    await apolloServer.start();

    const app = Express();
    const port = process.env.PORT || 4000;

    app.use(cors());

    apolloServer.applyMiddleware({ app });

    app.listen(port, async () => {
      console.log(`server started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
