// This is a workaround abstraction level over apollo client
// due to schemas aren't accessible from public making autogeneration not useful

import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client/core';
import { loadYaml } from '../utils/loadYaml';
import fs from 'fs';
import fetch from 'cross-fetch';

const GET_WISHLISTS = gql(fs.readFileSync('./graphql/getWishlistsPaginated.gql', 'utf8'));
const DELETE_WISHLIST = gql(fs.readFileSync('./graphql/deleteWishlist.gql', 'utf8'));
const testData = loadYaml();

export class MyApiClient {
  private client: ApolloClient<any>;

  constructor(contextFileName: string) {
    let [endpoint, authToken] = this.readConnectionData(contextFileName);

    this.client = new ApolloClient({
      link: new HttpLink({
        uri: endpoint,
        fetch,
        headers: { Authorization: `Bearer ${authToken}` },
      }),
      cache: new InMemoryCache(),
    });
  }

  private readConnectionData(contextFileName: string): [string, string] {
    const rawData = fs.readFileSync(contextFileName, 'utf8');
    const context = JSON.parse(rawData);

    const endpoint =
      testData.apiBaseUrl + context.cookies.find(cookie => cookie.name === 'session')?.value || '';
    const authToken = context.origins[0].localStorage.find(token => token.name === 'token')?.value || '';

    return [endpoint, authToken];
  }

  async getWishlistIdByName(name: string): Promise<string | null> {
    const result = await this.client.query({
      query: GET_WISHLISTS,
      variables: {
        kinds: ['My'],
        input: { limit: 10 },
      },
    });

    if (!result.data?.wishlists?.data) {
      throw new Error('Unexpected API response');
    }

    const match = result.data.wishlists.data.find((wl: any) => wl.title === name);

    return match ? match.id : null;
  }

  async deleteWishlist(id: string): Promise<boolean> {
    const result = await this.client.mutate({
      mutation: DELETE_WISHLIST,
      variables: { id: [id] },
    });

    return result.data.wishlist.delete;
  }

  async deleteWishlistByName(name: string): Promise<boolean> {
    const wishlistId = await this.getWishlistIdByName(name);

    if (!wishlistId) return false;

    return this.deleteWishlist(wishlistId);
  }
}
