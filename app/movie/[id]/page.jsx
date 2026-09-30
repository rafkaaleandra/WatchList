import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DetailMovie({ params }) {
  const { id } = await params;

const movie = await prisma.movie.findUnique({
  where: {
    id: Number(id),
  },
});

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#191919] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Detail Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#202020] shadow-2xl">

          <div className="grid md:grid-cols-[280px_1fr]">

            {/* Poster */}
            <div className="h-[400px] bg-[#292929] md:h-full">
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
            <div className="p-7 md:p-10">

              {/* Status */}
              <div className="mb-5">
                {movie.status === "Complete" ? (
                  <span className="rounded-full bg-green-500/15 px-4 py-2 text-xs font-bold text-green-400">
                    ✓ Sudah Ditonton
                  </span>
                ) : (
                  <span className="rounded-full bg-red-500/15 px-4 py-2 text-xs font-bold text-red-400">
                    ◷ Belum Ditonton
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-black leading-tight md:text-5xl">
                {movie.title}
              </h1>

              {/* Tahun & Genre */}
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-400">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.genre}</span>
              </div>

              {/* Rating */}
              {movie.rating !== null && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#292929] px-4 py-3">
                  <span className="text-xl text-yellow-400">★</span>

                  <div>
                    <p className="text-lg font-black">
                      {movie.rating}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Rating Film
                    </p>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="my-7 h-px bg-gray-800" />

              {/* Description */}
              <div>
                <h2 className="mb-3 text-lg font-black">
                  Tentang Film
                </h2>

                <p className="text-sm leading-7 text-gray-400">
                  {movie.description || "Tidak ada deskripsi untuk film ini."}
                </p>
              </div>

              {/* Button */}
              <div className="mt-8 flex gap-3">
                <Link
                  href="/watchlist"
                  className="rounded-lg bg-[#ff4848] px-5 py-3 text-sm font-bold transition hover:bg-[#e63b3b]"
                >
                  ← Kembali
                </Link>

                <Link
                  href={`/movie/${movie.id}/edit`}
                  className="rounded-lg border border-gray-700 px-5 py-3 text-sm font-bold transition hover:bg-gray-800"
                >
                  Edit Film
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}