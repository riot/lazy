import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

register('@riotjs/register', pathToFileURL('./'))
