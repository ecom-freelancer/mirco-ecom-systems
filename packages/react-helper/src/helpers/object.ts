export const cleanObject = <T extends object>(obj: T) => {
  const cloneObject = { ...obj };
  for (const key in cloneObject) {
    // eslint-disable-next-line no-prototype-builtins
    if (cloneObject.hasOwnProperty(key)) {
      if (
        cloneObject[key] === false ||
        cloneObject[key] === null ||
        cloneObject[key] === undefined ||
        (typeof cloneObject[key] === 'object' &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Object.keys((cloneObject as any)[key]).length === 0)
      ) {
        delete cloneObject[key];
      }
    }
  }
  return cloneObject;
};
