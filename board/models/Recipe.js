var mongoose = require('mongoose');

// 자취레시피 게시판에 대한 recipeSchema 생성.
var recipeSchema = mongoose.Schema({
  title:{type:String, required:[true,'Title is required!']},
  body:{type:String, required:[true,'Body is required!']},
  author:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
  createdAt:{type:Date, default:Date.now},
  updatedAt:{type:Date},
  numId:{type:Number},
  attachment:{type:mongoose.Schema.Types.ObjectId, ref:'file'},
  createdAt:{type:Date, default:Date.now},
});

// model + export
var Recipe = mongoose.model('recipe', recipeSchema);
module.exports = Recipe;
