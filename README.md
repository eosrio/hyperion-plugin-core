# Hyperion Plugin Core

A core library for developing plugins for Hyperion - a scalable Full History API Solution for EOSIO-based blockchains.

## Description

Hyperion Plugin Core provides the base classes and interfaces needed to develop custom plugins for the Hyperion History API. This package allows developers to extend Hyperion's functionality by creating plugins that can process blockchain actions, deltas, and stream events.

## Installation

```bash
npm install hyperion-plugin-core
```

## Requirements

- Node.js 16+
- Fastify 5.4.0+ (peer dependency)

## Usage

### Creating a Basic Plugin

```typescript
import { HyperionPlugin, HyperionAction, HyperionDelta } from 'hyperion-plugin-core';
import { FastifyInstance } from 'fastify';

class MyCustomPlugin extends HyperionPlugin {
  constructor(config?: any) {
    super(config);
    
    // Set plugin properties
    this.internalPluginName = 'my-custom-plugin';
    this.indexerPlugin = true;  // Set to true if this plugin processes indexer data
    this.apiPlugin = true;      // Set to true if this plugin adds API routes
    
    // Register action handlers
    this.actionHandlers.push({
      action: 'transfer',
      contract: 'eosio.token',
      handler: this.handleTransfer.bind(this)
    });
    
    // Register delta handlers
    this.deltaHandlers.push({
      table: 'accounts',
      contract: 'eosio.token',
      handler: this.handleAccountDelta.bind(this)
    });
  }
  
  // Implement required abstract method
  addRoutes(server: FastifyInstance): void {
    server.get('/my-plugin/data', async (request, reply) => {
      // Handle API request
      return { success: true, data: 'Your plugin data' };
    });
  }
  
  // Custom action handler
  async handleTransfer(action: HyperionAction): Promise<void> {
    // Process transfer action
    console.log(`Transfer: ${action.act.data.from} -> ${action.act.data.to}`);
  }
  
  // Custom delta handler
  async handleAccountDelta(delta: HyperionDelta): Promise<void> {
    // Process account delta
    console.log(`Account delta for ${delta.scope}`);
  }
}

export default MyCustomPlugin;
```

### Plugin Initialization

In your Hyperion configuration, you would reference your plugin:

```json
{
  "plugins": [
    {
      "name": "my-custom-plugin",
      "args": {
        "option1": "value1",
        "option2": "value2"
      }
    }
  ]
}
```

## API Reference

### HyperionPlugin (Abstract Class)

The base class for all Hyperion plugins.

#### Properties

- `internalPluginName`: String identifier for the plugin
- `indexerPlugin`: Boolean flag indicating if the plugin processes indexer data
- `apiPlugin`: Boolean flag indicating if the plugin adds API routes
- `actionHandlers`: Array of action handlers
- `deltaHandlers`: Array of delta handlers
- `streamHandlers`: Array of stream event handlers
- `dynamicContracts`: Array of contract names to dynamically track
- `hasApiRoutes`: Boolean flag indicating if the plugin has API routes
- `baseConfig`: Configuration object passed to the plugin
- `chainName`: Name of the blockchain

#### Methods

- `constructor(config?: any)`: Initialize the plugin with optional configuration
- `abstract addRoutes(server: FastifyInstance): void`: Add API routes to the Fastify server
- `initOnce()`: Called once during plugin initialization
- `initHandlerMap()`: Initialize and return a handler map

### Interfaces

- `HyperionActionHandler`: Interface for handling blockchain actions
- `HyperionDeltaHandler`: Interface for handling table deltas
- `HyperionStreamHandler`: Interface for handling stream events
- `HyperionAction`: Interface representing a blockchain action
- `HyperionDelta`: Interface representing a table delta

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## About

Developed and maintained by [EOS Rio](https://eosrio.io).