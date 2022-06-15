import fs from 'fs'
import yaml from 'js-yaml'

export default yaml.load(fs.readFileSync('config.yml', 'utf-8'))