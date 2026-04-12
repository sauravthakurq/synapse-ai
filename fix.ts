const fs = require('fs');

// 1. lib/utils/model-config.ts
let configTs = fs.readFileSync('lib/utils/model-config.ts', 'utf8');
configTs = configTs.replace(
  "requiresApiKey: providerConfig?.requiresApiKey,",
  "requiresApiKey: providerConfig?.requiresApiKey,\n    fallbackApiKeys: providerConfig?.fallbackApiKeys || [],"
);
fs.writeFileSync('lib/utils/model-config.ts', configTs);

// 2. components/chat/use-chat-sessions.ts
let useChat = fs.readFileSync('components/chat/use-chat-sessions.ts', 'utf8');
useChat = useChat.replace(/requiresApiKey: mc.requiresApiKey,/g, "requiresApiKey: mc.requiresApiKey,\n            fallbackApiKeys: mc.fallbackApiKeys,");
fs.writeFileSync('components/chat/use-chat-sessions.ts', useChat);

// 3. app/api/chat/route.ts
let chatRoute = fs.readFileSync('app/api/chat/route.ts', 'utf8');
chatRoute = chatRoute.replace(
  "requiresApiKey: body.requiresApiKey,",
  "requiresApiKey: body.requiresApiKey,\n      fallbackApiKeys: body.fallbackApiKeys,"
);
fs.writeFileSync('app/api/chat/route.ts', chatRoute);

console.log("Replaced configs.");
