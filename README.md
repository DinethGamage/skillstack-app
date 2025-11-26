# SkillStack – Smart Course Discovery App

A complete cross-platform React Native mobile application built with Expo for discovering and managing online courses. Features 15 curated tech courses across 10+ categories including Mobile Development, Web Development, Data Science, Cloud, AI/ML, and more.

## ✨ Features

### 🔐 **Authentication Flow**
- Register screen as default entry point
- Login & Register screens with comprehensive form validation
- AsyncStorage for persistent authentication
- Protected routes based on auth state
- Simulated token-based authentication

### 📚 **Course Discovery**
- 15 realistic tech courses with professional data
- Beautiful card-based UI with Unsplash course images
- Real-time search functionality
- Pull-to-refresh for data updates
- Course categorization (Mobile Dev, Web Dev, Data Science, etc.)
- Level indicators (Beginner, Intermediate, Advanced)
- Status badges (New, Popular, Trending)

### ❤️ **Favourites System**
- Add/remove courses to favourites with heart icon
- Persistent storage using AsyncStorage
- Dedicated favourites screen with empty state
- Favourite count displayed on profile

### 🌓 **Theme Support**
- Light and Dark mode toggle
- Theme persistence across app restarts
- Smooth theme transitions with consistent colors
- Platform-specific theme handling

### 🧭 **Navigation**
- Stack Navigator for authentication flow
- Bottom Tab Navigator for main screens (Home, Favourites, Profile)
- Nested navigation for course details
- Smooth transitions between screens

### 🔄 **State Management**
- Redux Toolkit for global state
- 4 modular slices: auth, courses, favourites, theme
- Redux Persist integration with AsyncStorage
- Clean action/reducer architecture

## 🛠 Tech Stack

- **React Native 0.72.10** - Cross-platform mobile framework
- **Expo ~49.0.0** - Development platform & tooling
- **React Navigation** - Stack & Bottom Tab navigation
- **Redux Toolkit** - State management solution
- **Formik + Yup** - Form handling and validation
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Feather icon set
- **React Native Web** - Web platform support

## 📁 Project Structure

```
SkillStack/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CourseCard.js      # Course card with rating, lessons, students
│   │   ├── CustomButton.js    # Themed button component
│   │   ├── CustomInput.js     # Form input with validation display
│   │   ├── EmptyState.js      # Empty state with illustrations
│   │   ├── LoadingSpinner.js  # Activity indicator
│   │   └── index.js           # Component exports
│   │
│   ├── screens/             # Screen components
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js     # Login with Formik validation
│   │   │   └── RegisterScreen.js  # Register (default entry)
│   │   ├── Home/
│   │   │   └── HomeScreen.js      # Course list with search
│   │   ├── Favourites/
│   │   │   └── FavouritesScreen.js # Saved courses
│   │   ├── Profile/
│   │   │   └── ProfileScreen.js    # User profile & theme toggle
│   │   └── Details/
│   │       └── CourseDetailsScreen.js # Full course details
│   │
│   ├── navigation/          # Navigation configuration
│   │   ├── RootNavigator.js   # Main navigation root
│   │   ├── AuthNavigator.js   # Auth stack (Register first)
│   │   ├── AppNavigator.js    # App stack
│   │   └── TabNavigator.js    # Bottom tabs (Home/Favourites/Profile)
│   │
│   ├── redux/               # Redux state management
│   │   ├── store.js           # Redux store with persist config
│   │   └── slices/
│   │       ├── authSlice.js       # Authentication state
│   │       ├── coursesSlice.js    # Course data & loading
│   │       ├── favouritesSlice.js # Favourite courses
│   │       └── themeSlice.js      # Theme mode (light/dark)
│   │
│   ├── services/            # API & data services
│   │   └── api.js             # Course fetching with simulated delays
│   │
│   ├── data/                # Local data
│   │   └── courses.json       # 15 curated tech courses
│   │
│   └── utils/               # Utility functions
│       ├── theme.js           # Theme colors & configuration
│       ├── validation.js      # Yup validation schemas
│       └── helpers.js         # Helper functions (formatStudents, etc.)
│
├── assets/                  # Images & icons
├── App.js                   # Root component with Redux Provider
├── app.json                 # Expo configuration
├── package.json             # Dependencies & scripts
└── babel.config.js          # Babel configuration
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Expo Go** app - For testing on physical device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Step 1: Clone the Repository

```bash
git clone https://github.com/DinethGamage/skillstack-app.git
cd skillstack-app
```

Or download ZIP and extract to your desired location.

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React Navigation
- Redux Toolkit
- Formik & Yup
- AsyncStorage
- Vector Icons
- And more...

### Step 3: Start the Development Server

```bash
npm start
```

Or use Expo CLI directly:

```bash
npx expo start
```

### Step 4: Run on Device/Emulator

**Option 1: Physical Device (Recommended)**
1. Install **Expo Go** app from App Store (iOS) or Google Play (Android)
2. Scan the QR code shown in terminal or Metro bundler
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
Then open `http://localhost:19006`

## 📱 How to Use the App

### 1. Getting Started
- **First Launch**: Register screen appears (default entry point)
- Enter your name, email, and password (min 6 characters)
- Or switch to Login if you already have an account
- Authentication is simulated - any valid email/password works

### 2. Browse Courses
- **Home Screen**: Displays 15 tech courses across multiple categories
- Scroll through courses or use search bar to find specific topics
- Each card shows:
  - Course title and category
  - Duration and number of lessons
  - Rating (out of 5 stars)
  - Student count (e.g., "15.4k students")
  - Level badge (Beginner/Intermediate/Advanced)
- **Pull down** to refresh course list

### 3. View Course Details
- Tap any course card to see full details
- View comprehensive description
- See statistics: Rating, Students enrolled, Total lessons
- Check "What You'll Learn" section
- Add to favourites using the heart icon

### 4. Manage Favourites
- Tap **heart icon** on any course to add/remove from favourites
- Go to **Favourites tab** to see all saved courses
- Favourites persist even after closing the app
- Empty state displayed when no favourites

### 5. Profile & Settings
- **Profile tab** shows:
  - User information
  - Favourite courses count
  - Theme toggle button
- **Toggle Dark Mode**: Switch between light and dark themes
- Theme preference is saved automatically
- **Logout**: Returns to register screen

## 📊 Course Data

### Custom Course Dataset
The app includes **15 curated courses** covering:

**Categories:**
- 📱 Mobile Development (React Native, Flutter)
- 💻 Web Development (Full Stack, Frontend)
- 📊 Data Science & Machine Learning
- ☁️ Cloud Computing (AWS, Azure, DevOps)
- 🎨 UI/UX Design
- 🔒 Cybersecurity
- ⛓️ Blockchain Development
- 🎮 Game Development (Unity)
- 🤖 AI/ML & Deep Learning
- 📈 Digital Marketing

**Each course includes:**
- Title and category
- Duration (4-16 weeks)
- Difficulty level (Beginner/Intermediate/Advanced)
- Status badge (New/Popular/Trending)
- Professional Unsplash images
- Student count (1k - 45k)
- Number of lessons (20-85)
- Rating (4.5 - 4.9 stars)
- Detailed description

## 🔧 State Management

### Redux Architecture

The app uses **Redux Toolkit** with 4 modular slices:

#### 1. **authSlice.js**
- User authentication state
- Login/Register actions
- Token management
- Logout functionality

#### 2. **coursesSlice.js**
- Course data storage
- Loading states
- Fetch courses action
- Search functionality

#### 3. **favouritesSlice.js**
- User's favourite courses
- Add/Remove actions
- Persistent storage

#### 4. **themeSlice.js**
- Theme mode (light/dark)
- Toggle theme action
- Theme persistence

### Data Persistence

**AsyncStorage** integration for:
- ✅ Authentication tokens
- ✅ Favourite courses list
- ✅ Theme preference
- ✅ Redux state (via redux-persist)

All data persists across app restarts and device reboots.

## 🎨 Styling & Theming

### Design System
- **Clean, minimalistic** card-based design
- **Responsive layouts** adapting to screen sizes
- **Platform-specific** styles for iOS and Android
- **SafeAreaView** for notch/status bar support

### Theme Colors
**Light Mode:**
- Primary: `#007AFF` (Blue)
- Background: `#FFFFFF`
- Card: `#F8F9FA`
- Text: `#1C1C1E`

**Dark Mode:**
- Primary: `#0A84FF` (Lighter Blue)
- Background: `#000000`
- Card: `#1C1C1E`
- Text: `#FFFFFF`

### Visual Elements
- **Feather Icons** throughout the app
- **Color-coded level badges** (Green/Blue/Orange)
- **Status badges** (New/Popular/Trending)
- **Smooth animations** for transitions
- **Loading states** with spinners
- **Empty states** with illustrations

## ✅ Form Validation

Using **Formik + Yup** for comprehensive validation:

### Login Screen
- ✅ Email format validation
- ✅ Password minimum 6 characters
- ✅ Required field validation
- ✅ Real-time error messages

### Register Screen
- ✅ Name minimum 2 characters
- ✅ Email format validation
- ✅ Password minimum 6 characters
- ✅ Password confirmation matching
- ✅ Real-time validation feedback

### Validation Rules
```javascript
// Example validation schema
loginValidationSchema = {
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
}
```

## 🧩 Reusable Components

### CourseCard Component
- Displays course thumbnail, title, category
- Shows duration, lessons, rating, students
- Level badge with color coding
- Tap to navigate to details

### CustomButton Component
- Themed styling (light/dark)
- Loading state support
- Disabled state
- Customizable title and onPress

### CustomInput Component
- Form field with label
- Error message display
- Secure text entry for passwords
- Themed border and text colors

### EmptyState Component
- Icon with message
- Used in favourites and search results
- Themed styling

### LoadingSpinner Component
- Activity indicator
- Centered on screen
- Themed color

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Metro Bundler Errors
**Problem:** Cache issues or stale dependencies

**Solution:**
```bash
# Clear Expo cache
npx expo start -c

# Or clear npm cache
npm cache clean --force
npm install
```

#### Dependencies Not Found
**Problem:** Missing or corrupted node_modules

**Solution:**
```bash
# Remove and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### iOS Simulator Not Launching
**Problem:** Xcode not properly configured

**Solution:**
- Ensure Xcode is installed (Mac only)
- Open Xcode and install additional components
- Run: `xcode-select --install`

#### Android Emulator Not Launching
**Problem:** Android Studio not configured

**Solution:**
- Install Android Studio
- Set up an Android Virtual Device (AVD)
- Ensure ANDROID_HOME environment variable is set

#### Web Version Not Working
**Problem:** Web dependencies missing

**Solution:**
```bash
npm install react-native-web react-dom @expo/webpack-config
npx expo start --web
```

#### App Crashes on Start
**Problem:** AsyncStorage or Redux Persist issues

**Solution:**
```bash
# Clear AsyncStorage
# Add this temporarily in App.js before anything else:
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage.clear();
```

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] **Real Backend Integration**
  - Connect to actual authentication API
  - Live course data from database
  - User profile management

- [ ] **Course Enrollment**
  - Enroll in courses
  - Track learning progress
  - Course completion certificates

- [ ] **Payment Integration**
  - Stripe/PayPal integration
  - In-app purchases
  - Course pricing

- [ ] **Social Features**
  - User reviews and ratings
  - Course discussions
  - Share courses on social media

- [ ] **Advanced Features**
  - Push notifications for new courses
  - Offline mode with local caching
  - Video player for course content
  - Download courses for offline viewing

- [ ] **Analytics**
  - Learning time tracking
  - Course completion rate
  - User engagement metrics

## 💡 Development Notes

### Code Quality Standards
- **Modern React**: Functional components with hooks
- **ES6+ Syntax**: Arrow functions, async/await, destructuring
- **Clean Code**: Descriptive variable names, DRY principles
- **Comments**: JSDoc-style documentation where needed
- **Error Handling**: Try-catch blocks and error states
- **Performance**: React.memo and useCallback for optimization

### Architecture Decisions
- **Feature-based structure** over type-based
- **Redux Toolkit** for reduced boilerplate
- **Formik** for form state management
- **Local JSON** for demo data (easily swappable with API)
- **AsyncStorage** over Redux Persist alone for explicit control

### Platform Compatibility
- ✅ **iOS** (iPhone & iPad)
- ✅ **Android** (phones & tablets)
- ✅ **Web** (responsive design)
- 🚧 **Desktop** (via Electron - not implemented)

## 📄 License

This project is created for **educational purposes** as part of Mobile App Development coursework.

Feel free to use this code for learning and personal projects.

## 👨‍💻 Author

**Dineth Gamage**
- GitHub: [@DinethGamage](https://github.com/DinethGamage)
- Project: Mobile App Development - Level 3, Semester 1
- Institution: University Course Assignment

## 🙏 Acknowledgments

- **Expo Team** - Amazing development platform
- **React Navigation** - Seamless navigation solution
- **Redux Toolkit** - Simplified state management
- **Unsplash** - High-quality course images
- **Formik & Yup** - Excellent form handling

## 📚 Resources & Documentation

### Official Documentation
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Formik](https://formik.org/docs/overview)
- [Yup](https://github.com/jquense/yup)

### Helpful Guides
- [React Native Best Practices](https://github.com/bamlab/react-native-best-practices)
- [Expo App Configuration](https://docs.expo.dev/versions/latest/config/app/)
- [AsyncStorage Usage](https://react-native-async-storage.github.io/async-storage/)

## 🚀 Deployment

### Build for Production

**Android APK:**
```bash
expo build:android
```

**iOS IPA:**
```bash
expo build:ios
```

**Web:**
```bash
npm run web
npx expo export:web
```

### Publish to Expo
```bash
expo publish
```

This generates a shareable link to test your app.

## 📞 Support & Contact

For questions, issues, or suggestions:

1. **Check Troubleshooting** section above
2. **Review Documentation** links
3. **GitHub Issues** - Open an issue in the repository
4. **Expo Community** - [forums.expo.dev](https://forums.expo.dev/)

---

**Made with ❤️ using React Native & Expo**

**⭐ Star this repo if you found it helpful!**
