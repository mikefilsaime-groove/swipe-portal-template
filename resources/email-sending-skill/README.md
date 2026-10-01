# Skill Modification Template

This folder contains a generic template that someone can give to an AI along with an existing skill and evidence of the app or workflow they want to support. The AI then customizes the skill for that specific use case.

## Files

- [`Email-Sending-Skill copy.md`](./Email-Sending-Skill%20copy.md) — the editable skill-modification template.
- `README.md` — these usage instructions.

## How to use it

1. Start with the existing skill you want to adapt.
2. Identify the specific app, platform, or workflow the AI should support.
3. Capture the target workflow with either an ordered screenshot set or one walkthrough video.
4. Send the agent the current skill file and the evidence package.
5. Ask the AI to modify the skill file itself using the request template in the file.
6. Review the updated instructions against every screenshot or video step.

A concise request can look like this:

> Modify this skill for the specific app and workflow shown in the attached evidence. Use the attached screenshots/video to document every step from the login page through the final confirmation. Preserve the original safety and verification rules, replace the source-platform instructions with the exact target workflow shown, and leave placeholders for anything the evidence does not establish.

## What to capture

For screenshots, capture the starting screen, every page and control used, all required fields, and the final confirmation or status. Number the files in order and add arrows or notes when a control is hard to identify.

For video, record the complete flow in one continuous walkthrough when possible. Show the URL or app screen, every click and entry, timing or timezone behavior, and the final state that proves completion.

Do not include passwords, API keys, session tokens, or private customer data. Use a safe test account or redact sensitive information before sharing the evidence.

## Quality check

Before using the adapted skill, confirm that it:

- Names the correct app or workflow and trigger conditions.
- Lists the inputs the user must provide.
- Describes the workflow in the same order as the evidence.
- Does not guess missing labels, URLs, or behavior.
- Keeps review-first and failure-handling rules.
- Distinguishes relevant saved, pending, queued, scheduled, completed, sent, and failed states.
- Requires visible proof of the final state before reporting success.

If the screenshots or video do not establish a step, the AI should keep a clear `[VERIFY ...]` placeholder rather than guessing. Resolve it before using the customized skill for a real task.
