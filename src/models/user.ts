import { randomUUID } from 'crypto'
import { type Recado } from './recados'

export interface UserCreatModelDTO {
  nome: string
  email: string
  password: string
}

export interface UserDataBaseDTO {
  id: string
  nome: string
  email: string
  password: string
  recados: Recado[]
}

export class User {
  private _id: string
  private _password: string
  private _nome: string
  private _email: string
  private _recados: Recado[]

  constructor (params: UserCreatModelDTO) {
    this._id = randomUUID()
    this._password = params.password
    this._nome = params.nome
    this._email = params.email
    this._recados = []
  }

  public get id () {
    return this._id
  }

  public get nome () {
    return this._nome
  }

  public get email () {
    return this._email
  }

  public get recados () {
    return this._recados
  }

  public get password () {
    return this._password
  }

  handleProperties () {
    return {
      id: this.id,
      nome: this.nome,
      email: this._email,
      recados: this.recados
    }
  }

  static criarUsuarioBD (params: UserDataBaseDTO) {
    const usuario = new User({
      nome: params.nome,
      email: params.email,
      password: params.password
    })
    usuario._id = params.id
    usuario._recados = params.recados

    return usuario
  }
}
