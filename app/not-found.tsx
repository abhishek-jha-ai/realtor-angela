import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-xl text-center">
        <p className="eyebrow justify-center">Page not found</p>
        <h1 className="mt-6 text-5xl">This page has drifted out to sea.</h1>
        <Link href="/" className="btn btn-primary mt-10">Back to Home</Link>
      </div>
    </section>
  );
}
