import { motion } from "framer-motion";

export default function FleetCard({ vehicle, index, onReserve }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-[#111] rounded-2xl overflow-hidden cursor-pointer">

      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
      </div>

      <div className="p-6 pt-2 relative min-h-[180px] flex flex-col">
        




        <p className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase font-medium mb-1">
          {vehicle.category}
        </p>
        <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight mb-1">
          {vehicle.name}
        </h3>
        <p className="text-white/30 text-sm mb-4">{vehicle.specs}</p>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-white/40 text-xs">From</p>
            <p className="text-white text-2xl font-semibold">
              ${vehicle.price}
              <span className="text-white/30 text-sm font-normal">/day</span>
            </p>
          </div>
          <button onClick={onReserve} className="bg-white/10 text-white text-xs px-5 py-2.5 rounded-full backdrop-blur-sm hover:bg-[#c9a96e] hover:text-white transition-all duration-500 font-medium">
            Reserve
          </button>
        </div>
      </div>
    </motion.div>);

}