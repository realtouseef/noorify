import { Canvas } from "@/app/components";

export default async function Home() {
  return (
    <>
      <main className="my-auto flex h-screen flex-col items-center justify-center">
        <Canvas />
      </main>
    </>
  );
}
