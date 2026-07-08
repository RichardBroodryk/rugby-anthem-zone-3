import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PrimaryNav.module.css";

import logo from "../../assets/images/ui/raz-logo.png";

import {
  buildSearchIndex,
  searchEntities,
  SearchEntity,
} from "../../data/searchIndex";

import { logoutUser } from "../../services/auth";

/**
 * PRIMARY NAV — WAVE 3
 * --------------------------------------------------
 * Single paid Rugby Anthem Zone navigation shell.
 *
 * Important:
 * - No freemium / premium / super nav variants
 * - One paid app home: /home
 * - Search should expose the full paid app surface,
 *   including heritage content
 *
 * Search note:
 * buildSearchIndex still uses the old tier-era index builder
 * contract underneath. For now we deliberately call the
 * "super" branch as a compatibility bridge because it contains
 * the full paid product surface we need in the one-tier app.
 *
 * Once searchIndex is rewritten for the one-tier model,
 * this should be replaced with a neutral full-access builder.
 */

const AVATAR_KEY = "raz_avatar";

export default function PrimaryNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [avatar, setAvatar] = useState<string | null>(
    localStorage.getItem(AVATAR_KEY)
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntity[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const homeRoute = "/home";

  /* ==================================================
     BUILD SEARCH INDEX
     --------------------------------------------------
     Transitional bridge:
     use the legacy "super" search surface because it
     contains the full paid app content set, including
     heritage and other formerly super-only content.
  ================================================== */
  useEffect(() => {
    setIndex(buildSearchIndex("super"));
  }, []);

  /* ==================================================
     SEARCH RESULTS
  ================================================== */
  const results = useMemo(() => {
    if (!query.trim()) return index.slice(0, 8);
    return searchEntities(query, index).slice(0, 8);
  }, [query, index]);

  /* ==================================================
     SYNC AVATAR
  ================================================== */
  useEffect(() => {
    function syncAvatar() {
      setAvatar(localStorage.getItem(AVATAR_KEY));
    }

    window.addEventListener("storage", syncAvatar);
    return () => window.removeEventListener("storage", syncAvatar);
  }, []);

  /* ==================================================
     CLOSE DROPDOWNS ON OUTSIDE CLICK
  ================================================== */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ==================================================
     CLOSE DROPDOWNS ON ROUTE CHANGE
  ================================================== */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  function handleNavigate(route: string) {
    if (!route) {
      console.warn("RAZ: invalid route");
      return;
    }

    setSearchOpen(false);
    setQuery("");
    navigate(route);
  }

  function handleLogout() {
    logoutUser();
    navigate("/welcome");
  }

  return (
    <nav className={styles.nav}>
      {/* LEFT */}
      <div className={styles.left}>
        <NavLink to={homeRoute} className={styles.logoLink}>
          <img
            src={logo}
            className={styles.logo}
            alt="Rugby Anthem Zone logo"
          />
        </NavLink>

        <button
          className={styles.homeButton}
          onClick={() => navigate(homeRoute)}
          aria-label="Go to home"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 10.5L12 3l9 7.5" />
            <path d="M5 10v10h14V10" />
          </svg>
        </button>
      </div>

      {/* RIGHT */}
      <div className={styles.actions}>
        {/* SEARCH */}
        <div ref={searchRef} className={styles.searchWrapper}>
          <button
            className={styles.iconButton}
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Open search"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          {searchOpen && (
            <div className={styles.searchDropdown}>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
                placeholder="Search Rugby Anthem Zone..."
              />

              <div className={styles.searchResults}>
                {results.length > 0 ? (
                  results.map((item) => (
                    <button
                      key={item.id}
                      className={styles.searchItem}
                      onClick={() => handleNavigate(item.route)}
                    >
                      <div>
                        <div className={styles.searchTitle}>{item.title}</div>
                        {item.subtitle && (
                          <div className={styles.searchSubtitle}>
                            {item.subtitle}
                          </div>
                        )}
                      </div>

                      <span className={styles.searchType}>{item.type}</span>
                    </button>
                  ))
                ) : (
                  <div className={styles.searchEmpty}>
                    No results found for “{query}”.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* CONTACT */}
        <button
          className={styles.iconButton}
          onClick={() => navigate("/contact")}
          aria-label="Contact Rugby Anthem Zone"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </button>

        {/* PROFILE */}
        <div ref={menuRef}>
          <button
            className={styles.profileButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open account menu"
          >
            {avatar ? (
              <img
                src={avatar}
                className={styles.navAvatar}
                alt="User profile avatar"
              />
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
            )}
          </button>

          {menuOpen && (
            <div className={styles.dropdown}>
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button onClick={() => navigate("/account/settings")}>
                Account Settings
              </button>
              <button onClick={() => navigate("/my-teams")}>My Teams</button>
              <button onClick={() => navigate("/notifications")}>
                Notifications
              </button>

              <div className={styles.divider} />

              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}