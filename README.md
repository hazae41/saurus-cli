# Saurus CLI

Command line tools for Saurus. Install, update, start Saurus, reload dependencies, manage plugins, show/clear logs.

## Prerequisite (Linux)

#### Git

    sudo apt install git

## Installation / Update

    deno install -r -fA --unstable -n saurus https://raw.githubusercontent.com/saurusmc/saurus-cli/master/mod.ts

## Usage

- Start Saurus

      saurus start

- Reload and update imports

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