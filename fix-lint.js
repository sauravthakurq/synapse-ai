const fs = require('fs');

let f = fs.readFileSync('lib/server/resolve-model.ts', 'utf8');
f = f.replace(
  'let { model, modelInfo } = getModel({',
  'let { model } = getModel({\n    providerId,\n    modelId,\n    apiKey,\n    baseUrl,\n    proxy,\n    providerType: params.providerType as \'openai\' | \'anthropic\' | \'google\' | undefined,\n    requiresApiKey: params.requiresApiKey,\n  });\n  const { modelInfo } = getModel({'
);
fs.writeFileSync('lib/server/resolve-model.ts', f);
