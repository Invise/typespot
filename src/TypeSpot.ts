import { Client } from '@hubspot/api-client';
import { EntityTypeFile } from './EntityTypeFile';

export type TypeSpotOptions = {
  client: Client;
};

export class TypeSpot {
  client: Client;
  path = 'src/types';

  constructor(options: TypeSpotOptions) {
    this.client = options.client;
  }

  async write() {
    const entities = ['companies', 'contacts'];

    for (const entity of entities) {
      await this.writeEntity(entity);
    }
  }

  async writeEntity(entity: string) {
    try {
      const response = await this.client.crm.properties.coreApi.getAll(entity);

      new EntityTypeFile({
        entity,
        properties: response.results,
      }).write();
    } catch (error) {
      console.log(error);
      console.log(
        `Error while fetching properties for ${entity}, skipping. Did you forget to assign scopes?`
      );
    }
  }
}
