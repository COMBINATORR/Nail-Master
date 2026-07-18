/** Mock busy slots by date id (YYYY-MM-DD). Deterministic for demo. */
export const ALL_TIMES = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'];

/** Simple hash so the same day always has the same busy slots */
function daySeed(dateId) {
  let h = 0;
  for (let i = 0; i < dateId.length; i++) h = (h * 31 + dateId.charCodeAt(i)) >>> 0;
  return h;
}

/** Returns Set of busy time strings for a date */
export function getBusySlots(dateId) {
  if (!dateId) return new Set();
  const seed = daySeed(dateId);
  const busy = new Set();
  // 2–3 busy slots per day for demo
  const count = 2 + (seed % 2);
  for (let i = 0; i < count; i++) {
    const idx = (seed + i * 3) % ALL_TIMES.length;
    busy.add(ALL_TIMES[idx]);
  }
  return busy;
}

export function isSlotBusy(dateId, time) {
  return getBusySlots(dateId).has(time);
}
