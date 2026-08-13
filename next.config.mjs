/** @type {import('next').NextConfig} */

/**
 * Baseline security headers. These are safe for a static marketing site — no
 * Content-Security-Policy is set yet because the pages rely on inline styles
 * and an embedded Google Maps iframe; adding one needs its own testing pass.
 */
const securityHeaders = [
  // Stop browsers guessing a response's type (MIME-sniffing -> XSS vector).
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Don't leak full URLs to third parties (Google Maps, partner sites).
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // No one else may frame the site (clickjacking).
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // The site asks for none of these APIs.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Applies only once served over HTTPS.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig = {
  // Don't advertise the framework version.
  poweredByHeader: false,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
