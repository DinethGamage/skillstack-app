# SkillStack – Smart Course Discovery App

A complete cross-platform React Native mobile application built with Expo for discovering and managing online courses.

## Features

✅ **Authentication Flow**
- Login & Register screens with form validation
- AsyncStorage for persistent authentication
- Protected routes based on auth state

✅ **Course Discovery**
- Fetch courses from DummyJSON API
- Beautiful card-based UI with course images
- Search functionality
- Pull-to-refresh

✅ **Favourites System**
- Add/remove courses to favourites
- Persistent storage using AsyncStorage
- Dedicated favourites screen

✅ **Theme Support**
- Light and Dark mode toggle
- Theme persistence across app restarts
- Smooth theme transitions

✅ **Navigation**
- Stack Navigator for auth flow
- Bottom Tab Navigator for main screens
- Course details screen with full information

✅ **State Management**
- Redux Toolkit for global state
- Modular slice-based architecture
- AsyncStorage integration for persistence

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Redux Toolkit** - State management
- **Formik + Yup** - Form handling and validation
- **Axios** - HTTP client
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Icon library

## Project Structure

```
/src
  /components          # Reusable UI components
    CourseCard.js      # Course card component
    CustomButton.js    # Custom button component
    CustomInput.js     # Custom input component
    EmptyState.js      # Empty state component
    LoadingSpinner.js  # Loading spinner component
    
  /screens            # Screen components
    /Auth
      LoginScreen.js
      RegisterScreen.js
    /Home
      HomeScreen.js
    /Favourites
      FavouritesScreen.js
    /Profile
      ProfileScreen.js
    /Details
      CourseDetailsScreen.js
      
  /navigation         # Navigation configuration
    RootNavigator.js
    AuthNavigator.js
    AppNavigator.js
    TabNavigator.js
    
  /redux             # Redux state management
    store.js
    /slices
      authSlice.js
      coursesSlice.js
      favouritesSlice.js
      themeSlice.js
      
  /services          # API services
    api.js
    
  /utils             # Utility functions
    theme.js
    validation.js
    helpers.js
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)

### Step 1: Install Dependencies

```bash
cd "d:\UNIVERSITY\IT\Acadamic\lv3 sem 1\Mobile app develpment\SkillStack – Smart Course Discovery App"
npm install
```

### Step 2: Start the Development Server

```bash
npm start
```

or

```bash
npx expo start
```

### Step 3: Run on Device/Emulator

**Option 1: Physical Device**
1. Install "Expo Go" app from App Store (iOS) or Google Play (Android)
2. Scan the QR code shown in terminal or browser
3. App will load on your device

**Option 2: iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option 3: Android Emulator**
```bash
npm run android
```

**Option 4: Web Browser**
```bash
npm run web
```

## How to Use the App

### 1. Authentication
- Open the app and you'll see the Login screen
- Enter any email and password (min 6 characters)
- Or tap "Register" to create a new account
- Authentication state persists across app restarts

### 2. Browse Courses
- After login, you'll see the Home screen with courses
- Courses are fetched from DummyJSON API
- Use the search bar to find specific courses
- Pull down to refresh the course list

### 3. Course Details
- Tap any course card to view detailed information
- See full description, rating, price, and availability
- Tap the heart icon to add/remove from favourites

### 4. Manage Favourites
- Go to Favourites tab to see your saved courses
- Favourites persist even after closing the app
- Tap heart icon to remove from favourites

### 5. Profile & Settings
- Go to Profile tab to view your account
- Toggle Dark Mode on/off
- See statistics (favourite count)
- Logout when needed

## API Integration

The app uses [DummyJSON](https://dummyjson.com) for demo data:
- **Endpoint**: `https://dummyjson.com/products`
- Products are mapped to "courses" format
- Real images and data for realistic experience

## State Management

### Redux Slices

1. **authSlice** - User authentication state
2. **coursesSlice** - Course data and loading states
3. **favouritesSlice** - User's favourite courses
4. **themeSlice** - Theme mode (light/dark)

### Persistence

Data persisted using AsyncStorage:
- Authentication state
- Favourite courses
- Theme preference

## Styling & Theming

- Clean, minimalistic design
- Responsive layouts
- Dynamic theme colors
- Smooth animations
- iOS & Android platform-specific styling

## Form Validation

Using Formik + Yup for robust validation:
- Email format validation
- Password length requirements
- Password confirmation matching
- Real-time error messages

## Components

### Reusable Components
- **CourseCard** - Displays course information
- **CustomButton** - Styled button with loading states
- **CustomInput** - Text input with error handling
- **LoadingSpinner** - Loading indicator
- **EmptyState** - Empty state placeholder

## Troubleshooting

### Issue: Metro bundler errors
**Solution**: Clear cache and restart
```bash
npx expo start -c
```

### Issue: Dependencies not found
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

### Issue: iOS simulator not launching
**Solution**: Ensure Xcode is installed (Mac only)

### Issue: Android emulator not launching
**Solution**: Ensure Android Studio and emulator are properly configured

## Future Enhancements

- [ ] Real authentication API integration
- [ ] Course enrollment functionality
- [ ] Payment integration
- [ ] Push notifications
- [ ] Course progress tracking
- [ ] User reviews and ratings
- [ ] Social sharing
- [ ] Offline mode

## Development Notes

- **Code Style**: Modern React with functional components and hooks
- **Architecture**: Feature-based modular structure
- **Comments**: Comprehensive JSDoc-style comments
- **Error Handling**: Try-catch blocks and error states
- **Performance**: Optimized with memoization where needed

## License

This project is created for educational purposes.

## Author

Created as part of Mobile App Development coursework - Level 3, Semester 1

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Expo documentation: https://docs.expo.dev
3. Check React Navigation docs: https://reactnavigation.org

---

**Happy Coding! 🚀**
