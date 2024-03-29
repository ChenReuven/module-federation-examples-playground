export default () => async (req, res, next) => {
  const renderer = (await import('./render')).default;
  return renderer(req, res, next);
};
