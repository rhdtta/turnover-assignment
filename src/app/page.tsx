import Link from "next/link";

// import { Login } from "./_components/login/login";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div>Go to <Link href="/login" className="font-semibold">Login</Link> / <Link href="/signup" className="font-semibold">Signup</Link> page</div>
    </main>
  );
}

async function CrudShowcase() {
  // const latestPost = await api.post.getLatest();

  return (
    // <div className="checking w-full max-w-xs">
    //   {latestPost ? (
    //     latestPost.map((post:any) => {
    //       return ( <p key={post.id} className={`truncate ${post.id}`}>Your most recent category: {post.name}</p>)
    //     })
    //   ) : (
    //     <p>You have no posts yet.</p>
    //   )}

    //   <CreatePost />
    // </div>
    null
  );
}
