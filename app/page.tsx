"use clint"
import { Button } from "@/components/ui/button";
import ThemeButtom from "@/components/ex/theme-ModeToggle";
import SettingButton from "@/components/ex/setting-icon";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-400 to-blue-800">

      <div className="space-y-6">
        <h1 className="text-3xl text-center justify-center font-semibold text-white drop-shadow-lg">Create Account</h1>
      </div>

      <ThemeButtom></ThemeButtom>
      <LoginButton>
        <Button variant="secondary" size="lg">Button</Button>
      </LoginButton>

      {/* <div className="h-4/5 w-2/6 shadow-2xl">
      <div className="space-y-6">
        <h1 className="text-3xl text-center justify-center font-semibold text-white drop-shadow-lg">Create Account</h1>
      </div>
     
      </div> */}

    </main>
  );
}

