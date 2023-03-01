import { randomUUID } from 'crypto'
import { type Recado } from './recados'

export interface UserCreatModelDTO {
  nome: string
  email: string
  senha: string
}

export interface UserDataBaseDTO {
  id: string
  nome: string
  email: string
  senha: string
  recados: Recado[]
}

export class User {
  private _id: string
  private _senha: string
  private _nome: string
  private _email: string
  private _recados: Recado[]

  constructor (params: UserCreatModelDTO) {
    this._id = randomUUID()
    this._senha = params.senha
    this._nome = params.nome
    this._email = params.email
    this._recados = []
  }

  public get id () {
    return this._id
  }

  public get password () {
    return this._senha
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

  public get senha () {
    return this._senha
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
      senha: params.senha
    })
    usuario._id = params.id
    usuario._recados = params.recados

    return usuario
  }
}
