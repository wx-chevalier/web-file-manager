export const getGoBackPath = (path: string) => {
  const newPath = path.split('/');

  newPath.splice(newPath.length - 1, 1);

  return newPath.join('/');
};
