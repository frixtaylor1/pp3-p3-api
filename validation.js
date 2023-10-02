// Función para validar si una cadena no está vacía
function isNotEmpty(value) {
  return value !== undefined && value !== null && value.trim() !== "";
}

// Función para validar el formato de correo electrónico
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

// Función para validar si una cadena es una fecha válida en formato "YYYY-MM-DD"
function isValidDate(dateString) {
  // El formato esperado es "YYYY-MM-DD"
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(dateString)) {
    return false;
  }

  const parts = dateString.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Verificar si es una fecha válida en el calendario gregoriano
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

module.exports = {
  isNotEmpty,
  isValidEmail,
  isValidDate,
};
