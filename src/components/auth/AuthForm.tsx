
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, KeySquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/pages/Index";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"login" | "2fa">("login");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { post, updateToken } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (step === "login") {
        const response = await post("/auth/login", { email, password });
        if (response.access_token) {
          setStep("2fa");
          toast({
            title: "Verification Required",
            description: "Please enter the code sent to your device."
          });
        }
      } else {
        // Verify 2FA code
        // For demo, we'll simulate 2FA verification
        if (verificationCode.length === 6) {
          updateToken("demo-token");
          toast({
            title: "Login Successful",
            description: "Welcome back to the system."
          });
          navigate('/');
        } else {
          toast({
            title: "Invalid Code",
            description: "Please enter a valid 6-digit code.",
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">RetinaScan Login</CardTitle>
        <CardDescription className="text-center">
          {step === "login" 
            ? "Enter your credentials to access the system" 
            : "Enter the verification code sent to your device"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === "login" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@hospital.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <KeySquare className="h-12 w-12 text-medical-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
            </div>
          )}
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : step === "login" ? "Continue" : "Verify & Login"}
          </Button>
        </form>
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
  );
}
