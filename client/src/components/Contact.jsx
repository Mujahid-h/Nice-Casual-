import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_0y0njes",
        "template_wc4k9rk",
        form.current,
        "YJ6kCDb_BdkQprYGv"
      )
      .then(
        (result) => {
          form.current.reset();
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 6000);
        },
        (error) => {
          console.error(error.text);
        }
      );
  };

  return (
    <div className="flex flex-col justify-center items-center pb-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <p className="mb-8 text-center text-lg text-gray-600">
          Feel free to reach out to me for any questions or opportunities!
        </p>
        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 border-2 border-e-gray-300 px-4 py-4 rounded">
            <div>
              <label
                htmlFor="from_email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label
                htmlFor="from_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Subject"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Send
            </button>
          </div>
        </form>
        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            Message sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
