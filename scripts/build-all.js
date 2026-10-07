const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd, cwd) {
  console.log(`\n> Running: ${cmd} (in ${cwd || '.'})`);
  execSync(cmd, { cwd: cwd ? path.resolve(__dirname, '..', cwd) : path.resolve(__dirname, '..'), stdio: 'inherit' });
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('🚀 Building Ahvaan for You: Web + Admin + Backend...');

// 1. Build apps/web
console.log('\n--- 1. Building apps/web ---');
run('npm install --include=dev', 'apps/web');
run('npm run build', 'apps/web');

// 2. Build apps/admin
console.log('\n--- 2. Building apps/admin ---');
run('npm install --include=dev', 'apps/admin');
run('npm run build', 'apps/admin');

// 3. Assemble unified dist folder
console.log('\n--- 3. Assembling unified dist directory ---');
const rootDist = path.resolve(__dirname, '..', 'dist');
if (fs.existsSync(rootDist)) {
  fs.rmSync(rootDist, { recursive: true, force: true });
}
fs.mkdirSync(rootDist, { recursive: true });

// Copy web to root dist
copyRecursiveSync(path.resolve(__dirname, '..', 'apps', 'web', 'dist'), rootDist);

// Copy admin to dist/admin
const adminDest = path.join(rootDist, 'admin');
fs.mkdirSync(adminDest, { recursive: true });
copyRecursiveSync(path.resolve(__dirname, '..', 'apps', 'admin', 'dist'), adminDest);

console.log('\n✅ Build completed successfully! Unified output directory is ready at dist/\n');
