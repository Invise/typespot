#!/usr/bin/env node

import { TypeSpot } from './TypeSpot';
import { Client } from '@hubspot/api-client';

const accessToken = process.argv[2];

const client = new Client({ accessToken });
const factory = new TypeSpot({ client });
factory.write().catch(error => {
  console.log('Could not complete writing the files...');
  console.log(error);
  throw error;
});

console.log('Done!');
