import { Client } from '@hubspot/api-client';
import { TypeSpot } from '.';

describe('new', () => {
  it('can instanciate using a hubspot api client', () => {
    const client = new Client();

    const factory = new TypeSpot({ client });

    expect(factory).toBeInstanceOf(TypeSpot);
  });
});
