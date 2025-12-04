import { FaStar, FaUserTie, FaAward } from "react-icons/fa";

export default function Experience() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      
      {/* Header Section */}
      <section className="text-center px-6 py-20 bg-white shadow-sm">
        <h1 className="text-4xl font-bold mb-4">Our Experience</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          With years of expertise and dedication, we bring premium grooming 
          services to help you look and feel your best.
        </p>
      </section>

      {/* Experience Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl duration-300">
          <FaStar className="text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-3">Years of Excellence</h2>
          <p className="text-center text-gray-600">
            Our barbers have over <strong>5+ years</strong> of professional experience,
            mastering all classic and modern hairstyles.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl duration-300">
          <FaUserTie className="text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-3">Trained Professionals</h2>
          <p className="text-center text-gray-600">
            Each member of our team is certified and trained to provide the best
            grooming experience.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl duration-300">
          <FaAward className="text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-3">Quality Guaranteed</h2>
          <p className="text-center text-gray-600">
            We use top-quality products and tools to ensure a clean, sharp, and
            satisfying result every time.
          </p>
        </div>

      </section>

      {/* Bottom Section */}
      <section className="text-center py-10 px-6">
        <p className="max-w-2xl mx-auto text-gray-700 text-lg">
          Whether it’s a simple trim, a stylish fade, or a full grooming
          experience, we promise excellence with every visit.
        </p>
      </section>

    </div>
  );
}
