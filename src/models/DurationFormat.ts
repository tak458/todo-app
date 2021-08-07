export function toDurationFormat(value: string): number {
  let days = 0,
    hours = 0,
    minutes = 0;

  value.split(" ").forEach((timeStr) => {
    if (timeStr.endsWith("d")) {
      days += Number(timeStr.substring(0, timeStr.length - 1));
    }
    if (timeStr.endsWith("h")) {
      hours += Number(timeStr.substring(0, timeStr.length - 1));
    }
    if (timeStr.endsWith("m")) {
      minutes += Number(timeStr.substring(0, timeStr.length - 1));
    }
  });

  return 60 * 60 * 24 * days + 60 * 60 * hours + 60 * minutes;
}

export function fromDurationFormat(value: number): string {
  const days = Math.floor(value / (60 * 60 * 24));
  const hours = Math.floor((value % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((value % (60 * 60)) / 60);

  return [days !== 0 && `${days}d`, hours !== 0 && `${hours}h`, minutes !== 0 && `${minutes}m`]
    .filter(Boolean)
    .join(" ");
}
