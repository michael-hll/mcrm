import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from 'path';

// >> npx ts-node src/gen-graphql-types
const definationFactory = new GraphQLDefinitionsFactory();
definationFactory.generate({
  typePaths: ['../**/*.graphql'],
  path: join(__dirname, 'graphql.ts'),
  outputAs: 'class',
  watch: true,
  skipResolverArgs: true,
  defaultTypeMapping: {
    ID: 'number',
  },
});