const fs = require('fs');
const path = require('path');

function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== 'scripts' && f !== 'prisma' && f !== 'scratch') walk(p);
    } else if (f.endsWith('.ts') || f.endsWith('.js')) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      lines.forEach((line, i) => {
        if (line.includes('$queryRaw') || line.includes('$executeRaw')) {
          console.log(`${p}:${i+1}: ${line.trim()}`);
        }
      });
    }
  }
}

walk('.');

