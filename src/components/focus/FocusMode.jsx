import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Timer from '../timer/Timer';
import { useAmbientSound } from '../../hooks/useAmbientSound';

const FocusMode = ({ onExit }) => {
  const { currentSound, isPlaying, toggle, availableSounds, volume, setVolume } =
    useAmbientSound();
  const [showControls, setShowControls] = useState(false);

  return (
    <motion.div
      className="zen-mode"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Exit button */}
      <AnimatePresence>
        {showControls && (
          <motion.button
            onClick={onExit}
            className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white text-xl backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <FaTimes />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Timer */}
      <div className="relative z-10">
        <Timer />
      </div>

      {/* Ambient sound controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h3 className="text-white text-sm font-medium mb-4">
              Ambient Sounds
            </h3>

            <div className="flex space-x-4 mb-4">
              {availableSounds.map((sound) => (
                <button
                  key={sound}
                  onClick={() => toggle(sound)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium capitalize
                    transition-all duration-200
                    ${
                      currentSound === sound && isPlaying
                        ? 'bg-primary-600 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }
                  `}
                >
                  {sound}
                </button>
              ))}
            </div>

            {/* Volume control */}
            {isPlaying && (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black -z-10" />
    </motion.div>
  );
};

export default FocusMode;
