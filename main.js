import fs from 'fs'
import path from 'path'

import express from 'express'
import ejs from 'ejs'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

const port = 8080
const publicFolder = 'public'
const indexMarkdown = 'index.md'

function loadView(name) {
    return fs.readFileSync( path.join('views', (name + '.ejs')), 'utf-8' )
}

const markdownView = loadView('markdown')

const app = express()

app.get('/*', (req, res) => {
    const url = req.url

    // File name has dot it it?
    if (url.split('/').at(-1).includes('.')) {
        // Serve static file
        if (!fs.existsSync(path.join(publicFolder, url))) {
            return res.sendStatus(404)
        }
        return res.sendFile(url, { root: publicFolder })
    }
    
    // Render markdown
    const mdPath = path.join(publicFolder, url, indexMarkdown)
    if (!fs.existsSync(mdPath)) {
        return res.sendStatus(404)
    }
    
    const md = fs.readFileSync(mdPath, 'utf-8')
    const mdhtml = sanitizeHtml( marked.parse(md) )

    res.contentType('html')
    res.send(ejs.render(markdownView, {
        md: mdhtml
    }))
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})