import { EntityTypeFile } from './EntityTypeFile';

describe('new', () => {
  it('can instanciate', () => {
    const factory = new EntityTypeFile({
      path: 'src/types',
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
