import { toDurationFormat, fromDurationFormat } from "./DurationFormat";

test("parse string", () => {
  expect(toDurationFormat("2m")).toBe(60 * 2);
  expect(toDurationFormat("3h")).toBe(60 * 60 * 3);
  expect(toDurationFormat("4d")).toBe(60 * 60 * 24 * 4);
  expect(toDurationFormat("1h 1m")).toBe(60 * 60 + 60);
  expect(toDurationFormat("1d 1h 1m")).toBe(60 * 60 * 24 + 60 * 60 + 60);
  expect(toDurationFormat("134m")).toBe(60 * 60 * 2 + 60 * 14);
  expect(toDurationFormat("30h")).toBe(60 * 60 * 24 * 1 + 60 * 60 * 6);
});

test("format string", () => {
  expect(fromDurationFormat(60 * 2)).toBe("2m");
  expect(fromDurationFormat(60 * 60 * 3)).toBe("3h");
  expect(fromDurationFormat(60 * 60 * 24 * 4)).toBe("4d");
  expect(fromDurationFormat(60 * 60 + 60)).toBe("1h 1m");
  expect(fromDurationFormat(60 * 60 * 24 + 60 * 60 + 60)).toBe("1d 1h 1m");
  expect(fromDurationFormat(60 * 60 * 2 + 60 * 14)).toBe("2h 14m");
  expect(fromDurationFormat(60 * 60 * 24 * 1 + 60 * 60 * 6)).toBe("1d 6h");
});
