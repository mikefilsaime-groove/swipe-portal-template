---
name: Skill Modification Template
description: >-
  Use this template when asking an AI to modify an existing skill for a
  specific app, platform, or workflow. Give the AI the current skill file plus
  screenshots or a walkthrough video, then have it update the skill and verify
  every documented step.
---

# Skill Modification Template

Use this file as a handoff template. Give it to an AI along with an existing skill and evidence of the app or workflow you want the skill adapted to. The AI should then customize the template for that specific use case.

The person requesting the change should provide:

1. The existing skill file to modify.
2. The name of the target platform or workflow.
3. Screenshots of the target workflow, or a video showing the workflow from login through completion.
4. Any platform-specific rules, fields, timing requirements, or review/approval preferences.

The AI should inspect the supplied evidence, update the skill with the specific app or workflow's real steps, and verify the result against the evidence before reporting completion.

## Request template

Copy and customize this message when asking an AI to adapt a skill:

> Modify the attached skill for **[TARGET PLATFORM OR WORKFLOW]**.
>
> The current skill file is **[PATH TO EXISTING SKILL]**.
>
> Use the attached screenshots/video to document the exact workflow. The evidence shows the login page, each screen, and every click needed to complete the task. Arrows and notes identify the controls to use.
>
> Update the skill itself rather than writing a separate explanation. Preserve useful safety rules, required inputs, review checkpoints, and verification steps from the original skill. Replace platform-specific instructions with the workflow shown in the evidence.
>
> If anything is unclear, mark it as a question or placeholder instead of guessing. Do not invent selectors, URLs, field names, or platform behavior.
>
> When finished, validate the updated skill against the screenshots/video and create or update the README with instructions for using this template.

## Evidence package

Provide one of these evidence packages:

### Screenshot package

Capture the workflow in order. Include:

- The login page or authenticated starting screen.
- Every page reached during the workflow.
- Each button, tab, menu, field, dropdown, and confirmation state used.
- Arrows or annotations that identify where to click or what to enter.
- The final success, saved, queued, scheduled, completed, or review state.

Name screenshots in sequence, for example:

```text
01-login-or-dashboard.png
02-open-workflow.png
03-choose-audience-or-record.png
04-enter-required-information.png
05-save-or-submit.png
06-confirmation.png
```

### Video package

Record one continuous walkthrough when possible. Show:

- The starting URL or app screen.
- Every click and field entry.
- Any timing, date, timezone, or editor behavior that matters.
- The final state that proves the task completed.

If the video contains sensitive information, redact it first or use a safe test account. Never include passwords, API keys, session tokens, or private customer data in the skill or README.

## Modification instructions for the AI

### 1. Inspect before editing

Read the existing skill completely. Identify:

- Its purpose and trigger conditions.
- Required inputs.
- Login and authentication assumptions.
- The exact workflow and page transitions.
- Review, save, submit, queue, send, or scheduling rules.
- The proof required before reporting success.
- Any rules that must remain platform-independent.

### 2. Map the target workflow

Use the screenshots or video to create a step-by-step map:

| Step | Evidence | Action | Expected result |
| --- | --- | --- | --- |
| 1 | [screenshot/video timestamp] | [what to click or enter] | [what should appear] |
| 2 | [screenshot/video timestamp] | [what to click or enter] | [what should appear] |
| 3 | [screenshot/video timestamp] | [what to click or enter] | [what should appear] |

Only document behavior supported by the evidence or by a clearly identified official reference. If a detail cannot be confirmed, use a placeholder such as `[VERIFY TARGET URL]` or `[CONFIRM BUTTON LABEL]`.

### 3. Update the skill

Replace the source platform's instructions with the target platform's workflow while retaining these safeguards:

- State the exact platform or workflow the skill is for.
- State when the skill should and should not run.
- Ask for all inputs required by the target workflow.
- Use an authenticated browser session when the platform requires login.
- Do not place credentials or secrets in the skill.
- Preserve a review-first option when the user asks to review before taking an external action.
- Distinguish saved, pending, queued, scheduled, completed, sent, and failed states when those states apply.
- Require visible proof of the final state before reporting success.
- Stop and report a blocker when the evidence does not establish the next step.

### 4. Handle media evidence correctly

Screenshots and video are instructions about the interface, not permission to guess. The updated skill should:

- Refer to controls by their visible labels where possible.
- Describe the order of operations clearly.
- Include relevant URLs only when they are shown or otherwise verified.
- Record timezone conversion rules exactly.
- Explain how to enter text, HTML, files, or other formatted content if the platform uses them.
- Include the confirmation or status check that proves completion.

### 5. Review the finished file

Before reporting completion, check that:

- The title, frontmatter, and platform name are consistent.
- No source-platform names remain where the target platform should be named.
- No guessed steps, credentials, secrets, or unsupported claims were added.
- The instructions can be followed from start to finish.
- Failure paths and human-in-the-loop points are explicit.
- The final verification step matches the evidence.
- The README explains how to give this template to an AI.

## Customized skill outline

Use this outline when the AI customizes the skill:

```markdown
---
name: [TARGET PLATFORM OR WORKFLOW]
description: >-
  Use when [trigger]. This skill operates in [TARGET PLATFORM OR WORKFLOW] only.
---

# [TARGET PLATFORM OR WORKFLOW]

[One-paragraph purpose and scope.]

## Run conditions

- Use when: [approved trigger]
- Do not use when: [excluded platforms or situations]
- Browser/session requirement: [authenticated session details]

## Required inputs

- [Audience, list, record, project, or other target]
- [Subject, title, or name]
- [Body, content, file, or other payload]
- [Sender, owner, or account, if applicable]
- [Timing and timezone, if applicable]
- [Review-first preference, if applicable]

## Workflow

1. [Open the verified starting page or app screen.]
2. [Complete the first target-platform action.]
3. [Enter or select the required values.]
4. [Save, schedule, submit, queue, send, or complete according to the user's instruction.]
5. [Verify the final state using visible evidence.]

## Exceptions and failure handling

- [Login or access blocker]
- [Missing input]
- [Validation error]
- [Save, submit, queue, schedule, send, or completion failure]
- [When to stop and report]

## Completion report

Report:

- Platform/workflow and relevant target.
- Key inputs used.
- Timing with timezone conversion, if applicable.
- Final verified state.
- Any blocker or unresolved placeholder.
```
