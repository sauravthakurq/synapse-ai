# 🚀 Contributing to SYNAPSE AI

Welcome to the bleeding edge of educational technology. **SYNAPSE AI** operates on sophisticated multi-agent infrastructures and complex frontend state-machines. 

As an orchestration ecosystem built independently by **Saurav Thakur**, any contributions must adhere to ultra-strict architectural, performance, and type-safety standards.

## 🧠 The Engineering Standard
1. **Absolute Type Safety**: TypeScript strictly enforced. `any` types will fail PR reviews.
2. **Performant Render Cycles**: Core classroom interactions use Framer Motion and heavy Canvas API usage. Any React UI updates must tightly control re-renders using proper state scoping (Zustand/Context).
3. **AI Fallback Reliability**: For any API route integrating an LLM (e.g., `/api/generate`), you MUST implement failover mechanisms (e.g., DeepSeek -> OpenAI) to guarantee response stability.
4. **Latency Obsession**: Ensure TTFB (Time to First Byte) remains <200ms by optimizing Serverless/Edge deployments.

## 🛠️ Contribution Pipeline
1. Clone the repository and create your feature branch from `main`.
2. Prefix branches: `feat/` for logic, `ui/` for frontend, `ai/` for prompt/agent fixes.
3. Validate through intensive local testing: `pnpm run test`
4. Submit PRs with deep contextual reasoning for algorithmic shifts.

We are not just writing code; we are simulating cognitive ecosystems.
