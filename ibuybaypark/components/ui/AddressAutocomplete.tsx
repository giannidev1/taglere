'use client';

import { useEffect, useMemo, useState } from 'react';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    google?: typeof google;
  }
}

/**
 * Bay Park sits roughly here — between Mission Bay and Tecolote Canyon.
 * Suggestions are biased to this circle so a seller typing "1234 Mor..."
 * gets Morena Blvd before Morena Valley two hours north.
 */
const BAY_PARK_CENTER = { lat: 32.792, lng: -117.209 };
const BAY_PARK_RADIUS_METERS = 5000;

const HAS_PLACES_KEY = Boolean(process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY);

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
  placeholder = '1234 Morena Blvd, San Diego, CA 92110',
  id = 'address',
  className = '',
}: AddressAutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  // Poll for the Maps script, but only when a key is actually configured —
  // otherwise this would spin a setTimeout loop forever on a misconfigured deploy.
  useEffect(() => {
    if (!HAS_PLACES_KEY) return;

    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;

    const checkGoogleMaps = () => {
      if (typeof window !== 'undefined' && window.google?.maps?.places) {
        setIsGoogleLoaded(true);
        return;
      }
      // ~10s of retries, then give up and fall back to a plain text input.
      if (attempts++ < 100) {
        timer = setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();
    return () => clearTimeout(timer);
  }, []);

  const requestOptions = useMemo(() => {
    const options: Omit<google.maps.places.AutocompletionRequest, 'input'> = {
      componentRestrictions: { country: 'us' },
      types: ['address'],
    };

    // LatLng can only be constructed once the Maps script has loaded.
    if (isGoogleLoaded && window.google?.maps) {
      options.location = new window.google.maps.LatLng(
        BAY_PARK_CENTER.lat,
        BAY_PARK_CENTER.lng
      );
      options.radius = BAY_PARK_RADIUS_METERS;
    }

    return options;
  }, [isGoogleLoaded]);

  const {
    ready,
    value: autocompleteValue,
    suggestions: { status, data },
    setValue: setAutocompleteValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions,
    debounce: 300,
    callbackName: 'initMap',
  });

  // Keep the react-hook-form value and the hook's internal value in sync.
  useEffect(() => {
    if (value !== autocompleteValue) {
      setAutocompleteValue(value, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setAutocompleteValue(newValue);
    setShowSuggestions(newValue.length >= 3);
  };

  const handleSelect = (description: string) => {
    onChange(description);
    setAutocompleteValue(description, false);
    clearSuggestions();
    setShowSuggestions(false);

    // Upgrade to the fully formatted address where possible.
    getGeocode({ address: description })
      .then((results) => {
        if (results[0]?.formatted_address) {
          onChange(results[0].formatted_address);
          setAutocompleteValue(results[0].formatted_address, false);
        }
      })
      .catch(() => {
        // Non-fatal — the typed/selected description stands on its own.
      });
  };

  const handleBlur = () => {
    // Delay so a click on a suggestion registers before the list unmounts.
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

  const isPending = HAS_PLACES_KEY && !isGoogleLoaded;

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
          } focus:ring-2 focus:ring-accent focus:border-transparent transition-all ${className}`}
          placeholder={placeholder}
          autoComplete="off"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {isPending ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <MapPin className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && ready && status === 'OK' && data.length > 0 && (
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
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0 group-hover:text-accent-deep transition-colors" />
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

      {isPending && (
        <p className="mt-1 text-xs text-gray-500">Loading address suggestions…</p>
      )}
      {!HAS_PLACES_KEY && (
        <p className="mt-1 text-xs text-gray-500">
          Type your full address — suggestions are unavailable right now.
        </p>
      )}
    </div>
  );
}
