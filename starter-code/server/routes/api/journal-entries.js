const express       = require('express');
const router        = express.Router();

const cloudinary = require('cloudinary');
const uploadCloud = require('../../config/cloudinary');

const Entry         = require('../../models/journal-entry');

router.get('/journal-entries', (req, res, next) => {
  Entry.find({}, (err, entries) => {
    if (err) { return res.json(err).status(500); }

    return res.json(entries);
  });
});

router.get('/journal-entries/:id', (req, res, next) => {
  Entry.findById(req.params.id, (err, entry) => {
    if (err)    { return res.json(err).status(500); }
    if (!entry) { return res.json(err).status(404); }

    return res.json(entry);
  });
});

router.post('/journal-entries', uploadCloud.single('img'), (req, res, next) => {
  
console.log('here', req.body);
console.log('files ======= :', req.file)

  const newEntry = new Entry({
    title: req.body.title,
    content: req.body.content,
    // image: []
  });

  if(req.file){
    newEntry.image = req.file.url;
      // const theImages = req.files;
      // theImages.forEach(eachImg =>{
      //     console.log("each image:", eachImg);
      //     newEntry.image.push(eachImg.url);
      // });
  }

  newEntry.save( (err) => {
    if (err)             { 
      return res.status(500).json(err) 
    }
    if (newEntry.errors) { 
      return res.status(400).json(newEntry) 
    }
    
    return res.json(newEntry);
  });
});

module.exports = router;
