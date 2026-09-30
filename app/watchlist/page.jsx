import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function WatchlistPage() {
  const movies = await prisma.movie.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalFilm = movies.length;

  const sudahDitonton = movies.filter(
    (movie) => movie.status === "Completed"
  ).length;

  return (
    <main className="min-h-screen bg-[#191919] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between">

          <div>
            <h1 className="text-3xl font-black">
              My Watchlist
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Kumpulan film yang ingin kamu tonton.
              Kelola watchlist-mu dengan mudah.
            </p>
          </div>

          <Link
            href="/tambah"
            className="rounded-lg bg-[#ff4848] px-5 py-3 text-sm font-bold transition hover:bg-[#e63b3b]"
          >
            + Tambah Film
          </Link>

        </div>


       {/* Statistik */}
<div className="mb-10 grid grid-cols-2 overflow-hidden rounded-xl border border-gray-800 bg-[#202020]">

  <div className="border-r border-gray-700 px-6 py-5">
    <p className="text-2xl font-black text-[#ff4848]">
      {totalFilm}
    </p>

    <p className="text-sm text-gray-400">
      Total Film
    </p>
  </div>

  <div className="px-6 py-5">
    <p className="text-2xl font-black text-green-400">
      {sudahDitonton}
    </p>

    <p className="text-sm text-gray-400">
      Sudah Ditonton
    </p>
  </div>

</div>


        {/* Judul */}
        <div className="mb-6 flex items-center justify-between">

          <h2 className="border-l-4 border-[#ff4848] pl-3 text-2xl font-black">
            Daftar Watchlist
          </h2>

        </div>


        {/* Film */}
        {movies.length === 0 ? (

          <div className="rounded-xl border border-gray-800 bg-[#202020] py-20 text-center">
            <p className="text-lg font-bold">
              Belum ada film
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Tambahkan film ke watchlist kamu.
            </p>

            <Link
              href="/tambah"
              className="mt-5 inline-block rounded-lg bg-[#ff4848] px-5 py-3 text-sm font-bold"
            >
              + Tambah Film
            </Link>
          </div>

        ) : (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {movies.map((movie) => (

              <div
                key={movie.id}
                className="overflow-hidden rounded-xl border border-gray-800 bg-[#202020] transition hover:-translate-y-1 hover:border-[#ff4848]"
              >

                {/* Poster */}
                <div className="h-64 bg-[#292929]">

                  {movie.poster ? (
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                      Tidak ada poster
                    </div>
                  )}

                </div>


                {/* Informasi */}
                <div className="p-4">

                  <h3 className="truncate font-bold">
                    {movie.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {movie.year} • {movie.genre}
                  </p>


                  {/* Rating */}
                  {movie.rating !== null && (
                    <p className="mt-3 text-sm text-yellow-400">
                      ★ {movie.rating}
                    </p>
                  )}


                  {/* Status */}
                  <div className="mt-3">

                    {movie.status === "Completed" ? (
  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-400">
    ✓ Sudah Ditonton
  </span>
) : (
  <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400">
    ◷ Belum Ditonton
  </span>
)}

                  </div>


                  {/* Tombol */}
     <div className="mt-5 flex gap-2">
  <Link
    href={`/movie/${movie.id}`}
    className="flex-1 rounded-lg border border-gray-700 py-2 text-center text-xs font-bold hover:bg-gray-800"
  >
    Detail
  </Link>

  <DeleteButton
    id={movie.id}
    title={movie.title}
  />  
      </div>
    </div>
  </div>
))}

          </div>

        )}

      </div>
    </main>
  );
}