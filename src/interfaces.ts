/**
 * Represents the action data within a Hyperion action
 */
export interface HyperionActionAct {
    /** Contract account that defines the action */
    account: string;
    /** Name of the action */
    name: string;
    /** Authorization array with actor and permission */
    authorization: any;
    /** Parsed action data */
    data: any;
    /** Raw hex data of the action */
    hex_data: string | undefined;
    /** Hex encoder used */
    hex_encoder: string | undefined;
}

/**
 * Represents a blockchain action processed by Hyperion
 */
export interface HyperionAction {
    /** Global sequence number for this action */
    action_ordinal: number;
    /** Parent action's global sequence number */
    creator_action_ordinal: number;
    /** Receipt information */
    receipt: any[];
    /** Account that received this action */
    receiver: string;
    /** The action data */
    act: HyperionActionAct;
    /** Whether this is a context-free action */
    context_free: boolean;
    /** Execution time in microseconds */
    elapsed: string;
    /** Console output from action execution */
    console: string;
    /** RAM usage deltas */
    account_ram_deltas: any[];
    /** Exception information if action failed */
    except: any;
    /** Error code if action failed */
    error_code: any;
}

/**
 * Represents a table delta (change) processed by Hyperion
 */
export interface HyperionDelta {
    /** Timestamp when the delta was processed */
    '@timestamp': string;
    /** Contract account that owns the table */
    code: string;
    /** Scope of the table */
    scope: string;
    /** Name of the table */
    table: string;
    /** Primary key of the row */
    primary_key: string;
    /** Account that pays for RAM storage */
    payer: string;
    /** Whether the row is present (true/1) or deleted (false/0) */
    present: boolean | number;
    /** Block number where this delta occurred */
    block_num: number;
    /** Block ID where this delta occurred */
    block_id: string;
    /** Parsed table row data */
    data: any;
    /** Raw value */
    value: any;
}

/**
 * Interface for handling blockchain actions
 */
export interface HyperionActionHandler {
    /** Name of the action to handle */
    action: string;
    /** Contract account that defines the action */
    contract: string;
    /** Optional Elasticsearch mappings for this action */
    mappings?: any;
    /** Handler function that processes the action */
    handler: (action: HyperionAction) => Promise<void>;
}

/**
 * Interface for handling table deltas
 */
export interface HyperionDeltaHandler {
    /** Name of the table to handle */
    table: string;
    /** Contract account that owns the table */
    contract: string;
    /** Optional Elasticsearch mappings for this delta */
    mappings?: any;
    /** Handler function that processes the delta */
    handler: (delta: HyperionDelta) => Promise<void>;
}

/**
 * Interface for handling stream events
 */
export interface HyperionStreamHandler {
    /** Type of event to handle */
    event: string;
    /** Optional contract code filter */
    code?: string;
    /** Optional account filter */
    account?: string;
    /** Optional action name filter */
    name?: string;
    /** Optional table name filter */
    table?: string;
    /** Handler function that processes the stream event */
    handler: (streamEvent: any) => Promise<void>;
}
