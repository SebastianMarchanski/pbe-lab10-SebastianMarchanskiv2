import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8989e0] text-[#e5e5e1]">
      <main className="text-center">
        <Image
          src="/politechnika-krakowska-logo.svg"
          alt="Logo Politechniki Krakowskiej"
          width={200}
          height={200}
          priority
          className="w-40 h-40 mb-6 shadow-lg"
        />
        <div className="text-2xl font-bold">
          Witajcie na stronie Sklepu Komputerowego 2025SM
        </div>
      </main>
    </div>
  );
}
