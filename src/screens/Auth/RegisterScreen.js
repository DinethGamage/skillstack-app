import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { registerValidationSchema } from '../../utils/validation';
import { login } from '../../redux/slices/authSlice';
import { getTheme } from '../../utils/theme';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * RegisterScreen Component
 * Handles user registration with form validation
 */
const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);
  const [loading, setLoading] = useState(false);

  /**
   * Handle register form submission
   */
  const handleRegister = async (values) => {
    setLoading(true);

    // Simulate API call (replace with actual authentication)
    setTimeout(async () => {
      try {
        const userData = {
          user: {
            id: Date.now(),
            name: values.name,
            email: values.email,
          },
          token: 'dummy-token-' + Date.now(),
        };

        // Dispatch login action (auto-login after registration)
        dispatch(login(userData));

        // Persist auth state
        await AsyncStorage.setItem('auth', JSON.stringify({
          isAuthenticated: true,
          user: userData.user,
          token: userData.token,
        }));

        setLoading(false);
        
        // Show success message
        Alert.alert('Success', 'Account created successfully!');
      } catch (error) {
        console.error('Register error:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Sign up to start your learning journey
            </Text>
          </View>

          {/* Register Form */}
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <CustomInput
                  label="Full Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Enter your full name"
                  error={touched.name && errors.name}
                />

                <CustomInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.email && errors.email}
                />

                <CustomInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Enter your password"
                  secureTextEntry
                  error={touched.password && errors.password}
                />

                <CustomInput
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Confirm your password"
                  secureTextEntry
                  error={touched.confirmPassword && errors.confirmPassword}
                />

                <CustomButton
                  title="Register"
                  onPress={handleSubmit}
                  loading={loading}
                />
              </View>
            )}
          </Formik>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.link, { color: theme.primary }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
