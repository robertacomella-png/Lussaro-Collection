export default function Gallery() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">
          Gallery
        </h1>
        <p className="text-white/60 mb-12 max-w-2xl">
          Explore our collection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <img src="/gallery-1.jpg" alt="Gallery 1" className="w-full rounded-2xl object-cover" />
          <img src="/gallery-2.jpg" alt="Gallery 2" className="w-full rounded-2xl object-cover" />
          <img src="/gallery-3.jpg" alt="Gallery 3" className="w-full rounded-2xl object-cover" />
        </div>
      </div>
    </div>
  );
}
