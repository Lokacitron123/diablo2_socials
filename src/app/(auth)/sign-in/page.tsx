import { getCurrentSession } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { user } = await getCurrentSession();

  if (user) {
    return redirect("/");
  }

  return (
    <div>
      <h1>Sign In Page</h1>
    </div>
  );
}
