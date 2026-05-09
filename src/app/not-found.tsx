import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#C47A3A" }}>
        404
      </p>
      <h1 className="text-4xl font-bold mb-4" style={{ color: "#2C2420" }}>
        Page not found
      </h1>
      <p className="text-base mb-10" style={{ color: "#6B5E55" }}>
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/directory"
          className="px-6 py-3 text-sm font-medium rounded-md btn-primary"
        >
          Browse the Directory
        </Link>
        <Link
          href="/"
          className="px-6 py-3 text-sm font-medium rounded-md btn-outline-brand"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
