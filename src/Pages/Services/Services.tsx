import { FaCar, FaHome, FaTools, FaUserShield } from "react-icons/fa";

export default function Services() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">

      {/* Header */}
      <section className="text-center px-6 py-20 bg-white shadow-sm">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          We offer premium rental services designed to make your experience 
          smooth, safe, and professional. From cars to properties — we’ve got it all.
        </p>
      </section>

      {/* Service Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

        {/* Card 1 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl duration-300">
          <FaCar className="text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-3">Car Rentals</h2>
          <p className="text-center text-gray-600">
            Rent cars of all types — luxury, family, economical,
            and more with complete documentation and safety.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl duration-300">
          <FaHome className="text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-3">Property Rentals</h2>
          <p className="text-center text-gray-600">
            Find rental homes, apartments, rooms, and commercial spaces 
            with verified listings and secure processes.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl duration-300">
          <FaTools className="text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-3">Maintenance Support</h2>
          <p className="text-center text-gray-600">
            We offer support for basic issues or connect you with verified 
            technicians when needed.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl duration-300 md:col-span-3">
          <FaUserShield className="text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-3">Secure Deals & Verification</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            All users, renters, and owners go through verification to ensure 
            trustworthy and secure deals throughout the platform.
          </p>
        </div>

      </section>

      {/* Bottom Info */}
      <section className="text-center py-10 px-6">
        <p className="max-w-2xl mx-auto text-gray-700 text-lg">
          Our goal is to make renting simpler, safer, and more transparent for everyone.
        </p>
      </section>

    </div>
  );
}
