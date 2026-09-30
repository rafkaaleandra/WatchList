import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export default function TambahFilm() {
  async function addMovie(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const genre = formData.get("genre") as string;
    const year = Number(formData.get("year"));
    const ratingValue = formData.get("rating") as string;
    const status = formData.get("status") as string;
    const description = formData.get("description") as string;

    const posterFile = formData.get("poster") as File;

    let posterPath = null;

    // Upload poster
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
    }

    // Simpan ke database
    await prisma.movie.create({
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

    redirect("/watchlist");
  }

  return (
    <main className="min-h-screen bg-[#191919] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <Link
            href="/watchlist"
            className="text-sm font-bold text-gray-400 transition hover:text-[#ff4848]"
          >
            ← Kembali ke Watchlist
          </Link>

          <h1 className="mt-5 text-3xl font-black">
            Tambah Film
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Tambahkan film baru ke dalam koleksi watchlist kamu.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-[#202020] p-6 shadow-xl md:p-8">

          <form action={addMovie} className="space-y-5">

            {/* Judul */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Judul Film
              </label>

              <input
                type="text"
                name="title"
                placeholder="Masukkan judul film"
                required
                className="w-full rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-[#ff4848] focus:ring-1 focus:ring-[#ff4848]"
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
                  placeholder="Contoh: 2025"
                  required
                  className="w-full rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-[#ff4848]"
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
                  placeholder="0 - 10"
                  className="w-full rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-[#ff4848]"
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
                placeholder="Contoh: Action, Comedy, Horror"
                required
                className="w-full rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-[#ff4848]"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Status
              </label>

              <select
                name="status"
                defaultValue="Want to Watch"
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

              <div className="rounded-xl border border-dashed border-gray-700 bg-[#292929] p-5 text-center transition hover:border-[#ff4848]">

                <div className="mb-3 text-3xl">
                  🖼️
                </div>

                <p className="mb-3 text-xs text-gray-500">
                  Pilih gambar poster dari komputer kamu
                </p>

                <input
                  type="file"
                  name="poster"
                  accept="image/*"
                  className="mx-auto block w-full max-w-md text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-[#ff4848] file:px-4 file:py-2 file:font-bold file:text-white hover:file:bg-[#e63b3b]"
                />

              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Deskripsi
              </label>

              <textarea
                name="description"
                placeholder="Ceritakan sedikit tentang film ini..."
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-700 bg-[#292929] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-600 focus:border-[#ff4848] focus:ring-1 focus:ring-[#ff4848]"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 border-t border-gray-800 pt-6">

              <Link
                href="/watchlist"
                className="flex-1 rounded-xl border border-gray-700 py-3 text-center text-sm font-bold transition hover:bg-[#292929]"
              >
                Batal
              </Link>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-[#ff4848] py-3 text-sm font-black transition hover:bg-[#e63b3b] hover:shadow-lg hover:shadow-red-500/10"
              >
                + Tambah Film
              </button>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
}