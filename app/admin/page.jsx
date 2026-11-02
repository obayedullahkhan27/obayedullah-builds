export const metadata = {
  title: 'Owner dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Admin() {
  return (
    <section className="wrap py-20">
      <div className="mx-auto max-w-[640px] rounded-xl border border-line bg-white/60 p-8 sm:p-12">
        <p className="eyebrow text-muted">Owner dashboard</p>

        <h1 className="mt-6 text-5xl tracking-[-.06em]">
          Dashboard temporarily unavailable.
        </h1>

        <p className="mt-6 text-sm leading-7 text-muted">
          The public portfolio is available. The owner dashboard is being
          migrated to the new hosting environment.
        </p>
      </div>
    </section>
  );
}
