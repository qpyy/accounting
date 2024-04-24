const formatDate = (dateString, format) => {
  const date = new Date(dateString);

  switch (format) {
    case "ISO":
      return date.toISOString();
    case "DD.MM.YYYY":
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    default:
      return "Формат не поддерживается";
  }
};

export default formatDate;
