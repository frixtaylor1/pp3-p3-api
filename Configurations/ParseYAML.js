
async function parseYAML(yamlString) 
{
  const lines = yamlString.split('\n');
  const yamlObject = {};
  let currentKey = '';

  for (const line of lines) 
  {
    const trimmedLine = line.trim();
    //verifica que la linea actual no este vacia o no sea un comentario,
    //si es una o la otra,procesa la siguiente linea
    if (!trimmedLine || trimmedLine.startsWith('#')) 
    {
      continue;
    }

    if (trimmedLine.endsWith(':')) 
    {
      currentKey = trimmedLine.replace(/:$/, '').trim();
      yamlObject[currentKey] = {};
    } else 
    {
      const [key, value] = trimmedLine.split(':').map(part => part.trim());
      if (key && value) 
      {
        yamlObject[currentKey][key] = value;
      }
    }
  }

  return yamlObject;
}

module.exports = { parseYAML };