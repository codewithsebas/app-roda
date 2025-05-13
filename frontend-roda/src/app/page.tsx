import CreditList from "@/components/CreditList";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" bg-white min-h-screen flex flex-col gap-4">
      <div className="bg-white p-3 py-0 m-auto sm:max-w-7xl">
        <Image src="/logo.png" alt="Logo" width={250} height={250} />
      </div>
      <CreditList />
    </main>
  );
}
