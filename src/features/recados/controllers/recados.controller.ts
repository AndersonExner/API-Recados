import { type Request, type Response } from 'express'
import { buscarUsuariosDB, salvarUsuariosBD } from '../../../db/users'
import { Recado } from '../../../models/recados'
import { type User } from '../../../models/user'
import { type ResponseAPI } from '../../responseAPI'

export class RecadosController {
  buscarRecados (request: Request, response: Response) {
    try {
      const { userID } = request.params

      const listaUsers = buscarUsuariosDB()

      const user = listaUsers.find((user) => user.id === userID) as User

      const resposta: ResponseAPI = {
        success: true,
        message: 'Recados de buscados',
        data: user.recados.map((recado) => recado)
      }

      return response.status(200).json(resposta)
    } catch (error: any) {
      const resposta: ResponseAPI = {
        success: false,
        message: error.message,
        data: null
      }

      return response.status(400).json(resposta)
    }
  }

  cadastrarRecado (request: Request, response: Response) {
    try {
      const { detail, description } = request.body
      const { userID } = request.params

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      const novoRecado = new Recado({ detail, description })

      listaUsers[indexUser].recados.push(novoRecado)

      salvarUsuariosBD(listaUsers)

      const resposta: ResponseAPI = {
        success: true,
        message: 'Recados de buscados',
        data: novoRecado
      }

      return response.status(200).json(resposta)
    } catch (error: any) {
      const resposta: ResponseAPI = {
        success: false,
        message: error.message,
        data: null
      }

      return response.status(400).json(resposta)
    }
  }

  editarRecado (request: Request, response: Response) {
    try {
      const { userID, recadoID } = request.params
      const { description, detail, check } = request.body

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      const indexRecado = listaUsers[indexUser].recados.findIndex((recado) => recado.id === recadoID)

      listaUsers[indexUser].recados[indexRecado].editarRecado({ description, detail, check })

      salvarUsuariosBD(listaUsers)

      const resposta: ResponseAPI = {
        success: true,
        message: 'Atualizado com sucesso',
        data: listaUsers[indexUser].recados[indexRecado].handleProperties()
      }

      return response.status(200).json(resposta)
    } catch (error: any) {
      const resposta: ResponseAPI = {
        success: false,
        message: error.message,
        data: null
      }

      return response.status(400).json(resposta)
    }
  }

  excluirRecado (request: Request, response: Response) {
    try {
      const { userID, recadoID } = request.params

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      const indexRecado = listaUsers[indexUser].recados.findIndex((recado) => recado.id === recadoID)

      listaUsers[indexUser].recados.splice(1, indexRecado)

      salvarUsuariosBD(listaUsers)

      const resposta: ResponseAPI = {
        success: true,
        message: 'Excluido com sucesso',
        data: listaUsers[indexUser].recados
      }

      return response.status(200).json(resposta)
    } catch (error: any) {
      const resposta: ResponseAPI = {
        success: false,
        message: error.message,
        data: null
      }

      return response.status(400).json(resposta)
    }
  }
}
