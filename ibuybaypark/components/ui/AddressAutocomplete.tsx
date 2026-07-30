'use client';

import { useEffect, useMemo, useState } from 'react';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
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
  /**
   * The leading pin/spinner is absolutely positioned and paired with left
   * padding on the input. A caller that restyles the input's padding must be
   * able to drop it, or the icon lands on top of the typed address.
   */
  showIcon?: boolean;
}

export default function AddressAutocomplete({
  value,
  onChange,
  onBlur,
  error = false,
  placeholder = '1234 Morena Blvd, San Diego, CA 92110',
  id = 'address',
  className = '',
  showIcon = true,
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
          className={`w-full rounded-none border-0 border-b bg-transparent px-0 py-3 ${
            showIcon ? 'pr-8' : ''
          } text-ink placeholder:text-ink-muted transition-colors duration-300 ease-settle focus:outline-none focus:ring-0 ${
            error
              ? 'border-red-700 focus:border-red-700'
              : 'border-ink/25 hover:border-ink/45 focus:border-accent'
          } ${className}`}
          placeholder={placeholder}
          autoComplete="off"
        />
        {showIcon && (
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
            {isPending ? (
              <Loader2
                aria-hidden="true"
                className="h-5 w-5 animate-spin text-ink-muted"
              />
            ) : (
              <MapPin
                aria-hidden="true"
                strokeWidth={1.25}
                className="h-5 w-5 text-ink-muted"
              />
            )}
          </div>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && ready && status === 'OK' && data.length > 0 && (
        <div className="fade-up absolute z-50 mt-2 max-h-64 w-full overflow-y-auto border border-stucco bg-sand-light shadow-lift">
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
                  className="group flex w-full items-start gap-3 border-b border-stucco px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-sand"
                >
                  <MapPin
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="mt-1 h-4 w-4 flex-shrink-0 text-ink-muted transition-colors group-hover:text-accent-deep"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm text-ink">{main_text}</div>
                    <div className="truncate text-xs text-ink-muted">{secondary_text}</div>
                  </div>
                </button>
              );
            })}
        </div>
      )}

      {isPending && (
        <p className="mt-2 text-xs text-ink-muted">Loading address suggestions…</p>
      )}
      {!HAS_PLACES_KEY && (
        <p className="mt-2 text-xs text-ink-muted">
          Type your full address — suggestions are unavailable right now.
        </p>
      )}
    </div>
  );
}
