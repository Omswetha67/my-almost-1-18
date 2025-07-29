import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, LogIn, Mail, Lock, Phone, Calendar, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthModalsProps {
  onLoginSuccess: () => void;
  triggerSignup?: boolean;
}

export const AuthModals = ({ onLoginSuccess, triggerSignup }: AuthModalsProps) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    phoneNumber: '',
    graduationStatus: '',
    otp: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle external trigger for signup
  useEffect(() => {
    if (triggerSignup) {
      setIsSignupOpen(true);
    }
  }, [triggerSignup]);

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signupData.fullName) newErrors.fullName = 'Full name is required';
    if (!signupData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!signupData.age) newErrors.age = 'Age is required';
    if (!signupData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!signupData.graduationStatus) newErrors.graduationStatus = 'Graduation status is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateLogin()) {
      toast({
        title: "Login Successful!",
        description: "Welcome back to SkillVault",
      });
      setIsLoginOpen(false);
      onLoginSuccess();
    }
  };

  const handleSignup = () => {
    if (!otpSent) {
      if (validateSignup()) {
        setOtpSent(true);
        toast({
          title: "OTP Sent!",
          description: `Verification code sent to ${signupData.email}`,
        });
      }
    } else {
      if (signupData.otp.length === 6) {
        toast({
          title: "Account Created!",
          description: "Welcome to SkillVault",
        });
        setIsSignupOpen(false);
        setOtpSent(false);
        onLoginSuccess();
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter a valid 6-digit code",
          variant: "destructive"
        });
      }
    }
  };

  const switchToSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const switchToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-card rounded-2xl shadow-2xl border-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-card-foreground text-center">Welcome Back!</DialogTitle>
            <DialogDescription className="text-muted-foreground text-center">
              Sign in to continue your learning journey
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-card-foreground font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="pl-10 h-12 rounded-xl border-input focus:border-primary focus:ring-primary transition-all duration-300"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-card-foreground font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="pl-10 pr-10 h-12 rounded-xl border-input focus:border-primary focus:ring-primary transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-card-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
              </div>
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Sign In
            </Button>
            <p className="text-center text-muted-foreground">
              Don't have an account?{' '}
              <button 
                onClick={switchToSignup}
                className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors duration-300"
              >
                Register here
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="sm:max-w-lg bg-card rounded-2xl shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-card-foreground text-center">Join SkillVault</DialogTitle>
            <DialogDescription className="text-muted-foreground text-center">
              Create your account and start building your future
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!otpSent ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-card-foreground font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                      className="pl-10 h-12 rounded-xl border-input focus:border-primary focus:ring-primary transition-all duration-300"
                    />
                    {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-card-foreground font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      className="pl-10 h-12 rounded-xl border-input focus:border-primary focus:ring-primary transition-all duration-300"
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-card-foreground font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        className="pl-10 pr-10 h-12 rounded-xl border-input focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-card-foreground"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-card-foreground font-medium">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        className="pl-10 pr-10 h-12 rounded-xl border-input focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-card-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-age" className="text-card-foreground font-medium">Age</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="signup-age"
                        type="number"
                        placeholder="Age"
                        value={signupData.age}
                        onChange={(e) => setSignupData({...signupData, age: e.target.value})}
                        className="pl-10 h-12 rounded-xl border-input focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                      {errors.age && <p className="text-destructive text-sm mt-1">{errors.age}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone" className="text-card-foreground font-medium">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="Phone"
                        value={signupData.phoneNumber}
                        onChange={(e) => setSignupData({...signupData, phoneNumber: e.target.value})}
                        className="pl-10 h-12 rounded-xl border-input focus:border-primary focus:ring-primary transition-all duration-300"
                      />
                      {errors.phoneNumber && <p className="text-destructive text-sm mt-1">{errors.phoneNumber}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduation-status" className="text-card-foreground font-medium">Graduation Status</Label>
                  <Select value={signupData.graduationStatus} onValueChange={(value) => setSignupData({...signupData, graduationStatus: value})}>
                    <SelectTrigger className="h-12 rounded-xl border-input focus:border-primary focus:ring-primary">
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-muted-foreground mr-2" />
                        <SelectValue placeholder="Select graduation status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Post Graduate</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.graduationStatus && <p className="text-destructive text-sm mt-1">{errors.graduationStatus}</p>}
                </div>
              </>
            ) : (
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Verify Your Email</h3>
                <p className="text-muted-foreground">We've sent a verification code to {signupData.email}</p>
                
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-card-foreground font-medium">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={signupData.otp}
                    onChange={(e) => setSignupData({...signupData, otp: e.target.value})}
                    className="h-12 text-center text-lg tracking-widest rounded-xl border-input focus:border-primary focus:ring-primary transition-all duration-300"
                    maxLength={6}
                  />
                </div>
              </div>
            )}

            <Button 
              onClick={handleSignup}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              {otpSent ? 'Verify & Create Account' : 'Send OTP'}
            </Button>
            
            <p className="text-center text-muted-foreground">
              Already have an account?{' '}
              <button 
                onClick={switchToLogin}
                className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors duration-300"
              >
                Sign in here
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};