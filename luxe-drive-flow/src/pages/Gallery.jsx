export default function Gallery() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-24">
      <h1 className="text-4xl font-semibold mb-10">Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <img src="https://via.placeholder.com/500" className="w-full rounded-lg" />
        <img src="https://via.placeholder.com/500" className="w-full rounded-lg" />
        <img src="https://via.placeholder.com/500" className="w-full rounded-lg" />
      </div>
    </div>
  );
}
