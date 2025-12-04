import { Link } from "react-router-dom";
import {
  FaCar,
  FaHome,
  FaBuilding,
  FaBed,
  FaBicycle,
  FaStore,
  FaStar,
} from "react-icons/fa";

export default function Home() {
  // Dummy Categories
  const categories = [
    { name: "Cars", icon: <FaCar size={24} /> },
    { name: "Houses", icon: <FaHome size={24} /> },
    { name: "Apartments", icon: <FaBuilding size={24} /> },
    { name: "Rooms", icon: <FaBed size={24} /> },
    { name: "Bikes", icon: <FaBicycle size={24} /> },
    { name: "Shops", icon: <FaStore size={24} /> },
  ];

  // Dummy Featured Listings
  const featured = [
    {
      id: 1,
      title: "Toyota Corolla 2020",
      price: "Rs. 5,000/day",
      location: "Lahore",
      rating: 4.8,
      img: "https://via.placeholder.com/400x300",
    },
    {
      id: 2,
      title: "Modern 2-Bed Apartment",
      price: "Rs. 4,200/day",
      location: "Karachi",
      rating: 4.6,
      img: "https://via.placeholder.com/400x300",
    },
    {
      id: 3,
      title: "Furnished Family House",
      price: "Rs. 9,000/day",
      location: "Islamabad",
      rating: 4.9,
      img: "https://via.placeholder.com/400x300",
    },
  ];

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================== */}
      <section
        className="w-full h-[400px] bg-gray-200 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress')",
        }}
      >
        <div className="bg-white/80 p-6 rounded-xl shadow-md max-w-2xl w-full">
          <h1 className="text-2xl font-bold mb-3 text-gray-800">
            Find your perfect rental — cars, homes & more.
          </h1>

          {/* Search Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Location"
              className="border p-2 rounded-md"
            />
            <input type="date" className="border p-2 rounded-md" />
            <input type="date" className="border p-2 rounded-md" />

            <select className="border p-2 rounded-md">
              <option>Select Type</option>
              <option>Car</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Room</option>
              <option>Bike</option>
            </select>
          </div>

          <button className="mt-4 bg-black text-white px-4 py-2 rounded-md w-full">
            Search
          </button>
        </div>
      </section>

      {/* ================= CATEGORIES ================== */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-xl font-semibold mb-5">Explore Categories</h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col items-center p-4 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              <div>{cat.icon}</div>
              <p className="mt-2 text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED LISTINGS ================== */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-xl font-semibold mb-5">Featured Rentals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />

              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.location}</p>

                <p className="font-medium mt-1">{item.price}</p>

                <div className="flex items-center gap-1 text-yellow-500 mt-1">
                  <FaStar size={16} />
                  <span className="text-sm">{item.rating}</span>
                </div>

                <Link
                  to={`/listings/${item.id}`}
                  className="mt-3 block w-full text-center bg-black text-white py-2 rounded-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
