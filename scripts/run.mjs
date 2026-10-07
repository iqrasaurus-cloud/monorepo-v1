// Lets `pnpm dev --filter <slug>` and `pnpm build --filter <slug>` work from the repo root.
// Without --filter, every app under apps/ runs.
import { spawnSync } from 'node:child_process'

const [script, ...rest] = process.argv.slice(2)
const at = rest.indexOf('--filter')
const filter = at >= 0 ? rest[at + 1] : undefined

const args = ['-r', '--filter', filter ?? './apps/**']
if (script === 'dev' && !filter) args.push('--parallel')
args.push('run', script)

// The shell is only needed on Windows (to find pnpm.cmd); elsewhere it would glob-expand './apps/**'.
const result = spawnSync('pnpm', args, { stdio: 'inherit', shell: process.platform === 'win32' })
process.exit(result.status ?? 1)
