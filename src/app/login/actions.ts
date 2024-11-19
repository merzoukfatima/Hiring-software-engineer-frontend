"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };
  console.log("data", data);
  const {
    data: { user },
    error
  } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.error("Login failed:", error);
  } else {
    console.log("Logged in user:", user);
  }
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: "http://localhost:3000/dashboard"
    }
  });

  if (error) {
    console.error("Login failed 2:", error);
  } else {
    console.log("Logged in user 2:", user);
  }
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

// export async function signinwithgoogle() {
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google"
//   });
//   console.log("data", data);
//   if (error) {
//     console.error("Google Sign-In Error:", error);
//     return redirect("/error");
//   }
//   revalidatePath("/", "layout");
//   redirect("/dashboard");
// }
