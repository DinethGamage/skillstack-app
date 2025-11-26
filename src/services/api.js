import coursesData from '../data/courses.json';

/**
 * API Service for Course Data
 * Loads courses from local JSON file
 */

/**
 * Simulate API delay for realistic loading experience
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all courses from local JSON
 * @returns {Promise} Array of course objects
 */
export const fetchCourses = async () => {
  try {
    // Simulate network delay
    await delay(800);
    return coursesData;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

/**
 * Fetch single course by ID
 * @param {number} id - Course ID
 * @returns {Promise} Course object
 */
export const fetchCourseById = async (id) => {
  try {
    // Simulate network delay
    await delay(500);
    const course = coursesData.find(c => c.id === id);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

/**
 * Search courses by query
 * @param {string} query - Search query
 * @returns {Promise} Array of course objects
 */
export const searchCourses = async (query) => {
  try {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return coursesData.filter(course =>
      course.title.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery) ||
      course.category.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Error searching courses:', error);
    throw error;
  }
};
