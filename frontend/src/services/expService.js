import { httpService } from './httpService'

export const expService = {
    getExps,
    getById,
    remove,
    update,
    add,
    getEmptyExp
}

function getExps() {
    return httpService.get('exp')
}

function getById(expId) {
    return httpService.get(`exp/${expId}`)
}
function remove(expId) {
    return httpService.delete(`exp/${expId}`)
}

function update(exp) {
    return httpService.put(`exp/${exp._id}`, exp)
}
function add(exp) {
    return httpService.post(`exp/${exp._id}`, exp)
}

function getEmptyExp(){
    return     {
        'name': '',
        'title': '',
        'desc': '',
        'price': '',
        'capacity': {
          'min': '',
          'max': ''
        },
        'schedule': '',
        'tags': [],
        'imgUrls': [],
        'location': {
          'address': '',
          'city': '',
        }
    }
}