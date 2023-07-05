import yargs, { type Argv, type ArgumentsCamelCase } from 'yargs'

import { bootstrap, createsuperuser } from './cli'

yargs
  .strict()
  .command(
    'bootstrap [port] [host]',
    'Bootstrap application',
    (setup: Argv): void => {
      setup
        .positional('port', { type: 'number', describe: 'Port', default: 8000 })
        .positional('host', { type: 'string', describe: 'Host', default: '::' })
    },
    async (args: ArgumentsCamelCase): Promise<void> => {
      await bootstrap(Number(args.port), String(args.host))
    }
  )
  .command(
    'createsuperuser [email] [firstName] [lastName] [password]',
    'Create admin user',
    (setup: Argv): void => {
      setup
        .positional('email', { type: 'string', describe: 'Email' })
        .positional('firstName', { type: 'string', describe: 'First name' })
        .positional('lastName', { type: 'string', describe: 'Last name' })
        .positional('password', { type: 'string', describe: 'Password' })
    },
    async (args: ArgumentsCamelCase): Promise<void> => {
      await createsuperuser(String(args.email), String(args.firstName), String(args.lastName), String(args.password))
    }
  ).argv
