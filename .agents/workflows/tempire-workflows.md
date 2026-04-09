---
description: Workflow Examples (can be changed at any time)
---

1. Feature Implementation Workflow:
- Step 1: Plan with task-master or spec-kit (break into tasks, edge cases, files affected).
- Step 2: Get approval on plan.
- Step 3: Implement only happy path + basic errors.
- Step 4: Manual test instructions provided.
- Step 5: Refactor/polish only after tests pass.
- 
2. Code Review Workflow:
- Analyze for: security (auth leaks), performance (N+1), accessibility, consistency with PROJECT.md.
- Suggest fixes with minimal changes.

3. MCP Usage Workflow:
- For docs/questions: Use context7 first.
- For task breakdown: Invoke task-master.
- For research: Use tavily-remote-mcp.
- For schema/DB: Use supabase-mcp.

