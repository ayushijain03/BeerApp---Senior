const getTypeString = (filterType: string) => {
  switch (filterType) {
    case "by_city":
      return "city";
    case "by_name":
      return "name";
    case "by_state":
      return "state";
    case "by_postal":
      return "postal";
    case "by_country":
      return "country";
    case "by_type":
      return "type";
    default:
      return "Unknown";
  }
};

export { getTypeString };
