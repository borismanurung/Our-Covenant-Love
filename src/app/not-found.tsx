import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 text-slate-800">
      <h1 className="text-4xl font-serif font-bold text-covenant-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold mb-3">Halaman Tidak Ditemukan / Page Not Found</h2>
      <p className="text-slate-600 max-w-md mb-6 text-sm">
        Halaman yang Anda tuju tidak ditemukan atau telah dipindahkan.
      </p>
      <Link
        href="/id"
        className="px-6 py-2.5 rounded-xl bg-covenant-700 text-white hover:bg-covenant-800 transition-colors text-sm font-medium shadow-sm"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
