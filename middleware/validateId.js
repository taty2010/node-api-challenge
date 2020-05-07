async function validateId(req, res, next) { //* COMPLETE *//
  // do your magic!
  const { id } = req.params;
  try {
    const proj = await Proj.get(id);
    if (proj) {
      req.proj = proj;
      next();
    } else {
      res.status(404).json({ message: 'invalid user id' });
    }
  } catch (err) {
    res.status(500).json({ error: 'The user information could not be retrieved.' });
  }
}

module.exports = validateId;