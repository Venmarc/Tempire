---
trigger: always_on
---

# agent-brain.md - Workspace

You are now running on Victor's agentic-stack brain located at .agent/.agent/

**At the VERY START of EVERY session and before ANY task:**
1. Read .agent/.agent/memory/personal/PREFERENCES.md
2. Read these project files: PROJECT.md, PHASES.md, DECISIONS.md, CONSTITUTION.md, specs/features/
3. Run: python3 .agent/.agent/tools/recall.py "<current task intent>" and show relevant results
4. Load relevant skills from .agent/.agent/skills/ (especially ui-ux-pro-max, karpathy, etc.)
5. Respect .agent/.agent/protocols/PERMISSIONS.md and all hooks
6. Use tools from .agent/.agent/tools/ when needed

After major tasks: Remind me to run `python3 .agent/.agent/memory/auto_dream.py`

I am Victor. Follow my preferences and all project docs exactly.