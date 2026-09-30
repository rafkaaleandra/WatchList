import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const movies = await prisma.movie.findMany();

  const totalFilm = movies.length;

  const sudahDitonton = movies.filter(
    (movie) => movie.status === "Completed"
  ).length;

  const belumDitonton = totalFilm - sudahDitonton;

  const progress =
    totalFilm > 0
      ? Math.round((sudahDitonton / totalFilm) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-[#191919] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <section>
          <h1 className="max-w-md text-4xl font-black leading-tight">
            Kelola Film Favoritmu
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
            Simpan film kesukaanmu dan pantau film yang sudah kamu tonton.
          </p>

          {/* Action */}
          <div className="mt-6 flex gap-3">
            <Link
              href="/tambah"
              className="rounded-xl bg-[#ff4848] px-5 py-3 text-sm font-black transition hover:bg-[#e63b3b]"
            >
              + Tambah Film
            </Link>

            <Link
              href="/watchlist"
              className="rounded-xl border border-gray-700 px-5 py-3 text-sm font-bold transition hover:bg-[#292929]"
            >
              Lihat Watchlist
            </Link>
          </div>
        </section>

        {/* Statistik */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2">

  <div className="rounded-2xl border border-gray-800 bg-[#202020] p-6">
    <p className="text-3xl font-black text-[#ff4848]">
      {totalFilm}
    </p>

    <p className="mt-1 text-sm font-bold text-gray-400">
      Total Film
    </p>
  </div>

  <div className="rounded-2xl border border-gray-800 bg-[#202020] p-6">
    <p className="text-3xl font-black text-green-400">
      {sudahDitonton}
    </p>

    <p className="mt-1 text-sm font-bold text-gray-400">
      Sudah Ditonton
    </p>
  </div>

</section>

        {/* Progress */}
        <section className="mt-6 rounded-2xl border border-gray-800 bg-[#202020] p-6">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black">
                Progress Watchlist
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Film yang sudah kamu selesaikan
              </p>
            </div>

            <span className="text-2xl font-black text-[#ff4848]">
              {progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#292929]">
            <div
              className="h-full rounded-full bg-[#ff4848] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span>{sudahDitonton} sudah ditonton</span>
            <span>{belumDitonton} belum ditonton</span>
          </div>

        </section>

      </div>
    </main>
  );
}