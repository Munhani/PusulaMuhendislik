import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SignInButton from "@/components/SignInButton";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Pusula'ya Hoş Geldiniz</h1>
        <p className="text-xl mb-8">
          Yapay zeka destekli sohbet uygulamasına giriş yapın
        </p>
        <SignInButton />
      </div>
    </div>
  );
} 