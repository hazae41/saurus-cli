import { existsSync } from "https://deno.land/std@0.74.0/fs/exists.ts";
import { read, root, run } from "./utils.ts";

export async function install(args: string[]) {
  const [url, name] = args;

  if (!url || !name)
    throw new Error(`install <url> <name>`)

  const folder = root(`./plugins/${name}`)

  if (existsSync(folder))
    throw new Error(`Plugin "${name}" already exists`)

  await read(run(`git submodule add -f ${url} plugins/${name}`, root()))
  await read(run(`git submodule add -f ${url} plugins/${name}`, root()))
}

export async function remove(args: string[]) {
  const [name] = args;

  if (!name)
    throw new Error(`remove <name>`)

  const folder = root(`./plugins/${name}`)

  if (!existsSync(folder))
    throw new Error(`Unknown plugin "${name}"`)

  await read(run(`rm -rf plugins/${name}`, root()))
  await read(run(`rm -rf .git/modules/plugins/${name}`, root()))
  await read(run(`git config -f .gitmodules --remove-section submodule.plugins/${name}`, root()))
  await read(run(`git config -f .git/config --remove-section submodule.plugins/${name}`, root()))
}

export async function update(args: string[]) {
  const [name] = args;

  if (!name)
    throw new Error(`update <name>`)

  const folder = root(`./plugins/${name}`)

  if (!existsSync(folder))
    throw new Error(`Unknown plugin "${name}"`)

  await read(run(`git stash`, folder))
  await read(run(`git pull -f`, folder))
}