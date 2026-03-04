import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Find all .plugin.ts files
const tsFiles = fs.readdirSync(rootDir)
  .filter(file => file.endsWith('.plugin.ts'));

// Check which ones have corresponding .js files in dist
const missingFiles = tsFiles.filter(tsFile => {
  const jsFileName = tsFile.replace('.plugin.ts', '.plugin.js');
  const jsPath = path.join(distDir, jsFileName);
  return !fs.existsSync(jsPath);
});

if (missingFiles.length === 0) {
  console.log('All plugins are up to date.');
  process.exit(0);
}

console.log(`Found ${missingFiles.length} missing plugin(s):`, missingFiles);

// Build only the missing plugins
try {
  console.log('Compiling TypeScript plugins...');
  execSync('npx tsc', { stdio: 'inherit', cwd: rootDir });
  console.log('Compilation successful!');
  
  if (missingFiles.length > 0) {
    console.log('Built plugins:', missingFiles.join(', '));
  }
} catch (error) {
  console.error('Compilation failed:', error.message);
  process.exit(1);
}
