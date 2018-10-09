const express = require('express');
const mongoose = require('mongoose');
const app = express();

const router = express.Router();
const Plant = require('../models/plant');

router.route('/plants')
  .post((req, res) => {
    let plant = new Plant();
    for (let key in req.body) {
      plant[key] = req.body[key];
    }
    plant.save((err, plant) => {
      if (err)
        res.send(err);
      res.json({
        message: "Plant Saved",
        plant
      });
    });
  })
  .get((req, res) => {
     Plant.find({}, (err, plants) => {
      if (err) {
        res.send(new Error(err));
      } else {
        res.status(200).json({
          secretData: "You're authorized to see this secret message.",
          plants,
          user: req.user
        });
      }
     });
  })

  router.route('/plants/:plant_id')
    .get((req, res) => {
      Plant.findById(req.params.plant_id, (err, plant) => {
        if (err)
          res.send(err);
        res.json({
          message: "Plant Found!",
          plant
        });
      });
    })
    .put((req, res) => {
      Plant.findById(req.params.plant_id, (err, plant) => {
        if (err)
          res.send(err);
        for (key in req.body) {
          plant[key] = req.body[key];
        }

        plant.save((err, plant) => {
          if (err)
            res.send(err);
          res.json({
            message: "Plant Updated!",
            plant
          });
        });
      });
    })

    module.exports = router;