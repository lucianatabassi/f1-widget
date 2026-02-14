
export const countryCodes = (countryName) => {
  if (!countryName) return "xx"; 

  const map = {
    "Bahrain": "bh",
    "Saudi Arabia": "sa",
    "Australia": "au",
    "Japan": "jp",
    "China": "cn",
    "USA": "us",
    "United States": "us",
    "Miami": "us",
    "Las Vegas": "us",
    "Italy": "it",
    "Monaco": "mc",
    "Canada": "ca",
    "Spain": "es",
    "Austria": "at",
    "UK": "gb",
    "Great Britain": "gb",
    "Hungary": "hu",
    "Belgium": "be",
    "Netherlands": "nl",
    "Azerbaijan": "az",
    "Singapore": "sg",
    "Austin": "us",
    "Mexico": "mx",
    "Brazil": "br",
    "Qatar": "qa",
    "UAE": "ae",
    "Abu Dhabi": "ae"
  };

  return map[countryName] || "un";
};