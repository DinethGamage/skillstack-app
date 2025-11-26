/**
 * Helper utility functions
 */

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format students count
 * @param {number} count - Students count
 * @returns {string} Formatted count
 */
export const formatStudents = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k students`;
  }
  return `${count} students`;
};

/**
 * Get rating color based on value
 * @param {number} rating - Rating value
 * @returns {string} Color hex code
 */
export const getRatingColor = (rating) => {
  if (rating >= 4.5) return '#34C759';
  if (rating >= 3.5) return '#FF9500';
  return '#FF3B30';
};

/**
 * Get status color
 * @param {string} status - Status text
 * @returns {string} Color hex code
 */
export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'popular':
      return '#34C759';
    case 'trending':
      return '#FF9500';
    case 'new':
      return '#007AFF';
    default:
      return '#666666';
  }
};

/**
 * Get level color
 * @param {string} level - Level text
 * @returns {string} Color hex code
 */
export const getLevelColor = (level) => {
  switch (level.toLowerCase()) {
    case 'beginner':
      return '#34C759';
    case 'intermediate':
      return '#FF9500';
    case 'advanced':
      return '#FF3B30';
    default:
      return '#666666';
  }
};
