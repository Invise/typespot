import { EntityTypeFile } from './EntityTypeFile';

describe('new', () => {
  it('can instanciate using a entity and property array', () => {
    const factory = new EntityTypeFile({
      entity: 'companies',
      properties: [
        {
          name: 'name',
          label: 'Name',
          description: 'The name of the company',
          groupName: 'companyinformation',
          type: 'string',
          fieldType: 'text',
          options: [],
        },
      ],
    });

    expect(factory).toBeInstanceOf(EntityTypeFile);
  });
});
