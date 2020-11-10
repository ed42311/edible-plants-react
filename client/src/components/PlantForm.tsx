import React, { FC } from 'react'
import { Card, CardContent, Button, TextField } from '@material-ui/core'

interface IPlant {
  commonName: string
}

interface IPlantForm {
  onSubmit: () => void
  onChange: () => void
  plant: IPlant
}

export const PlantForm: FC<IPlantForm> = ({ onSubmit, onChange, plant }) => (
  <Card>
    <CardContent>
      <form action="/" onSubmit={onSubmit}>
        <h2 className="card-heading">Add A New Plant</h2>
        <TextField
          name="commonName"
          label="Common Name"
          value={plant.commonName}
          onChange={onChange}
          margin="normal"
        />
        <div>
          <Button type="submit" color="primary">
            Create New Plant
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
)
