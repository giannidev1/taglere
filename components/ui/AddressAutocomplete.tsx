'use client';

import { useEffect, useState } from 'react';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
}

export default function AddressAutocomplete({
  value,
  onChange,
  onBlur,
  error = false,
  placeholder = '123 Main St, San Diego, CA',
  id = 'address',
  className = '',
}: AddressAutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  // Check if Google Maps is loaded
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (typeof window !== 'undefined' && window.google?.maps?.places) {
        setIsGoogleLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkGoogleMaps, 100);
      }
    };
    checkGoogleMaps();
  }, []);

  const {
    ready,
    value: autocompleteValue,
    suggestions: { status, data },
    setValue: setAutocompleteValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'us' }, // Restrict to US
      types: ['address'], // Only addresses
    },
    debounce: 300,
    callbackName: 'initMap',
  });

  // Sync external value with autocomplete value
  useEffect(() => {
    if (value !== autocompleteValue) {
      setAutocompleteValue(value, false);
    }
  }, [value]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setAutocompleteValue(newValue);
    if (newValue.length >= 3) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (description: string) => {
    onChange(description);
    setAutocompleteValue(description, false);
    clearSuggestions();
    setShowSuggestions(false);

    // Optional: Get detailed place information
    getGeocode({ address: description })
      .then((results) => {
        if (results[0]?.formatted_address) {
          onChange(results[0].formatted_address);
          setAutocompleteValue(results[0].formatted_address, false);
        }
      })
      .catch((error) => {
        console.error('Error getting geocode:', error);
      });
  };

  const handleBlur = () => {
    // Delay to allow click on suggestion
    setTimeout(() => {
      setShowSuggestions(false);
      if (onBlur) onBlur();
    }, 200);
  };

  const handleFocus = () => {
    if (data.length > 0 && value.length >= 3) {
      setShowSuggestions(true);
    }
  };

  // Check if autocomplete is available
  const isAutocompleteAvailable = isGoogleLoaded && ready;

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          id={id}
          value={value}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 pl-11 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-gold focus:border-transparent transition-all ${className}`}
          placeholder={placeholder}
          autoComplete="off"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {!isGoogleLoaded ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && status === 'OK' && data.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          >
            {data.map((suggestion) => {
              const {
                place_id,
                structured_formatting: { main_text, secondary_text },
                description,
              } = suggestion;

              return (
                <button
                  key={place_id}
                  type="button"
                  onClick={() => handleSelect(description)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-start gap-3 group"
                >
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0 group-hover:text-gold transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 truncate">{main_text}</div>
                    <div className="text-xs text-gray-500 truncate">{secondary_text}</div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper text when API is loading or unavailable */}
      {!isAutocompleteAvailable && !isGoogleLoaded && (
        <p className="mt-1 text-xs text-gray-500">Loading address autocomplete...</p>
      )}
      {!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY && (
        <p className="mt-1 text-xs text-gray-500">
          Address autocomplete is currently unavailable
        </p>
      )}
    </div>
  );
}
