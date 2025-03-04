import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function App() {
  const [sgpa, setSgpa] = useState("");
  const [percentage, setPercentage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const convertToPercentage = () => {
    if (sgpa >= 0 && sgpa <= 10) {
      const calculatedPercentage = (sgpa - 0.75) * 10;
      setPercentage(calculatedPercentage.toFixed(2));
    } else {
      setPercentage("Invalid SGPA");
    }
  };

  // Clear results when input changes
  useEffect(() => {
    setPercentage("");
  }, [sgpa]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-md shadow-lg px-4 py-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <h1 className="text-2xl font-bold tracking-tighter">GradeWise</h1>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="font-medium hover:text-blue-300 transition">Home</a>
            <a href="#" className="font-medium hover:text-blue-300 transition">About</a>
            <a href="#" className="font-medium hover:text-blue-300 transition">Tools</a>
            <a href="#" className="font-medium hover:text-blue-300 transition">Contact</a>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-2 border-t border-white/20">
            <a href="#" className="block py-2 px-4 hover:bg-white/10 rounded transition">Home</a>
            <a href="#" className="block py-2 px-4 hover:bg-white/10 rounded transition">About</a>
            <a href="#" className="block py-2 px-4 hover:bg-white/10 rounded transition">Tools</a>
            <a href="#" className="block py-2 px-4 hover:bg-white/10 rounded transition">Contact</a>
          </div>
        )}
      </nav>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-300">
            SGPA to Percentage Converter
          </h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="sgpa" className="block text-sm font-medium mb-2">Enter your SGPA</label>
              <input
                id="sgpa"
                type="number"
                value={sgpa}
                onChange={(e) => setSgpa(e.target.value)}
                placeholder="Enter value between 0-10"
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                step="0.01"
                min="0"
                max="10"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={convertToPercentage}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-500/20 transition duration-300"
            >
              Calculate Percentage
            </motion.button>
            
            {percentage && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-5 bg-white/5 border border-white/20 rounded-lg"
              >
                <h3 className="text-lg font-medium mb-1">Result</h3>
                <p className="text-2xl font-bold">
                  {percentage === "Invalid SGPA" ? (
                    <span className="text-red-400">{percentage}</span>
                  ) : (
                    <>
                      <span className="text-blue-300">{percentage}%</span>
                      <span className="block mt-1 text-sm opacity-75">
                        {percentage >= 60 ? "First Division" : 
                         percentage >= 45 ? "Second Division" : 
                         percentage >= 33 ? "Third Division" : "Failed"}
                      </span>
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </div>
          
          <div className="mt-8 text-sm text-center opacity-75">
            <p>Based on VTU SGPA to Percentage formula</p>
            <p className="mt-1">Formula: (SGPA - 0.75) × 10</p>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 text-center text-sm opacity-75">
        <p>© 2025 GradeWise | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;