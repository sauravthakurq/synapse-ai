export function modifyStore2(content: string) {
  return content.replace(
    /setProvidersConfig: \(config\) => set\(\{ providersConfig: config \}\),/,
  `setProvidersConfig: (config) => set((state) => {
            let newProviderId = state.providerId;
            let newModelId = state.modelId;

            const currentProvider = config[state.providerId];
            const isCurrentUsable = currentProvider && 
              (!currentProvider.requiresApiKey || currentProvider.apiKey || currentProvider.isServerConfigured) && 
              currentProvider.models?.some(m => m.id === state.modelId);

            if (!isCurrentUsable) {
              for (const [pid, pConf] of Object.entries(config)) {
                if ((!pConf.requiresApiKey || pConf.apiKey || pConf.isServerConfigured) && pConf.models?.length > 0) {
                   newProviderId = pid as any;
                   newModelId = pConf.models[0].id;
                   break;
                }
              }
            }

            return {
              providersConfig: config,
              providerId: newProviderId,
              modelId: newModelId,
            };
          }),`);
}
