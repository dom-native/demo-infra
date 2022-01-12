import { router } from 'cmdrouter';
import { execa } from 'execa';
import { saferRemove } from 'fs-extra-plus';

router({ build }).route();

const { stdout, stderr } = process;

async function build() {
	await saferRemove('./dist');

	// build the tsc (vdev assume rollup on webBundles, which we do not need for this build)
	await execa('./node_modules/.bin/tsc', { stdout, stderr });
}





