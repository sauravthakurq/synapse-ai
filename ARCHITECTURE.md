# 🏗️ SYNAPSE AI | Master System Architecture

## Vision & Philosophy
Built entirely by **Saurav Thakur**, SYNAPSE AI is a masterclass in decoupled, heavy-duty AI systems. The architecture strictly partitions the visual rendering layer from the intricate heuristic routing of the LLMs.

### 1. Presentation & Live Interaction Layer (`/components` & `/app/classroom`)
* **Framer Motion Engine**: Handles mathematically intensive animations (audio waveforms, speech cues, and scene transitions) perfectly in sync with state.
* **Roundtable Engine**: Custom React architecture simulating realistic latency, cutoff, and speech overlaps between digital entities.

### 2. Multi-Agent Intelligence Core (`/lib/ai` & `/app/api`)
* **LangGraph Orchestration**: Complete state-machine routing. Maps autonomous entity decision trees (e.g., student agent raising a doubt -> teacher agent interjecting).
* **High-Throughput Serverless**: Next.js Edge APIs meticulously built to handle large PDF buffers, chunk parsing, and instantaneous prompt streaming while bypassing Vercel timeout limits.

### 3. Media Synthesis & Export (`/lib/media`, `/packages/pptxgenjs`)
* **Asynchronous Buffer Streaming**: Proxies and streams Azure Neural TTS audio in chunks to ensure the browser continuously plays discourse without stutter.
* **Dynamic LaTeX/MathML Processing**: Complex strings from the LLM parsed locally into beautiful vector presentations natively without external API reliance.
