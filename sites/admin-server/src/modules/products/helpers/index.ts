export type SheetKey = 'STT' | 'encode_key' | 'value';

export const parseSheetInventoryData = (dataValue: any[][]) => {
  const header = dataValue[0];
  const data = dataValue.slice(1);
  const items = data.map((item) => {
    const obj: any = {};
    item.forEach((value, index) => {
      obj[header[index]] = value;
    });
    return obj as Record<SheetKey, string>;
  });

  return items;
};

// ex: -  https://docs.google.com/spreadsheets/d/18ri-ClGX3o3bYqPN6xRkpAY6YvFlHzltL04-TePCl0s/edit#gid=996304417
// - https://docs.google.com/spreadsheets/d/18ri-ClGX3o3bYqPN6xRkpAY6YvFlHzltL04-TePCl0s
// return id => 18ri-ClGX3o3bYqPN6xRkpAY6YvFlHzltL04-TePCl0s
// and gid => 996304417
export const getSheetInfoFormUrl = (url: string) => {
  // use regex to get id and gid from url, gid can be empty
  const regex = /\/d\/(.*?)\/(edit#gid=)?(.*)/g;
  const match = regex.exec(url);
  if (match) {
    return {
      id: match[1] || '',
      gid: match[3] || '',
    };
  }
  return null;
};
