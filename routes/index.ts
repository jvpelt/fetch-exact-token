import axios from "axios"
import {stringify} from 'querystring'

export const loginRoute = (_req: Express.Request, res: any) => {
	res.redirect(`https://start.exactonline.nl/api/oauth2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&force_login=0`)
}

export const loginCallback = async (req: any, res: any) => {
	try {
		const tokenRes = await axios.post(
		  'https://start.exactonline.nl/api/oauth2/token',
		  stringify({
			code: req.query.code,
			redirect_uri: process.env.REDIRECT_URI,
			grant_type: 'authorization_code',
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET
		  }),
		  {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
		)
		res.json(tokenRes.data)
	  } catch (error) {
		res.json(error)
	  }
	}