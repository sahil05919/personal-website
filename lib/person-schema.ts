/**
 * Person schema (JSON-LD), rendered once, on Home.
 *
 * There was no structured data anywhere. For a personal site that is a real
 * omission: "Sahil Kumar" is a common name, and schema.org/Person with
 * `sameAs` links is the machine-readable way of saying which one this is —
 * it is what lets a search engine connect this record, the LinkedIn profile
 * and the GitHub account as one person rather than three coincidences.
 *
 * EVERY FIELD BELOW IS ALREADY WRITTEN SOMEWHERE ON THE SITE. Nothing is
 * asserted here that a reader could not also read in prose:
 *
 *   name, jobTitle, homeLocation, nationality-free `address`  → About's front
 *   matter (data/profileContent.ts `facts`)
 *   knowsLanguage                                            → the same
 *   alumniOf                                                  → /journey and
 *   /experience, both of which name Bayes Business School
 *   sameAs                                                     → /contact
 *
 * If a fact changes in prose, change it here in the same edit. Structured data
 * that disagrees with the page is worse than none: it is a claim nobody can
 * see and therefore nobody corrects.
 *
 * Rendered on Home only. Repeating it per page would emit the same entity
 * thirteen times and say nothing more.
 */

import { contactInfo } from '@/data/contactData';

import { SITE_URL } from './seo';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Sahil Kumar',
  url: SITE_URL,
  jobTitle: 'Finance Assistant',
  description:
    'A record kept in London: the work, the places, the reading and the questions still open.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
  knowsLanguage: ['en', 'hi'],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: "Bayes Business School, City St George's, University of London",
  },
  sameAs: [contactInfo.linkedin, contactInfo.github, contactInfo.instagram],
} as const;
