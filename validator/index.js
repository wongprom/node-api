exports.createPostValidator = (req, res, next) => {
  // title
  req.check('title', 'write a title').notEmpty();
  req.check('title', 'title must be between 4 - 150 characters').isLength({
    min: 4,
    max: 150,
  });
  // body
  req.check('body', 'write a body').notEmpty();
  req.check('body', 'body must be between 4 - 2000 characters').isLength({
    min: 4,
    max: 2000,
  });

  //   check for errors
  const errors = req.validationErrors();
  // if error, show the first error that apr's
  if (errors) {
    const firstError = errors.map((error) => {
      return error.msg;
    })[0];

    return res.status(400).json({ error: firstError });
  }

  //   proceed to next middleware
  next();
};
