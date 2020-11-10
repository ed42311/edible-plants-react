import { Schema, model } from 'mongoose'

import { IPlant, IPlantModel } from 'typings'

const plantSchema = new Schema(
  {
    commonName: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: false,
    },
    edible: {
      type: String,
      required: true,
    },
    picUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

plantSchema.static('create', async (attr: IPlant) => {
  const newPlant = new Plant(attr)
  const savedPlant = await newPlant.save()
  return savedPlant
})

plantSchema.static('findAll', async () => {
  return await Plant.find({})
})

export const Plant: IPlantModel = model<IPlant, IPlantModel>(
  'Plant',
  plantSchema
)
