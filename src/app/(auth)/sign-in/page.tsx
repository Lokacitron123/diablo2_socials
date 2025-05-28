import { getCurrentSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import { SignInForm } from "./SignInForm";
import Link from "next/link";

export default async function SignInPage() {
  const { user } = await getCurrentSession();

  if (user) {
    return redirect("/");
  }

  return (
    <div className='flex flex-col gap-3'>
      <SignInForm />
      <div>
        <h3 className='mb-2'>No Account?</h3>
        <Link className='p-2 w-full rounded bg-[var(--link)]' href={"/sign-up"}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
