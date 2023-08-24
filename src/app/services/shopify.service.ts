import { Injectable } from '@angular/core';
import { ApolloQueryResult, gql } from '@apollo/client/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {

  constructor(private apollo: Apollo) { }

  getProducts() {
    return this.apollo.query({
      query: gql`{
        products (first: 3) {
          edges {
            node {
              id
              title
            }
          }
        }
      }`,
    });
  }
}
