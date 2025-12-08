import { useState, useEffect } from "react";
import {
  FaHome,
  FaBuilding,
  FaBed,
  FaStar,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaGlobe,
} from "react-icons/fa";

// Define types for rental items
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

  // Dummy data organized by country
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
      {
        id: 4,
        title: "Luxury Villa",
        price: "Rs. 15,000/day",
        location: "Islamabad",
        type: "House",
        rating: 4.7,
        img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: 6,
        title: "Studio Apartment",
        price: "Rs. 3,000/day",
        location: "Karachi",
        type: "Apartment",
        rating: 4.4,
        img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600",
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
      {
        id: 9,
        title: "Beach Villa",
        price: "AED 2,000/day",
        location: "Abu Dhabi",
        type: "House",
        rating: 5.0,
        img: "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=600",
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

  const categories = [
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

      const countryCode: string = data.country_code;
      const country = countryMapping[countryCode];

      if (country && rentalsByCountry[country]) {
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

  const getFilteredListings = (): RentalItem[] => {
    if (!selectedCountry) return [];

    let listings: RentalItem[] = rentalsByCountry[selectedCountry] || [];

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

  const filteredListings = getFilteredListings();

  return (
    <div className="w-full">
      {/* Main content remains the same as your original JSX */}
      {/* ... */}
    </div>
  );
}
