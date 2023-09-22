import {Injectable} from '@angular/core';
import {gql} from '@apollo/client/core';
import {Apollo} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {

  constructor(private apollo: Apollo) { }

  // TODO: pagination of products
  getAllProducts() {
    return this.apollo.query({
      query: gql`{
        products (first: 250) {
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
                    id
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
                    largerImage: transformedSrc(maxWidth: 750, maxHeight: 750)
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

  getCollection(collection) {
    return this.apollo.query({
      query: gql`
      {
        collectionByHandle(handle: "${collection}") {
          products(first: 250) {
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
                      id
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
                      largerImage: transformedSrc(maxWidth: 750, maxHeight: 750)
                      full_res: transformedSrc(maxWidth: 2000, maxHeight: 2000)
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    });
  }

  productAvailability(id) {
    return this.apollo.query({
      query: gql`
      {
        product(id: "${id}") {
          title
          variants(first: 10) {
            edges {
              node {
                availableForSale
                title
                # ... other variant fields if required
              }
            }
          }
        }
      }`
    });
  }

  checkoutCreate(products) {
    const input = [];
    for(let product of products) {
      input.push({
        variantId: product.variant_id,
        quantity: 1
      });
    }
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          checkoutCreate(input: {
            lineItems: ${JSON.stringify(input).replace(/"([^"]+)":/g, '$1:')}
          }) {
            checkout {
              id
              webUrl
            }
            checkoutUserErrors {
              code
              field
              message
            }
          }
        }
      `,
    });
  }
}
