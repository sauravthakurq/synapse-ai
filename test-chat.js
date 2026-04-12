const req = fetch("http://localhost:3000/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [
      { role: "user", parts: [{ type: "text", text: "What is 2+2?" }], id: "1" }
    ],
    storeState: { stage: { id: "test", generatedAgentConfigs: [] }, scenes: [], currentSceneId: null, mode: "qa" },
    config: { agentIds: ["default-1"] },
    apiKey: "dummy",
    requiresApiKey: false,
    model: "llama-3.1-8b-instant" // Assuming Fallback handles mock or uses a free key
  })
}).then(async r => {
  console.log(r.status);
  const reader = r.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(new TextDecoder().decode(value));
  }
})
