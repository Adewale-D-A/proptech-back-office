import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/logo";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className=" w-full h-screen flex justify-between">
      <div className="w-full h-screen overflow-y-auto max-w-screen-xl flex flex-1 md:flex-[0.4] flex-col items-center justify-center gap-8 px-5 md:px-10">
        <div className="w-full flex items-center justify-center ">
          <Link to={"/"} className="flex items-center w-fit">
            <Logo />
          </Link>
        </div>
        {children}
      </div>
      <div className="hidden md:block h-screen onboard-image bg-center bg-no-repeat bg-cover  p-20 w-full md:flex-[0.6] login-banner"></div>
    </main>
  );
}
