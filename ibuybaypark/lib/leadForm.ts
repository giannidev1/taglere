/**
 * Shared shape of the cash-offer form.
 *
 * Imported by both the client form and the API route so the option values
 * cannot drift apart and the server can validate what it is sent.
 */

export const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: 'In the next 1–3 months' },
  { value: '3-6-months', label: 'In the next 3–6 months' },
  { value: 'exploring', label: 'Just exploring my options' },
] as const;

export const CONDITION_OPTIONS = [
  { value: 'move-in-ready', label: 'Move-in ready' },
  { value: 'some-work', label: 'Needs some work' },
  { value: 'major-work', label: 'Needs major work' },
  { value: 'not-sure', label: 'Not sure' },
] as const;

export type TimelineValue = (typeof TIMELINE_OPTIONS)[number]['value'];
export type ConditionValue = (typeof CONDITION_OPTIONS)[number]['value'];

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  timeline: TimelineValue;
  condition: ConditionValue;
  message?: string;
}

/**
 * Honeypot field name, shared so the form and the route cannot drift apart.
 *
 * The input is rendered off-screen, taken out of the tab order and hidden from
 * the accessibility tree, so no person ever meets it. A submission that has it
 * filled in is answered with a normal success response and quietly dropped —
 * telling a bot it was caught only teaches it to try again.
 *
 * Deliberately plausible-looking: bots fill in what looks like a real field.
 */
export const HONEYPOT_FIELD = 'company';

/** Turns a stored value back into its human label for emails and CRM notes. */
export function labelFor(
  options: ReadonlyArray<{ value: string; label: string }>,
  value: string | undefined
): string {
  return options.find((option) => option.value === value)?.label ?? 'Not specified';
}

export function isValidTimeline(value: unknown): value is TimelineValue {
  return TIMELINE_OPTIONS.some((option) => option.value === value);
}

export function isValidCondition(value: unknown): value is ConditionValue {
  return CONDITION_OPTIONS.some((option) => option.value === value);
}
