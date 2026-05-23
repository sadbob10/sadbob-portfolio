import { useState } from 'react';
import type { ReactElement, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Send, Loader } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import SplitText from '../ui/SplitText';
import { useGSAPFade, useGSAPStagger } from '../../hooks/useGSAP';
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

  // GSAP Animations
  const leftRef = useGSAPFade('left', 0.1);
  const rightRef = useGSAPFade('right', 0.2);
  const linksRef = useGSAPStagger(0.1, 0.3);

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
        <p className="mono-label">Get In Touch</p>
        <div className="section-heading">
          <SplitText text="Let's" className="word-accent" staggerMs={55} />
          <SplitText text=" Build" className="word-plain" staggerMs={55} delayMs={200} />
          <SplitText text=" Together" className="word-plain" staggerMs={45} delayMs={400} />
        </div>

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info" ref={leftRef}>
            <p>
              Have a project in mind? Looking for a reliable{' '}
              <strong>full stack developer</strong>? I'm currently
              available for <strong>freelance projects</strong> and{' '}
              <strong>full-time opportunities</strong>.
              Let's create something great.
            </p>

            <div className="contact-items" ref={linksRef as any}>
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
          <div className="contact-form-wrap" ref={rightRef}>
            <h3 className="form-title">Send a Message 👋</h3>
            <p className="form-sub">I reply within 24 hours. Don't hesitate!</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  // your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Abebe Kebede"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  // your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="abebe@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  // message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Hi Sadam, I have a project idea..."
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
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="form-success">
                  ✅ Message sent! I'll reply within 24 hours.
                </div>
              )}

              {status === 'error' && (
                <div className="form-error">
                  ❌ Something went wrong. Please email me directly at{' '}
                  <a href="mailto:abate.shallo@gmail.com">
                    abate.shallo@gmail.com
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}