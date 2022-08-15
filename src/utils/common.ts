export const capitalizeText = (str: string): string => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) {
    return '#1da1f2';
  } else if (mark >= 5) {
    return 'green';
  } else {
    return 'red';
  }
};
