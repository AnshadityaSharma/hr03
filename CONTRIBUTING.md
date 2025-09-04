# Contributing Guide — HRMS MVP

## Branch strategy
- `main`: production (protected)
- `staging`: integration branch
- Work in `feature/<desc>` branches → PR → staging → main

## Roles
- PM: backlog, release approvals
- FE: frontend/
- BE: backend/
- AI: rasa/
- DB/QA: supabase/

## API contract
- Always update `docs/openapi.yaml` in PRs that touch backend

## DB migrations
- DB/QA only
- Add file to supabase/migrations/YYYYMMDD_desc.sql
- Apply on staging DB first, then prod

## PR rules
- At least 1 reviewer for staging merges
- PM + 1 reviewer for main merges
- PR template must be filled
