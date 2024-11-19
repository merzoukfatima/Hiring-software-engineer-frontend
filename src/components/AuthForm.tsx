"use client";

import supabase from "@/app/utils/supabase/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useState } from "react";
import { login, signup } from "@/app/login/actions";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Sign Up Function
  const signUp = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await signup(formData);

      alert("Check your email for the confirmation link!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sign In Function
  const signIn = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await login(formData);
      alert("Logged in successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Function
  // const signInWithGoogle = async () => {
  //   setLoading(true);
  //   setError("");
  //   console.log("im here");
  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         redirectTo: `${window.location.origin}/dashboard`,
  //       },
  //     });
  //     if (error) throw error;
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Switch between SignUp and SignIn view
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <Card className="mx-auto max-w-sm p-4">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isSignUp ? "Sign Up" : "Login"}
        </CardTitle>
        <CardDescription>
          {isSignUp
            ? "Enter your email and password to create an account."
            : "Enter your email and password to log in to your account."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (isSignUp) {
                  signUp();
                } else {
                  signIn();
                }
              }}
              disabled={loading}
              className="w-full mt-4">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
            {/* <Button
              variant="outline"
              className="w-full mt-2"
              onClick={(e) => {
                e.preventDefault();
                signInWithGoogle();
              }}
              disabled={loading}>
              Login with Google
            </Button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span
                onClick={toggleAuthMode}
                className="underline cursor-pointer">
                Log in
              </span>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <span
                onClick={toggleAuthMode}
                className="underline cursor-pointer">
                Sign up
              </span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
