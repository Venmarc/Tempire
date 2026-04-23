# Claude Code adapter

## Install
From your project root (where `.agent/` lives):

```bash
cp adapters/claude-code/CLAUDE.md ./CLAUDE.md
mkdir -p .claude
cp adapters/claude-code/settings.json .claude/settings.json
```

Or let the top-level install script do it:

```bash
./install.sh claude-code
```

## What it wires up
- `CLAUDE.md` tells Claude Code to read `.agent/` before acting.
- `.claude/settings.json` adds:
  - A **PostToolUse** hook that logs every Bash/Edit/Write call to episodic memory.
  - A **Stop** hook that runs the dream cycle when a session ends.
  - Permission denies for the most destructive operations (force push, `rm -rf /`).

## Verify
Open Claude Code in the project and ask: "What's in my lessons file?"
If it reads `.agent/memory/semantic/LESSONS.md`, the wiring works.
