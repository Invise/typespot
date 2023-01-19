# TypeSpot 💫

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> The missing type system for your HubSpot objects.

### What?
This package generates explicit type files for all of your object types within your current portal, looking something like:

```ts
export type Company = {
    properties: {
        name: string
        some_custom_prop: 'cool' | 'cooler'
        // ... all default and custom props
    }
}
```

For convienience it also exports the full property definitions:
```ts
export const CompanyProperties = [
    {
        name: 'name',
        label: 'Name',
        description: 'Its a name!',
        // ...
    },
    
    // ...
]
```

### Why?
When using `@hubspot/api-client` with TypeScript, the objects returned are practically black boxes:
```ts
class SimplePublicObject {
    properties: {
        [key: string]: string;
    };        
}
```

So, we have a hard time type checking when reading/writing to the API and we constantly have to reference the web portal. With this package we can develop faster and more confidently.

## Usage
Install the package:
```bash
npm install typespot
```

Next, generate your files
```bash
npx ts-node typespot <YOUR_ACCESS_TOKEN>
```

You will see something like:
```bash
✅ Created src/types/Company.ts
✅ Created src/types/Contact.ts
✅ Created src/types/Deal.ts
✅ Created src/types/Product.ts
🟡 403 Forbidden when reading tickets. Did you forget to assign scopes?
🟡 403 Forbidden when reading quotes. Did you forget to assign scopes?
```

Alternatively, you may generate these files programatically:
```ts
import { TypeSpot } from 'typespot';
import { Client } from "@hubspot/api-client";

const client = new Client({accessToken: 'secret'})
new TypeSpot({ client }).write()
```

### TODO
[ ] missing some object types in CRM  
[ ] missing custom object in CRM  
[ ] ALL other types are missing  
### License
MIT

[build-img]:https://github.com/invise/typespot/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/invise/typespot/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/typespot
[downloads-url]:https://www.npmtrends.com/typespot
[npm-img]:https://img.shields.io/npm/v/typespot
[npm-url]:https://www.npmjs.com/package/typespot
[issues-img]:https://img.shields.io/github/issues/invise/typespot
[issues-url]:https://github.com/invise/typespot/issues
[codecov-img]:https://codecov.io/gh/invise/typespot/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/invise/typespot
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/

