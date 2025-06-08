import React from "react";
import { Link } from "react-router-dom";

const canteens = [
  {
    name: "Vidhyarthi Canteen Arch. Block",
    location: "Beside Mechanical Block",
    image: "/Canteens/VidhyarthiCanteen.jpg",
    description: "Wide variety of dishes with comfortable seating."
  },

  {
    name: "Vidhyarthi Khana",
    location: "Infront of PJ Block",
    image: "/Canteens/BackSideCanteen.jpg",
    description: "Fast service and delicious meals at affordable prices."
  },
  {
    name: "Cafe Coffee",
    location: "Beside Indoor Stadium",
    image: "/Canteens/Coffee.jpg",
    description: "Cozy lounge with coffee, snacks, and light meals."
  }
];



export default function CanteenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6 sm:p-10">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
        BMSCE Campus <span className="text-red-500">Canteens</span>
      </h1>
    </div>

    {/* Canteen Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {canteens.map((canteen, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden group"
        >
          {/* Image with Zoom on Hover */}
          <div className="overflow-hidden">
            <img
              src={canteen.image}
              alt={canteen.name}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Canteen Info */}
          <div className="p-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{canteen.name}</h2>
            <p className="text-sm text-gray-500 mb-1">📍 {canteen.location}</p>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{canteen.description}</p>

            {/* CTA Button */}
            <Link
              to="/home"
              onClick={() => {
                sessionStorage.setItem("canteen", canteen.name);
              }}
            >
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 rounded-xl shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300 ease-in-out">
                View Menu
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
