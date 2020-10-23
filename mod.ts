import { existsSync } from "https://deno.land/std/fs/mod.ts";
import { install, remove, update } from "./plugins.ts";
import { read, readLogs, root, run } from "./utils.ts";

const [label, ...args] = Deno.args

async function handle() {

  if (label === "start") {
    const cmd = "deno run -A --unstable --importmap=imports.json start.ts"
    await readLogs(run(cmd, root()))
    return
  }

  if (label === "reload") {
    const cmd = "deno cache -r --unstable --importmap=imports.json start.ts"
    await read(run(cmd, root()))
    return
  }

  if (label === "logs") {
    const [sub] = args

    const path = root("logs.txt")

    if (!existsSync(path))
      throw new Error("No logs file")

    if (sub === "show") {
      const o = { read: true }
      const logs = await Deno.open(path, o)
      await Deno.copy(logs, Deno.stdout)
      return;
    }

    if (sub === "clear") {
      await Deno.remove(path)
      console.log("Done")
      return
    }
  }

  if (label === "plugins") {
    const [sub, ...args2] = args

    if (sub === "install") {
      await install(args2)
      return
    }

    if (sub === "remove") {
      await remove(args2)
      return
    }

    if (sub === "update") {
      await update(args2)
      return
    }
  }

  help()
}

function help() {
  console.log("Available commands:")
  console.log("- start - Start Saurus")
  console.log("- reload - Reload imports")
  console.log("- plugins install <url> <name> - Install a plugin")
  console.log("- plugins remove <name> - Remove a plugin")
  console.log("- plugins update <name> - Update a plugin")
  console.log("- logs show - Show logs")
  console.log("- logs clear - Clear logs")
}

try {
  await handle()
} catch (e: unknown) {
  console.error(e)
}

Deno.exit()