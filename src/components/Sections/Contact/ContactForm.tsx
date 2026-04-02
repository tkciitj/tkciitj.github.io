import {FC, memo, useCallback, useMemo, useState} from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data, setData] = useState<FormData>(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{type: 'success' | 'error'; message: string} | null>(null);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;
      const fieldData: Partial<FormData> = {[name]: value};
      setData({...data, ...fieldData});
    },
    [data],
  );

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      setFeedback(null);

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          setFeedback({type: 'success', message: "Message sent successfully! I'll get back to you soon."});
          setData(defaultData);
        } else {
          setFeedback({type: 'error', message: result.message || 'Failed to send message. Please try again.'});
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setFeedback({type: 'error', message: 'An error occurred. Please try again later.'});
      } finally {
        setIsLoading(false);
      }
    },
    [data, defaultData],
  );

  const inputClasses = `
    bg-white/10 backdrop-blur-md border border-white/20 
    focus:outline-none focus:ring-2 focus:ring-mint-400 
    placeholder:text-neutral-400 text-white text-sm 
    rounded-xl px-4 py-3 transition-all duration-200
  `;

  return (
    <form className="grid grid-cols-1 gap-y-5 min-h-[320px]" method="POST" onSubmit={handleSendMessage}>
      <input
        className={inputClasses}
        name="name"
        onChange={onChange}
        placeholder="Your Name"
        required
        type="text"
        value={data.name}
      />
      <input
        autoComplete="email"
        className={inputClasses}
        name="email"
        onChange={onChange}
        placeholder="Your Email"
        required
        type="email"
        value={data.email}
      />
      <textarea
        className={inputClasses}
        maxLength={300}
        name="message"
        onChange={onChange}
        placeholder="Your Message"
        required
        rows={6}
        value={data.message}
      />

      {/* Feedback Message */}
      {feedback && (
        <div
          className={`p-3 rounded-lg text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-green-500/20 text-green-200 border border-green-500/30'
              : 'bg-red-500/20 text-red-200 border border-red-500/30'
          }`}>
          {feedback.message}
        </div>
      )}

      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-mint-500 text-mint-300 
                   hover:bg-mint-500 hover:text-black hover:border-mint-400 
                   px-6 py-2 text-sm font-semibold shadow-lg transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-mint-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
        type="submit">
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
