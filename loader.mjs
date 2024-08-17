import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const tsNode = require('ts-node');
tsNode.register();

export async function load(url, context, defaultLoad) {
  const { format } = await defaultLoad(url, context, defaultLoad);
  if (format === 'module') {
    return {
      format: 'module',
      source: await tsNode.register().compile(url, fileURLToPath(url)),
    };
  }
  return defaultLoad(url, context, defaultLoad);
}
