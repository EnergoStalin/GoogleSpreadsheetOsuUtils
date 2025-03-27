import { execSync } from 'node:child_process';
import pkg from './package.json' assert { type: 'json' };

execSync(
	`npx clasp create --title '${pkg.name}' --rootDir build/src --parentId ${process.argv.pop()}`,
	{ stdio: 'inherit' },
);
