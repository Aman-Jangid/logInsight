import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to LogInsight</h1>
        <p className="text-lg text-gray-600">
          Your gateway to a smarter log handling experience.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Image
          src="/globe.svg"
          alt="Illustration"
          width={200}
          height={200}
          className="mb-4"
        />
      </div>

      <footer className="text-sm text-gray-500">
        &copy; 2025 LogInsight. All rights reserved.
      </footer>
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg text-gray-600">
          Explore our{" "}
          <a href="https://github.com/Aman-Jangid/loginsight">GitHub</a>{" "}
          repository for more information.
        </p>
      </div>
    </div>
  );
}
