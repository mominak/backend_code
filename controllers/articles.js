var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var Comment = mongoose.model('Comment');

exports.paramArticle = async function (req, res, next, slug) {
    Article.findOne({ slug: slug})
      .populate('author')
      .then(function (article) {
        if (!article) { return res.sendStatus(404); }
    
        req.article = article;
    
        return next();
      }).catch(next);
}

exports.paramComment = async function(req, res, next, id) {
    Comment.findById(id).then(function(comment){
      if(!comment) { return res.sendStatus(404); }
  
      req.comment = comment;
  
      return next();
    }).catch(next);
}