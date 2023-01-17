import { Property } from '@hubspot/api-client/lib/codegen/crm/properties';
import * as fs from 'fs';

type EntityTypeFileOptions = {
  entity: string;
  properties: Property[];
  singularPluralMap?: { [key: string]: string };
  template?: string;
};

const defaultSingularPluralMap = {
  singularPluralMap: {
    companies: 'company',
    contacts: 'contact',
  },
};

const defaultTemplate = `type ENTITY = {
    properties: {
        PROPERTIES
    }
}`;

export class EntityTypeFile {
  entity: string;
  properties: any[];
  singularPluralMap: { [key: string]: string };
  template: string;

  constructor(options: EntityTypeFileOptions) {
    this.entity = options.entity;
    this.properties = options.properties;
    this.singularPluralMap =
      options.singularPluralMap || defaultSingularPluralMap.singularPluralMap;
    this.template = options.template || defaultTemplate;
  }

  write(): void {
    fs.writeFileSync(
      `src/types/${this.getPascalCaseTypeName()}.ts`,
      this.getContents()
    );
  }

  getContents(): string {
    return this.template
      .replace('ENTITY', this.getPascalCaseTypeName())
      .replace(
        '        PROPERTIES',
        this.properties
          .map(property => this.getPropertyRow(property))
          .join('\n')
      );
  }

  getPascalCaseTypeName(): string {
    const singular = this.singularPluralMap[this.entity];
    const pascalCase = singular.charAt(0).toUpperCase() + singular.slice(1);
    return pascalCase;
  }

  getPropertyRow(property: Property): string {
    const typeMap = {
      string: 'string',
      number: 'number',
      bool: 'boolean',
      boolean: 'boolean',
      enumeration: 'string',
      datetime: 'string',
      date: 'string',
      time: 'string',
      datetime_with_timezone: 'string',
      date_with_timezone: 'string',
      time_with_timezone: 'string',
      json: 'string',
      phone_number: 'string',
      url: 'string',
      object: 'string',
      array: 'string',
      any: 'string',
    };

    if (property.type === 'enumeration') {
      if (property.options.length === 0)
        return `        ${property.name}: unknown`;
      return `        ${property.name}: ${property.options
        .map(option => `'${option.value}'`)
        .join(' | ')}`;
    }

    const jsType = typeMap[property.type as keyof typeof typeMap] || 'unknown';

    return `        ${property.name}: ${jsType}`;
  }
}
