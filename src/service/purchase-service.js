/*
 * Created on 22.05.2022
 *
 * @author  Muhammet Ali ÖZTÜRK
 * Copyright (c) AKRA
 */

import http from '@/libs/axios'
import AbstractService from './abstract-service'

class PurchaseService extends AbstractService {
    // static getAllForMap() {
    //     return http.get(this.END_POINT + 'getAllForMap', this.returnToken)
    // }
}

AbstractService.register('Purchase/', () => new PurchaseService())

export default PurchaseService
