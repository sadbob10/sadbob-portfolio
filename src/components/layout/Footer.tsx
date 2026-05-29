import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Mail, ChevronUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useTranslation } from '../../hooks/useTranslation';
import '../../styles/footer.css';

export default function Footer(): ReactElement {
  const [showTop, setShowTop] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = (): void => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          {/* Logo */}
          <div
            className="footer-logo"
            onClick={goTop}
            role="button"
            tabIndex={0}
            aria-label="Scroll to top"
          >
            <span className="logo-sad">sad</span>
            <span className="logo-bob">bob</span>
            <span className="logo-dot">.</span>
          </div>

          {/* Center Info */}
          <div className="footer-center">
            <p className="footer-copy">
              {t.footer.designed}{' '}
              <span>Sadam Abate</span> · <em>@sadbob</em> · {new Date().getFullYear()}
            </p>
            <p className="footer-made">{t.footer.crafted}</p>
          </div>

          {/* Social Links */}
          <div className="footer-socials">
            <a
              href="https://github.com/sadbob10"
              target="_blank"
              rel="noreferrer"
              className="soc"
              aria-label="GitHub"
            >
              <GithubIcon size={17} />
            </a>

            <a
              href="https://www.linkedin.com/in/sadam-abate"
              target="_blank"
              rel="noreferrer"
              className="soc"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={17} />
            </a>

            <a
              href="mailto:abate.shallo@gmail.com"
              className="soc"
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        type="button"
        className={`scroll-top${showTop ? ' show' : ''}`}
        onClick={goTop}
        aria-label="Scroll to top"
      >
        <ChevronUp size={18} />
      </button>
    </>
  );
}