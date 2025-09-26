import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { Droplets, Eye, EyeOff, Mail, Lock, User, ArrowLeft, Shield, CheckCircle } from 'lucide-react';

interface AuthLayoutProps {
  onLogin: (email: string, password: string) => void;
}

type AuthView = 'login' | 'signup' | 'forgot-password' | 'reset-success';

export function AuthLayout({ onLogin }: AuthLayoutProps) {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    adminCode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (currentView !== 'forgot-password' && !formData.password) {
      newErrors.password = 'Password is required';
    }

    if (currentView === 'signup') {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.adminCode) newErrors.adminCode = 'Admin code is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (formData.password && formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (currentView === 'login') {
        // Demo credentials
        if (formData.email === 'admin@waterdistrict.gov' && formData.password === 'password123') {
          onLogin(formData.email, formData.password);
        } else {
          setErrors({ general: 'Invalid email or password' });
        }
      } else if (currentView === 'signup') {
        if (formData.adminCode === 'WD2024ADMIN') {
          setCurrentView('login');
          // Reset form
          setFormData(prev => ({ ...prev, password: '', confirmPassword: '', adminCode: '' }));
        } else {
          setErrors({ adminCode: 'Invalid admin code' });
        }
      } else if (currentView === 'forgot-password') {
        setCurrentView('reset-success');
      }
      setIsLoading(false);
    }, 1500);
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="admin@waterdistrict.gov"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="pl-10"
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="pl-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      {errors.general && (
        <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          className="px-0"
          onClick={() => setCurrentView('forgot-password')}
        >
          Forgot your password?
        </Button>
      </div>

      <Separator />

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an admin account?{' '}
          <Button
            type="button"
            variant="link"
            className="px-0"
            onClick={() => setCurrentView('signup')}
          >
            Request Access
          </Button>
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Demo Credentials</p>
            <p className="text-xs text-blue-700 mt-1">
              Email: admin@waterdistrict.gov<br />
              Password: password123
            </p>
          </div>
        </div>
      </div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          />
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Dela Cruz"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your.email@waterdistrict.gov"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="pl-10"
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a secure password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className="pl-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className="pl-10"
          />
        </div>
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="adminCode">Admin Access Code</Label>
        <div className="relative">
          <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="adminCode"
            placeholder="Enter admin access code"
            value={formData.adminCode}
            onChange={(e) => setFormData(prev => ({ ...prev, adminCode: e.target.value }))}
            className="pl-10"
          />
        </div>
        {errors.adminCode && <p className="text-sm text-destructive">{errors.adminCode}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Admin Account'}
      </Button>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          className="px-0"
          onClick={() => setCurrentView('login')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Sign In
        </Button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Demo Admin Code</p>
            <p className="text-xs text-amber-700 mt-1">
              Use: WD2024ADMIN
            </p>
          </div>
        </div>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="pl-10"
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
      </Button>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          className="px-0"
          onClick={() => setCurrentView('login')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Sign In
        </Button>
      </div>
    </form>
  );

  const renderResetSuccess = () => (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="bg-green-100 p-3 rounded-full">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <div>
        <h3 className="font-medium">Reset Link Sent!</h3>
        <p className="text-sm text-muted-foreground mt-2">
          We've sent a password reset link to {formData.email}. Please check your email and follow the instructions to reset your password.
        </p>
      </div>
      <Button
        onClick={() => setCurrentView('login')}
        className="w-full"
      >
        Back to Sign In
      </Button>
    </div>
  );

  const getTitle = () => {
    switch (currentView) {
      case 'signup': return 'Create Admin Account';
      case 'forgot-password': return 'Reset Password';
      case 'reset-success': return 'Check Your Email';
      default: return 'Welcome Back';
    }
  };

  const getDescription = () => {
    switch (currentView) {
      case 'signup': return 'Request administrative access to the water district system';
      case 'forgot-password': return 'Enter your email to receive a password reset link';
      case 'reset-success': return '';
      default: return 'Sign in to your administrative account';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
              <Droplets className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">GripoMeter Admin</h1>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Municipal Water District
          </Badge>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle>{getTitle()}</CardTitle>
            {getDescription() && (
              <CardDescription>{getDescription()}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            {currentView === 'login' && renderLoginForm()}
            {currentView === 'signup' && renderSignupForm()}
            {currentView === 'forgot-password' && renderForgotPasswordForm()}
            {currentView === 'reset-success' && renderResetSuccess()}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            © 2024 Municipal Water District. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}