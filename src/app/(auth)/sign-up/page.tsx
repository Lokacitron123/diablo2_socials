import { getCurrentSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import React from "react";
import SignUpForm from "./SignUpForm";
import Link from "next/link";

export default async function SignUpPage() {
  const { user } = await getCurrentSession();

  if (user) {
    return redirect("/");
  }

  return (
    <div className='flex flex-col gap-3'>
      <SignUpForm />
      <div>
        <h3 className='mb-2'>Already signed up?</h3>
        <Link className='p-2 w-full rounded bg-[var(--link)]' href={"/sign-in"}>
          Login
        </Link>
      </div>
    </div>
  );
}
