## Sui & Move Bootcamp

### Sui Client Connection Setup with TypeScript SDK

##### What you will learn in this module:

#### Default Client Setup
- Using the Sui TypeScript SDK to connect to Sui networks
- Default connection to MystenLabs public nodes
- Available network options:
  - Mainnet
  - Testnet
  - Devnet
  - Localnet

#### Custom Provider Configuration
- Setting up a custom RPC provider
- Configuring connection parameters
- Handling custom endpoints
- Using SuiHTTPTransport for custom request configuration
- Example configuration with custom headers:
  ```typescript
  const transport = new SuiHTTPTransport({
    url: 'https://your-custom-rpc-endpoint.com',
    headers: {
      'Authorization': 'Bearer your-api-key',
      'Custom-Header': 'custom-value'
    }
  });
  
  const client = new SuiClient({ transport });
  ```

#### GraphQL Client Setup
- Initializing the Sui GraphQL client
- Configuring GraphQL-specific options
- Understanding the differences between RPC and GraphQL clients
- Example setup:
  ```typescript
  const graphqlClient = new SuiGraphQLClient({
    url: 'https://your-graphql-endpoint.com'
  });
  ```

#### Rate Limits and Best Practices
- Understanding MystenLabs public node rate limits
- Implementing rate limiting strategies
- Best practices for production deployments
- Considerations for:
  - Request frequency
  - Batch operations
  - Error handling
  - Retry mechanisms

#### Client Usage Examples
- Basic client operations
- Error handling patterns
- Connection management
- Example patterns:
  ```typescript
  // Basic client usage
  const client = new SuiClient();
  
  // Error handling
  try {
    const result = await client.getObject({ id: objectId });
  } catch (error) {
    // Handle specific error cases
  }
  ```

#### Production Considerations
- Connection pooling
- Load balancing
- Failover strategies
- Monitoring and logging
- Performance optimization

---
### Useful Links

 - [Network Interactions with SuiClient
](https://sdk.mystenlabs.com/typescript/sui-client)
 - [Sui Client Provider - React Dapp Kit](https://sdk.mystenlabs.com/dapp-kit/sui-client-provider)
 - [RPC Best Practices
](https://docs.sui.io/references/sui-api/rpc-best-practices)
 - [Sui Full Node Configuration
](https://docs.sui.io/guides/operator/sui-full-node)
