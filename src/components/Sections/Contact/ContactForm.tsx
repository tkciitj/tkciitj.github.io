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
      console.log('Data to send: ', data);
    },
    [data],
  );

  const inputClasses = `
    bg-white/10 backdrop-blur-md border border-white/20 
    focus:outline-none focus:ring-2 focus:ring-mint-400 
    placeholder:text-neutral-400 text-white text-sm 
    rounded-xl px-4 py-3 transition-all duration-200
  `;

  return (
    <form className="grid grid-cols-1 gap-y-5 min-h-[320px]" method="POST" onSubmit={handleSendMessage}>
      <input className={inputClasses} name="name" onChange={onChange} placeholder="Your Name" required type="text" />
      <input
        autoComplete="email"
        className={inputClasses}
        name="email"
        onChange={onChange}
        placeholder="Your Email"
        required
        type="email"
      />
      <textarea
        className={inputClasses}
        maxLength={300}
        name="message"
        onChange={onChange}
        placeholder="Your Message"
        required
        rows={6}
      />
      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-mint-500 text-mint-300 
                   hover:bg-mint-500 hover:text-black hover:border-mint-400 
                   px-6 py-2 text-sm font-semibold shadow-lg transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-mint-500 focus:ring-offset-2"
        type="submit">
        Send Message
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
