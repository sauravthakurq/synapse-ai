import { useEffect, useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Play, Square } from 'lucide-react';
import type { AgentConfig } from '@/lib/orchestration/registry/types';
import { useAgentRegistry } from '@/lib/orchestration/registry/store';
import { useTTSPreview } from '@/lib/audio/use-tts-preview';
import { useSettingsStore } from '@/lib/store/settings';
import type { TTSProviderId } from '@/lib/audio/types';

interface VoiceOption {
  id: string;
  name: string;
  isRecommended?: boolean;
}

interface AgentVoiceSelectorProps {
  agent: AgentConfig;
  ttsProviderId: TTSProviderId;
  voices: VoiceOption[];
  agentIndex: number;
}

export function AgentVoiceSelector({ agent, ttsProviderId, voices, agentIndex }: AgentVoiceSelectorProps) {
  const { previewing, startPreview, stopPreview } = useTTSPreview();

  const enrichedVoices = useMemo(() => {
    return voices.map(v => {
      const lower = v.name.toLowerCase();
      // Google, Neural, Natural, or specifically English/Hindi
      const isGoogle = lower.includes('google');
      const isNeural = lower.includes('neural') || lower.includes('natural');
      const isEnHi = lower.includes('en-us') || lower.includes('english') || lower.includes('hindi') || lower.includes('hi-in') || lower.includes('en-in');
      const isRecommended = isGoogle || isNeural || isEnHi;
      return { ...v, isRecommended };
    });
  }, [voices]);

  const defaultVoiceId = useMemo(() => {
    // 1. Google 2. Neural/Natural 3. English/Hindi 4. First
    let best = enrichedVoices.find(v => v.name.toLowerCase().includes('google'));
    if (!best) best = enrichedVoices.find(v => v.name.toLowerCase().includes('neural') || v.name.toLowerCase().includes('natural'));
    if (!best) best = enrichedVoices.find(v => v.isRecommended);
    // Mix it up per agent by index if possible, otherwise use best
    const recommended = enrichedVoices.filter(v => v.isRecommended);
    if (recommended.length > 0) {
      best = recommended[agentIndex % recommended.length];
    }
    return best?.id || voices[0]?.id;
  }, [enrichedVoices, agentIndex, voices]);

  // Dynamic voice adaptation: If provider changed or current voice is invalid, update the registry
  useEffect(() => {
    const currentVoiceValid = agent.voiceConfig?.providerId === ttsProviderId && 
                              voices.find(v => v.id === agent.voiceConfig?.voiceId);
    
    if (!currentVoiceValid && defaultVoiceId) {
      useAgentRegistry.getState().updateAgent(agent.id, {
        voiceConfig: { providerId: ttsProviderId, voiceId: defaultVoiceId },
      });
    }
  }, [agent.id, agent.voiceConfig, ttsProviderId, voices, defaultVoiceId]);

  const handlePreview = async () => {
    if (previewing) {
      stopPreview();
      return;
    }
    const voiceId = agent.voiceConfig?.voiceId || defaultVoiceId;
    if (!voiceId) return;
    
    const { ttsProvidersConfig } = useSettingsStore.getState();
    const config = ttsProvidersConfig[ttsProviderId];
    
    try {
      await startPreview({
        text: "Hello, I am ready to collaborate.",
        providerId: ttsProviderId,
        modelId: config?.modelId,
        voice: voiceId,
        speed: 1,
        apiKey: config?.apiKey,
        baseUrl: config?.baseUrl,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const selectedVoiceId = agent.voiceConfig?.providerId === ttsProviderId ? agent.voiceConfig?.voiceId : defaultVoiceId;

  return (
    <div className="flex items-center gap-1.5 mt-2">
      <Select
        value={selectedVoiceId || ''}
        onValueChange={(val) =>
          useAgentRegistry.getState().updateAgent(agent.id, {
            voiceConfig: { providerId: ttsProviderId, voiceId: val },
          })
        }
      >
        <SelectTrigger className="h-8 text-sm flex-1">
          <SelectValue placeholder="Select voice" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {enrichedVoices.map((v) => (
            <SelectItem key={v.id} value={v.id}>
              {v.name} {v.isRecommended ? '⭐' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
        onClick={handlePreview}
        title={previewing ? "Stop Preview" : "Preview Voice"}
      >
        {previewing ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
    </div>
  );
}
