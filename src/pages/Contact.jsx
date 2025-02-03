import React from "react";

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Contact Us</h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-stone-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-stone-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-stone-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
