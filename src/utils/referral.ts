// Referral / invitation link helpers.
//
// IMPORTANT: everything here is stored on the current device only (localStorage).
// Real cross-device stats (visits, questions, lessons) need a backend; until then
// the Ambassadors dashboard shows only what this device can honestly know.

export const PUBLIC_BASE_URL = 'https://weilmai.ai.studio';

const AMBASSADOR_KEY = 'eilm_ambassador_v2';
const REFERRED_BY_KEY = 'eilm_referred_by';
const CODE_PATTERN = /^[a-z0-9-]{4,32}$/i;

export interface AmbassadorProfile {
  referralCode: string;
  sharesCount: number;
}

export interface IncomingReferral {
  code: string | null;
  teaserId: string | null;
  at: number;
}

const randomCode = (): string => {
  const bytes = new Uint8Array(4);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return 'amb-' + Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

export const getAmbassadorProfile = (): AmbassadorProfile => {
  try {
    const raw = localStorage.getItem(AMBASSADOR_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.referralCode === 'string' && CODE_PATTERN.test(parsed.referralCode)) {
        return {
          referralCode: parsed.referralCode,
          sharesCount: Number.isFinite(parsed.sharesCount) ? parsed.sharesCount : 0,
        };
      }
    }
  } catch {
    /* ignore and regenerate */
  }
  const fresh: AmbassadorProfile = { referralCode: randomCode(), sharesCount: 0 };
  try {
    localStorage.setItem(AMBASSADOR_KEY, JSON.stringify(fresh));
  } catch {
    /* storage unavailable */
  }
  return fresh;
};

export const recordShare = (): AmbassadorProfile => {
  const current = getAmbassadorProfile();
  const updated = { ...current, sharesCount: current.sharesCount + 1 };
  try {
    localStorage.setItem(AMBASSADOR_KEY, JSON.stringify(updated));
  } catch {
    /* storage unavailable */
  }
  return updated;
};

export const hasSharedAtLeastOnce = (): boolean => {
  try {
    const raw = localStorage.getItem(AMBASSADOR_KEY);
    return !!raw && (JSON.parse(raw).sharesCount ?? 0) > 0;
  } catch {
    return false;
  }
};

export const buildInviteUrl = (code: string, teaserId?: string): string => {
  const url = new URL(PUBLIC_BASE_URL + '/');
  url.searchParams.set('ref', code);
  if (teaserId) url.searchParams.set('teaser', teaserId);
  return url.toString();
};

/**
 * Reads ?ref= and ?teaser= from the current URL (validated), stores the first
 * referral this device arrived with, and strips the params from the address bar.
 */
export const captureIncomingReferral = (validTeaserIds: string[]): IncomingReferral | null => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const rawRef = params.get('ref');
  const rawTeaser = params.get('teaser');
  if (!rawRef && !rawTeaser) return null;

  const code = rawRef && CODE_PATTERN.test(rawRef) ? rawRef : null;
  const teaserId = rawTeaser && validTeaserIds.includes(rawTeaser) ? rawTeaser : null;
  const incoming: IncomingReferral = { code, teaserId, at: Date.now() };

  try {
    // First-touch attribution: keep the first inviter this device came from
    if (code && !localStorage.getItem(REFERRED_BY_KEY)) {
      localStorage.setItem(REFERRED_BY_KEY, JSON.stringify(incoming));
    }
  } catch {
    /* storage unavailable */
  }

  try {
    params.delete('ref');
    params.delete('teaser');
    const qs = params.toString();
    window.history.replaceState(null, '', window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash);
  } catch {
    /* ignore */
  }

  return incoming;
};
