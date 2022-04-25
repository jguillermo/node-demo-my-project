export function toJson(data: string): any {
  let dataJson = {};
  try {
    dataJson = JSON.parse(data);
  } catch (error) {
    throw new Error('JSON parse Error:' + error);
  }
  return dataJson;
}
