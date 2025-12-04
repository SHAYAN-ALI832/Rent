import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">RentEase</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted platform for renting cars, homes, and commercial spaces.
            Safe, simple, and fully verified.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white duration-200">Home</Link></li>
            <li><Link to="/experience" className="hover:text-white duration-200">Experience</Link></li>
            <li><Link to="/services" className="hover:text-white duration-200">Services</Link></li>
            <li><Link to="/contact" className="hover:text-white duration-200">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex items-center gap-4 text-xl">
            <a href="#" className="hover:text-white duration-200"><FaFacebook /></a>
            <a href="#" className="hover:text-white duration-200"><FaInstagram /></a>
            <a href="#" className="hover:text-white duration-200"><FaTwitter /></a>
            <a href="#" className="hover:text-white duration-200"><FaLinkedin /></a>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            Stay connected for updates & new listings.
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} RentEase. All Rights Reserved.
      </div>
    </footer>
  );
}
