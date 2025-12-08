import { useState, useEffect } from "react";
import {
  FaCar,
  FaStar,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaGlobe,
} from "react-icons/fa";

interface CarRental {
  id: number;
  title: string;
  price: string;
  location: string;
  type: string;
  rating: number;
  img: string;
}

export default function RentCars() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    startDate: "",
    endDate: "",
    type: "",
  });

  // Dummy car data by country
  const carsByCountry: Record<string, CarRental[]> = {
    Pakistan: [
      {
        id: 1,
        title: "Toyota Corolla 2020",
        price: "Rs. 5,000/day",
        location: "Lahore",
        type: "Car",
        rating: 4.8,
        img: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: 2,
        title: "Honda Civic 2019",
        price: "Rs. 4,500/day",
        location: "Karachi",
        type: "Car",
        rating: 4.6,
        img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    UAE: [
      {
        id: 3,
        title: "Luxury SUV",
        price: "AED 500/day",
        location: "Dubai",
        type: "Car",
        rating: 4.9,
        img: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    USA: [
      {
        id: 4,
        title: "Tesla Model 3",
        price: "$120/day",
        location: "Los Angeles",
        type: "Car",
        rating: 4.9,
        img: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  };

  const categories = [
    { name: "Cars", icon: <FaCar size={24} /> },
  ];

  // Country mapping for geolocation
  const countryMapping: Record<string, string> = {
    PK: "Pakistan",
    AE: "UAE",
    US: "USA",
  };

  useEffect(() => {
    detectUserCountry();
  }, []);

  const detectUserCountry = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      const countryCode = data.country_code;
      const country = countryMapping[countryCode];

      if (country && carsByCountry[country]) {
        setDetectedCountry(country);
        setSelectedCountry(country);
      } else {
        setDetectedCountry("Pakistan");
        setSelectedCountry("Pakistan");
      }
    } catch (error) {
      console.error("Error detecting location:", error);
      setDetectedCountry("Pakistan");
      setSelectedCountry("Pakistan");
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredListings = () => {
    if (!selectedCountry) return [];

    let listings = carsByCountry[selectedCountry] || [];

    // Only cars
    listings = listings.filter((item) => item.type === "Car");

    if (searchFilters.location) {
      listings = listings.filter((item) =>
        item.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    return listings;
  };

  const handleSearch = () => {
    setSearchFilters({ ...searchFilters });
  };

  const resetFilters = () => {
    setSearchFilters({
      location: "",
      startDate: "",
      endDate: "",
      type: "",
    });
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Detecting your location...</p>
        </div>
      </div>
    );
  }

  // Country Selector Modal
  if (showCountrySelector) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto py-16 px-4">
          <button
            onClick={() => setShowCountrySelector(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-black mb-8"
          >
            <FaArrowLeft />
            <span>Back to Cars</span>
          </button>

          <h2 className="text-3xl font-bold mb-4 text-center">
            Select Your Country
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Currently showing cars from: <span className="font-semibold">{selectedCountry}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Object.keys(carsByCountry).map((country) => (
              <div
                key={country}
                onClick={() => {
                  setSelectedCountry(country);
                  setShowCountrySelector(false);
                  resetFilters();
                }}
                className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden group ${
                  selectedCountry === country ? "ring-4 ring-blue-500" : ""
                }`}
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-6xl group-hover:scale-110 transition" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {country}
                    {selectedCountry === country && (
                      <span className="ml-2 text-sm text-blue-600">(Current)</span>
                    )}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {carsByCountry[country].length} cars available
                  </p>
                  <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                    {selectedCountry === country ? "Current Selection" : "Switch to This Country"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredListings = getFilteredListings();

  return (
    <div className="w-full">
      {/* Search Section */}
      <section className="w-full bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                Cars in {selectedCountry}
              </h2>
              {detectedCountry === selectedCountry && (
                <p className="text-sm text-gray-600 mt-1">
                  📍 Auto-detected from your location
                </p>
              )}
            </div>
            <button
              onClick={() => setShowCountrySelector(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              <FaGlobe />
              <span>Change Country</span>
            </button>
          </div>

          {/* Search Filters */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Search by city..."
                value={searchFilters.location}
                onChange={(e) =>
                  setSearchFilters({ ...searchFilters, location: e.target.value })
                }
                className="border p-2 rounded-md"
              />
              <input
                type="date"
                value={searchFilters.startDate}
                onChange={(e) =>
                  setSearchFilters({ ...searchFilters, startDate: e.target.value })
                }
                className="border p-2 rounded-md"
              />
              <input
                type="date"
                value={searchFilters.endDate}
                onChange={(e) =>
                  setSearchFilters({ ...searchFilters, endDate: e.target.value })
                }
                className="border p-2 rounded-md"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSearch}
                className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto py-8 px-4">
        <h3 className="text-lg font-semibold mb-4">Browse by Category</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() =>
                setSearchFilters({ ...searchFilters, type: cat.name })
              }
              className="flex flex-col items-center p-4 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer transition"
            >
              <div>{cat.icon}</div>
              <p className="mt-2 text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Listings Cards */}
      <section className="max-w-6xl mx-auto py-8 px-4">
        <h3 className="text-lg font-semibold mb-4">
          {filteredListings.length} Results Found
        </h3>

        {filteredListings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No cars found matching your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
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
                  <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-md mb-2">
                    {item.type}
                  </span>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt size={12} />
                    {item.location}
                  </p>

                  <p className="font-medium mt-2 text-lg">{item.price}</p>

                  <div className="flex items-center gap-1 text-yellow-500 mt-1">
                    <FaStar size={16} />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>

                  <button className="mt-3 w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
