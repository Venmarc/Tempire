# Windsurf setup

## What the adapter installs
- `.windsurfrules` at project root

## Install
```bash
./install.sh windsurf
```

## How it works
Windsurf's Cascade reads `.windsurfrules` on session start and prepends it
to the system prompt. Keep the file under ~200 lines; it's read every time.

## Logging note
Windsurf does not have a first-class post-tool hook. The rule file asks
the agent to call `memory_reflect.py` after significant actions. If you
want automatic logging, wrap Windsurf in a watcher or run the standalone-
python conductor as a side channel.

## Troubleshooting
- If the agent ignores the file, make sure it's at the exact project root
  (Windsurf doesn't search subdirectories).
