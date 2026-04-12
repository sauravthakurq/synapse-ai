const fs = require('fs');

let resolveTs = fs.readFileSync('lib/server/resolve-model.ts', 'utf8');

// Modify resolveModel signature
resolveTs = resolveTs.replace(
  "requiresApiKey?: boolean;",
  "requiresApiKey?: boolean;\n  fallbackApiKeys?: string[];"
);

// Inject logic after let { model ... } = getModel({...})
const target = `  const { model, modelInfo } = getModel({
    providerId,
    modelId,
    apiKey,
    baseUrl,
    proxy,
    providerType: params.providerType as 'openai' | 'anthropic' | 'google' | undefined,
    requiresApiKey: params.requiresApiKey,
  });

  return { model, modelInfo, modelString, apiKey };
}`;

const replacement = `  let { model, modelInfo } = getModel({
    providerId,
    modelId,
    apiKey,
    baseUrl,
    proxy,
    providerType: params.providerType as 'openai' | 'anthropic' | 'google' | undefined,
    requiresApiKey: params.requiresApiKey,
  });

  if (params.fallbackApiKeys && params.fallbackApiKeys.length > 0) {
    const fallbacks = params.fallbackApiKeys.map((fbApiKey) => {
      return getModel({
        providerId,
        modelId,
        apiKey: fbApiKey,
        baseUrl: clientBaseUrl ? clientBaseUrl : resolveBaseUrl(providerId, params.baseUrl),
        proxy,
        providerType: params.providerType as 'openai' | 'anthropic' | 'google' | undefined,
        requiresApiKey: params.requiresApiKey,
      }).model;
    });
    model = createFallbackModel([model, ...fallbacks]);
  }

  return { model, modelInfo, modelString, apiKey };
}`;

resolveTs = resolveTs.replace(target, replacement);

fs.writeFileSync('lib/server/resolve-model.ts', resolveTs);

console.log("Updated resolve-model.ts");
