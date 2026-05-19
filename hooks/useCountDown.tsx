import { useEffect, useState } from "react";

function parseRemainingTimeToMs(input: string) {
  if (!input) return 0;

  let days = 0;
  let time = input;

  const dayMatch = input.match(/(\d+)\s*day/);
  if (dayMatch) {
    days = Number(dayMatch[1]);
    time = input.replace(dayMatch[0], "").trim();
  }

  time = time.split(".")[0];

  const [h = 0, m = 0, s = 0] = time.split(":").map(Number);

  return (days * 86400 + h * 3600 + m * 60 + s) * 1000;
}

function formatRemaining(ms: number) {
  if (ms <= 0) return "expired";

  const total = Math.floor(ms / 1000);

  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  const out = [];

  if (d) out.push(`${d}d`);
  if (h) out.push(`${h}h`);
  if (m) out.push(`${m}m`);

  out.push(`${s}s`);

  return out.join(" ");
}

export function useCountdown(remaining_time: string) {
  const [ms, setMs] = useState(() => parseRemainingTimeToMs(remaining_time));

  useEffect(() => {
    const interval = setInterval(() => {
      setMs((v) => (v <= 1000 ? 0 : v - 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return formatRemaining(ms);
}
