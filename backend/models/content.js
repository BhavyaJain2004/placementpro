// const mongoose = require('mongoose');

// const noteSchema = new mongoose.Schema({
//   title:       { type: String, required: true },
//   category:    { type: String, enum: ['Java','Python','DSA','Aptitude'], required: true },
//   description: String,
//   content:     String,
//   pdfUrl:      String,
//   tags:        [String],
//   order:       { type: Number, default: 0 }
// }, { timestamps: true });

// const experienceSchema = new mongoose.Schema({
//   company:    { type: String, required: true },
//   author:     String,
//   year:       Number,
//   role:       String,
//   result:     { type: String, enum: ['Selected','Rejected','Waitlisted'] },
//   difficulty: { type: String, enum: ['Easy','Medium','Hard'] },
//   rounds: [{
//     name:        String,
//     description: String
//   }],
//   tips: String
// }, { timestamps: true });

// module.exports = {
//   Note:       mongoose.model('Note', noteSchema),
//   Experience: mongoose.model('Experience', experienceSchema)
// };
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },

  category: {
    type: String,
    enum: [
      'Java',
      'Python',
      'DSA',
      'Aptitude',
      'Core CS',
      'System Design',
      'Placement'
    ],
    required: true
  },

  description: String,
  content: String,
  pdfUrl: String,

  tags: {
    type: [String],
    default: []
  },

  order: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  author: String,
  year: Number,
  role: String,

  result: {
    type: String,
    enum: ['Selected', 'Rejected', 'Waitlisted']
  },

  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },

  rounds: [{
    name: String,
    description: String
  }],

  tips: String

}, { timestamps: true });

module.exports = {
  Note: mongoose.model('Note', noteSchema),
  Experience: mongoose.model('Experience', experienceSchema)
};