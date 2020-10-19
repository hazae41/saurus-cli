import * as Path from "https://deno.land/std@0.74.0/path/mod.ts";
import { existsSync } from "https://deno.land/std@0.74.0/fs/exists.ts";

export function run(command: string, path = root()) {
  return Deno.run({
    cwd: path,
    cmd: command.split(" "),
    stdout: "piped",
    stderr: "piped",
    stdin: "piped"
  })
}

export async function copy(reader: Deno.Reader, ...writers: Deno.Writer[]) {
  try {
    for await (const b of Deno.iter(reader))
      for (const writer of writers) await writer.write(b)
  } catch (e: unknown) { undefined; }
}

export async function read(p: ReturnType<typeof run>) {
  const stdout = Deno.copy(p.stdout, Deno.stdout)
  const stderr = Deno.copy(p.stderr, Deno.stderr)
  const stdin = Deno.copy(Deno.stdin, p.stdin)
  await Promise.all([stdout, stderr])
}

export async function readLogs(p: ReturnType<typeof run>) {
  const o = { append: true, create: true }
  const logs = await Deno.open(root("logs.txt"), o)
  const stdout = copy(p.stdout, Deno.stdout, logs)
  const stderr = copy(p.stderr, Deno.stderr, logs)
  const stdin = copy(Deno.stdin, p.stdin, logs)
  await Promise.all([stdout, stderr])
}

export function parent(path: string) {
  return Path.join(path, "..")
}

export function root(path = ".") {
  let cwd = Deno.cwd()
  while (parent(cwd) !== cwd) {
    const start = Path.join(cwd, "start.ts")
    if (existsSync(start)) return Path.join(cwd, path)
    cwd = parent(cwd)
  }

  throw new Error("Could not find root folder")
}