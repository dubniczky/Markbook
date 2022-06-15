// Core modules
import fs from 'fs'
import path from 'path'
// Package modules
import express from 'express'
import ejs from 'ejs'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
// Custom modules
import config from 'markbook/modules/config.js'
import template from 'markbook/modules/template.js'

const templates = {
    markdown: template.load('markdown')
}

const app = express()

app.get('/*', (req, res) => {
    const url = req.url

    // File name has dot it it?
    if (url.split('/').at(-1).includes('.')) {
        // Serve static file
        if (!fs.existsSync(path.join(config.publicFolder, url))) {
            return res.sendStatus(404)
        }
        return res.sendFile(url, { root: config.publicFolder })
    }
    
    // Render markdown
    const mdPath = path.join(config.publicFolder, url, config.markdownIndex)
    if (!fs.existsSync(mdPath)) {
        return res.sendStatus(404)
    }
    
    const md = fs.readFileSync(mdPath, 'utf-8')
    const mdhtml = sanitizeHtml( marked.parse(md) )

    res.contentType('html')
    res.send(ejs.render(templates.markdown, {
        md: mdhtml
    }))
})

app.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}`)
})