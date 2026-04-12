import type { LanguageModel } from 'ai';

export function createFallbackModel(models: LanguageModel[]): LanguageModel {
  if (models.length === 0) throw new Error("No models provided for fallback");
  if (models.length === 1) return models[0];

  const primary = models[0] as any;
  const result: any = {
    specificationVersion: primary.specificationVersion,
    provider: primary.provider,
    modelId: primary.modelId,
    defaultObjectGenerationMode: primary.defaultObjectGenerationMode,
    doGenerate: async (options: any) => {
      let lastError;
      for (const model of models as any[]) {
        try {
          return await model.doGenerate(options);
        } catch (e) {
          lastError = e;
          console.warn(`[Fallback] Model ${model.modelId} failed, falling back to next...`);
        }
      }
      throw lastError;
    },
    doStream: async (options: any) => {
      let lastError;
      for (const model of models as any[]) {
        try {
          return await model.doStream(options);
        } catch (e) {
          lastError = e;
          console.warn(`[Fallback] Model ${model.modelId} failed stream, falling back...`);
        }
      }
      throw lastError;
    }
  };

  return result as LanguageModel;
}
