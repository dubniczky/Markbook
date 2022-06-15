import fs from 'fs'
import path from 'path'
import config from 'markbook/modules/config.js'

export function load(name) {
    const loc = path.join('views', (name + config.templateType))
    try {
        return fs.readFileSync(loc, 'utf-8')
    }
    catch (e) {
        console.log('Invalid template loaded:', name, loc)
        return null
    }
}

export default {
    load: load
}