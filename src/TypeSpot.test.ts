import { Client } from '@hubspot/api-client';
import { TypeSpot } from '.';
import * as fs from 'fs';
fs;
const mockWriteFileSync = jest.fn();

jest.mock('fs', () => {
  return {
    mkdirSync: (path: string, options: any) => {
      path;
      options;
    },
    writeFileSync: (path: string, content: string) =>
      mockWriteFileSync(path, content),
  };
});

describe('new', () => {
  it('can instanciate using a hubspot api client', () => {
    const client = new Client();
    const factory = new TypeSpot({ client });

    expect(factory).toBeInstanceOf(TypeSpot);
  });
});

describe('write', () => {
  it('can write companies', async () => {
    const client = new Client();
    const factory = new TypeSpot({ client });

    jest.spyOn(client.crm.properties.coreApi, 'getAll').mockResolvedValue({
      results: [
        {
          name: 'name',
          label: 'Name',
          description: 'Some name.',
          groupName: 'some_group',
          type: 'string',
          fieldType: 'text',
          formField: true,
          options: [],
        },
      ],
    });

    await factory.write();

    expect(mockWriteFileSync).toHaveBeenCalledWith(
      'src/types/Company.ts',
      expect.any(String)
    );
  });
});
