import * as commander from 'commander';
import * as _ from 'lodash';

export class Options {
  public jsonrpc?: string;
  public queryMaxSize?: number;
  public port?: number;
  public batching?: boolean;
  public caching?: boolean;
}

const ETH_RPC_PROTOCOL = process.env.ETH_RPC_PROTOCOL || 'http';
const ETH_RPC_HOST = process.env.ETH_HOST || 'localhost';
const ETH_RPC_PORT = process.env.ETH_PORT || 8545;

/* tslint:disable */
const options: Options | commander.Command = commander
  .version('0.0.1')
  .option(
    '-j, --jsonrpc <endpoint>',
    'specify the JSON-RPC endpoint [e.g., https://mainnet.infura.io/${INFURA_ID} or https://localhost:8545]; supported transports: http, https, wss, ipc',
    `${ETH_RPC_PROTOCOL}://${ETH_RPC_HOST}:${ETH_RPC_PORT}`,
  )
  .option(
    '-m, --query-max-size <limit>',
    'specify the maximum number of elements allowed in multiple selection queries',
    10,
  )
  .option(
    '-p, --port <number>', //
    'specify the port number on which the GraphQL HTTP server will listen on',
    4000,
  )
  .option(
    '-b, --batching <enabled>', //
    'enables or disables JSON-RPC batching (default: true)',
    true,
  )
  .option(
    '-c, --caching <enabled>', //
    'enables or disables JSON-RPC caching; ignored and disabled if batching is disabled (default: true)',
    true,
  )
  .parse(process.argv)
  .opts();
/* tslint: enable */

const env: Options = {
  jsonrpc: process.env.ETHQL_JSONRPC_ENDPOINT,
  queryMaxSize: parseInt(process.env.ETHQL_QUERY_MAX_SIZE) || undefined,
  port: parseInt(process.env.ETHQL_PORT) || undefined,
  batching: process.env.ETHQL_BATCHING === undefined ? undefined : process.env.ETHQL_BATCHING === 'true',
  caching: process.env.ETHQL_CACHING === undefined ? undefined : process.env.ETHQL_CACHING === 'true',
};

export default _.merge({}, options, env);
