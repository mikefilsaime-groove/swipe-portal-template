---
name: Email Sending Skill Platform Adaptation Template
description: >-
  Use this template when adapting an existing email-sending skill to a new
  platform such as Kartra. Give the agent the current skill file plus
  screenshots or a walkthrough video of the target platform, then have the
  agent update the skill and verify every documented step.
---

# Email Sending Skill Platform Adaptation Template

Use this file as the working template when converting an existing email-sending skill to another platform, such as Kartra.

The person requesting the change should provide:

1. The existing skill file to modify.
2. The name of the target platform.
3. Screenshots of the target workflow, or a video showing the workflow from login through completion.
4. Any platform-specific rules, fields, timing requirements, or review/approval preferences.

The agent should inspect the supplied evidence, update this file with the target platform's real workflow, and verify the result against the evidence before reporting completion.

## Request template

Copy and customize this message when asking an agent to adapt a skill:

> Modify the attached email-sending skill for **[TARGET PLATFORM]**.
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
- The final success, saved, queued, scheduled, or review state.

Name screenshots in sequence, for example:

```text
01-login-or-dashboard.png
02-open-campaigns.png
03-choose-list.png
04-enter-subject-and-body.png
05-save-or-queue.png
06-confirmation.png
```

### Video package

Record one continuous walkthrough when possible. Show:

- The starting URL or app screen.
- Every click and field entry.
- Any timing, date, timezone, or editor behavior that matters.
- The final state that proves the task completed.

If the video contains sensitive information, redact it first or use a safe test account. Never include passwords, API keys, session tokens, or private customer data in the skill or README.

## Adaptation instructions for the agent

### 1. Inspect before editing

Read the existing skill completely. Identify:

- Its purpose and trigger conditions.
- Required inputs.
- Login and authentication assumptions.
- The exact workflow and page transitions.
- Review, save, queue, send, or scheduling rules.
- The proof required before reporting success.
- Any rules that must remain platform-independent.

### 2. Map the target workflow

Use the screenshots or video to create a step-by-step map:

| Step | Evidence | Action | Expected result |
| --- | --- | --- | --- |
| 1 | [screenshot/video timestamp] | [what to click or enter] | [what should appear] |
| 2 | [screenshot/video timestamp] | [what to click or enter] | [what should appear] |
| 3 | [screenshot/video timestamp] | [what to click or enter] | [what should appear] |

Only document behavior supported by the evidence or by a clearly identified official platform reference. If a detail cannot be confirmed, use a placeholder such as `[VERIFY TARGET URL]` or `[CONFIRM BUTTON LABEL]`.

### 3. Update the skill

Replace the source platform's instructions with the target platform's workflow while retaining these safeguards:

- State the exact platform the skill is for.
- State when the skill should and should not run.
- Ask for missing campaign/list, subject, body, sender, timing, and timezone details.
- Use an authenticated browser session when the platform requires login.
- Do not place credentials or secrets in the skill.
- Preserve a review-first option when the user asks to review before sending.
- Distinguish saved, pending, queued, scheduled, sent, and failed states.
- Require visible proof of the final state before reporting success.
- Stop and report a blocker when the evidence does not establish the next step.

### 4. Handle media evidence correctly

Screenshots and video are instructions about the interface, not permission to guess. The updated skill should:

- Refer to controls by their visible labels where possible.
- Describe the order of operations clearly.
- Include relevant URLs only when they are shown or otherwise verified.
- Record timezone conversion rules exactly.
- Explain how to enter HTML or formatted content if the platform uses an editor.
- Include the confirmation or status check that proves completion.

### 5. Review the finished file

Before reporting completion, check that:

- The title, frontmatter, and platform name are consistent.
- No source-platform names remain where the target platform should be named.
- No guessed steps, credentials, secrets, or unsupported claims were added.
- The instructions can be followed from start to finish.
- Failure paths and human-in-the-loop points are explicit.
- The final verification step matches the evidence.
- The README explains how to reuse this template.

## Target-platform skill outline

Use this outline when filling in the adapted skill:

```markdown
---
name: [TARGET PLATFORM] Email Sending
description: >-
  Use when [trigger]. This skill operates in [TARGET PLATFORM] only.
---

# [TARGET PLATFORM] Email Sending

[One-paragraph purpose and scope.]

## Run conditions

- Use when: [approved trigger]
- Do not use when: [excluded platforms or situations]
- Browser/session requirement: [authenticated session details]

## Required inputs

- Audience/list: [exact input]
- Subject: [exact input]
- Body or HTML: [exact input]
- Sender/from-name: [exact input]
- Timing and timezone: [exact input]
- Review-first preference: [exact input]

## Workflow

1. [Open the verified starting page or app screen.]
2. [Complete the first target-platform action.]
3. [Enter or select the required values.]
4. [Save, schedule, queue, or send according to the user's instruction.]
5. [Verify the final state using visible evidence.]

## Exceptions and failure handling

- [Login or access blocker]
- [Missing input]
- [Validation error]
- [Save, queue, schedule, or send failure]
- [When to stop and report]

## Completion report

Report:

- Platform and campaign/list.
- Subject and sender.
- Scheduled time with timezone conversion, if applicable.
- Final verified state.
- Any blocker or unresolved placeholder.
```

## Kartra adaptation notes

When the target platform is Kartra, replace the placeholders with the exact Kartra labels and flow shown in the evidence. Confirm whether the workflow uses a campaign, broadcast, sequence, tag, list, or another Kartra object. Document the actual save, schedule, send, and confirmation states instead of assuming they match another email platform.
