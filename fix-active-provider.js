const fs = require('fs');

let f = fs.readFileSync('components/generation/generation-toolbar.tsx', 'utf8');

f = f.replace(/activeProvider\.icon/g, "activeProvider?.icon");
f = f.replace(/activeProvider\.name/g, "activeProvider?.name");
f = f.replace(/activeProvider\.models/g, "(activeProvider?.models || [])");

fs.writeFileSync('components/generation/generation-toolbar.tsx', f);
console.log("Fixed activeProvider null checks!");
