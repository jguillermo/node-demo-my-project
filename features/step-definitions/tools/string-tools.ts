export function toJson(data: string): any {
  let dataJson = {};
  try {
    dataJson = JSON.parse(data);
  } catch (error) {
    throw new Error('JSON parse Error:' + error);
  }
  return processData(dataJson);
}

export function processData(data: any): any {
  if (Array.isArray(data)) {
    data.forEach((element, index) => {
      data[index] = processData(element);
    });
  } else if (isObject(data)) {
    const claves = Object.keys(data);
    for (let i = 0; i < claves.length; i++) {
      const clave = claves[i];
      data[clave] = processData(data[clave]);
    }
  } else {
    data = processString(data);
  }
  return data;
}

function processString(data: any) {
  if (typeof data === 'string' || data instanceof String) {
    const position = data.search(/^Date\([\d]{4}\-[\d]{2}\-[\d]{2}\)$/);
    if (position === 0) {
      data = new Date(data.substring(5, 15));
    }
  }
  return data;
}

function isObject(obj) {
  return obj != null && obj.constructor.name === 'Object';
}
