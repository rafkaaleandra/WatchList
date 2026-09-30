"use client";

import { deleteMovie } from "./actions";

export default function DeleteButton({ id, title }) {
  const handleDelete = async () => {
    const yakin = confirm(
      `Yakin ingin menghapus film "${title}"?`
    );

    if (!yakin) return;

    await deleteMovie(id);

    alert("Film berhasil dihapus!");
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg border border-red-700 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white"
    >
      Hapus
    </button>
  );
}