import Image from "next/image"

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-8 animate-pulse">
          <Image
            src="/assets/img/icon.svg"
            alt="Noble Kode Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Loading</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
          Please wait while we prepare your content...
        </p>
      </div>
    </div>
  )
}
