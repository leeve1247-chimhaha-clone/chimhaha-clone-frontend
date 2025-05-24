export function SECONDS(seconds: number){
  return 1000 * seconds;
}

export function MINUTES(minutes: number){
  return SECONDS(60) * minutes;
}

export function Time(hours: number) {
  return MINUTES(60) * hours;
}
