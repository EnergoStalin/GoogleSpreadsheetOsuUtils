import {execSync} from 'child_process';
import pkg from './package.json' with { type: 'json' };
import path from 'path';
import {renameSync} from 'fs';

execSync(
	`npx clasp create --title '${pkg.name}' --rootDir src --parentId ${process.argv.pop()}`,
	{stdio: 'inherit'}
);

renameSync(path.join('src', '.clasp.json'), '.clasp.json');
