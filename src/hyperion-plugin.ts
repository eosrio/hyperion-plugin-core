import {HyperionActionHandler, HyperionDeltaHandler, HyperionStreamHandler} from "./interfaces.js";
import {FastifyInstance} from "fastify";

/**
 * Abstract base class for Hyperion plugins.
 * Extend this class to create custom plugins for Hyperion History API.
 */
export abstract class HyperionPlugin {
    /** Unique identifier for the plugin */
    internalPluginName: string = '';

    /** Flag indicating if this plugin processes indexer data */
    indexerPlugin = false;

    /** Flag indicating if this plugin adds API routes */
    apiPlugin = false;

    /** Array of action handlers for processing blockchain actions */
    actionHandlers: HyperionActionHandler[] = [];

    /** Array of delta handlers for processing table deltas */
    deltaHandlers: HyperionDeltaHandler[] = [];

    /** Array of stream handlers for processing stream events */
    streamHandlers: HyperionStreamHandler[] = [];

    /** Array of contract names to dynamically track */
    dynamicContracts: string[] = [];

    /** Flag indicating if the plugin has API routes */
    hasApiRoutes: boolean = false;

    /** Configuration object passed to the plugin */
    baseConfig: any;

    /** Name of the blockchain */
    chainName: string = '';

    /**
     * Initialize the plugin with optional configuration
     * @param config - Configuration object for the plugin
     */
    protected constructor(config?: any) {
        if (config) {
            this.baseConfig = config;
        }
    }

    /**
     * Add API routes to the Fastify server
     * This method must be implemented by all plugins that have API routes
     * @param server - Fastify server instance
     */
    abstract addRoutes(server: FastifyInstance): void;

    /**
     * Called once during plugin initialization,
     * Override this method to perform one-time setup operations
     */
    initOnce() {
        // called only once
    }

    /**
     * Initialize and return a handler map
     * Override this method to provide custom handler mappings
     * @returns Handler map object
     */
    initHandlerMap(): any {
        return {};
    }
}
