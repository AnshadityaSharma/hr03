import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use the auth context login function
      const result = await login(formData.email, formData.password);
      
      if (!result.success) {
        setErrors({
          general: result.error || 'Invalid email or password. Please check your credentials and try again.'
        });
        setIsLoading(false);
        return;
      }

      // Show success message
      const event = new CustomEvent('showToast', {
        detail: {
          type: 'success',
          message: `Welcome back! Logged in successfully.`
        }
      });
      window.dispatchEvent(event);

      // Navigate to intended page or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });

    } catch (error) {
      setErrors({
        general: 'Login failed. Please check your internet connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            <p className="text-sm text-red-700">{errors?.general}</p>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your work email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
          autoComplete="username"
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-spring"
            onClick={() => {
              const event = new CustomEvent('showToast', {
                detail: {
                  type: 'info',
                  message: 'Password reset functionality will be available soon'
                }
              });
              window.dispatchEvent(event);
            }}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName={isLoading ? undefined : "LogIn"}
          iconPosition="left"
          iconSize={18}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;