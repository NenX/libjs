import { readFileSync } from 'fs';
import { defineConfig } from 'rollup';
import { createSharedConfig } from '../../rollup.config';


export default defineConfig((commandLineArgs) => {
  const pkg = JSON.parse(readFileSync('./package.json'))
  const config = createSharedConfig(commandLineArgs.watch)

  return [
    {
      ...config,
    },

  ]
}
)





