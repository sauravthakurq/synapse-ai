const fs = require('fs');
let file = fs.readFileSync('lib/server/resolve-model.ts', 'utf8');

const targetHeaders = `export function resolveModelFromHeaders(req: NextRequest): ResolvedModel {
  const primaryModel = resolveModel({
    modelString: req.headers.get('x-model') || undefined,
    apiKey: req.headers.get('x-api-key') || undefined,
    baseUrl: req.headers.get('x-base-url') || undefined,
    providerType: req.headers.get('x-provider-type') || undefined,
    requiresApiKey: req.headers.get('x-requires-api-key') === 'true' ? true : undefined,
  });

  const fallbackKeysHeader = req.headers.get('x-fallback-api-keys');
  if (fallbackKeysHeader) {
    try {
      const fallbackApiKeys = JSON.parse(fallbackKeysHeader);
      if (Array.isArray(fallbackApiKeys) && fallbackApiKeys.length > 0) {
        const fallbacks = fallbackApiKeys.map((fbApiKey) => {
          return resolveModel({
            modelString: req.headers.get('x-model') || undefined,
            apiKey: fbApiKey,
            baseUrl: req.headers.get('x-base-url') || undefined,
            providerType: req.headers.get('x-provider-type') || undefined,
            requiresApiKey: req.headers.get('x-requires-api-key') === 'true' ? true : undefined,
          }).model;
        });
        primaryModel.model = createFallbackModel([primaryModel.model, ...fallbacks]);
      }
    } catch (e) {
      console.error('Failed to parse x-fallback-api-keys header', e);
    }
  }

  return primaryModel;
}`;

const replaceHeaders = `export function resolveModelFromHeaders(req: NextRequest): ResolvedModel {
  let fallbackApiKeys: string[] = [];
  const fallbackKeysHeader = req.headers.get('x-fallback-api-keys');
  if (fallbackKeysHeader) {
    try {
      fallbackApiKeys = JSON.parse(fallbackKeysHeader);
    } catch (e) {
      console.error('Failed to parse x-fallback-api-keys header', e);
    }
  }

  return resolveModel({
    modelString: req.headers.get('x-model') || undefined,
    apiKey: req.headers.get('x-api-key') || undefined,
    baseUrl: req.headers.get('x-base-url') || undefined,
    providerType: req.headers.get('x-provider-type') || undefined,
    requiresApiKey: req.headers.get('x-requires-api-key') === 'true' ? true : undefined,
    fallbackApiKeys,
  });
}`;

file = file.replace(targetHeaders, replaceHeaders);
fs.writeFileSync('lib/server/resolve-model.ts', file);
