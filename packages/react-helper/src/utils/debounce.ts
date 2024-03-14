export const debounceAsync = <R, T extends (...args) => Promise<R>>(
  func: T,
  onResolve: (res: R) => void,
  wait = 0,
): ((...args: Parameters<T>) => void) => {
  let timerId, latestResolve;

  return (...args) => {
    return new Promise((resolve, reject) => {
      latestResolve = resolve;
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args)
          .then((res) => {
            if (latestResolve != resolve) {
              resolve(null);
            } else {
              onResolve(res);
              resolve(res);
              timerId = latestResolve = null;
            }
          })
          .catch(reject);
      }, wait);
    });
  };
};
