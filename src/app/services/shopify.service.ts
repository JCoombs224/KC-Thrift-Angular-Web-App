import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {

  constructor(private apollo: Apollo) { }

  getProducts() {
    return this.apollo.query({
      query: gql`{
        products (first: 20) {
          edges {
            node {
              id
              title
              createdAt
              description
              collections(first: 10) {
                edges {
                  node {
                    title
                  }
                }
              }
              variants(first: 5) {
                edges {
                  node {
                    title
                    availableForSale
                  }
                }
              }
              featuredImage {
                url
                thumbnail: transformedSrc(maxWidth: 500, maxHeight: 500)
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 20) {
                edges {
                  node {
                    src
                    largerImage: transformedSrc(maxWidth: 500, maxHeight: 500)
                    full_res: transformedSrc(maxWidth: 2000, maxHeight: 2000)
                  }
                }
              }
            }
          }
        }
      }`,
    });
  }
}
// TODO: Add this after pricerange
// variants(first: 10) {
//   edges {
//     node {
//       id
//       title
//       quantityAvailable
//     }
//   }
// }
