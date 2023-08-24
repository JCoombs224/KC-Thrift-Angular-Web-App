import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { EnviromentVariablesService } from './services/enviroment-variables.service';
import { setContext } from '@apollo/client/link/context';

const uri = ''; // <-- add the URL of the GraphQL server here
export function createApollo(
  httpLink: HttpLink,
  environmentVariablesService: EnviromentVariablesService
): {
  link: ApolloLink;
  cache: InMemoryCache;
} {
  const uri = `${environmentVariablesService.storeUrl}/api/2023-07/graphql.json`;
  const headers = setContext((operation, context) => ({
    headers: {
      'X-Shopify-Storefront-Access-Token': environmentVariablesService.storeFrontToken,
    },
  }));

  const link = ApolloLink.from([headers, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, EnviromentVariablesService],
    },
  ],
})
export class GraphQLModule {}
