export const getCustomId = (path: string) => {
  const match = path.match(/@([^/]+)/);
  return match ? match[1] : null;
};
