const fetch = require('node-fetch');

async function test() {
  const req = {
    messages: [
      {
        id: "user-1",
        role: "user",
        parts: [{ type: "text", text: "what is photosynthesis?" }]
      }
    ],
    storeState: {
      mode: "paused",
      whiteboardOpen: false,
      scenes: [],
      currentSceneId: null,
      stage: null
    },
    config: {
      agentIds: ["default-1"],
      maxTurns: 1
    },
    apiKey: "dummy",
    providerType: "groq",
    model: "llama-3.3-70b-versatile"
  };

  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req)
  });

  const reader = res.body;
  reader.on('data', (chunk) => {
    process.stdout.write(chunk.toString());
  });
}

test().catch(console.error);
