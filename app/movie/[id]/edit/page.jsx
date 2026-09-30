import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export default async function EditMovie({ params }) {
  const { id } = await params;

  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!movie) {
    notFound();
  }

  async function updateMovie(formData) {
    "use server";

    const title = formData.get("title");
    const genre = formData.get("genre");
    const year = Number(formData.get("year"));
    const ratingValue = formData.get("rating");
    const status = formData.get("status");
    const description = formData.get("description");

    const posterFile = formData.get("poster");

    let posterPath = movie.poster;

    // Kalau user memilih poster baru
    if (posterFile && posterFile.size > 0) {
      const bytes = await posterFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${posterFile.name}`;

      const uploadPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "posters",
        fileName
      );

      await writeFile(uploadPath, buffer);

      posterPath = `/uploads/posters/${fileName}`;

      // Hapus poster lama
      if (movie.poster) {
        const oldPosterPath = path.join(
          process.cwd(),
          "public",
          movie.poster
        );

        try {
          await unlink(oldPosterPath);
        } catch {}
      }
    }

    // Update database
    await prisma.movie.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        genre,
        year,
        rating: ratingValue ? Number(ratingValue) : null,
        status,
        description: description || null,
        poster: posterPath,
      },
    });

    redirect(`/movie/${id}`);
  }

  return (
    <main className="min-h-screen bg-[#191919] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/movie/${movie.id}`}
            className="text-sm font-bold text-gray-400 transition hover:text-[#ff4848]"
          >
            ← Kembali ke Detail
          </Link>

          <h1 className="mt-5 text-3xl font-black">
            Edit Film
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Ubah informasi film yang ada di watchlist kamu.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-800 bg-[#202020] p-6 shadow-xl md:p-8">

          {/* Movie title */}
          <div className="mb-7 flex items-center gap-4 border-b border-gray-800 pb-6">
            <div className="h-20 w-14 overflow-hidden rounded-lg bg-[#292929]">
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[9px] text-gray-500">
                  No Poster
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-gray-500">
                Sedang mengedit
              </p>

              <h2 className="mt-1 text-xl font-black">
                {movie.title}
              </h2>
            </div>
          </div>

          {/* Form */}
          <form action={updateMovie} className="space-y-5">

            {/* Judul */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Judul Film
              </label>

              <input
                type="text"
                name="title"
                defaultValue={movie.title}
                required
                className="w-full rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm outline-none transition focus:border-[#ff4848]"
              />
            </div>

            {/* Tahun + Rating */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Tahun
                </label>

                <input
                  type="number"
                  name="year"
                  defaultValue={movie.year}
                  required
                  className="w-full rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm outline-none transition focus:border-[#ff4848]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Rating
                </label>

                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="10"
                  step="0.1"
                  defaultValue={movie.rating ?? ""}
                  className="w-full rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm outline-none transition focus:border-[#ff4848]"
                />
              </div>

            </div>

            {/* Genre */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Genre
              </label>

              <input
                type="text"
                name="genre"
                defaultValue={movie.genre}
                required
                className="w-full rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm outline-none transition focus:border-[#ff4848]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Status
              </label>

              <select
                name="status"
                defaultValue={movie.status}
                className="w-full rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm outline-none focus:border-[#ff4848]"
              >
                <option value="Want to Watch">
                  Belum Ditonton
                </option>

                <option value="Completed">
                  Sudah Ditonton
                </option>
              </select>
            </div>

            {/* Poster */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Poster Film
              </label>

              <input
                type="file"
                name="poster"
                accept="image/*"
                className="w-full rounded-xl border border-gray-700 bg-[#292929] text-sm text-gray-400 file:mr-4 file:border-0 file:bg-[#ff4848] file:px-4 file:py-3 file:text-sm file:font-bold file:text-white hover:file:bg-[#e63b3b]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Pilih gambar baru jika ingin mengganti poster.
              </p>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Deskripsi
              </label>

              <textarea
                name="description"
                rows={5}
                defaultValue={movie.description ?? ""}
                className="w-full resize-none rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#ff4848]"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 border-t border-gray-800 pt-6">

              <Link
                href={`/movie/${movie.id}`}
                className="flex-1 rounded-xl border border-gray-700 py-3 text-center text-sm font-bold transition hover:bg-[#292929]"
              >
                Batal
              </Link>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#ff4848] py-3 text-sm font-bold transition hover:bg-[#e63b3b]"
              >
                Simpan Perubahan
              </button>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
}