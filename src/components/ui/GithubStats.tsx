import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { GithubIcon } from './Icons';

interface GHUser {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface StatItem {
  label: string;
  value: number | string;
}

const CACHE_KEY = 'gh_stats';
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

export default function GithubStats(): ReactElement {
  const [stats, setStats] = useState<GHUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setStats(data);
          setLoading(false);
          return;
        }
      } catch {
        // Invalid cache, ignore
      }
    }

    // Fetch fresh data from GitHub API
    fetch('https://api.github.com/users/sadbob10')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch');
        return r.json();
      })
      .then((data: GHUser) => {
        setStats(data);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data, ts: Date.now() })
        );
      })
      .catch(() => {
        setStats(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const items: StatItem[] = stats
    ? [
        { label: 'Repositories', value: stats.public_repos },
        { label: 'Followers', value: stats.followers },
        { label: 'Following', value: stats.following },
      ]
    : [];

  return (
    <a
      href="https://github.com/sadbob10"
      target="_blank"
      rel="noreferrer"
      className="contact-item"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        padding: '1.1rem 1.4rem',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px',
        textDecoration: 'none',
        transition: 'all 0.22s',
        marginTop: '1.5rem',
        flexWrap: 'wrap',
      }}
    >
      {/* GitHub Link */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '.6rem',
          color: 'var(--white)',
        }}
      >
        <GithubIcon size={20} />
        <span
          style={{
            fontFamily: 'var(--font-head)',
            fontWeight: 700,
            fontSize: '.9rem',
          }}
        >
          github.com/sadbob10
        </span>
      </div>

      {/* Stats */}
      {loading && (
        <span
          style={{
            fontSize: '.78rem',
            color: 'var(--muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          loading stats...
        </span>
      )}

      {!loading &&
        items.map(({ label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-head)',
                fontWeight: 800,
                fontSize: '1.2rem',
                background: 'var(--grad-text)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize: '.68rem',
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {label}
            </div>
          </div>
        ))}
    </a>
  );
}