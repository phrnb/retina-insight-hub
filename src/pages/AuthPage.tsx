
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, KeySquare, Lock, User, Shield } from "lucide-react";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"login" | "2fa">("login");
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      if (authTab === "register") {
        toast({
          title: "Registration Successful",
          description: "Please check your email for verification."
        });
        setAuthTab("login");
        return;
      }
      
      if (step === "login") {
        setStep("2fa");
        toast({
          title: "Verification Required",
          description: "Please enter the code sent to your device."
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome to RetinaScan InsightHub."
        });
        navigate("/");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-100 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-medical-500 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">RetinaScan InsightHub</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Secure medical diagnostic platform</p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">
              {step === "login" ? "Authentication" : "Two-Factor Authentication"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === "login" 
                ? "Secure access to the diagnostic platform" 
                : "Enter the verification code sent to your device"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "login" ? (
              <Tabs 
                defaultValue="login" 
                value={authTab} 
                onValueChange={(value) => setAuthTab(value as "login" | "register")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="doctor@hospital.org"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a 
                          href="#" 
                          className="text-xs text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            toast({
                              title: "Reset Link Sent",
                              description: "Please check your email for password reset instructions.",
                            });
                          }}
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-9"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Authenticating..." : "Continue"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-name">Full Name</Label>
                      <Input
                        id="reg-name"
                        placeholder="Dr. Jane Smith"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="doctor@hospital.org"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-medical-id">Medical License ID</Label>
                      <Input
                        id="reg-medical-id"
                        placeholder="ML12345678"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="reg-password"
                          type={showPassword ? "text" : "password"}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reg-confirm-password">Confirm Password</Label>
                      <Input
                        id="reg-confirm-password"
                        type="password"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Processing..." : "Register"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <KeySquare className="h-12 w-12 text-medical-500" />
                </div>
                <div className="text-center mb-4">
                  <p>We've sent a verification code to your device.</p>
                  <p className="text-sm text-muted-foreground mt-1">Please enter the 6-digit code below</p>
                </div>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <form onSubmit={handleSubmit} className="mt-6">
                  <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
                    {isLoading ? "Verifying..." : "Verify & Login"}
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="link" size="sm">
              Need Help?
            </Button>
            {step === "2fa" && (
              <Button variant="link" size="sm" onClick={() => setStep("login")}>
                Back to Login
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          Secure medical diagnostic system • HIPAA Compliant • 2FA Protected
        </p>
      </div>
    </div>
  );
}
