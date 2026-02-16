import { countryCodes } from "../hooks/countryCodes";

export const Flags = ({ country, size = 40 }) => {
  const code = countryCodes(country);

  return (
    <img
      src={`https://flagcdn.com/w${size}/${code}.png`}
      srcSet={`https://flagcdn.com/w${size * 2}/${code}.png 2x`}
      alt={`Flag of ${country}`}
      className="inline-block object-cover rounded-sm shadow-sm"
      style={{ width: 80, height: 40 }} 
    />
  );
};