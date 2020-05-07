const express = require('express');
const router = express.Router();
const Act = require('../data/helpers/actionModel');
const Proj = require('../data/helpers/projectModel');

router.get('/', validateId, (req, res) => {//WORKS
  Act.get()
  .then(act => {
    res.status(200).json(act);
  }).catch(err => {
    console.log(err)
  })
})

router.get('/:id', validateId, (req, res) => {//Works
  const {id} = req.params;
  Act.get(id)
  .then(act => {
    res.status(200).json(act);
  }).catch(err => {
    console.log(err)
  })
})

router.post('/', action, (req, res) => {//WORKS
  const { body } = req;
  Act.insert(body)
    .then((act) => {
      res.status(201).json(act);
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'Error adding new Action ',
      });
    });
});

router.put('/:id', validateId, action, (req, res) => {//WORKS
  const {id} = req.params;
  const {body} = req;

  Act.update(id, body)
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

  Act.remove(id)
    .then(body => {
      if (body > 0 ) {
        res.status(200).json({message: 'Action has been deleted'})
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error removing action'
      })
    })
})

async function validateId(req, res, next) { 
  const { id } = req.params;
  try {
    const act = await Act.get(id);
    if (act) {
      req.act = act;
      next();
    } else {
      res.status(404).json({ message: 'invalid action id' });
    }
  } catch (err) {
    res.status(500).json({ error: 'The action could not be retrieved.' });
  }
}

function action (req, res, next) { 
  const { body } = req;
  if (!body || Object.entries(body).length === 0) {
    res.status(400).json({ message: 'missing data' });
  } else if (!body.project_id || !body.description || !body.notes) {
    res.status(400).json({ message: 'missing required project id, description or notes field' });
  } else {
    next();
  }
}

module.exports = router;