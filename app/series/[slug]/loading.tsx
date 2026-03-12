export default function Loading() {
  return (
    <main className="p-6">
      <div className="h-[40vh] bg-black/10 animate-pulse rounded-2xl" />
      <div className="mt-8 space-y-4 max-w-3xl mx-auto">
        <div className="h-6 w-3/4 bg-black/10 animate-pulse" />
        <div className="h-4 w-1/2 bg-black/10 animate-pulse" />
        <div className="h-4 w-full bg-black/10 animate-pulse" />
        <div className="h-4 w-5/6 bg-black/10 animate-pulse" />
        <div className="h-4 w-4/6 bg-black/10 animate-pulse" />
      </div>
    </main>
  );
}
