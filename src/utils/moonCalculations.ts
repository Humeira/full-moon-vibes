// Convert a Date to Julian Day
export function toJulianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

// Convert Julian Day to a Date
export function fromJulianDate(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000);
}

// Calculate the moon phase using a more accurate method
export function getMoonPhase(date: Date): number {
  const jd = toJulianDate(date);
  const daysSinceNew = jd - 2451549.5;
  const newMoons = daysSinceNew / 29.53058867; // mean synodic month
  return newMoons - Math.floor(newMoons);
}

// Get the phase name
export function getMoonPhaseName(phase: number): string {
  if (phase < 0.03 || phase >= 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
}

// Calculate the next full moon more precisely
export function getNextFullMoon(startDate: Date = new Date()): Date {
  let jd = toJulianDate(startDate);

  // Find the phase
  let phase = getMoonPhase(startDate);

  // Number of days to add
  let daysToAdd = (0.5 - phase) * 29.53058867;
  if (daysToAdd < 0) {
    daysToAdd += 29.53058867;
  }

  // Estimate next full moon
  jd += daysToAdd;

  // Fine-tune by checking a few days around
  for (let i = -1; i <= 1; i++) {
    const testDate = fromJulianDate(jd + i);
    const testPhase = getMoonPhase(testDate);
    if (Math.abs(testPhase - 0.5) < 0.02) {
      return testDate;
    }
  }

  return fromJulianDate(jd);
}

// Format date
export function formatDate(date: Date): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayName = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${dayName}, ${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
}

// Calculate time remaining
export function getTimeRemaining(futureDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const total = futureDate.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}
