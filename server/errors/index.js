'use strict';

const
viewErrorMessage = 'error-message'; // server/views/error-message.html

exports.notFound = (req, res, next) => {

  const locals = {
    title: 'Not Found',
    message: 'Sorry, but the page you were trying to view does not exist.',
    reasons: [
      'a mistyped address',
      'an out-of-date link'
    ]
  };

  res.status(404).render(viewErrorMessage, locals, (err, html) => {
    if(err) return next(err);
    res.send(html);
  });
};
