import service from '../service.js';

const notFound = async (req, res, next) =>
    next(service.createError('Invalid path / route not found!', 404));

export default notFound;
