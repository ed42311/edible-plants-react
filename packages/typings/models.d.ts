import { Document, Model } from 'mongoose'

// Plants
interface IPlantDocument extends Document {
  commonName: string
  scientificName?: string
  edible: boolean
  picUrl?: string
}

export interface IPlant extends IPlantDocument {
  // Statics
  create(attr: IPlantDocument): Promise<IPlantDocument>
}

export interface IPlantModel extends Model<IPlant> {
  findAll(): Promise<Array<IPlantDocument>>
}

// Users
interface IUserDocument extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IUserFormBody {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IUser extends IUserDocument {}

export interface IUserModel extends Model<IUser> {
  validatePassword(password: string): boolean
}
