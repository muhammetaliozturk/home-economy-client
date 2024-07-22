/*
 * Created on 22.05.2022
 *
 * @author  Muhammet Ali ÖZTÜRK
 * Copyright (c) AKRA
 */

import http from '@/libs/axios'
import jwtDefaultConfig from '../@core/auth/jwt/jwtDefaultConfig'
// import authentication from './authentication'

class ServiceFactory {
    static END_POINT;

    // jwtConfig <= Will be used by this service
    static jwtConfig = { ...jwtDefaultConfig }

    static returnToken() {
      // Get token from localStorage
      // const accessToken = authentication.getToken()

      return {
        headers: {
          // Authorization: `${this.jwtConfig.tokenType} ${accessToken}`,
        },
      }
    }

    // static returnTokenWithoutAuth() {
    //   // Get token from localStorage
    //   const accessToken = authentication.getToken()
    //   return `${this.jwtConfig.tokenType} ${accessToken}`
    // }

    static register(name) {
      this.END_POINT = name
      return ServiceFactory
    }

    static getAll() {
      return http.get(this.END_POINT, this.returnToken)
    }

    static getAllActive() {
      return http.get(`${this.END_POINT}all-active`, this.returnToken)
    }

    static getById(id) {
      return http.get(this.END_POINT + id, this.returnToken)
    }

    static create(data) {
      return http.post(this.END_POINT, data, this.returnToken)
    }

    static update(id, data) {
      return http.put(this.END_POINT + id, data, this.returnToken)
    }

    static deleteById(id) {
      return http.delete(this.END_POINT + id, this.returnToken)
    }

    static getByUserId(userId) {
      return http.get(`${this.END_POINT}getByUserId/${userId}`, this.returnToken)
    }
}

export default ServiceFactory
