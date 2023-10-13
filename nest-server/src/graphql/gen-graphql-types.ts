import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from 'path';

// >> npx ts-node gen-graphql-types
const definationFactory = new GraphQLDefinitionsFactory();
definationFactory.generate({
  typePaths: ['../**/*.graphql'],
  path: join(__dirname, 'graphql-types.ts'),
  outputAs: 'class',
  watch: true,
  skipResolverArgs: true,
  defaultTypeMapping: {
    ID: 'number',
  },
});