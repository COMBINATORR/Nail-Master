import { describe, it, expect } from 'vitest';
import { getBusySlots, isSlotBusy, ALL_TIMES } from './slots';

describe('slots', () => {
  describe('getBusySlots', () => {
    it('returns an empty set if dateId is falsy', () => {
      expect(getBusySlots(null).size).toBe(0);
      expect(getBusySlots(undefined).size).toBe(0);
      expect(getBusySlots('').size).toBe(0);
    });

    it('returns deterministic results for the same dateId', () => {
      const dateId = '2024-01-01';
      const slots1 = getBusySlots(dateId);
      const slots2 = getBusySlots(dateId);
      expect(slots1).toEqual(slots2);
    });

    it('returns 2 or 3 slots for any given dateId', () => {
      const slots1 = getBusySlots('2024-01-01');
      expect(slots1.size).toBeGreaterThanOrEqual(2);
      expect(slots1.size).toBeLessThanOrEqual(3);

      const slots2 = getBusySlots('2024-12-31');
      expect(slots2.size).toBeGreaterThanOrEqual(2);
      expect(slots2.size).toBeLessThanOrEqual(3);
    });

    it('only returns slots that exist in ALL_TIMES', () => {
      const slots = getBusySlots('2024-05-15');
      for (const slot of slots) {
        expect(ALL_TIMES).toContain(slot);
      }
    });
  });

  describe('isSlotBusy', () => {
    it('returns true if the slot is in getBusySlots', () => {
      const dateId = '2024-06-20';
      const busySlots = getBusySlots(dateId);
      const busySlot = Array.from(busySlots)[0];

      expect(isSlotBusy(dateId, busySlot)).toBe(true);
    });

    it('returns false if the slot is not in getBusySlots', () => {
      const dateId = '2024-06-20';
      const busySlots = getBusySlots(dateId);
      const freeSlot = ALL_TIMES.find(time => !busySlots.has(time));

      expect(isSlotBusy(dateId, freeSlot)).toBe(false);
    });

    it('returns false for unknown times', () => {
      const dateId = '2024-06-20';
      expect(isSlotBusy(dateId, '23:59')).toBe(false);
    });
  });
});
