/**
 * Moon phase calculations based on astronomical algorithms
 * 
 * These functions calculate moon phases and the dates of full moons
 * using established astronomical formulas.
 */

// Calculate the Julian Date for a given date
export function toJulianDate(date: Date): number {
  const time = date.getTime();
  return (time / 86400000) + 2440587.5;
}

// Calculate the moon's phase as a number between 0 and 1
export function getMoonPhase(date: Date): number {
  const julianDate = toJulianDate(date);
  // Mean longitude of the sun
  const sun = (julianDate - 2451545.0) / 36525;
  // Mean longitude of the moon
  const moon = (julianDate - 2451545.0) / 27.32158;
  
  // Normalize to a value between 0 and 1
  let phase = (moon - Math.floor(moon));
  
  // Ensure phase is positive
  if (phase < 0) {
    phase += 1;
  }
  
  return phase;
}

// Get the name of the current moon phase
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

// Calculate the date of the next full moon
export function getNextFullMoon(date: Date = new Date()): Date {
  // First calculate the current moon phase
  const currentPhase = getMoonPhase(date);
  
  // The full moon is at phase 0.5
  // Calculate how many days until we reach the next full moon
  let daysUntilFullMoon;
  
  if (currentPhase < 0.5) {
    // Full moon is coming up in the current cycle
    daysUntilFullMoon = (0.5 - currentPhase) * 29.53;
  } else {
    // Full moon will be in the next cycle
    daysUntilFullMoon = (1.5 - currentPhase) * 29.53;
  }
  
  // Create a new date for the next full moon
  const nextFullMoon = new Date(date);
  nextFullMoon.setDate(date.getDate() + Math.floor(daysUntilFullMoon));
  
  // Fine-tune the estimation by checking nearby dates
  for (let i = -1; i <= 1; i++) {
    const testDate = new Date(nextFullMoon);
    testDate.setDate(nextFullMoon.getDate() + i);
    const phase = getMoonPhase(testDate);
    
    if (Math.abs(phase - 0.5) < 0.02) {
      // Found a more accurate full moon date
      return testDate;
    }
  }
  
  return nextFullMoon;
}

// Format the date for display
export function formatDate(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const dayName = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Format hours to 12-hour clock with AM/PM
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  // Format minutes with leading zero if needed
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${dayName}, ${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
}

// Calculate time remaining until a future date
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