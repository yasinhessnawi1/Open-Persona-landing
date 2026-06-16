/*
 * Launch-time copy switches.
 *
 * VOICE_LIVE — the one decision to make at go-live for the voice claim.
 *
 *   false (default): the in-product, real-time voice EXPERIENCE (persona-voice
 *     V6, the browser voice client) is still in flight, so the page frames live
 *     voice as "coming soon" rather than implying a spoken experience a visitor
 *     can't use yet. This is the safe, honest default.
 *
 *   true: set this ONLY if the landing goes live alongside a working in-product
 *     voice experience. Then the page states voice in the present tense.
 *
 * Flipping this single value updates the three voice touchpoints together — the
 * Voice section (kicker + closing line), the persona-api layer description, and
 * the <meta> description. The V5-shipped voice→text memory story (the Astrid
 * recall example) is shown either way: that part is accurate today.
 */
export const VOICE_LIVE = true;
