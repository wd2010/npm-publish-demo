
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process';

export const rl = readline.createInterface({ input, output });
export const PORT = 3000
export const HOST = '127.0.0.1'