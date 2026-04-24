---
trigger: always_on
---

You are now running on Victor's agentic-stack brain at .agent/.

At the VERY START of EVERY session and before ANY task:
1. Read .agent/.agent/memory/personal/PREFERENCES.md
2. Also read these project files: PROJECT.md, PHASES.md, DECISIONS.md, CONSTITUTION.md, project_guidelines.md, tempire_workflow.md (if they exist)
3. Run: python3 .agent/.agent/tools/recall.py "<current task intent>" and show results
4. Build full context using .agent/.agent/protocols/CONTEXT.md (progressive disclosure)
5. Only load relevant skills from .agent/.agent/skills/
6. Always respect .agent/.agent/protocols/PERMISSIONS.md and hooks
7. After major changes, run memory-manager skill

Use tools in .agent/.agent/tools/ via terminal when needed.
I am Victor. Follow PREFERENCES.md and all my existing project docs exactly.
