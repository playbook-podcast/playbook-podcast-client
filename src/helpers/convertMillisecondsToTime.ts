export const convertMillisecondsToTime = (milliseconds: number) => {
  const rounded = Math.round(milliseconds / 1000);
  const minutes = Math.floor(rounded / 60);
  const remainingSeconds = rounded % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
