"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, KeyRound, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Simulate sending code
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    // Simulate sending code
    const generatedCode = "123456";
    setSentCode(generatedCode);
    setStep(2);
  };

  // Simulate verifying code
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (code !== sentCode) {
      setError("Invalid code. Please check your email and try again.");
      return;
    }
    setStep(3);
  };

  // Simulate password reset
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSuccess("Password reset successful! Redirecting to dashboard...");
    setTimeout(() => {
      // Generate a dummy JWT (header.payload.signature)
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(
        JSON.stringify({
          sub: email,
          name: "Test User",
          iat: Math.floor(Date.now() / 1000),
          secret: process.env.JWT_SECRET,
        })
      );
      const signature = "signature";
      const dummyJwt = `${header}.${payload}.${signature}`;
      if (typeof window !== "undefined") {
        const dashboardUrl =
          process.env.NEXT_PUBLIC_DASHBOARD_URL ||
          "http://localhost:5173/dashboard";
        window.location.href = `${dashboardUrl}?jwt=${encodeURIComponent(
          dummyJwt
        )}`;
      }
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main
        className="flex-1 flex items-center justify-center px-4 py-12 bg-cover bg-center bg-no-repeat"
        style={{
          minHeight: "calc(100vh - 140px)",
          backgroundImage: "url('/login.jpg')",
        }}
      >
        <div className="w-full max-w-md mx-auto">
          <Card className="border-0 shadow-xl overflow-hidden rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">
                Forgot Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert
                  variant="destructive"
                  className="mb-4 bg-red-50 dark:bg-red-900/20"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert
                  variant="default"
                  className="mb-4 bg-green-50 dark:bg-green-900/20"
                >
                  <Mail className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              {step === 1 && (
                <form onSubmit={handleSendCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 dark:text-slate-200"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Send Reset Code
                  </Button>
                </form>
              )}
              {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="code"
                      className="text-slate-700 dark:text-slate-200"
                    >
                      Enter Code
                    </Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="Enter the code sent to your email"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Verify Code
                  </Button>
                </form>
              )}
              {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="new-password"
                      className="text-slate-700 dark:text-slate-200"
                    >
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirm-password"
                      className="text-slate-700 dark:text-slate-200"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Reset Password
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
