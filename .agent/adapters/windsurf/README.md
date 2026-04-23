# Windsurf adapter

## Install
```bash
cp adapters/windsurf/.windsurfrules ./.windsurfrules
```

Or:
```bash
./install.sh windsurf
```

## What it wires up
Windsurf's Cascade reads `.windsurfrules` from the project root on every
session and prepends it to the system prompt.

## Verify
Ask Cascade "What's in your lessons file?" — it should read
`.agent/memory/semantic/LESSONS.md`.

## Notes
Windsurf doesn't have a first-class hook system like Claude Code, so
post-execution logging is the agent's responsibility (the rules file
instructs it to call `memory_reflect.py`). If you want automated logging,
run the standalone-python conductor in parallel as a background process.
