// @ts-nocheck
import { useState, useEffect } from "react";
import {
  FaHome,
  FaBuilding,
  FaBed,
  FaStar,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

// Rental item type
type RentalType = "House" | "Apartment" | "Room";

interface RentalItem {
  id: number;
  title: string;
  price: string;
  location: string;
  type: RentalType;
  rating: number;
  img: string;
}

// Search filters type
interface SearchFilters {
  location: string;
  startDate: string;
  endDate: string;
  type: string;
}

// Category type
interface Category {
  name: string;
  icon: JSX.Element;
}

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCountrySelector, setShowCountrySelector] = useState<boolean>(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: "",
    startDate: "",
    endDate: "",
    type: "",
  });

  // Dummy rentals data
  const rentalsByCountry: Record<string, RentalItem[]> = {
    Pakistan: [
      {
        id: 2,
        title: "Modern 2-Bed Apartment",
        price: "Rs. 4,200/day",
        location: "Karachi",
        type: "Apartment",
        rating: 4.6,
        img: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: 3,
        title: "Furnished Family House",
        price: "Rs. 9,000/day",
        location: "Islamabad",
        type: "House",
        rating: 4.9,
        img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    UAE: [
      {
        id: 8,
        title: "Penthouse Downtown",
        price: "AED 1,200/day",
        location: "Dubai",
        type: "Apartment",
        rating: 4.8,
        img: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    USA: [
      {
        id: 11,
        title: "Manhattan Loft",
        price: "$300/day",
        location: "New York",
        type: "Apartment",
        rating: 4.7,
        img: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  };

  const categories: Category[] = [
    { name: "Houses", icon: <FaHome size={24} /> },
    { name: "Apartments", icon: <FaBuilding size={24} /> },
    { name: "Rooms", icon: <FaBed size={24} /> },
  ];

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
      const country = countryMapping[data.country_code] || "Pakistan";
      setDetectedCountry(country);
      setSelectedCountry(country);
    } catch (err) {
      setDetectedCountry("Pakistan");
      setSelectedCountry("Pakistan");
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredListings = (): RentalItem[] => {
    if (!selectedCountry) return [];
    let listings = rentalsByCountry[selectedCountry] || [];
    const propertyTypes: RentalType[] = ["House", "Apartment", "Room"];
    listings = listings.filter((item) => propertyTypes.includes(item.type));
    if (searchFilters.location) {
      listings = listings.filter((item) =>
        item.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }
    if (searchFilters.type && searchFilters.type !== "Select Type") {
      listings = listings.filter((item) => item.type === searchFilters.type);
    }
    return listings;
  };

  const handleSearch = () => setSearchFilters({ ...searchFilters });
  const resetFilters = () =>
    setSearchFilters({ location: "", startDate: "", endDate: "", type: "" });

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Detecting your location...</p>
        </div>
      </div>
    );

  const filteredListings = getFilteredListings();

  return (
    <div className="w-full">
      {/* Search Section */}
      <section className="w-full bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                Properties in {selectedCountry}
              </h2>
              {detectedCountry === selectedCountry && (
                <p className="text-sm text-gray-600 mt-1">
                  Auto-detected from your location
                </p>
              )}
            </div>
            <button
              onClick={() => setShowCountrySelector(!showCountrySelector)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              <FaGlobe />
              <span>Change Country</span>
            </button>
          </div>

          {/* Filters */}
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
              <select
                value={searchFilters.type}
                onChange={(e) =>
                  setSearchFilters({ ...searchFilters, type: e.target.value })
                }
                className="border p-2 rounded-md"
              >
                <option>Select Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Room</option>
              </select>
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
                setSearchFilters({ ...searchFilters, type: cat.name.slice(0, -1) })
              }
              className="flex flex-col items-center p-4 rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer transition"
            >
              <div>{cat.icon}</div>
              <p className="mt-2 text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section className="max-w-6xl mx-auto py-8 px-4">
        <h3 className="text-lg font-semibold mb-4">
          {filteredListings.length} Results Found
        </h3>
        {filteredListings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No properties found matching your criteria.
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
