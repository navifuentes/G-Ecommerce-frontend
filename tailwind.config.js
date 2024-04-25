/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "add-product":
          "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcrampt.com%2Fwp-content%2Fuploads%2F2021%2F05%2Fstoring-belongings-women-with-box.jpg&f=1&nofb=1&ipt=1d05240d2893c31ccb8ef371017bc5350418540e1a7015c777084730318bb55f&ipo=images')",
      },
    },
  },
  plugins: [],
};
