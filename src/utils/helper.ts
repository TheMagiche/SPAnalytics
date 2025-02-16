/**
 * Format a date string to a readable format
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export const fDate = (date: string | Date): string => {
  try {
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Format a number to currency format
 * @param number - Number to format
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string
 */
export const fCurrency = (number: number, currency: string = 'USD'): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return 'Invalid Amount';
  }
};

/**
 * Format a number with commas
 * @param number - Number to format
 * @returns Formatted number string
 */
export const fNumber = (number: number): string => {
  try {
    return new Intl.NumberFormat('en-US').format(number);
  } catch (error) {
    console.error('Error formatting number:', error);
    return 'Invalid Number';
  }
};

/**
 * Format a number to percentage
 * @param number - Number to format
 * @returns Formatted percentage string
 */
export const fPercent = (number: number): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(number / 100);
  } catch (error) {
    console.error('Error formatting percentage:', error);
    return 'Invalid Percentage';
  }
};
