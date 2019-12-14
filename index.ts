import axios from 'axios'
import express, {Router} from 'express'
import http from 'http'
import {loginRoute, loginCallback} from './routes'

const setupRoutes = ():Router => {
	const router = Router()
	router.get('/login', loginRoute)
	router.get('/callback', loginCallback)
	return router
}

const startServer = async (): Promise<void> => {
    try {
		const app = express()
		app.use(setupRoutes())
		const port = process.env.PORT || 3000
		const server = http.createServer(app)
        server.listen(port, (): void => console.log(`Server listening on port ${port}!`))    
    } catch (err) {
        console.log(err)
    }
}

startServer()