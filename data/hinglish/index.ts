/**
 * Hinglish — the registry.
 *
 * One barrel, so a component imports its Hinglish twin from the same place
 * regardless of which file it lives in, and one list of translated routes, read
 * by the note in the running head (components/global/ReadingSwitch) so the site
 * can say plainly which chapters have a second reading.
 *
 * Everything falls back to English on its own — `useVariant` in
 * hooks/use-reading-mode.ts returns the English argument whenever the Hinglish
 * one is absent. The registry exists so the fallback is VISIBLE rather than
 * silent, which is the same principle the errata leaf and Now's empty photograph
 * plates are built on.
 *
 * Add a route to TRANSLATED_ROUTES in the same commit that adds its `.hi.ts`.
 */

/**
 * Every route now has a second reading. The list is kept rather than replaced
 * with `true`, because the next page added to the site will not have one on the
 * day it ships, and the note in the header is how a reader finds that out.
 */
export const TRANSLATED_ROUTES: readonly string[] = [
  '/',
  '/about',
  '/journey',
  '/now',
  '/projects',
  '/experience',
  '/media',
  '/questions',
  '/contact',
  '/a-z',
  '/writing',
  '/errata',
];

export function hasHinglish(pathname: string): boolean {
  return TRANSLATED_ROUTES.includes(pathname);
}

export {
  journeyIntroHi,
  journeySnapshotHi,
  journeyChaptersHi,
  journeyCloseHi,
  journeyExitHi,
} from './journey.hi';

export { aboutTitleHi, aboutRevisionHi, aboutEssayHi, aboutExitHi } from './about.hi';

export { homeContentHi, chromeHi } from './home.hi';

export { mediaChapterHi, mediaMomentsHi } from './media.hi';

export { questionsChapterHi, introHi, closingHi, questionsHi } from './questions.hi';

export { contactContentHi } from './contact.hi';

export {
  chapterLabelHi,
  standfirstHi,
  ledgerHi,
  hingeHi,
  prologueHi,
  entriesHi,
  codaHi,
  experienceGlanceHi,
} from './experience.hi';

export {
  writingIntroHi,
  indexIntroHi,
  errataIntroHi,
  notFoundHi,
} from './backmatter.hi';

export * from './now.hi';
export * from './projects.hi';
