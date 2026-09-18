// Lets `pnpm dev --filter <slug>` and `pnpm build --filter <slug>` work from the repo root.
// Without --filter, every app under apps/ runs.
import { spawnSync } from 'node:child_process'

const [script, ...rest] = process.argv.slice(2)
const at = rest.indexOf('--filter')
const filter = at >= 0 ? rest[at + 1] : undefined

const args = ['-r', '--filter', filter ?? './apps/**']
if (script === 'dev' && !filter) args.push('--parallel')
args.push('run', script)

const result = spawnSync('pnpm', args, { stdio: 'inherit', shell: true })
process.exit(result.status ?? 1)
