import { Router, Response } from 'express'

// Models
import { Plant } from '../models'

// Types
import { IPlantBody, CustomRequest } from 'typings'

export const plantRouter = Router()
const { create } = Plant

plantRouter
  .route('/plants')
  .get(async (req, res) => {
    try {
      res.json(await Plant.findAll())
    } catch (err) {
      res.status(500).send(err)
    }
  })
  .post(async (req: CustomRequest<IPlantBody>, res: Response) => {
    try {
      // Validators
      res.json(await create(req.body))
    } catch (err) {
      res.status(500).send(err)
    }
  })

plantRouter
  .route('/plant/:plant_id')
  .get(async (req, res) => {
    try {
      const foundPlant = await Plant.findById(req.params.plant_id)
      res.json(foundPlant)
    } catch (err) {
      res.status(500).send(err)
    }
  })
  .put(async (req, res) => {
    try {
      const foundPlant = await Plant.findById(req.params.plant_id)
      foundPlant.commonName = req.body.commonName
      foundPlant.edible = req.body.edible
      const savedPlant = await foundPlant.save()
      res.json(savedPlant)
    } catch (err) {
      res.status(500).send(err)
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedPlant = await Plant.findOneAndDelete({
        _id: req.params.plant_id,
      })
      res.json(deletedPlant)
    } catch (err) {
      res.status(500).send(err)
    }
  })
