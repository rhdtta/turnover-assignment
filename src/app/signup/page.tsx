import Link from "next/link";

import { Singup } from "../_components/login/signup";




export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black py-10">
      <Singup />
    </main>
  );
}
