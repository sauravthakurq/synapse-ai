export function modifyStore(content: string) {
  return content.replace(
    /setProviderConfig: \(providerId, config\) =>\s+set\(\(state\) => \(\{\s+providersConfig: \{(.*?)\},\s+\}\)\),/s,
  `setProviderConfig: (providerId, config) =>
          set((state) => {
            const updatedProvider = { ...state.providersConfig[providerId], ...config };
            const newProvidersConfig = { ...state.providersConfig, [providerId]: updatedProvider };

            let newProviderId = state.providerId;
            let newModelId = state.modelId;

            // Check if current selection is usable
            const currentProvider = newProvidersConfig[state.providerId];
            const isCurrentUsable = currentProvider && 
              (!currentProvider.requiresApiKey || currentProvider.apiKey || currentProvider.isServerConfigured) && 
              currentProvider.models?.some(m => m.id === state.modelId);

            if (!isCurrentUsable) {
              const p = updatedProvider;
              if ((!p.requiresApiKey || p.apiKey || p.isServerConfigured) && p.models?.length > 0) {
                newProviderId = providerId;
                newModelId = p.models[0].id;
              } else {
                for (const [pid, pConf] of Object.entries(newProvidersConfig)) {
                  if ((!pConf.requiresApiKey || pConf.apiKey || pConf.isServerConfigured) && pConf.models?.length > 0) {
                     newProviderId = pid as any;
                     newModelId = pConf.models[0].id;
                     break;
                  }
                }
              }
            }

            return {
              providersConfig: newProvidersConfig,
              providerId: newProviderId,
              modelId: newModelId,
            };
          }),`);
}
