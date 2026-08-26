/**
 * Real-time Solar Ephemeris Calculator
 * Computes exact solar altitude (elevation above horizon) and azimuth (compass bearing)
 * based on geographic coordinates and UTC time.
 */

export interface SolarCoordinates {
  lat: number;
  lng: number;
}

export interface SolarPosition {
  altitude: number; // in degrees (-90 to +90)
  azimuth: number;  // in degrees (0 = North, 90 = East, 180 = South, 270 = West)
  isDay: boolean;
  shadowLength: number; // normalized scale 0 to 1
  lightAngle: number;   // 2D angle for CSS directional lighting
}

export const LONDON_COORDS: SolarCoordinates = { lat: 51.5074, lng: -0.1278 };
export const MAHENDRAGARH_COORDS: SolarCoordinates = { lat: 28.2819, lng: 76.1528 };

export function calculateSolarPosition(coords: SolarCoordinates, date: Date = new Date()): SolarPosition {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  // Day of year
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Fractional year (radians)
  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1 + (date.getUTCHours() - 12) / 24);

  // Equation of time (in minutes)
  const eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
    - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));

  // Solar declination (in radians)
  const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma)
    - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma)
    - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);

  // Time offset in minutes
  const timeOffset = eqtime + 4 * coords.lng;

  // True solar time in minutes
  const tst = date.getUTCHours() * 60 + date.getUTCMinutes() + date.getUTCSeconds() / 60 + timeOffset;

  // Solar hour angle (in degrees)
  let ha = (tst / 4) - 180;
  if (ha < -180) ha += 360;
  if (ha > 180) ha -= 360;

  const latRad = coords.lat * rad;
  const haRad = ha * rad;

  // Solar zenith angle
  const cosZenith = Math.sin(latRad) * Math.sin(decl) + Math.cos(latRad) * Math.cos(decl) * Math.cos(haRad);
  const zenith = Math.acos(Math.max(-1, Math.min(1, cosZenith)));
  const altitude = 90 - zenith * deg;

  // Solar azimuth angle
  const cosAzimuth = (Math.sin(decl) - Math.sin(latRad) * Math.cos(zenith)) / (Math.cos(latRad) * Math.sin(zenith));
  let azimuth = Math.acos(Math.max(-1, Math.min(1, cosAzimuth))) * deg;
  if (ha > 0) {
    azimuth = 360 - azimuth;
  }

  const isDay = altitude > -0.833; // Standard atmospheric refraction horizon

  // Shadow length stretches when sun is near horizon, compresses at zenith
  const clampedAlt = Math.max(2, altitude);
  const shadowLength = isDay ? Math.min(1, 1 / Math.tan(clampedAlt * rad) / 8) : 0;

  // 2D directional lighting angle on the screen
  const lightAngle = (azimuth + 180) % 360;

  return {
    altitude,
    azimuth,
    isDay,
    shadowLength,
    lightAngle,
  };
}