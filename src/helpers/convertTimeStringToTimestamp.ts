export const convertTimeStringToTimestamp = (timeString: string) => {
  // Split the time string into its components
  const parts = timeString.split(':');
  const minutes = parseInt(parts[0], 10);
  const secondsAndMilliseconds = parts[1].split('.');
  const seconds = parseInt(secondsAndMilliseconds[0], 10);
  const milliseconds = parseInt(secondsAndMilliseconds[1], 10);

  // Calculate the total time in milliseconds
  return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
};
