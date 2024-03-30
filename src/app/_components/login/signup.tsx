"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { api, setToken } from "~/trpc/react";

export function Singup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createPost = api.post.register.useMutation({
    onSuccess: (data) => {
      router.push('/categories');
      setName("");
      setEmail("");
      setPassword("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name, email, password });
      }}
      className="flex flex-col gap-9 justify-center items-center border border-[#C1C1C1] rounded-[20px] pt-[40px] px-[60px] pb-[120px]"
    >
        <span className="text-[32px] font-semibold ">Create your account</span>

        <div className="flex flex-col">
            <label className="float-left">Name</label>
            <input
                type="text"
                placeholder="Enter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[456px] border border-[#C1C1C1] rounded-[6px] px-4 py-2 text-black"
            />
        </div>

        <div className="flex flex-col">
            <label className="float-left">Email</label>
            <input
                type="text"
                placeholder="Enter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[456px] border border-[#C1C1C1] rounded-[6px] px-4 py-2 text-black"
            />
        </div>

        <div className="flex flex-col">
            <label className="float-left">Password</label>
            <input
                type="password"
                placeholder="Enter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[456px] border border-[#C1C1C1] rounded-[6px] px-4 py-2 text-black"
            />
        </div>

      <button
        type="submit"
        className="w-[456px] rounded-[6px] bg-black text-white px-10 py-3 font-medium tracking-[0.20em] transition hover:bg-black/80"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "CREATE ACCOUNT"}
      </button>

      <div className="flex gap-2">
        <span className="text-[#333333]">Have an Account?</span>
        <Link className="font-medium" href='/login'>LOGIN</Link>
      </div>
    </form>
  );
}
