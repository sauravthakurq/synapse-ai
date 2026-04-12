import { LanguageModelV1 } from '@ai-sdk/provider';
type LM = {
  specificationVersion: 'v1';
  provider: string;
  modelId: string;
  defaultObjectGenerationMode: any;
  supportsImageUrls: boolean;
  doGenerate: (options: any) => Promise<any>;
  doStream: (options: any) => Promise<any>;
};
