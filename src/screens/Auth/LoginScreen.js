import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { loginValidationSchema } from '../../utils/validation';
import { login } from '../../redux/slices/authSlice';
import { getTheme } from '../../utils/theme';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * LoginScreen Component
 * Handles user login with form validation
 */
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);
  const [loading, setLoading] = useState(false);

  /**
   * Handle login form submission
   */
  const handleLogin = async (values) => {
    setLoading(true);
    
    // Simulate API call (replace with actual authentication)
    setTimeout(async () => {
      try {
        const userData = {
          user: {
            id: 1,
            name: values.email.split('@')[0],
            email: values.email,
          },
          token: 'dummy-token-' + Date.now(),
        };

        // Dispatch login action
        dispatch(login(userData));

        // Persist auth state
        await AsyncStorage.setItem('auth', JSON.stringify({
          isAuthenticated: true,
          user: userData.user,
          token: userData.token,
        }));

        setLoading(false);
      } catch (error) {
        console.error('Login error:', error);
        setLoading(false);
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
            <Text style={[styles.title, { color: theme.text }]}>Welcome Back!</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Sign in to continue learning
            </Text>
          </View>

          {/* Login Form */}
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
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

                <CustomButton
                  title="Login"
                  onPress={handleSubmit}
                  loading={loading}
                />
              </View>
            )}
          </Formik>

          {/* Register Link */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.link, { color: theme.primary }]}>Register</Text>
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

export default LoginScreen;
