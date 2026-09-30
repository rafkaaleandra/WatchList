import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Watchlist",
  description: "Movie Watchlist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#191919] text-white">

        {/* Navbar */}
        <nav className="mx-1 rounded-b-[25px] bg-gradient-to-r from-[#ff4848] to-[#b9272b]">
          <div className="flex h-[52px] items-center justify-between px-5">

            {/* Logo */}
            <h1 className="text-xl font-black">
              Watchlist
            </h1>

            {/* Navigation */}
            <div className="flex items-center gap-6 text-xs font-bold">

              <a
                href="/"
                className="hover:text-gray-200"
              >
                Home
              </a>

              <a
                href="/watchlist"
                className="hover:text-gray-200"
              >
                Watchlist
              </a>

            </div>

          </div>
        </nav>

        {/* Isi halaman */}
        {children}

      </body>
    </html>
  );
}