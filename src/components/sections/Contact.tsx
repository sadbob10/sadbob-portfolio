import { useState } from 'react';
import type { ReactElement, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Send, Loader } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import SplitText from '../ui/SplitText';
import { useGSAPFade, useGSAPStagger } from '../../hooks/useGSAP';
import { useTranslation } from '../../hooks/useTranslation';
import '../../styles/contact.css';

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact(): ReactElement {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const { t } = useTranslation();
  const c = t.contact;

  // GSAP Animations
  const leftRef = useGSAPFade('left', 0.1);
  const rightRef = useGSAPFade('right', 0.2);
  const linksRef = useGSAPStagger(0.12, 0.2);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: 'Sadam',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
      );

      setStatus('success');
      setForm({ name: '', email: '', message: '' });

      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <>
      <div className="sec-divider" />

      <section className="contact" id="contact">
        {/* Header */}
        <p className="mono-label">{c.tag}</p>
        <div className="section-heading">
          <SplitText text={c.title1} className="word-accent" staggerMs={55} />
          <SplitText text={c.title2} className="word-plain" staggerMs={55} delayMs={200} />
          {c.title3 && (
            <SplitText text={c.title3} className="word-plain" staggerMs={45} delayMs={400} />
          )}
        </div>

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info" ref={leftRef as React.RefObject<HTMLDivElement>}>
            <p>{c.desc}</p>

            <div className="contact-items" ref={linksRef as React.RefObject<HTMLDivElement>}>
              <a href="mailto:abate.shallo@gmail.com" className="contact-item">
                <div className="ci-icon">
                  <Mail size={17} />
                </div>
                <div>
                  <div className="ci-label">// email</div>
                  <div className="ci-value">abate.shallo@gmail.com</div>
                </div>
              </a>

              <a
                href="https://github.com/sadbob10"
                target="_blank"
                rel="noreferrer"
                className="contact-item"
              >
                <div className="ci-icon">
                  <GithubIcon size={17} />
                </div>
                <div>
                  <div className="ci-label">// github</div>
                  <div className="ci-value">github.com/sadbob10</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/sadam-abate"
                target="_blank"
                rel="noreferrer"
                className="contact-item"
              >
                <div className="ci-icon">
                  <LinkedinIcon size={17} />
                </div>
                <div>
                  <div className="ci-label">// linkedin</div>
                  <div className="ci-value">linkedin.com/in/sadam-abate</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrap" ref={rightRef as React.RefObject<HTMLDivElement>}>
            <h3 className="form-title">{c.formTitle}</h3>
            <p className="form-sub">{c.formSub}</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  {c.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder={c.namePlaceholder}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  {c.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder={c.emailPlaceholder}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  {c.msgLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder={c.msgPlaceholder}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <Loader size={16} />
                    {c.sending}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {c.send}
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="form-success">
                  {c.success}
                </div>
              )}

              {status === 'error' && (
                <div className="form-error">
                  {c.error}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}