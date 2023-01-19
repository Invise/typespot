import { Client } from '@hubspot/api-client';
import { ApiException } from '@hubspot/api-client/lib/codegen/crm/properties';
import { EntityTypeFile } from './EntityTypeFile';

const version = (require('../package.json') as { version: string }).version;

export type TypeSpotOptions = {
  client: Client;
  path?: string;
  verbose?: boolean;
  entities?: string[];
};

export class TypeSpot {
  client: Client;
  path: string;
  verbose: boolean;
  entities: string[];

  constructor(options: TypeSpotOptions) {
    this.client = options.client;
    this.path = options?.path || 'src/types';
    this.verbose = options?.verbose || false;
    this.entities = options?.entities || [
      'companies',
      'contacts',
      'deals',
      'products',
      'tickets',
      'quotes',
    ];
  }

  async write(): Promise<void> {
    console.log(`💫 Running TypeSpot ${version}\n`);

    for (const entity of this.entities) {
      await this.writeEntity(entity);
    }
  }

  async writeEntity(entity: string): Promise<void> {
    try {
      const response = await this.client.crm.properties.coreApi.getAll(entity);

      new EntityTypeFile({
        path: this.path,
        entity,
        properties: response.results,
        verbose: this.verbose,
      }).write();
    } catch (error: unknown) {
      if (error instanceof ApiException && error.code === 401) throw error;

      if (error instanceof ApiException && error.code === 403) {
        console.log(
          `🟡 403 Forbidden when reading ${entity}. Did you forget to assign scopes?`
        );
        return;
      }

      console.log('Unhandled error! Please report this issue on GitHub.');
      throw error;
    }
  }
}
