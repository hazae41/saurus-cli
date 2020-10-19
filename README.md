# Saurus CLI

Command line tools for Saurus. Install, update, start Saurus, reload dependencies, manage plugins, show/clear logs.

## Install / Update

    deno install -r -fA --unstable -n saurus https://raw.githubusercontent.com/saurusmc/saurus-cli/master/mod.ts

## Usage

- Create Saurus

      saurus create <directory>

- Update Saurus

      saurus update

- Start Saurus

      saurus start

- Reload and update dependencies

      saurus reload

- Install plugin

      saurus plugins install <url> <name>

- Remove plugin

      saurus plugins remove <name>

- Update plugin

      saurus plugins update <name>

- Show logs

      saurus logs show

- Clear logs

      saurus logs clear