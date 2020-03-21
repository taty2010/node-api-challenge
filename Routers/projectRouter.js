const express = require('express');
const Proj = require('../data/helpers/projectModel');

const router = express.Router();

// const { validateId } = require('../middleware/');

router.get('/', (req, res) => {//WORKS
  Proj.get()
  .then(proj => {
    res.status(200).json(proj);
  }).catch(err => {
    console.log(err)
  })
})

router.get('/:id', validateId, (req, res) => {
  const {body} = req;

  res.status(200).json(req.proj);//WORKS

  // Proj.get(body)
  //   .then(proj => {
  //     res.status(200).json(proj);
  //   }).catch(err => {
  //     console.log(err);
  //     res.status(500).json({ Error: 'Error getting body'})
  //   })
})

router.get('/:id/actions', validateId, (req, res) => {//WORKS
  const {id} = req.params;
  Proj.getProjectActions(id)
    .then(proj => {
      res.status(200).json(proj)
    }).catch(err => {
      console.log(err);
    })
})

router.post('/', project, (req, res) => {//WORKS
  const { body } = req;
  Proj.insert(body)
    .then((proj) => {
      res.status(201).json(proj);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Error adding new Project ',
      });
    });
});

router.put('/:id', validateId, project, (req, res) => {//WORKS
  const {id} = req.params;
  const {body} = req;

  Proj.update(id, body)
    .then(() => {
      res.status(201).json(body);
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'Error updating Project'
      })
    })
})

router.delete('/:id', validateId, (req, res) => {//WORKS
  const {id} = req.params;

  Proj.remove(id)
    .then(proj => {
      if (proj > 0 ) {
        res.status(200).json({message: 'Project has been deleted'})
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error removing project'
      })
    })
})


async function validateId(req, res, next) { //* COMPLETE *//
  const { id } = req.params;
  try {
    const proj = await Proj.get(id);
    if (proj) {
      req.proj = proj;
      next();
    } else {
      res.status(404).json({ message: 'invalid project id' });
    }
  } catch (err) {
    res.status(500).json({ error: 'The Project could not be retrieved.' });
  }
}

function project (req, res, next) { 
  const { body } = req;
  if (!body || Object.entries(body).length === 0) {
    res.status(400).json({ message: 'missing data' });
  } else if (!body.name || !body.description) {
    res.status(400).json({ message: 'missing required name or description field' });
  } else {
    next();
  }
}

module.exports = router;