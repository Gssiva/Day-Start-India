/**
 * AddBackgroundRequest
 *
 * Request model for adding/merging background information. Deprecated: use SetMissionRequest instead.
 */
type AddBackgroundRequest = {
    /**
     * Content
     *
     * New background information to add or merge
     */
    content: string;
    /**
     * Update Disposition
     *
     * Deprecated - disposition is no longer auto-inferred from mission
     */
    update_disposition?: boolean;
};
/**
 * AsyncOperationSubmitResponse
 *
 * Response model for submitting an async operation.
 */
type AsyncOperationSubmitResponse = {
    /**
     * Operation Id
     */
    operation_id: string;
    /**
     * Status
     */
    status: string;
};
/**
 * AuditLogEntry
 *
 * A single audit log entry.
 */
type AuditLogEntry = {
    /**
     * Id
     */
    id: string;
    /**
     * Action
     */
    action: string;
    /**
     * Transport
     */
    transport: string;
    /**
     * Bank Id
     */
    bank_id: string | null;
    /**
     * Started At
     */
    started_at: string | null;
    /**
     * Ended At
     */
    ended_at: string | null;
    /**
     * Duration Ms
     *
     * Server-computed duration in milliseconds (started_at → ended_at). Null if not yet completed.
     */
    duration_ms?: number | null;
    /**
     * Request
     */
    request: {
        [key: string]: unknown;
    } | null;
    /**
     * Response
     */
    response: {
        [key: string]: unknown;
    } | null;
    /**
     * Metadata
     */
    metadata: {
        [key: string]: unknown;
    };
};
/**
 * AuditLogListResponse
 *
 * Response model for list audit logs endpoint.
 */
type AuditLogListResponse = {
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Total
     */
    total: number;
    /**
     * Limit
     */
    limit: number;
    /**
     * Offset
     */
    offset: number;
    /**
     * Items
     */
    items: Array<AuditLogEntry>;
};
/**
 * AuditLogStatsBucket
 *
 * A single time bucket in audit log stats.
 */
type AuditLogStatsBucket = {
    /**
     * Time
     */
    time: string;
    /**
     * Actions
     */
    actions: {
        [key: string]: number;
    };
    /**
     * Total
     */
    total: number;
};
/**
 * AuditLogStatsResponse
 *
 * Response model for audit log stats endpoint.
 */
type AuditLogStatsResponse = {
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Period
     */
    period: string;
    /**
     * Trunc
     */
    trunc: string;
    /**
     * Start
     */
    start: string;
    /**
     * Buckets
     */
    buckets: Array<AuditLogStatsBucket>;
};
/**
 * BackgroundResponse
 *
 * Response model for background update. Deprecated: use MissionResponse instead.
 */
type BackgroundResponse = {
    /**
     * Mission
     */
    mission: string;
    /**
     * Background
     *
     * Deprecated: same as mission
     */
    background?: string | null;
    disposition?: DispositionTraits | null;
};
/**
 * BankConfigResponse
 *
 * Response model for bank configuration.
 */
type BankConfigResponse = {
    /**
     * Bank Id
     *
     * Bank identifier
     */
    bank_id: string;
    /**
     * Config
     *
     * Fully resolved configuration with all hierarchical overrides applied (Python field names)
     */
    config: {
        [key: string]: unknown;
    };
    /**
     * Overrides
     *
     * Bank-specific configuration overrides only (Python field names)
     */
    overrides: {
        [key: string]: unknown;
    };
};
/**
 * BankConfigUpdate
 *
 * Request model for updating bank configuration.
 */
type BankConfigUpdate = {
    /**
     * Updates
     *
     * Configuration overrides. Keys can be in Python field format (retain_extraction_mode) or environment variable format (HINDSIGHT_API_RETAIN_EXTRACTION_MODE). Only hierarchical fields can be overridden per-bank.
     */
    updates: {
        [key: string]: unknown;
    };
};
/**
 * BankListItem
 *
 * Bank list item with profile summary and stats.
 */
type BankListItem = {
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Name
     */
    name?: string | null;
    disposition: DispositionTraits;
    /**
     * Mission
     */
    mission?: string | null;
    /**
     * Created At
     */
    created_at?: string | null;
    /**
     * Updated At
     */
    updated_at?: string | null;
    /**
     * Fact Count
     */
    fact_count?: number;
    /**
     * Last Document At
     *
     * When a document was last *ingested* into this bank. Appending to an existing document does not move this — use `last_write_at` for write activity.
     */
    last_document_at?: string | null;
    /**
     * Last Write At
     *
     * When anything was last written to this bank: a document retained (including appends to an existing document) or a fact stored. Null if the bank is empty.
     */
    last_write_at?: string | null;
};
/**
 * BankListResponse
 *
 * Response model for listing banks, one page at a time.
 */
type BankListResponse = {
    /**
     * Banks
     */
    banks: Array<BankListItem>;
    /**
     * Total
     *
     * Total number of banks visible to the caller, ignoring `limit`/`offset`.
     */
    total: number;
    /**
     * Limit
     */
    limit: number;
    /**
     * Offset
     */
    offset: number;
};
/**
 * BankLlmHealthResponse
 *
 * Per-bank LLM connectivity probe across retain/consolidation/reflect. Operations
 * that share a configuration are probed once. Discloses status only — never the
 * provider, model, endpoint, API key, or raw error.
 */
type BankLlmHealthResponse = {
    /**
     * Bank Id
     *
     * Bank identifier
     */
    bank_id: string;
    /**
     * Operations
     *
     * Connectivity status per operation (retain, consolidation, reflect)
     */
    operations: Array<LlmOperationHealth>;
};
/**
 * BankProfileResponse
 *
 * Response model for bank profile.
 */
type BankProfileResponse = {
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Name
     */
    name: string;
    disposition: DispositionTraits;
    /**
     * Mission
     *
     * The agent's mission - who they are and what they're trying to accomplish
     */
    mission: string;
    /**
     * Background
     *
     * Deprecated: use mission instead
     */
    background?: string | null;
};
/**
 * BankStatsResponse
 *
 * Response model for bank statistics endpoint.
 */
type BankStatsResponse = {
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Total Nodes
     */
    total_nodes: number;
    /**
     * Total Links
     */
    total_links: number;
    /**
     * Total Documents
     */
    total_documents: number;
    /**
     * Nodes By Fact Type
     */
    nodes_by_fact_type: {
        [key: string]: number;
    };
    /**
     * Links By Link Type
     */
    links_by_link_type: {
        [key: string]: number;
    };
    /**
     * Links By Fact Type
     */
    links_by_fact_type: {
        [key: string]: number;
    };
    /**
     * Links Breakdown
     */
    links_breakdown: {
        [key: string]: {
            [key: string]: number;
        };
    };
    /**
     * Pending Operations
     */
    pending_operations: number;
    /**
     * Failed Operations
     */
    failed_operations: number;
    /**
     * Operations By Status
     *
     * Async operations grouped by status (pending, processing, completed, failed, cancelled).
     */
    operations_by_status?: {
        [key: string]: number;
    };
    /**
     * Last Consolidated At
     *
     * When consolidation last ran (ISO format)
     */
    last_consolidated_at?: string | null;
    /**
     * Last Memory Write At
     *
     * When a memory was last written in this bank — stored, edited, or consolidated (ISO format). Null if the bank has no memories. A mental model whose `last_memory_seen_at` is at or after this is up to date whatever its tags; an older one may need a refresh, which only the single mental-model read can confirm.
     */
    last_memory_write_at?: string | null;
    /**
     * Pending Consolidation
     *
     * Number of source memories (world/experience) still queued for consolidation into observations. Excludes memories whose consolidation permanently failed — those are counted only in failed_consolidation — so this drains to 0 when the consolidator catches up.
     */
    pending_consolidation?: number;
    /**
     * Failed Consolidation
     *
     * Number of source memories (world/experience) whose consolidation permanently failed and can be retried via the consolidation recovery endpoint.
     */
    failed_consolidation?: number;
    /**
     * Total Observations
     *
     * Total number of observations
     */
    total_observations?: number;
};
/**
 * BankTemplateConfig
 *
 * Bank configuration fields within a template manifest.
 *
 * Only includes configurable (per-bank) fields. Credential fields
 * (API keys, base URLs) are intentionally excluded for security.
 */
type BankTemplateConfig = {
    /**
     * Reflect Mission
     *
     * Mission/context for Reflect operations
     */
    reflect_mission?: string | null;
    /**
     * Retain Mission
     *
     * Steers what gets extracted during retain
     */
    retain_mission?: string | null;
    /**
     * Retain Extraction Mode
     *
     * Fact extraction mode: 'concise' (default), 'verbose', 'custom', 'verbatim', or 'chunks'
     */
    retain_extraction_mode?: string | null;
    /**
     * Retain Custom Instructions
     *
     * Custom extraction prompt (when mode='custom')
     */
    retain_custom_instructions?: string | null;
    /**
     * Retain Chunk Size
     *
     * Target max characters for each content chunk
     */
    retain_chunk_size?: number | null;
    /**
     * Retain Structured Chunk Size
     *
     * Max characters for a single JSONL line or conversation turn to keep whole; defaults to retain_chunk_size when unset
     */
    retain_structured_chunk_size?: number | null;
    /**
     * Enable Observations
     *
     * Toggle observation consolidation
     */
    enable_observations?: boolean | null;
    /**
     * Observations Mission
     *
     * Controls what gets synthesised
     */
    observations_mission?: string | null;
    /**
     * Enable Text Search
     *
     * Toggle the keyword (BM25) arm during recall, leaving pure vector search
     */
    enable_text_search?: boolean | null;
    /**
     * Enable Temporal Retrieval
     *
     * Toggle the temporal arm (and its date-aware query analysis) during recall
     */
    enable_temporal_retrieval?: boolean | null;
    /**
     * Enable Graph Retrieval
     *
     * Toggle the entity/link graph arm during recall
     */
    enable_graph_retrieval?: boolean | null;
    /**
     * Enable Reranking
     *
     * Toggle cross-encoder reranking during recall
     */
    enable_reranking?: boolean | null;
    /**
     * Disposition Skepticism
     *
     * Skepticism trait (1-5)
     */
    disposition_skepticism?: number | null;
    /**
     * Disposition Literalism
     *
     * Literalism trait (1-5)
     */
    disposition_literalism?: number | null;
    /**
     * Disposition Empathy
     *
     * Empathy trait (1-5)
     */
    disposition_empathy?: number | null;
    /**
     * Entity Labels
     *
     * Controlled vocabulary for entity labels
     */
    entity_labels?: Array<LabelGroupOutput> | null;
    /**
     * Entities Allow Free Form
     *
     * Allow entities outside the label vocabulary
     */
    entities_allow_free_form?: boolean | null;
    /**
     * Retain Default Strategy
     *
     * Name of the default retain strategy (key into retain_strategies map)
     */
    retain_default_strategy?: string | null;
    /**
     * Retain Strategies
     *
     * Map of retain strategy name to per-strategy config dict
     */
    retain_strategies?: {
        [key: string]: unknown;
    } | null;
    /**
     * Retain Chunk Batch Size
     *
     * Max chunks per streaming batch (0 disables batching)
     */
    retain_chunk_batch_size?: number | null;
    /**
     * Retain Max Attachments Per Chunk
     *
     * Hard cap on inline images in a single extraction chunk
     */
    retain_max_attachments_per_chunk?: number | null;
    /**
     * Mcp Enabled Tools
     *
     * MCP tool allowlist for this bank (None = all tools)
     */
    mcp_enabled_tools?: Array<string> | null;
    /**
     * Consolidation Llm Batch Size
     *
     * LLM batch size for observation consolidation
     */
    consolidation_llm_batch_size?: number | null;
    /**
     * Consolidation Source Facts Max Tokens
     *
     * Max tokens of source facts per consolidation batch
     */
    consolidation_source_facts_max_tokens?: number | null;
    /**
     * Consolidation Source Facts Max Tokens Per Observation
     *
     * Max tokens of source facts per observation
     */
    consolidation_source_facts_max_tokens_per_observation?: number | null;
    /**
     * Max Observations Per Scope
     *
     * Max observations to retain per consolidation scope
     */
    max_observations_per_scope?: number | null;
    /**
     * Observation Scope Limits
     *
     * Per-scope overrides of max_observations_per_scope: [{"scope": ["run_*", "shared"], "limit": 1}]. Each scope is a list of fnmatch tag-globs; a consolidation scope matches under exact cover (every tag matched by a glob and every glob matched by a tag). The first matching rule wins; unmatched scopes fall back to max_observations_per_scope.
     */
    observation_scope_limits?: Array<{
        [key: string]: unknown;
    }> | null;
    /**
     * Reflect Source Facts Max Tokens
     *
     * Max tokens of source facts per reflect call
     */
    reflect_source_facts_max_tokens?: number | null;
    /**
     * Knowledge Page Default Trigger
     *
     * Trigger fields merged over the built-in knowledge-page default when a page is created (e.g. {"refresh_cron": "0 * * * *"}). A trigger sent with the create request still wins.
     */
    knowledge_page_default_trigger?: {
        [key: string]: unknown;
    } | null;
    /**
     * Reflect Default Options
     *
     * Default reflect options for this bank (e.g. {"reflect_search_observations_max_tokens": 3000, "reflect_search_observations_include_entities": false}). Applied to every reflect in the bank -- API, MCP and mental-model refresh -- whenever the request (or the model's trigger) leaves the option unset.
     */
    reflect_default_options?: {
        [key: string]: unknown;
    } | null;
    /**
     * Mental Model Min Refresh Interval Seconds
     *
     * Minimum seconds between two automatic refreshes of the same mental model in this bank. 0 (the default) means no floor. Overridable per model via the trigger's min_refresh_interval_seconds.
     */
    mental_model_min_refresh_interval_seconds?: number | null;
    /**
     * Llm Gemini Safety Settings
     *
     * Per-bank Gemini/VertexAI safety filter settings
     */
    llm_gemini_safety_settings?: Array<unknown> | null;
    /**
     * Recall Budget Function
     *
     * Recall budget mapping function: 'fixed' or 'adaptive'
     */
    recall_budget_function?: string | null;
    /**
     * Recall Budget Fixed Low
     *
     * Fixed thinking_budget for budget=low (function='fixed')
     */
    recall_budget_fixed_low?: number | null;
    /**
     * Recall Budget Fixed Mid
     *
     * Fixed thinking_budget for budget=mid (function='fixed')
     */
    recall_budget_fixed_mid?: number | null;
    /**
     * Recall Budget Fixed High
     *
     * Fixed thinking_budget for budget=high (function='fixed')
     */
    recall_budget_fixed_high?: number | null;
    /**
     * Recall Budget Adaptive Low
     *
     * Ratio of max_tokens for budget=low (function='adaptive')
     */
    recall_budget_adaptive_low?: number | null;
    /**
     * Recall Budget Adaptive Mid
     *
     * Ratio of max_tokens for budget=mid (function='adaptive')
     */
    recall_budget_adaptive_mid?: number | null;
    /**
     * Recall Budget Adaptive High
     *
     * Ratio of max_tokens for budget=high (function='adaptive')
     */
    recall_budget_adaptive_high?: number | null;
    /**
     * Recall Budget Min
     *
     * Floor for the adaptive function (after clamping)
     */
    recall_budget_min?: number | null;
    /**
     * Recall Budget Max
     *
     * Ceiling for the adaptive function (after clamping)
     */
    recall_budget_max?: number | null;
    /**
     * Audit Log Enabled
     *
     * Enable audit logging for this bank (overrides the server default)
     */
    audit_log_enabled?: boolean | null;
    /**
     * Store Document Text
     *
     * Persist raw source text (documents.original_text / chunks.chunk_text). Set false to keep only derived facts.
     */
    store_document_text?: boolean | null;
    /**
     * Enable Auto Consolidation
     *
     * Automatically consolidate observations after retain
     */
    enable_auto_consolidation?: boolean | null;
    /**
     * Consolidation Max Memories Per Round
     *
     * Max memory units fed into a single consolidation round
     */
    consolidation_max_memories_per_round?: number | null;
    /**
     * Consolidation Llm Parallelism
     *
     * Number of consolidation LLM batches processed concurrently
     */
    consolidation_llm_parallelism?: number | null;
    /**
     * Recall Include Chunks
     *
     * Include raw chunks in recall results
     */
    recall_include_chunks?: boolean | null;
    /**
     * Recall Max Tokens
     *
     * Max tokens of results returned by recall
     */
    recall_max_tokens?: number | null;
    /**
     * Recall Chunks Max Tokens
     *
     * Max tokens of raw chunks returned by recall (when recall_include_chunks is set)
     */
    recall_chunks_max_tokens?: number | null;
    /**
     * Memory Defense
     *
     * Memory Defense policy for this bank (validated against the DefensePolicy schema on write)
     */
    memory_defense?: {
        [key: string]: unknown;
    } | null;
};
/**
 * BankTemplateDirective
 *
 * A directive definition within a bank template manifest.
 *
 * Directives are matched by name on re-import: existing directives
 * with the same name are updated, new ones are created.
 */
type BankTemplateDirective = {
    /**
     * Name
     *
     * Human-readable name for the directive (used as match key on re-import)
     */
    name: string;
    /**
     * Content
     *
     * The directive text to inject into prompts
     */
    content: string;
    /**
     * Priority
     *
     * Higher priority directives are injected first
     */
    priority?: number;
    /**
     * Is Active
     *
     * Whether this directive is active
     */
    is_active?: boolean;
    /**
     * Tags
     *
     * Tags for filtering
     */
    tags?: Array<string>;
};
/**
 * BankTemplateImportResponse
 *
 * Response model for the bank template import endpoint.
 */
type BankTemplateImportResponse = {
    /**
     * Bank Id
     *
     * Bank that was imported into
     */
    bank_id: string;
    /**
     * Config Applied
     *
     * Whether bank config was updated
     */
    config_applied: boolean;
    /**
     * Mental Models Created
     *
     * IDs of newly created mental models
     */
    mental_models_created?: Array<string>;
    /**
     * Mental Models Updated
     *
     * IDs of updated mental models
     */
    mental_models_updated?: Array<string>;
    /**
     * Directives Created
     *
     * Names of newly created directives
     */
    directives_created?: Array<string>;
    /**
     * Directives Updated
     *
     * Names of updated directives
     */
    directives_updated?: Array<string>;
    /**
     * Operation Ids
     *
     * Operation IDs for mental model content generation (async)
     */
    operation_ids?: Array<string>;
    /**
     * Dry Run
     *
     * True if this was a validation-only run
     */
    dry_run?: boolean;
};
/**
 * BankTemplateManifest
 *
 * A bank template manifest for import/export.
 *
 * Version field enables forward-compatible schema evolution: the API
 * auto-upgrades older manifest versions to the current schema on import.
 */
type BankTemplateManifest = {
    /**
     * Version
     *
     * Manifest schema version (currently '1')
     */
    version: string;
    /**
     * Bank configuration to apply. Omit to leave config unchanged.
     */
    bank?: BankTemplateConfig | null;
    /**
     * Mental Models
     *
     * Mental models to create or update (matched by id). Omit to leave unchanged.
     */
    mental_models?: Array<BankTemplateMentalModel> | null;
    /**
     * Directives
     *
     * Directives to create or update (matched by name). Omit to leave unchanged.
     */
    directives?: Array<BankTemplateDirective> | null;
};
/**
 * BankTemplateMentalModel
 *
 * A mental model definition within a bank template manifest.
 */
type BankTemplateMentalModel = {
    /**
     * Id
     *
     * Unique ID for the mental model (alphanumeric lowercase with hyphens)
     */
    id: string;
    /**
     * Name
     *
     * Human-readable name for the mental model
     */
    name: string;
    /**
     * Source Query
     *
     * The query to run to generate content
     */
    source_query: string;
    /**
     * Tags
     *
     * Tags for scoped visibility
     */
    tags?: Array<string>;
    /**
     * Max Tokens
     *
     * Maximum tokens for generated content
     */
    max_tokens?: number;
    /**
     * Trigger settings
     */
    trigger?: MentalModelTriggerOutput;
};
/**
 * BankTransferSubmitResponse
 *
 * Response for the unified bank-transfer endpoints (202).
 *
 * The transfer runs in the background; poll
 * GET /v1/default/banks/{bank_id}/operations/{operation_id}. An export's
 * ``result_metadata`` carries ``download_url`` / ``storage_key`` /
 * ``byte_size`` / ``filename``; an import's carries the per-component counts.
 */
type BankTransferSubmitResponse = {
    /**
     * Operation Id
     */
    operation_id: string;
    /**
     * Status
     */
    status?: string;
};
/**
 * Base64AttachmentSource
 *
 * Inline attachment bytes, base64-encoded.
 *
 * The only source type in this version. ``url`` (server-side fetch) and
 * ``blob_id`` (pre-uploaded handle) are the natural next ones, which is why this
 * is modelled as a discriminated union on ``type`` rather than as bare fields.
 */
type Base64AttachmentSource = {
    /**
     * Type
     */
    type?: "base64";
    /**
     * Media Type
     *
     * MIME type of the attachment, e.g. 'image/png' or 'application/pdf'. Any well-formed type is accepted; whether the model can read it is the model's answer to give, and a provider that rejects it fails the retain with its own error.
     */
    media_type: string;
    /**
     * Data
     *
     * Base64-encoded bytes (no data: URI prefix).
     */
    data: string;
};
/**
 * Body_file_retain
 */
type BodyFileRetain = {
    /**
     * Files
     *
     * Files to upload and convert
     */
    files: Array<Blob | File>;
    /**
     * Request
     *
     * JSON string with FileRetainRequest model
     */
    request: string;
};
/**
 * Body_import_bank_transfer
 */
type BodyImportBankTransfer = {
    /**
     * File
     *
     * Transfer ZIP archive
     */
    file: Blob | File;
};
/**
 * Body_import_documents
 */
type BodyImportDocuments = {
    /**
     * File
     *
     * Transfer ZIP archive
     */
    file: Blob | File;
};
/**
 * Budget
 *
 * Budget levels for recall/reflect operations.
 */
type Budget = "low" | "mid" | "high";
/**
 * CancelOperationResponse
 *
 * Response model for cancel operation endpoint.
 */
type CancelOperationResponse = {
    /**
     * Success
     */
    success: boolean;
    /**
     * Message
     */
    message: string;
    /**
     * Operation Id
     */
    operation_id: string;
};
/**
 * ChildOperationStatus
 *
 * Status of a child operation (for batch operations).
 */
type ChildOperationStatus = {
    /**
     * Operation Id
     */
    operation_id: string;
    /**
     * Status
     */
    status: string;
    /**
     * Sub Batch Index
     */
    sub_batch_index?: number | null;
    /**
     * Items Count
     */
    items_count?: number | null;
    /**
     * Error Message
     */
    error_message?: string | null;
};
/**
 * ChunkAttachment
 *
 * An attachment referenced by retained text, and where to fetch it.
 */
type ChunkAttachment = {
    /**
     * Id
     *
     * The id inside the text's placeholder; a prefix of the bytes' sha256.
     */
    id: string;
    /**
     * Hash
     *
     * Full sha256 of the attachment bytes.
     */
    hash: string;
    /**
     * Kind
     *
     * 'image' or 'file', as the caller sent it.
     */
    kind: string;
    /**
     * Media Type
     *
     * MIME type of the attachment.
     */
    media_type: string;
    /**
     * Byte Size
     *
     * Size of the attachment in bytes.
     */
    byte_size: number;
    /**
     * Filename
     *
     * Original filename, when the caller supplied one.
     */
    filename?: string | null;
    /**
     * Url
     *
     * Bank-scoped API path serving the bytes. Requires the same authorization as the bank.
     */
    url: string;
};
/**
 * ChunkData
 *
 * Chunk data for a single chunk.
 */
type ChunkData = {
    /**
     * Id
     */
    id: string;
    /**
     * Text
     */
    text: string;
    /**
     * Chunk Index
     */
    chunk_index: number;
    /**
     * Truncated
     *
     * Whether the chunk text was truncated due to token limits
     */
    truncated?: boolean;
    /**
     * Attachments
     *
     * Attachments this chunk's text references, in order of first appearance, when it was retained with inline content. The text keeps each attachment's placeholder token (⟦hs-att:...⟧) where it sat, so a multimodal agent can render or reason over the original at the position it occupied in the source document. Omitted when there are none.
     */
    attachments?: Array<ChunkAttachment> | null;
};
/**
 * ChunkIncludeOptions
 *
 * Options for including chunks in recall results.
 */
type ChunkIncludeOptions = {
    /**
     * Max Tokens
     *
     * Maximum tokens for chunks (chunks may be truncated)
     */
    max_tokens?: number;
};
/**
 * ChunkResponse
 *
 * Response model for get chunk endpoint.
 */
type ChunkResponse = {
    /**
     * Chunk Id
     */
    chunk_id: string;
    /**
     * Document Id
     */
    document_id: string;
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Chunk Index
     */
    chunk_index: number;
    /**
     * Chunk Text
     */
    chunk_text: string;
    /**
     * Created At
     */
    created_at: string;
    /**
     * Attachments
     *
     * Attachments referenced by this chunk's text, when it was retained with inline content. Each carries a bank-scoped `url` serving the original bytes. Omitted when there are none.
     */
    attachments?: Array<ChunkAttachment> | null;
};
/**
 * ClearMemoryObservationsResponse
 *
 * Response model for clearing observations for a specific memory.
 */
type ClearMemoryObservationsResponse = {
    /**
     * Deleted Count
     */
    deleted_count: number;
};
/**
 * ConsolidationRequest
 *
 * Request model for consolidation trigger endpoint.
 */
type ConsolidationRequest = {
    /**
     * Observation Scopes
     *
     * Optional list of tag scopes to consolidate. Each scope is a list of tags. Only unconsolidated memories whose tags contain all tags in at least one scope will be processed. If omitted, all unconsolidated memories are processed.
     */
    observation_scopes?: Array<Array<string>> | null;
};
/**
 * ConsolidationResponse
 *
 * Response model for consolidation trigger endpoint.
 */
type ConsolidationResponse = {
    /**
     * Operation Id
     *
     * ID of the async consolidation operation
     */
    operation_id: string;
    /**
     * Deduplicated
     *
     * True if an existing pending task was reused
     */
    deduplicated?: boolean;
};
/**
 * CreateBankRequest
 *
 * Request model for creating/updating a bank.
 */
type CreateBankRequest = {
    /**
     * Name
     *
     * Deprecated: display label only, not advertised
     */
    name?: string | null;
    /**
     * Deprecated: use update_bank_config instead
     */
    disposition?: DispositionTraits | null;
    /**
     * Disposition Skepticism
     *
     * Deprecated: use update_bank_config instead
     */
    disposition_skepticism?: number | null;
    /**
     * Disposition Literalism
     *
     * Deprecated: use update_bank_config instead
     */
    disposition_literalism?: number | null;
    /**
     * Disposition Empathy
     *
     * Deprecated: use update_bank_config instead
     */
    disposition_empathy?: number | null;
    /**
     * Mission
     *
     * Deprecated: use update_bank_config with reflect_mission instead
     */
    mission?: string | null;
    /**
     * Background
     *
     * Deprecated: use update_bank_config with reflect_mission instead
     */
    background?: string | null;
    /**
     * Reflect Mission
     *
     * Mission/context for Reflect operations. Guides how Reflect interprets and uses memories.
     */
    reflect_mission?: string | null;
    /**
     * Retain Mission
     *
     * Steers what gets extracted during retain(). Injected alongside built-in extraction rules.
     */
    retain_mission?: string | null;
    /**
     * Retain Extraction Mode
     *
     * Fact extraction mode: 'concise' (default), 'verbose', 'custom', 'verbatim', or 'chunks'.
     */
    retain_extraction_mode?: string | null;
    /**
     * Retain Custom Instructions
     *
     * Custom extraction prompt. Only active when retain_extraction_mode is 'custom'.
     */
    retain_custom_instructions?: string | null;
    /**
     * Retain Chunk Size
     *
     * Target maximum characters for each content chunk during retain.
     */
    retain_chunk_size?: number | null;
    /**
     * Retain Structured Chunk Size
     *
     * Maximum characters for a single JSONL line or conversation turn to keep whole during retain. Defaults to retain_chunk_size when unset.
     */
    retain_structured_chunk_size?: number | null;
    /**
     * Retain Max Attachments Per Chunk
     *
     * Maximum inline attachments one extraction chunk may carry. retain_chunk_size budgets text only — a placeholder costs the characters it occupies and nothing more — so this is what bounds attachments. Match it to the provider's per-request limit.
     */
    retain_max_attachments_per_chunk?: number | null;
    /**
     * Enable Observations
     *
     * Toggle automatic observation consolidation after retain().
     */
    enable_observations?: boolean | null;
    /**
     * Observations Mission
     *
     * Controls what gets synthesised into observations. Replaces built-in consolidation rules entirely.
     */
    observations_mission?: string | null;
    /**
     * Enable Text Search
     *
     * Toggle the keyword (BM25) retrieval arm during recall. Disabling leaves pure vector search: the arm is left out of the query entirely rather than filtered to nothing, so none of its cost is paid. Also drops the keyword arm from knowledge-page search.
     */
    enable_text_search?: boolean | null;
    /**
     * Enable Temporal Retrieval
     *
     * Toggle the temporal retrieval arm during recall, together with the date-aware query analysis that feeds it. Useful for banks whose content carries no meaningful dates.
     */
    enable_temporal_retrieval?: boolean | null;
    /**
     * Enable Graph Retrieval
     *
     * Toggle the entity/link graph traversal arm during recall. Disabling trades relational recall for latency on banks whose content has little entity structure.
     */
    enable_graph_retrieval?: boolean | null;
    /**
     * Enable Reranking
     *
     * Toggle cross-encoder reranking during recall. Disabling returns the RRF-fused ordering directly, which is faster but less precise.
     */
    enable_reranking?: boolean | null;
};
/**
 * CreateDirectiveRequest
 *
 * Request model for creating a directive.
 */
type CreateDirectiveRequest = {
    /**
     * Name
     *
     * Human-readable name for the directive
     */
    name: string;
    /**
     * Content
     *
     * The directive text to inject into prompts
     */
    content: string;
    /**
     * Priority
     *
     * Higher priority directives are injected first
     */
    priority?: number;
    /**
     * Is Active
     *
     * Whether this directive is active
     */
    is_active?: boolean;
    /**
     * Tags
     *
     * Directive execution scope. Empty means global; non-empty requires a matching reflect scope.
     */
    tags?: Array<string>;
};
/**
 * CreateFolderRequest
 *
 * Create a folder under an optional parent folder.
 */
type CreateFolderRequest = {
    /**
     * Name
     */
    name: string;
    /**
     * Parent Id
     */
    parent_id?: string | null;
};
/**
 * CreateKnowledgePageResponse
 *
 * Result of creating a page: the node id, its mental model, and the refresh op.
 */
type CreateKnowledgePageResponse = {
    /**
     * Page Id
     */
    page_id: string;
    /**
     * Mental Model Id
     */
    mental_model_id: string;
    /**
     * Operation Id
     */
    operation_id?: string | null;
};
/**
 * CreateMentalModelRequest
 *
 * Request model for creating a mental model.
 */
type CreateMentalModelRequest = {
    /**
     * Id
     *
     * Optional custom ID for the mental model (alphanumeric lowercase with hyphens)
     */
    id?: string | null;
    /**
     * Name
     *
     * Human-readable name for the mental model
     */
    name: string;
    /**
     * Source Query
     *
     * The query to run to generate content
     */
    source_query: string;
    /**
     * Tags
     *
     * Tags for scoped visibility
     */
    tags?: Array<string>;
    /**
     * Max Tokens
     *
     * Maximum tokens for generated content
     */
    max_tokens?: number;
    /**
     * Trigger settings
     */
    trigger?: MentalModelTriggerInput;
};
/**
 * CreateMentalModelResponse
 *
 * Response model for mental model creation.
 */
type CreateMentalModelResponse = {
    /**
     * Mental Model Id
     *
     * ID of the created mental model
     */
    mental_model_id?: string | null;
    /**
     * Operation Id
     *
     * Operation ID to track refresh progress
     */
    operation_id: string;
};
/**
 * CreatePageRequest
 *
 * Create a page (a mental model + tree node) under an optional parent folder.
 */
type CreatePageRequest = {
    /**
     * Name
     */
    name: string;
    /**
     * Source Query
     */
    source_query: string;
    /**
     * Parent Id
     */
    parent_id?: string | null;
    /**
     * Tags
     *
     * Tags that SCOPE which memories this page is built from — not labels. Every tag here, including a `type:<x>` tag used to set the page's rendered type, is part of the filter. By default a tagged page matches with `all_strict`: a memory must carry EVERY one of these tags, and untagged memories are excluded entirely. Tags invented for the page (a topic, a document type) therefore match nothing unless your memories were retained with those exact tags, and the page generates as 'I don't have information about this'. Omit this field to build the page from the whole bank, or set `trigger.tags_match` to 'all' to require the tags while still including untagged memories.
     */
    tags?: Array<string> | null;
    /**
     * Max Tokens
     */
    max_tokens?: number | null;
    trigger?: MentalModelTriggerInput | null;
};
/**
 * CreateWebhookRequest
 *
 * Request model for registering a webhook.
 */
type CreateWebhookRequest = {
    /**
     * Url
     *
     * HTTP(S) endpoint URL to deliver events to
     */
    url: string;
    /**
     * Secret
     *
     * HMAC-SHA256 signing secret (optional)
     */
    secret?: string | null;
    /**
     * Event Types
     *
     * List of event types to deliver. Supported: 'retain.completed', 'consolidation.completed', 'memory_defense.triggered'.
     */
    event_types?: Array<string>;
    /**
     * Enabled
     *
     * Whether this webhook is active
     */
    enabled?: boolean;
    /**
     * HTTP delivery configuration (method, timeout, headers, params)
     */
    http_config?: WebhookHttpConfig;
};
/**
 * DeleteDocumentResponse
 *
 * Response model for delete document endpoint.
 */
type DeleteDocumentResponse = {
    /**
     * Success
     */
    success: boolean;
    /**
     * Message
     */
    message: string;
    /**
     * Document Id
     */
    document_id: string;
    /**
     * Memory Units Deleted
     */
    memory_units_deleted: number;
};
/**
 * DeleteOperationResponse
 *
 * Response model for delete operation endpoint.
 */
type DeleteOperationResponse = {
    /**
     * Success
     */
    success: boolean;
    /**
     * Message
     */
    message: string;
    /**
     * Operation Id
     */
    operation_id: string;
};
/**
 * DeleteResponse
 *
 * Response model for delete operations.
 */
type DeleteResponse = {
    /**
     * Success
     */
    success: boolean;
    /**
     * Message
     */
    message?: string | null;
    /**
     * Deleted Count
     */
    deleted_count?: number | null;
};
/**
 * DirectiveListResponse
 *
 * Response model for listing directives.
 */
type DirectiveListResponse = {
    /**
     * Items
     */
    items: Array<DirectiveResponse>;
    /**
     * Total
     *
     * Total number of directives matching the filter (not just this page)
     */
    total: number;
    /**
     * Limit
     *
     * Page size that was applied
     */
    limit: number;
    /**
     * Offset
     *
     * Offset that was applied
     */
    offset: number;
};
/**
 * DirectiveResponse
 *
 * Response model for a directive.
 */
type DirectiveResponse = {
    /**
     * Id
     */
    id: string;
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Name
     */
    name: string;
    /**
     * Content
     */
    content: string;
    /**
     * Priority
     */
    priority?: number;
    /**
     * Is Active
     */
    is_active?: boolean;
    /**
     * Tags
     */
    tags?: Array<string>;
    /**
     * Created At
     */
    created_at?: string | null;
    /**
     * Updated At
     */
    updated_at?: string | null;
};
/**
 * DispositionTraits
 *
 * Disposition traits that influence how memories are formed and interpreted.
 */
type DispositionTraits = {
    /**
     * Skepticism
     *
     * How skeptical vs trusting (1=trusting, 5=skeptical)
     */
    skepticism: number;
    /**
     * Literalism
     *
     * How literally to interpret information (1=flexible, 5=literal)
     */
    literalism: number;
    /**
     * Empathy
     *
     * How much to consider emotional context (1=detached, 5=empathetic)
     */
    empathy: number;
};
/**
 * DocumentExportSubmitResponse
 *
 * Response for the async document-export endpoint (202).
 *
 * The export runs in the background; poll the operations endpoint for status.
 * On completion the operation's ``result_metadata`` carries ``download_url``
 * (fetch the ZIP from GET /v1/default/files/download/{key}), ``storage_key``,
 * ``byte_size``, and ``filename``.
 */
type DocumentExportSubmitResponse = {
    /**
     * Operation Id
     */
    operation_id: string;
    /**
     * Status
     */
    status?: string;
};
/**
 * DocumentImportSubmitResponse
 *
 * Response for the async document-import endpoint (202).
 *
 * The import runs in the background; poll the operations endpoint for status.
 * The imported/skipped counts (documents_imported, facts_imported,
 * observations_imported, etc.) are written to the operation's result_metadata.
 */
type DocumentImportSubmitResponse = {
    /**
     * Operation Id
     */
    operation_id: string;
    /**
     * Status
     */
    status?: string;
};
/**
 * DocumentListItem
 *
 * One row of the document listing — a document's metadata without its text.
 *
 * Extra keys are allowed and passed through: the rows used to be an open object, and
 * typing them must not drop a field an older or newer server also returns.
 */
type DocumentListItem = {
    /**
     * Id
     *
     * Document ID
     */
    id: string;
    /**
     * Bank Id
     *
     * Bank the document belongs to
     */
    bank_id?: string;
    /**
     * Content Hash
     *
     * Hash of the document text, for idempotent retain
     */
    content_hash?: string | null;
    /**
     * Created At
     *
     * When the document was first retained (ISO 8601)
     */
    created_at?: string;
    /**
     * Updated At
     *
     * When the document was last written (ISO 8601)
     */
    updated_at?: string;
    /**
     * Text Length
     *
     * Length of the stored document text in characters
     */
    text_length?: number;
    /**
     * Memory Unit Count
     *
     * Number of memory units extracted from this document
     */
    memory_unit_count?: number;
    /**
     * Retain Params
     *
     * Parameters used during retain
     */
    retain_params?: {
        [key: string]: unknown;
    } | null;
    /**
     * Document Metadata
     *
     * Document metadata
     */
    document_metadata?: {
        [key: string]: unknown;
    } | null;
    /**
     * Tags
     *
     * Tags associated with this document
     */
    tags?: Array<string>;
};
/**
 * DocumentResponse
 *
 * Response model for get document endpoint.
 */
type DocumentResponse = {
    /**
     * Id
     */
    id: string;
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Original Text
     */
    original_text: string | null;
    /**
     * Content Hash
     */
    content_hash: string | null;
    /**
     * Created At
     */
    created_at: string;
    /**
     * Updated At
     */
    updated_at: string;
    /**
     * Memory Unit Count
     */
    memory_unit_count: number;
    /**
     * Nodes By Fact Type
     *
     * Memory count per fact type (world, experience, observation)
     */
    nodes_by_fact_type?: {
        [key: string]: number;
    } | null;
    /**
     * Tags
     *
     * Tags associated with this document
     */
    tags?: Array<string>;
    /**
     * Document Metadata
     *
     * Document metadata
     */
    document_metadata?: {
        [key: string]: unknown;
    } | null;
    /**
     * Retain Params
     *
     * Parameters used during retain
     */
    retain_params?: {
        [key: string]: unknown;
    } | null;
    /**
     * Observation Scopes
     *
     * The observation_scopes spec configured at retain time (e.g. 'all_combinations', 'per_tag', or explicit tag-set lists), captured into retain_params. None when none was set (default 'combined' scoping) or for documents retained before this was captured.
     */
    observation_scopes?: string | Array<Array<string>> | null;
    /**
     * Attachments
     *
     * Attachments referenced by this document, when it was retained with inline content. Each carries a bank-scoped `url` serving the original bytes. Omitted when there are none.
     */
    attachments?: Array<ChunkAttachment> | null;
};
/**
 * DryRunExtractRequest
 *
 * Request to run fact extraction ONLY (no resolution/links/embeddings/persistence).
 *
 * Every field below the content/context/date is a prompt-affecting override applied just for this
 * call — used to preview what a candidate retain mission (or any extraction setting) would extract,
 * without changing the bank. Unset (null) fields fall back to the bank's resolved config.
 */
type DryRunExtractRequest = {
    /**
     * Content
     *
     * Text to extract facts from (e.g. a document or a single chunk).
     */
    content: string;
    /**
     * Context
     *
     * Optional context about the content.
     */
    context?: string;
    /**
     * Timestamp
     *
     * Reference timestamp for resolving relative times (ISO 8601).
     */
    timestamp?: string | null;
    /**
     * Agent Name
     *
     * Deprecated: describe the speaker in `context` instead. Narrator override (memory owner) primed in the prompt; still honored for backwards compatibility.
     *
     * @deprecated
     */
    agent_name?: string | null;
    /**
     * Strategy
     *
     * Name of a retain strategy to extract under (a key of the bank's `retain_strategies`). Omit it and the bank's `retain_default_strategy` applies, exactly as it does for a retain that names none.
     */
    strategy?: string | null;
    /**
     * Retain Mission
     */
    retain_mission?: string | null;
    /**
     * Retain Extraction Mode
     */
    retain_extraction_mode?: string | null;
    /**
     * Retain Custom Instructions
     */
    retain_custom_instructions?: string | null;
    /**
     * Retain Extract Causal Links
     */
    retain_extract_causal_links?: boolean | null;
    /**
     * Retain Chunk Size
     */
    retain_chunk_size?: number | null;
    /**
     * Entity Labels
     *
     * Controlled vocabulary for entity labels (overrides the bank's config for this call)
     */
    entity_labels?: Array<LabelGroupInput> | null;
    /**
     * Entities Allow Free Form
     */
    entities_allow_free_form?: boolean | null;
    /**
     * Llm Output Language
     */
    llm_output_language?: string | null;
};
/**
 * DryRunExtractionResult
 *
 * Result of dry-run fact extraction: candidate facts, the chunks they came from,
 * and aggregated LLM token usage.
 */
type DryRunExtractionResult = {
    /**
     * Facts
     *
     * Candidate facts the retain step would extract.
     */
    facts?: Array<ExtractedFact>;
    /**
     * Chunks
     *
     * The chunks the input was cut into before extraction. Already computed on every path; returned because `retain_chunk_size` is otherwise a number with no visible effect.
     */
    chunks?: Array<ExtractionChunk>;
    /**
     * Aggregated token usage across the extraction LLM calls.
     */
    usage?: TokenUsage;
};
/**
 * EntityDetailResponse
 *
 * Response model for entity detail endpoint.
 */
type EntityDetailResponse = {
    /**
     * Id
     */
    id: string;
    /**
     * Canonical Name
     */
    canonical_name: string;
    /**
     * Mention Count
     */
    mention_count: number;
    /**
     * First Seen
     */
    first_seen?: string | null;
    /**
     * Last Seen
     */
    last_seen?: string | null;
    /**
     * Metadata
     */
    metadata?: {
        [key: string]: unknown;
    } | null;
    /**
     * Observations
     */
    observations: Array<EntityObservationResponse>;
};
/**
 * EntityGraphEdge
 *
 * A co-occurrence edge, in the Cytoscape ``{"data": {...}}`` envelope the graph uses.
 */
type EntityGraphEdge = {
    data: EntityGraphEdgeData;
};
/**
 * EntityGraphEdgeData
 *
 * The payload of one co-occurrence edge.
 */
type EntityGraphEdgeData = {
    /**
     * Id
     *
     * Edge ID (``<source>-<target>``)
     */
    id: string;
    /**
     * Source
     *
     * Source entity ID
     */
    source: string;
    /**
     * Target
     *
     * Target entity ID
     */
    target: string;
    /**
     * Linktype
     *
     * Kind of relationship this edge represents
     */
    linkType?: string;
    /**
     * Weight
     *
     * Number of co-occurrences between the two entities
     */
    weight?: number;
    /**
     * Color
     *
     * Suggested edge colour for rendering
     */
    color?: string | null;
    /**
     * Linestyle
     *
     * Suggested edge line style for rendering
     */
    lineStyle?: string | null;
    /**
     * Lastcooccurred
     *
     * ISO 8601 timestamp of the most recent co-occurrence
     */
    lastCooccurred?: string | null;
};
/**
 * EntityGraphNode
 *
 * An entity node, in the Cytoscape ``{"data": {...}}`` envelope the graph uses.
 */
type EntityGraphNode = {
    data: EntityGraphNodeData;
};
/**
 * EntityGraphNodeData
 *
 * The payload of one entity node in the co-occurrence graph.
 *
 * Extra keys are allowed and passed through: the graph payload has always been an open
 * object, and typing it must not drop a field an older or newer server also returns.
 */
type EntityGraphNodeData = {
    /**
     * Id
     *
     * Entity ID
     */
    id: string;
    /**
     * Label
     *
     * Entity canonical name
     */
    label?: string;
    /**
     * Mentioncount
     *
     * How many times this entity was mentioned
     */
    mentionCount?: number;
    /**
     * Color
     *
     * Suggested node colour for rendering
     */
    color?: string | null;
};
/**
 * EntityGraphResponse
 *
 * Response model for entity co-occurrence graph endpoint.
 */
type EntityGraphResponse = {
    /**
     * Nodes
     */
    nodes: Array<EntityGraphNode>;
    /**
     * Edges
     */
    edges: Array<EntityGraphEdge>;
    /**
     * Total Entities
     */
    total_entities: number;
    /**
     * Total Edges
     */
    total_edges: number;
    /**
     * Limit
     */
    limit: number;
};
/**
 * EntityIncludeOptions
 *
 * Options for including entity observations in recall results.
 */
type EntityIncludeOptions = {
    /**
     * Max Tokens
     *
     * Maximum tokens for entity observations
     */
    max_tokens?: number;
};
/**
 * EntityInput
 *
 * Entity to associate with retained content.
 */
type EntityInput$1 = {
    /**
     * Text
     *
     * The entity name/text
     */
    text: string;
    /**
     * Type
     *
     * Optional entity type (e.g., 'PERSON', 'ORG', 'CONCEPT')
     */
    type?: string | null;
};
/**
 * EntityListItem
 *
 * Entity list item with summary.
 */
type EntityListItem = {
    /**
     * Id
     */
    id: string;
    /**
     * Canonical Name
     */
    canonical_name: string;
    /**
     * Mention Count
     */
    mention_count: number;
    /**
     * First Seen
     */
    first_seen?: string | null;
    /**
     * Last Seen
     */
    last_seen?: string | null;
    /**
     * Metadata
     */
    metadata?: {
        [key: string]: unknown;
    } | null;
};
/**
 * EntityListResponse
 *
 * Response model for entity list endpoint.
 */
type EntityListResponse = {
    /**
     * Items
     */
    items: Array<EntityListItem>;
    /**
     * Total
     */
    total: number;
    /**
     * Limit
     */
    limit: number;
    /**
     * Offset
     */
    offset: number;
};
/**
 * EntityObservationResponse
 *
 * An observation about an entity.
 */
type EntityObservationResponse = {
    /**
     * Text
     */
    text: string;
    /**
     * Mentioned At
     */
    mentioned_at?: string | null;
};
/**
 * EntityStateResponse
 *
 * Current mental model of an entity.
 */
type EntityStateResponse = {
    /**
     * Entity Id
     */
    entity_id: string;
    /**
     * Canonical Name
     */
    canonical_name: string;
    /**
     * Observations
     */
    observations: Array<EntityObservationResponse>;
};
/**
 * ExtractedFact
 *
 * A single candidate fact produced by dry-run extraction (no resolution/links/persistence).
 *
 * A deliberate subset of the persisted memory-unit shape — only the fields a fresh extraction
 * yields. Storage/consolidation/curation fields (id, document_id, chunk_id, proof_count, state, …)
 * are omitted because nothing is stored. Entities are raw, unresolved names.
 */
type ExtractedFact = {
    /**
     * Text
     *
     * The extracted fact text.
     */
    text: string;
    /**
     * Fact Type
     *
     * Perspective classification: 'world' or 'experience'.
     */
    fact_type: string;
    /**
     * Occurred Start
     *
     * ISO timestamp the fact's event started, if dated.
     */
    occurred_start?: string | null;
    /**
     * Occurred End
     *
     * ISO timestamp the fact's event ended, if dated.
     */
    occurred_end?: string | null;
    /**
     * Entities
     *
     * Raw (unresolved) entity names mentioned in the fact.
     */
    entities?: Array<string>;
    /**
     * Chunk Index
     *
     * Index into `chunks` of the chunk this fact came from; null if it could not be attributed.
     */
    chunk_index?: number | null;
};
/**
 * ExtractionChunk
 *
 * One chunk the extractor was handed, and how much it yielded.
 */
type ExtractionChunk = {
    /**
     * Text
     *
     * The chunk as the extractor saw it.
     */
    text: string;
    /**
     * Fact Count
     *
     * How many facts came out of this chunk.
     */
    fact_count: number;
};
/**
 * FactsIncludeOptions
 *
 * Options for including facts (based_on) in reflect results.
 */
type FactsIncludeOptions = {
    [key: string]: unknown;
};
/**
 * FeaturesInfo
 *
 * Feature flags indicating which capabilities are enabled.
 */
type FeaturesInfo = {
    /**
     * Observations
     *
     * Whether observations (auto-consolidation) are enabled
     */
    observations: boolean;
    /**
     * Mcp
     *
     * Whether MCP (Model Context Protocol) server is enabled
     */
    mcp: boolean;
    /**
     * Worker
     *
     * Whether the background worker is enabled
     */
    worker: boolean;
    /**
     * Bank Config Api
     *
     * Whether per-bank configuration API is enabled
     */
    bank_config_api: boolean;
    /**
     * Bank Llm Health
     *
     * Whether the per-bank LLM connectivity probe is enabled
     */
    bank_llm_health: boolean;
    /**
     * File Upload Api
     *
     * Whether file upload/conversion API is enabled
     */
    file_upload_api: boolean;
    /**
     * Document Export Api
     *
     * Whether the document export endpoint is enabled
     */
    document_export_api: boolean;
    /**
     * Document Import Api
     *
     * Whether the document import endpoint is enabled
     */
    document_import_api: boolean;
    /**
     * Audit Log
     *
     * Whether audit logging is enabled by default (overridable per bank)
     */
    audit_log: boolean;
    /**
     * Llm Trace
     *
     * Whether per-bank LLM request tracing is enabled
     */
    llm_trace: boolean;
    /**
     * Store Document Text
     *
     * Whether raw source text is persisted. When false, document/chunk source text is not stored.
     */
    store_document_text: boolean;
};
/**
 * FileContentBlock
 *
 * A non-image attachment — a PDF, a spreadsheet — in the position it was written.
 *
 * Split from ``image`` rather than folded into one type because the providers
 * split it: Anthropic has distinct image and document blocks, OpenAI has
 * image_url and file parts. Carrying the caller's own distinction through means
 * the per-provider conversion never has to guess from the media type alone.
 */
type FileContentBlock = {
    /**
     * Type
     */
    type: "file";
    source: Base64AttachmentSource;
    /**
     * Filename
     *
     * Original filename, passed to providers that show one to the model (e.g. OpenAI).
     */
    filename?: string | null;
};
/**
 * FileRetainResponse
 *
 * Response model for file upload endpoint.
 */
type FileRetainResponse = {
    /**
     * Operation Ids
     *
     * Operation IDs for tracking file conversion operations. Use GET /v1/default/banks/{bank_id}/operations to list operations.
     */
    operation_ids: Array<string>;
};
/**
 * GraphDataResponse
 *
 * Response model for graph data endpoint.
 */
type GraphDataResponse = {
    /**
     * Nodes
     */
    nodes: Array<MemoryGraphNode>;
    /**
     * Edges
     */
    edges: Array<MemoryGraphEdge>;
    /**
     * Table Rows
     */
    table_rows: Array<MemoryGraphTableRow>;
    /**
     * Total Units
     */
    total_units: number;
    /**
     * Limit
     */
    limit: number;
};
/**
 * HTTPValidationError
 */
type HttpValidationError = {
    /**
     * Detail
     */
    detail?: Array<ValidationError>;
};
/**
 * ImageContentBlock
 *
 * An image within a multimodal item, in the position the caller wrote it.
 */
type ImageContentBlock = {
    /**
     * Type
     */
    type: "image";
    source: Base64AttachmentSource;
};
/**
 * IncludeOptions
 *
 * Options for including additional data in recall results.
 */
type IncludeOptions = {
    /**
     * Include entity observations. Set to null to disable entity inclusion.
     */
    entities?: EntityIncludeOptions | null;
    /**
     * Include raw chunks. Set to {} to enable, null to disable (default: disabled).
     */
    chunks?: ChunkIncludeOptions | null;
    /**
     * Include source facts for observation-type results. Set to {} to enable, null to disable (default: disabled).
     */
    source_facts?: SourceFactsIncludeOptions | null;
};
/**
 * KnowledgeNode
 *
 * A node in the knowledge-base tree — a folder or a page.
 *
 * Pages carry ``description``/``tags`` from their backing mental model. The
 * knowledge base is client-managed (CRUD); ``managed`` lets a client tag a node
 * as system-owned vs. hand-authored.
 */
type KnowledgeNode = {
    /**
     * Id
     */
    id: string;
    /**
     * Kind
     */
    kind: "folder" | "page";
    /**
     * Name
     */
    name: string;
    /**
     * Parent Id
     */
    parent_id?: string | null;
    /**
     * Mental Model Id
     *
     * Backing mental model id (pages only).
     */
    mental_model_id?: string | null;
    /**
     * Managed
     *
     * Client-set flag: true = system-owned, false = hand-authored.
     */
    managed?: boolean;
    /**
     * Description
     *
     * Page source query (the page's `description`).
     */
    description?: string | null;
    /**
     * Tags
     */
    tags?: Array<string>;
    /**
     * Timestamp
     *
     * Last refresh (page) or last update (folder).
     */
    timestamp?: string | null;
    /**
     * Is Stale
     *
     * Pages only, populated by the tree endpoint. True when a memory in *this page's* scope — its tags and fact types — has been written since the page last read the memories. That is the same check a scheduled refresh runs before spending an LLM call, so a flagged page is one a refresh would actually rewrite. Deletions are not observed: removing an in-scope memory leaves no write behind, so it does not raise this flag.
     */
    is_stale?: boolean | null;
    /**
     * Pages only: the page's refresh settings — when it rebuilds itself (`refresh_after_consolidation` or `refresh_cron`), in which mode, and over which facts. This is the EFFECTIVE policy: a setting the page never stored is reported at its default, so compare the fields you care about rather than the whole object against a patch you sent. Absent on folders, which have no backing mental model, and on a page with no trigger stored.
     */
    trigger?: MentalModelTriggerOutput | null;
    /**
     * Children
     */
    children?: Array<KnowledgeNode>;
};
/**
 * KnowledgePageBundleFile
 *
 * One file in a portable markdown bundle.
 */
type KnowledgePageBundleFile = {
    /**
     * Path
     */
    path: string;
    /**
     * Content
     */
    content: string;
};
/**
 * KnowledgePageBundleResponse
 *
 * A portable markdown bundle — a flat set of markdown files (index + pages + logs).
 */
type KnowledgePageBundleResponse = {
    /**
     * Files
     */
    files: Array<KnowledgePageBundleFile>;
};
/**
 * KnowledgePageResponse
 *
 * A knowledge page rendered as a markdown document.
 */
type KnowledgePageResponse = {
    /**
     * Id
     */
    id: string;
    /**
     * Name
     */
    name: string;
    /**
     * Type
     *
     * Page type — from a `type:<x>` tag, else 'knowledge-page'.
     */
    type: string;
    /**
     * Description
     *
     * The source query that rebuilds the page.
     */
    description?: string | null;
    /**
     * Tags
     */
    tags?: Array<string>;
    /**
     * Timestamp
     *
     * Last refresh time (falls back to creation).
     */
    timestamp?: string | null;
    /**
     * Body
     *
     * The page's synthesized markdown body.
     */
    body?: string | null;
    /**
     * Markdown
     *
     * The full markdown document: YAML frontmatter + markdown body.
     */
    markdown: string;
};
/**
 * KnowledgePageSearchResponse
 *
 * Ranked knowledge-page search results (BM25 + vector, RRF-fused).
 */
type KnowledgePageSearchResponse = {
    /**
     * Results
     */
    results: Array<KnowledgePageSearchResult>;
    /**
     * Total
     */
    total: number;
};
/**
 * KnowledgePageSearchResult
 *
 * One hybrid-search hit: a knowledge page and its fused relevance score.
 */
type KnowledgePageSearchResult = {
    /**
     * Id
     */
    id: string;
    /**
     * Name
     */
    name: string;
    /**
     * Mental Model Id
     */
    mental_model_id?: string | null;
    /**
     * Snippet
     */
    snippet: string;
    /**
     * Score
     *
     * Rank-fusion score in 0..1, where 1.0 means every search arm placed this page first. It reflects where the page ranked for this query, not how well its text matched, so it is only comparable within one result set.
     */
    score: number;
    /**
     * Updated At
     */
    updated_at?: string | null;
};
/**
 * KnowledgeTreeResponse
 *
 * The knowledge base as a nested folder/page tree.
 */
type KnowledgeTreeResponse = {
    /**
     * Roots
     */
    roots: Array<KnowledgeNode>;
};
/**
 * LLMCallTrace
 *
 * A single LLM call made during reflect.
 */
type LlmCallTrace = {
    /**
     * Scope
     *
     * Call scope: agent_1, agent_2, final, etc.
     */
    scope: string;
    /**
     * Duration Ms
     *
     * Execution time in milliseconds
     */
    duration_ms: number;
};
/**
 * LLMRequestEntry
 *
 * A single LLM request trace row, as returned by the read API.
 */
type LlmRequestEntry = {
    /**
     * Id
     */
    id: string;
    /**
     * Bank Id
     */
    bank_id: string | null;
    /**
     * Operation
     */
    operation: string | null;
    /**
     * Scope
     */
    scope: string | null;
    /**
     * Trace Id
     */
    trace_id: string | null;
    /**
     * Span Id
     */
    span_id: string | null;
    /**
     * Parent Span Id
     */
    parent_span_id: string | null;
    /**
     * Provider
     */
    provider: string | null;
    /**
     * Model
     */
    model: string | null;
    /**
     * Status
     */
    status: string;
    /**
     * Started At
     */
    started_at: string | null;
    /**
     * Ended At
     */
    ended_at: string | null;
    /**
     * Duration Ms
     */
    duration_ms: number | null;
    /**
     * Input Tokens
     */
    input_tokens: number | null;
    /**
     * Output Tokens
     */
    output_tokens: number | null;
    /**
     * Cached Tokens
     */
    cached_tokens: number | null;
    /**
     * Total Tokens
     */
    total_tokens: number | null;
    /**
     * Input
     */
    input?: unknown;
    /**
     * Output
     */
    output?: unknown;
    /**
     * Error
     */
    error: string | null;
    /**
     * Llm Info
     */
    llm_info: {
        [key: string]: unknown;
    };
    /**
     * Metadata
     */
    metadata: {
        [key: string]: unknown;
    };
};
/**
 * LLMRequestListResponse
 *
 * Paginated list of LLM request traces for a bank.
 */
type LlmRequestListResponse = {
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Total
     */
    total: number;
    /**
     * Limit
     */
    limit: number;
    /**
     * Offset
     */
    offset: number;
    /**
     * Items
     */
    items: Array<LlmRequestEntry>;
};
/**
 * LLMRequestStatsBucket
 *
 * A single time bucket in LLM request stats.
 */
type LlmRequestStatsBucket = {
    /**
     * Time
     */
    time: string;
    /**
     * Statuses
     */
    statuses: {
        [key: string]: number;
    };
    /**
     * Total
     */
    total: number;
    tokens: LlmRequestTokenSums;
};
/**
 * LLMRequestStatsResponse
 *
 * LLM request counts and token sums grouped by time bucket.
 */
type LlmRequestStatsResponse = {
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Period
     */
    period: string;
    /**
     * Trunc
     */
    trunc: string;
    /**
     * Start
     */
    start: string;
    /**
     * Buckets
     */
    buckets: Array<LlmRequestStatsBucket>;
};
/**
 * LLMRequestTokenSums
 *
 * Token totals for a time bucket.
 */
type LlmRequestTokenSums = {
    /**
     * Input
     */
    input: number;
    /**
     * Output
     */
    output: number;
    /**
     * Cached
     */
    cached: number;
    /**
     * Total
     */
    total: number;
};
/**
 * LabelGroup
 *
 * A label group (dimension) with its type and allowed values.
 */
type LabelGroupInput = {
    /**
     * Key
     */
    key: string;
    /**
     * Description
     */
    description?: string;
    /**
     * Type
     */
    type?: "value" | "multi-values" | "text" | "multi-text" | "map";
    /**
     * Optional
     */
    optional?: boolean;
    /**
     * Tag
     */
    tag?: boolean;
    /**
     * Values
     */
    values?: Array<LabelValue>;
    /**
     * Fields
     */
    fields?: {
        [key: string]: MapFieldInput;
    };
};
/**
 * LabelGroup
 *
 * A label group (dimension) with its type and allowed values.
 */
type LabelGroupOutput = {
    /**
     * Key
     */
    key: string;
    /**
     * Description
     */
    description?: string;
    /**
     * Type
     */
    type?: "value" | "multi-values" | "text" | "multi-text" | "map";
    /**
     * Optional
     */
    optional?: boolean;
    /**
     * Tag
     */
    tag?: boolean;
    /**
     * Values
     */
    values?: Array<LabelValue>;
    /**
     * Fields
     */
    fields?: {
        [key: string]: MapFieldOutput;
    };
};
/**
 * LabelValue
 *
 * A single allowed value for a label group.
 */
type LabelValue = {
    /**
     * Value
     */
    value: string;
    /**
     * Description
     */
    description?: string;
};
/**
 * ListChunksResponse
 *
 * Response model for listing chunks of a document.
 */
type ListChunksResponse = {
    /**
     * Items
     */
    items: Array<ChunkResponse>;
    /**
     * Total
     */
    total: number;
    /**
     * Limit
     */
    limit: number;
    /**
     * Offset
     */
    offset: number;
};
/**
 * ListDocumentsResponse
 *
 * Response model for list documents endpoint.
 */
type ListDocumentsResponse = {
    /**
     * Items
     */
    items: Array<DocumentListItem>;
    /**
     * Total
     */
    total: number;
    /**
     * Limit
     */
    limit: number;
    /**
     * Offset
     */
    offset: number;
};
/**
 * ListMemoryUnitsResponse
 *
 * Response model for list memory units endpoint.
 */
type ListMemoryUnitsResponse = {
    /**
     * Items
     */
    items: Array<MemoryUnitListItem>;
    /**
     * Total
     */
    total: number;
    /**
     * Limit
     */
    limit: number;
    /**
     * Offset
     */
    offset: number;
};
/**
 * ListTagsResponse
 *
 * Response model for list tags endpoint.
 */
type ListTagsResponse = {
    /**
     * Items
     */
    items: Array<TagItem>;
    /**
     * Total
     */
    total: number;
    /**
     * Limit
     */
    limit: number;
    /**
     * Offset
     */
    offset: number;
};
/**
 * LivenessResponse
 *
 * Payload for the API's DB-free liveness probe.
 */
type LivenessResponse = {
    /**
     * Status
     *
     * Always "alive" — reaching this handler is the check
     */
    status: "alive";
    /**
     * Version
     *
     * Hindsight version this process is running
     */
    version: string;
    /**
     * Uptime Seconds
     *
     * Seconds since the process started
     */
    uptime_seconds: number;
};
/**
 * LlmOperationHealth
 *
 * LLM connectivity status for a single operation. Status only — no provider/model/
 * endpoint/error, so the probe never discloses the LLM configuration.
 */
type LlmOperationHealth = {
    /**
     * LlmHealthOperation
     *
     * Operation whose LLM was probed
     */
    operation: "retain" | "consolidation" | "reflect";
    /**
     * Ok
     *
     * True only when the probe connected successfully
     */
    ok: boolean;
    /**
     * LlmHealthStatus
     *
     * 'connected'; 'not_configured' (provider is 'none'); 'auth_failed' (rejected — usually a wrong/expired API key); 'unreachable' (call failed); 'timeout'
     */
    status: "connected" | "not_configured" | "auth_failed" | "unreachable" | "timeout";
    /**
     * Latency Ms
     *
     * Round-trip latency of the probe call
     */
    latency_ms?: number | null;
};
/**
 * MapField
 *
 * A field within a map-type entity label group. Supports recursion via type='map'.
 */
type MapFieldInput = {
    /**
     * Type
     */
    type?: "text" | "multi-text" | "value" | "multi-values" | "map";
    /**
     * Description
     */
    description?: string;
    /**
     * Values
     */
    values?: Array<LabelValue>;
    /**
     * Fields
     */
    fields?: {
        [key: string]: MapFieldInput;
    };
};
/**
 * MapField
 *
 * A field within a map-type entity label group. Supports recursion via type='map'.
 */
type MapFieldOutput = {
    /**
     * Type
     */
    type?: "text" | "multi-text" | "value" | "multi-values" | "map";
    /**
     * Description
     */
    description?: string;
    /**
     * Values
     */
    values?: Array<LabelValue>;
    /**
     * Fields
     */
    fields?: {
        [key: string]: MapFieldOutput;
    };
};
/**
 * MemoriesTimeseriesResponse
 *
 * Time-series of memory ingestion bucketed by time and fact type.
 */
type MemoriesTimeseriesResponse = {
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Period
     *
     * One of: 1h, 12h, 1d, 7d, 30d, 90d.
     */
    period: string;
    /**
     * Trunc
     *
     * Bucket granularity: minute, hour, day.
     */
    trunc: string;
    /**
     * Time Field
     *
     * Timestamp column used to assign each row to a bucket. `created_at` shows ingest time; `mentioned_at` / `occurred_start` show event time (falls back to `created_at` per row when null).
     */
    time_field?: string;
    /**
     * Buckets
     *
     * Per-bucket counts, always returned fully padded for the requested period.
     */
    buckets?: Array<MemoryTimeseriesBucket>;
};
/**
 * MemoryGraphEdge
 *
 * An edge between two memory units, in the Cytoscape ``{"data": {...}}`` envelope.
 */
type MemoryGraphEdge = {
    data: MemoryGraphEdgeData;
};
/**
 * MemoryGraphEdgeData
 *
 * The payload of one edge between two memory units.
 */
type MemoryGraphEdgeData = {
    /**
     * Id
     *
     * Edge ID (``<source>-<target>-<linkType>``)
     */
    id: string;
    /**
     * Source
     *
     * Source memory unit ID
     */
    source: string;
    /**
     * Target
     *
     * Target memory unit ID
     */
    target: string;
    /**
     * Linktype
     *
     * Link kind: 'entity', 'semantic', 'temporal', ...
     */
    linkType?: string;
    /**
     * Weight
     *
     * Link strength
     */
    weight?: number;
    /**
     * Entityname
     *
     * Shared entity for an 'entity' link, empty otherwise
     */
    entityName?: string;
    /**
     * Color
     *
     * Suggested edge colour for rendering
     */
    color?: string | null;
    /**
     * Linestyle
     *
     * Suggested edge line style for rendering
     */
    lineStyle?: string | null;
};
/**
 * MemoryGraphNode
 *
 * A memory-unit node, in the Cytoscape ``{"data": {...}}`` envelope the graph uses.
 */
type MemoryGraphNode = {
    data: MemoryGraphNodeData;
};
/**
 * MemoryGraphNodeData
 *
 * The payload of one memory-unit node in the memory graph.
 *
 * Extra keys are allowed and passed through, so typing this never drops a field the
 * server also returns.
 */
type MemoryGraphNodeData = {
    /**
     * Id
     *
     * Memory unit ID
     */
    id: string;
    /**
     * Label
     *
     * Short display label (the text, truncated)
     */
    label?: string;
    /**
     * Text
     *
     * Full memory unit text
     */
    text?: string;
    /**
     * Date
     *
     * Event date (ISO 8601), empty when unknown
     */
    date?: string;
    /**
     * Context
     *
     * Context the memory was captured in
     */
    context?: string;
    /**
     * Entities
     *
     * Comma-separated entity names, 'None' when there are none
     */
    entities?: string;
    /**
     * Color
     *
     * Suggested node colour for rendering
     */
    color?: string | null;
};
/**
 * MemoryGraphTableRow
 *
 * One row of the flat table view that accompanies the memory graph.
 */
type MemoryGraphTableRow = {
    /**
     * Id
     *
     * Memory unit ID
     */
    id: string;
    /**
     * Text
     *
     * Memory unit text
     */
    text?: string;
    /**
     * Context
     *
     * Context the memory was captured in ('N/A' when absent)
     */
    context?: string;
    /**
     * Occurred Start
     *
     * Start of the event interval (ISO 8601)
     */
    occurred_start?: string | null;
    /**
     * Occurred End
     *
     * End of the event interval (ISO 8601)
     */
    occurred_end?: string | null;
    /**
     * Mentioned At
     *
     * When the memory was mentioned (ISO 8601)
     */
    mentioned_at?: string | null;
    /**
     * Date
     *
     * Deprecated: formatted event date, kept for backwards compatibility
     */
    date?: string | null;
    /**
     * Entities
     *
     * Comma-separated entity names, 'None' when there are none
     */
    entities?: string;
    /**
     * Document Id
     *
     * Source document ID
     */
    document_id?: string | null;
    /**
     * Chunk Id
     *
     * Source chunk ID
     */
    chunk_id?: string | null;
    /**
     * Fact Type
     *
     * Fact type: world, experience or observation
     */
    fact_type?: string | null;
    /**
     * Tags
     *
     * Tags on this memory unit
     */
    tags?: Array<string>;
    /**
     * Created At
     *
     * When the memory unit was created (ISO 8601)
     */
    created_at?: string | null;
    /**
     * Proof Count
     *
     * How many times the fact was independently seen
     */
    proof_count?: number | null;
};
/**
 * MemoryItem
 *
 * Single memory item for retain.
 */
type MemoryItem = {
    /**
     * Content
     *
     * The raw content to retain. Either a plain string, or an ordered list of content blocks so images sit inline where they actually appear:
     *
     * [{"type": "text", "text": "click the button shown:"},
     * {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": "..."}},
     * {"type": "text", "text": "...then reconnect."}]
     *
     * The block form requires a vision-capable retain LLM; a retain carrying images against a text-only model is rejected rather than silently dropping them. A single text block is equivalent to the plain string form.
     */
    content: string | Array<({
        type: "text";
    } & TextContentBlock) | ({
        type: "image";
    } & ImageContentBlock) | ({
        type: "file";
    } & FileContentBlock)>;
    /**
     * Timestamp
     *
     * When the content occurred. Accepts an ISO 8601 datetime string (e.g. '2024-01-15T10:30:00Z'), null/omitted (defaults to now), or the special string 'unset' to explicitly store without any timestamp (use this for timeless content such as fictional documents or static reference material).
     */
    timestamp?: string | string | null;
    /**
     * Context
     */
    context?: string | null;
    /**
     * Metadata
     */
    metadata?: {
        [key: string]: string;
    } | null;
    /**
     * Document Id
     *
     * Optional document ID for this memory item. Provide a distinct document_id per source document — items sharing a document_id are grouped into the same document. Auto-generated when omitted.
     */
    document_id?: string | null;
    /**
     * Entities
     *
     * Optional entities to combine with auto-extracted entities.
     */
    entities?: Array<EntityInput$1> | null;
    /**
     * Resolve Entities
     *
     * Whether the names in 'entities' are resolved against the entities already in the bank. True (default) matches each name to a similar existing entity when it scores above the match threshold, so a name close to one already in the bank may resolve to that one instead of the one you wrote. False takes your names literally — an existing entity is reused only on a case-insensitive name match, any other name creates a new entity, and your names are never merged with each other. This applies only to the entities you supply here; auto-extracted entities are always resolved, since they are the extractor's guess at a name rather than yours. Ignored when 'entities' is omitted.
     */
    resolve_entities?: boolean;
    /**
     * Tags
     *
     * Optional tags for visibility scoping. Memories with tags can be filtered during recall.
     */
    tags?: Array<string> | null;
    /**
     * ObservationScopes
     *
     * How to scope observations during consolidation. 'per_tag' runs one consolidation pass per individual tag, creating separate observations for each tag. 'combined' (default) runs a single pass with all tags together. 'shared' runs a single pass over one global, untagged scope, so memories consolidate together regardless of their tags — useful for deduplicating across volatile per-call provenance tags (e.g. per-session ids) while keeping those tags on the source facts. A list of tag lists runs one pass per inner list, giving full control over which combinations to use.
     */
    observation_scopes?: "per_tag" | "combined" | "all_combinations" | "shared" | Array<Array<string>> | null;
    /**
     * Strategy
     *
     * Named retain strategy for this item. Overrides the bank's default strategy for this item only. Strategies are defined in the bank config under 'retain_strategies'.
     */
    strategy?: string | null;
    /**
     * Update Mode
     *
     * How to handle an existing document with the same document_id. 'replace' (default) deletes old data and reprocesses from scratch. 'append' concatenates new content to the existing document text and reprocesses.
     */
    update_mode?: "replace" | "append" | null;
};
/**
 * MemoryTimeseriesBucket
 *
 * One bucket in the memory ingestion time-series.
 */
type MemoryTimeseriesBucket = {
    /**
     * Time
     *
     * Bucket start timestamp in ISO-8601 (UTC).
     */
    time: string;
    /**
     * World
     *
     * World-fact memories ingested in this bucket.
     */
    world?: number;
    /**
     * Experience
     *
     * Experience memories ingested in this bucket.
     */
    experience?: number;
    /**
     * Observation
     *
     * Observations recorded in this bucket.
     */
    observation?: number;
};
/**
 * MemoryUnitListItem
 *
 * One row of the memory-unit listing.
 *
 * Extra keys are allowed and passed through: the rows used to be an open object, and
 * typing them must not drop a field an older or newer server also returns.
 */
type MemoryUnitListItem = {
    /**
     * Id
     *
     * Memory unit ID
     */
    id: string;
    /**
     * Text
     *
     * The fact text
     */
    text?: string;
    /**
     * Context
     *
     * Context the memory was captured in
     */
    context?: string;
    /**
     * Date
     *
     * Event date (ISO 8601), empty when unknown
     */
    date?: string;
    /**
     * Fact Type
     *
     * Fact type: world, experience or observation
     */
    fact_type?: string | null;
    /**
     * Document Id
     *
     * Source document ID
     */
    document_id?: string | null;
    /**
     * Mentioned At
     *
     * When the memory was mentioned (ISO 8601)
     */
    mentioned_at?: string | null;
    /**
     * Occurred Start
     *
     * Start of the event interval (ISO 8601)
     */
    occurred_start?: string | null;
    /**
     * Occurred End
     *
     * End of the event interval (ISO 8601)
     */
    occurred_end?: string | null;
    /**
     * Entities
     *
     * Comma-separated canonical entity names
     */
    entities?: string;
    /**
     * Chunk Id
     *
     * Source chunk ID
     */
    chunk_id?: string | null;
    /**
     * Proof Count
     *
     * How many times the fact was independently seen
     */
    proof_count?: number;
    /**
     * Tags
     *
     * Tags on this memory unit
     */
    tags?: Array<string>;
    /**
     * Metadata
     *
     * Arbitrary metadata stored with the memory
     */
    metadata?: {
        [key: string]: unknown;
    };
    /**
     * Consolidated At
     *
     * When consolidation last succeeded (ISO 8601)
     */
    consolidated_at?: string | null;
    /**
     * Consolidation Failed At
     *
     * When consolidation last failed permanently (ISO 8601)
     */
    consolidation_failed_at?: string | null;
    /**
     * State
     *
     * Curation state: 'valid' or 'invalidated'
     */
    state?: string;
    /**
     * Invalidation Reason
     *
     * Why the fact was invalidated, if it was
     */
    invalidation_reason?: string | null;
    /**
     * Invalidated At
     *
     * When the fact was invalidated (ISO 8601)
     */
    invalidated_at?: string | null;
    /**
     * Edited At
     *
     * When the fact was last edited by hand (ISO 8601)
     */
    edited_at?: string | null;
    /**
     * Updated At
     *
     * Write watermark for this row (ISO 8601)
     */
    updated_at?: string | null;
    /**
     * Source Memory Ids
     *
     * An observation's source facts; empty for a source fact
     */
    source_memory_ids?: Array<string>;
};
/**
 * MentalModelDeltaOperations
 *
 * Structured operations a delta refresh emitted against the existing document.
 */
type MentalModelDeltaOperations = {
    /**
     * Applied
     *
     * Operations applied to the document, in order.
     */
    applied?: Array<{
        [key: string]: unknown;
    }>;
    /**
     * Skipped
     *
     * Operations dropped as invalid, each with a reason.
     */
    skipped?: Array<{
        [key: string]: unknown;
    }>;
};
/**
 * MentalModelDryRunRefreshResult
 *
 * Preview of what a mental model refresh would do, having changed nothing.
 *
 * Runs the real pipeline — same scope resolution, same reflect call, same
 * delta operations — then reports the result instead of persisting it. The
 * model's content, structured content, watermark, and last_refreshed_at are
 * all left untouched, so a delta dry run is repeatable: it reads the same
 * window the next real refresh would.
 */
type MentalModelDryRunRefreshResult = {
    /**
     * Mental Model Id
     *
     * The mental model previewed.
     */
    mental_model_id: string;
    /**
     * Name
     *
     * Display name of the mental model.
     */
    name: string;
    /**
     * Requested Mode
     *
     * The mode asked for (from the model's trigger, or overridden).
     */
    requested_mode: "full" | "delta";
    /**
     * Effective Mode
     *
     * The mode the refresh actually ran in.
     */
    effective_mode: "full" | "delta";
    /**
     * Mode Fallback Reason
     *
     * Why delta was requested but not applied, if that happened.
     */
    mode_fallback_reason?: "no_baseline_content" | "source_query_changed" | "structured_doc_unreadable" | "delta_ops_failed" | "delta_ops_all_skipped" | null;
    /**
     * Outcome
     *
     * What a real refresh would do with the document.
     */
    outcome: "content_written" | "content_unchanged" | "content_preserved_no_new_facts" | "refresh_failed_empty_candidate" | "refresh_failed_delta_not_applied";
    /**
     * Would Persist
     *
     * Whether a real refresh would write new content.
     */
    would_persist: boolean;
    /**
     * The resolved memory scope.
     */
    scope: MentalModelRefreshScope;
    /**
     * The snapshot window read from.
     */
    window: MentalModelRefreshWindow;
    /**
     * Facts retrieved versus actually used.
     */
    facts: MentalModelFactCounts;
    /**
     * Based On
     *
     * The evidence this run would ground the document on, keyed by fact type — the same shape a refresh persists under reflect_response.based_on. Returned so a preview can show its sources without having to write them anywhere.
     */
    based_on?: {
        [key: string]: Array<{
            [key: string]: unknown;
        }>;
    };
    /**
     * Current Content
     *
     * The model's content as it stands now.
     */
    current_content: string;
    /**
     * Candidate Content
     *
     * Raw reflect synthesis, before any delta operations.
     */
    candidate_content: string;
    /**
     * Preview Content
     *
     * The content a real refresh would store: the delta-edited document, or the candidate in full mode.
     */
    preview_content: string;
    /**
     * Diff
     *
     * Unified diff from current_content to preview_content. Empty when identical.
     */
    diff: string;
    /**
     * Structured operations emitted, in delta mode.
     */
    delta_operations?: MentalModelDeltaOperations | null;
    /**
     * Facts the document cites that no longer exist, and what a real refresh would do about them.
     */
    retraction?: MentalModelRetraction | null;
    /**
     * Execution trace of the run, always included for a dry run.
     */
    trace: MentalModelRefreshTrace;
    /**
     * Token usage across the run's LLM calls.
     */
    usage?: TokenUsage;
    /**
     * Duration Ms
     *
     * Wall-clock duration of the run.
     */
    duration_ms?: number;
    /**
     * Warnings
     *
     * Conditions worth a human's attention, in plain language.
     */
    warnings?: Array<string>;
};
/**
 * MentalModelFactCounts
 *
 * Facts the refresh saw, keyed by fact type.
 *
 * ``retrieved`` and ``used`` diverging is the single most common cause of a
 * disappointing refresh: recall found plenty, but the reflect agent declared
 * none of it relevant to the topic, so none of it reached the document.
 */
type MentalModelFactCounts = {
    /**
     * Retrieved
     *
     * Facts the reflect agent's tool calls returned, by fact type.
     */
    retrieved?: {
        [key: string]: number;
    };
    /**
     * Used
     *
     * Facts the agent declared it actually based the answer on, by fact type.
     */
    used?: {
        [key: string]: number;
    };
};
/**
 * MentalModelListResponse
 *
 * Response model for listing mental models.
 */
type MentalModelListResponse = {
    /**
     * Items
     */
    items: Array<MentalModelResponse>;
    /**
     * Total
     *
     * Total number of mental models matching the filter (not just this page)
     */
    total: number;
    /**
     * Limit
     *
     * Page size that was applied
     */
    limit: number;
    /**
     * Offset
     *
     * Offset that was applied
     */
    offset: number;
};
/**
 * MentalModelRefreshScope
 *
 * The memory scope a refresh actually resolved to.
 *
 * A model's stored ``tags`` are not what filters memories — ``tags_match``
 * defaults to ``all_strict`` when tags are present, and ``tag_groups``
 * override flat tags entirely. This reports the resolved result.
 */
type MentalModelRefreshScope = {
    /**
     * Tags
     *
     * Flat tags used to filter memories (null when unused).
     */
    tags?: Array<string> | null;
    /**
     * Tags Match
     *
     * Resolved tag match mode.
     */
    tags_match: "any" | "all" | "any_strict" | "all_strict" | "exact";
    /**
     * Tag Groups
     *
     * Compound tag expressions used instead of flat tags, when set.
     */
    tag_groups?: Array<TagGroupLeaf | TagGroupAndOutput | TagGroupOrOutput | TagGroupNotOutput> | null;
    /**
     * Fact Types
     *
     * Fact types retrieved (null means all).
     */
    fact_types?: Array<string> | null;
    /**
     * Exclude Mental Models
     *
     * Whether other mental models were excluded from the reflect loop.
     */
    exclude_mental_models: boolean;
    /**
     * Exclude Mental Model Ids
     *
     * Mental models excluded by ID (always includes the model being refreshed).
     */
    exclude_mental_model_ids?: Array<string>;
};
/**
 * MentalModelRefreshTrace
 *
 * Execution trace of a mental model refresh, recorded when trigger.keep_trace is on.
 *
 * Deliberately shaped like reflect's trace — the calls the agent made, plus the
 * refresh-specific decision — and nothing more. This is persisted on the mental
 * model row and re-read on every fetch, so anything derivable from elsewhere is
 * left out: the evidence lives in ``reflect_response.based_on``, and the
 * resolved scope and snapshot window are reported by the dry run.
 */
type MentalModelRefreshTrace = {
    /**
     * Recorded At
     *
     * When this trace was recorded.
     */
    recorded_at?: string | null;
    /**
     * Effective Mode
     *
     * Whether the refresh ran as full or delta.
     */
    effective_mode: "full" | "delta";
    /**
     * Mode Fallback Reason
     *
     * Why delta was requested but not applied, if that happened.
     */
    mode_fallback_reason?: "no_baseline_content" | "source_query_changed" | "structured_doc_unreadable" | "delta_ops_failed" | "delta_ops_all_skipped" | null;
    /**
     * Outcome
     *
     * What the refresh did with the document.
     */
    outcome: "content_written" | "content_unchanged" | "content_preserved_no_new_facts" | "refresh_failed_empty_candidate" | "refresh_failed_delta_not_applied";
    /**
     * Tool Calls
     *
     * Reflect tool calls made during the refresh.
     */
    tool_calls?: Array<MentalModelTraceToolCall>;
    /**
     * Llm Calls
     *
     * LLM calls made during the refresh.
     */
    llm_calls?: Array<LlmCallTrace>;
    /**
     * Structured operations emitted, in delta mode.
     */
    delta_operations?: MentalModelDeltaOperations | null;
    /**
     * Facts the document cited that no longer exist, when the refresh found any.
     */
    retraction?: MentalModelRetraction | null;
    /**
     * Token usage across the refresh's LLM calls.
     */
    usage?: TokenUsage | null;
    /**
     * Duration Ms
     *
     * Wall-clock duration of the refresh.
     */
    duration_ms?: number;
    /**
     * Warnings
     *
     * Conditions worth a human's attention, in plain language.
     */
    warnings?: Array<string>;
};
/**
 * MentalModelRefreshWindow
 *
 * The time window a refresh read memories from.
 */
type MentalModelRefreshWindow = {
    /**
     * Created After
     *
     * Lower bound on when a memory last changed. Set only in delta mode, where it is the model's last_memory_seen_at — so a delta refresh only sees memories written or edited since the newest one the previous refresh saw.
     */
    created_after?: string | null;
    /**
     * Created Before
     *
     * Database-time snapshot bounding the refresh. Memories written or edited after this are not read, so they stay newer than the persisted watermark and are caught by the next refresh.
     */
    created_before: string;
    /**
     * Watermark
     *
     * The last_memory_seen_at a real refresh would persist: the newest in-scope memory visible at the snapshot, not now(). Null means no in-scope memory was visible.
     */
    watermark?: string | null;
};
/**
 * MentalModelResponse
 *
 * Response model for a mental model (stored reflect response).
 */
type MentalModelResponse = {
    /**
     * Id
     */
    id: string;
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Name
     */
    name: string;
    /**
     * Source Query
     */
    source_query?: string | null;
    /**
     * Content
     *
     * The mental model content as well-formatted markdown (auto-generated from reflect endpoint)
     */
    content?: string | null;
    /**
     * Tags
     */
    tags?: Array<string>;
    /**
     * Max Tokens
     */
    max_tokens?: number | null;
    trigger?: MentalModelTriggerOutput | null;
    /**
     * Last Refreshed At
     *
     * When a refresh last finished for this model — wall-clock, in ISO format. Advances on every refresh that completes, including one that found nothing new and preserved the content, and on a direct edit of `content`. A refresh that failed leaves it alone. This is the field to answer 'have I already refreshed this?'; it says nothing about whether the model is behind the data, which is `last_memory_seen_at` / `is_stale`.
     */
    last_refreshed_at?: string | null;
    /**
     * Last Memory Seen At
     *
     * How far through the bank's memories this model is written — the newest in-scope memory the last refresh saw, in ISO format. Stands still when nothing in the model's scope has been written, however often it is refreshed. At or after the bank's `last_memory_write_at` (GET /stats) the model is provably up to date; when it is older, `is_stale` settles it against the model's own scope. Null for a model no refresh has stamped yet.
     */
    last_memory_seen_at?: string | null;
    /**
     * Created At
     */
    created_at?: string | null;
    /**
     * Reflect Response
     *
     * Full reflect API response payload including based_on facts and observations
     */
    reflect_response?: {
        [key: string]: unknown;
    } | null;
    /**
     * Is Stale
     *
     * True when memories matching this mental model's tag/fact_type scope have been written since last_memory_seen_at — the same check that decides whether a scheduled refresh does any work, so a model flagged here is one a refresh would actually rewrite. Populated on both the single read and the list. Deletions are not observed: removing an in-scope memory leaves no write behind, so it does not raise this flag.
     */
    is_stale?: boolean | null;
};
/**
 * MentalModelRetraction
 *
 * Facts the document cited that no longer exist, and what was done about them.
 *
 * A retraction is the one refresh input that is *invisible* in every other
 * report: the fact is gone from the bank, so it appears in no recall, no tool
 * call, and no supporting-fact list. Without this, a refresh that quietly
 * deleted a paragraph — or quietly declined to — leaves no evidence of why.
 */
type MentalModelRetraction = {
    /**
     * Fact Ids
     *
     * Ids the document's based_on cites that no longer exist in the bank.
     */
    fact_ids?: Array<string>;
    /**
     * Fact Texts
     *
     * What those facts said, as the document recorded them. The rows themselves are gone — an observation swept away with its source keeps no history — so this copy is the only surviving record.
     */
    fact_texts?: Array<string>;
    /**
     * Applied
     *
     * Whether the pass that removes them ran to completion (zero edits still counts).
     */
    applied: boolean;
    /**
     * Deferred Reason
     *
     * Why removal was postponed, when it was. Re-ingested facts return under new ids once consolidation catches up, so a retraction seen while facts are still pending is not acted on — removing content before the replacements land would delete claims that are still true.
     */
    deferred_reason?: string | null;
};
/**
 * MentalModelTraceToolCall
 *
 * One reflect tool call made during a refresh.
 *
 * ``output`` is carried only by the dry run, which persists nothing. The trace
 * stored on the model row keeps ``result_count`` instead: it is re-read on every
 * fetch, so embedding full recall payloads there would bloat the row without
 * bound. Raw prompts and responses are available separately via LLM request
 * tracing.
 */
type MentalModelTraceToolCall = {
    /**
     * Tool
     *
     * Tool name: recall, search_observations, get_mental_model, expand, …
     */
    tool: string;
    /**
     * Reason
     *
     * The agent's stated reason for the call.
     */
    reason?: string | null;
    /**
     * Input
     *
     * Tool input parameters.
     */
    input?: {
        [key: string]: unknown;
    };
    /**
     * Output
     *
     * What the tool returned. Present on a dry run, which stores nothing; omitted from the trace persisted by a real refresh to keep that row bounded.
     */
    output?: {
        [key: string]: unknown;
    } | null;
    /**
     * Updated At
     *
     * The refresh window's lower bound as given to this call — the delta watermark. Named for what it actually filters: the predicate is on the memory's updated_at, so a memory merely touched since the last refresh qualifies. Null means the tool applies no time bound at all, so its results are not limited to the window (mental-model lookup and chunk expansion behave this way).
     */
    updated_at?: string | null;
    /**
     * Result Count
     *
     * Number of items the tool returned, when countable.
     */
    result_count?: number | null;
    /**
     * Duration Ms
     *
     * Execution time in milliseconds.
     */
    duration_ms: number;
    /**
     * Iteration
     *
     * Agent loop iteration (1-based) this call belongs to.
     */
    iteration?: number;
};
/**
 * MentalModelTrigger
 *
 * Trigger settings for a mental model.
 *
 * Inherits the reflect options an operator can also default per bank
 * (``reflect_default_options``): set here they apply to this model's refreshes
 * only, and win over the bank default.
 */
type MentalModelTriggerInput = {
    /**
     * Reflect Search Observations Max Tokens
     *
     * Token budget for reflect's search_observations tool when the model names none. Observation evidence is often the largest contributor to the reflect context; lowering it trades the lowest-ranked observations for a smaller LLM context. None means use the shipped default (5000).
     */
    reflect_search_observations_max_tokens?: number | null;
    /**
     * Reflect Search Observations Include Entities
     *
     * Whether search_observations attaches resolved entity names to each observation. Entities can be more than half the serialized tool payload; turning them off keeps the same observations and ranking with a much smaller context. None means enabled.
     */
    reflect_search_observations_include_entities?: boolean | null;
    /**
     * Mode
     *
     * Refresh mode. 'full' (default) regenerates the mental model content from scratch on each refresh. 'delta' performs surgical edits against the existing content: unchanged sections are preserved byte-for-byte, stale content is removed, new content is added. If the mental model has no existing content, or if the source_query has changed since the last refresh, delta mode falls back to a full regeneration automatically.
     */
    mode?: "full" | "delta";
    /**
     * Refresh After Consolidation
     *
     * If true, refresh this mental model after observations consolidation (real-time mode)
     */
    refresh_after_consolidation?: boolean;
    /**
     * Refresh Cron
     *
     * Cron expression (UTC, standard 5-field syntax, e.g. '0 3 * * *' for daily at 03:00 UTC) for refreshing this mental model on a fixed schedule. Mutually exclusive with refresh_after_consolidation — a model refreshes either after consolidation or on a cron schedule, not both. A scheduled refresh only runs when the model is stale (new memories in its scope since the last refresh); if nothing changed, the tick is skipped to avoid a wasted LLM call. null = no schedule.
     */
    refresh_cron?: string | null;
    /**
     * Min Refresh Interval Seconds
     *
     * Minimum seconds between two automatic refreshes of this mental model. A triggered refresh that arrives sooner is not dropped: it is queued and parked until the window expires, and every further trigger in the meantime folds into that one queued refresh, so a burst of retains costs one refresh instead of one per retain. Applies to both refresh_after_consolidation and refresh_cron. Explicit refreshes (API, MCP, control plane) ignore it and run immediately. 0 disables the floor for this model; null falls back to the bank/global mental_model_min_refresh_interval_seconds setting (itself 0 by default, i.e. no floor).
     */
    min_refresh_interval_seconds?: number | null;
    /**
     * Fact Types
     *
     * Filter which fact types are retrieved during reflect. None means all types (world, experience, observation).
     */
    fact_types?: Array<"world" | "experience" | "observation"> | null;
    /**
     * Exclude Mental Models
     *
     * If true, exclude all mental models from the reflect loop (skip search_mental_models tool).
     */
    exclude_mental_models?: boolean;
    /**
     * Exclude Mental Model Ids
     *
     * Exclude specific mental models by ID from the reflect loop.
     */
    exclude_mental_model_ids?: Array<string> | null;
    /**
     * Tags Match
     *
     * Override how the model's tags filter memories during refresh. If not set, defaults to 'all_strict' when the model has tags (security isolation) or 'any' when the model has no tags. Under 'all_strict' a memory must carry EVERY one of the model's tags and untagged memories are excluded, which is why a model tagged with labels its memories do not carry refreshes to empty content. Set to 'all' to keep requiring the tags while including untagged memories, or to 'any' to include untagged memories alongside any single tag match.
     */
    tags_match?: "any" | "all" | "any_strict" | "all_strict" | "exact" | null;
    /**
     * Tag Groups
     *
     * Compound boolean tag expressions to use during refresh instead of the model's own tags. When set, these tag groups are passed to reflect and the model's flat tags are NOT used for filtering. Supports nested and/or/not expressions for complex tag-based scoping.
     */
    tag_groups?: Array<TagGroupLeaf | TagGroupAndInput | TagGroupOrInput | TagGroupNotInput> | null;
    /**
     * Include Chunks
     *
     * Override whether the internal recall used during refresh returns raw chunk text. None means use the bank/global config default (recall_include_chunks).
     */
    include_chunks?: boolean | null;
    /**
     * Recall Max Tokens
     *
     * Override the token budget for facts returned by the internal recall during refresh. None means use the bank/global config default (recall_max_tokens).
     */
    recall_max_tokens?: number | null;
    /**
     * Recall Chunks Max Tokens
     *
     * Override the token budget for raw chunks returned by the internal recall during refresh. None means use the bank/global config default (recall_chunks_max_tokens).
     */
    recall_chunks_max_tokens?: number | null;
    /**
     * Response Schema
     *
     * Optional JSON Schema for structured output. When set, each refresh runs the same structured-output extraction as reflect's response_schema and stores the parsed result under reflect_response.structured_output alongside the markdown content.
     */
    response_schema?: {
        [key: string]: unknown;
    } | null;
    /**
     * Keep Trace
     *
     * If true, every refresh of this mental model records how it reached its result under reflect_response.trace: the mode it ran in and why, the resolved scope and time window, how many facts retrieval returned versus how many the agent used, the tool and LLM calls, and any delta operations. Only the latest refresh's trace is kept. This is the only way to diagnose a cron- or consolidation-driven refresh after the fact, since no human sees those run. Tool outputs are reduced to result counts to keep the stored trace bounded; use LLM request tracing for raw prompts and responses.
     */
    keep_trace?: boolean;
};
/**
 * MentalModelTrigger
 *
 * Trigger settings for a mental model.
 *
 * Inherits the reflect options an operator can also default per bank
 * (``reflect_default_options``): set here they apply to this model's refreshes
 * only, and win over the bank default.
 */
type MentalModelTriggerOutput = {
    /**
     * Reflect Search Observations Max Tokens
     *
     * Token budget for reflect's search_observations tool when the model names none. Observation evidence is often the largest contributor to the reflect context; lowering it trades the lowest-ranked observations for a smaller LLM context. None means use the shipped default (5000).
     */
    reflect_search_observations_max_tokens?: number | null;
    /**
     * Reflect Search Observations Include Entities
     *
     * Whether search_observations attaches resolved entity names to each observation. Entities can be more than half the serialized tool payload; turning them off keeps the same observations and ranking with a much smaller context. None means enabled.
     */
    reflect_search_observations_include_entities?: boolean | null;
    /**
     * Mode
     *
     * Refresh mode. 'full' (default) regenerates the mental model content from scratch on each refresh. 'delta' performs surgical edits against the existing content: unchanged sections are preserved byte-for-byte, stale content is removed, new content is added. If the mental model has no existing content, or if the source_query has changed since the last refresh, delta mode falls back to a full regeneration automatically.
     */
    mode?: "full" | "delta";
    /**
     * Refresh After Consolidation
     *
     * If true, refresh this mental model after observations consolidation (real-time mode)
     */
    refresh_after_consolidation?: boolean;
    /**
     * Refresh Cron
     *
     * Cron expression (UTC, standard 5-field syntax, e.g. '0 3 * * *' for daily at 03:00 UTC) for refreshing this mental model on a fixed schedule. Mutually exclusive with refresh_after_consolidation — a model refreshes either after consolidation or on a cron schedule, not both. A scheduled refresh only runs when the model is stale (new memories in its scope since the last refresh); if nothing changed, the tick is skipped to avoid a wasted LLM call. null = no schedule.
     */
    refresh_cron?: string | null;
    /**
     * Min Refresh Interval Seconds
     *
     * Minimum seconds between two automatic refreshes of this mental model. A triggered refresh that arrives sooner is not dropped: it is queued and parked until the window expires, and every further trigger in the meantime folds into that one queued refresh, so a burst of retains costs one refresh instead of one per retain. Applies to both refresh_after_consolidation and refresh_cron. Explicit refreshes (API, MCP, control plane) ignore it and run immediately. 0 disables the floor for this model; null falls back to the bank/global mental_model_min_refresh_interval_seconds setting (itself 0 by default, i.e. no floor).
     */
    min_refresh_interval_seconds?: number | null;
    /**
     * Fact Types
     *
     * Filter which fact types are retrieved during reflect. None means all types (world, experience, observation).
     */
    fact_types?: Array<"world" | "experience" | "observation"> | null;
    /**
     * Exclude Mental Models
     *
     * If true, exclude all mental models from the reflect loop (skip search_mental_models tool).
     */
    exclude_mental_models?: boolean;
    /**
     * Exclude Mental Model Ids
     *
     * Exclude specific mental models by ID from the reflect loop.
     */
    exclude_mental_model_ids?: Array<string> | null;
    /**
     * Tags Match
     *
     * Override how the model's tags filter memories during refresh. If not set, defaults to 'all_strict' when the model has tags (security isolation) or 'any' when the model has no tags. Under 'all_strict' a memory must carry EVERY one of the model's tags and untagged memories are excluded, which is why a model tagged with labels its memories do not carry refreshes to empty content. Set to 'all' to keep requiring the tags while including untagged memories, or to 'any' to include untagged memories alongside any single tag match.
     */
    tags_match?: "any" | "all" | "any_strict" | "all_strict" | "exact" | null;
    /**
     * Tag Groups
     *
     * Compound boolean tag expressions to use during refresh instead of the model's own tags. When set, these tag groups are passed to reflect and the model's flat tags are NOT used for filtering. Supports nested and/or/not expressions for complex tag-based scoping.
     */
    tag_groups?: Array<TagGroupLeaf | TagGroupAndOutput | TagGroupOrOutput | TagGroupNotOutput> | null;
    /**
     * Include Chunks
     *
     * Override whether the internal recall used during refresh returns raw chunk text. None means use the bank/global config default (recall_include_chunks).
     */
    include_chunks?: boolean | null;
    /**
     * Recall Max Tokens
     *
     * Override the token budget for facts returned by the internal recall during refresh. None means use the bank/global config default (recall_max_tokens).
     */
    recall_max_tokens?: number | null;
    /**
     * Recall Chunks Max Tokens
     *
     * Override the token budget for raw chunks returned by the internal recall during refresh. None means use the bank/global config default (recall_chunks_max_tokens).
     */
    recall_chunks_max_tokens?: number | null;
    /**
     * Response Schema
     *
     * Optional JSON Schema for structured output. When set, each refresh runs the same structured-output extraction as reflect's response_schema and stores the parsed result under reflect_response.structured_output alongside the markdown content.
     */
    response_schema?: {
        [key: string]: unknown;
    } | null;
    /**
     * Keep Trace
     *
     * If true, every refresh of this mental model records how it reached its result under reflect_response.trace: the mode it ran in and why, the resolved scope and time window, how many facts retrieval returned versus how many the agent used, the tool and LLM calls, and any delta operations. Only the latest refresh's trace is kept. This is the only way to diagnose a cron- or consolidation-driven refresh after the fact, since no human sees those run. Tool outputs are reduced to result counts to keep the stored trace bounded; use LLM request tracing for raw prompts and responses.
     */
    keep_trace?: boolean;
};
/**
 * MinScores
 *
 * Optional per-stage score floors for recall. Every floor is inclusive (``>=``).
 *
 * The four floors act at two different levels, and the distinction decides what a
 * returned result is guaranteed to satisfy.
 *
 * ``semantic`` and ``keyword`` are **retrieval-level** cutoffs pushed into their own
 * SQL arm (overriding the global ``semantic_min_similarity`` / ``bm25_min_score``
 * config for this request), so they prune weak matches before fusion. Each one
 * constrains **only the arm it names**. Recall fuses four arms — semantic, keyword,
 * graph and temporal — and a result reaches the response if *any* arm surfaced it,
 * so a returned result may legitimately carry ``null`` for a stage it was not
 * surfaced by, and results reached through the graph or temporal arm carry neither
 * ``semantic`` nor ``keyword``. A *non-null* score always clears its floor — the
 * gap is only ever a ``null``. Setting both does **not** restrict the response to
 * results that clear both: they are not a predicate over each fused result. This is
 * deliberate — an intersection would discard the strong single-arm matches that
 * hybrid retrieval exists to find (a paraphrase with no lexical overlap, an exact
 * identifier the embedding scores poorly).
 *
 * ``reranker`` and ``final`` are **post-query** filters applied to every scored
 * result after fusion and reranking, so these *are* per-result predicates: a
 * returned result always clears them. Use them, not the retrieval floors, to make
 * recall abstain on low-confidence queries.
 *
 * Any field left None imposes no floor; all-None (the default) means no score
 * filtering.
 */
type MinScores = {
    /**
     * Semantic
     *
     * Retrieval-level, semantic arm only: minimum vector similarity (0-1). A result the semantic arm did not surface reports `semantic: null` and is unaffected by this floor.
     */
    semantic?: number | null;
    /**
     * Keyword
     *
     * Retrieval-level, keyword arm only: minimum keyword/full-text (BM25) score. A result the keyword arm did not surface reports `keyword: null` and is unaffected by this floor.
     */
    keyword?: number | null;
    /**
     * Reranker
     *
     * Post-query: minimum normalized reranker score (0-1). Applied to every returned result.
     */
    reranker?: number | null;
    /**
     * Final
     *
     * Post-query: minimum final ranking score. Applied to every returned result.
     */
    final?: number | null;
};
/**
 * ObservationScope
 *
 * A distinct observation scope: an exact tag set plus its observation count.
 */
type ObservationScope = {
    /**
     * Tags
     *
     * The exact tag set defining this scope (normalized order). Empty list is the global/untagged scope.
     */
    tags: Array<string>;
    /**
     * Count
     *
     * Number of observations that live under this scope
     */
    count: number;
};
/**
 * ObservationScopesResponse
 *
 * Response model for the observation scopes enumeration endpoint.
 */
type ObservationScopesResponse = {
    /**
     * Scopes
     *
     * Distinct observation scopes, most populous first
     */
    scopes: Array<ObservationScope>;
    /**
     * Total
     *
     * Total number of distinct scopes in the bank (ignores limit/offset)
     */
    total: number;
    /**
     * Limit
     *
     * Maximum number of scopes returned in this page
     */
    limit: number;
    /**
     * Offset
     *
     * Offset this page started at
     */
    offset: number;
};
/**
 * OperationProgress
 *
 * Last-known progress snapshot for a long-running async operation.
 *
 * Written at coarse phase/batch boundaries by the worker (consolidation, batch
 * retain). Lets an operator polling the operation status API distinguish a healthy
 * long-running job (``processed`` advancing across polls) from a frozen one (same
 * numbers, no movement in ``at``). Absent (``null``) on operations that never
 * reached a checkpoint — completed-instantly or pre-feature rows.
 */
type OperationProgress = {
    /**
     * Stage
     *
     * Coarse phase the operation last reported (e.g. 'processing_batch').
     */
    stage: string;
    /**
     * At
     *
     * ISO-8601 timestamp when this snapshot was written.
     */
    at: string;
    /**
     * Processed
     *
     * Units of work finished so far (sub-batches, memories), when known.
     */
    processed?: number | null;
    /**
     * Total
     *
     * Total units of work for the operation, when known.
     */
    total?: number | null;
    /**
     * Detail
     *
     * Operation-specific counters (e.g. observations_created, round, items_in_sub_batch).
     */
    detail?: {
        [key: string]: number;
    } | null;
};
/**
 * OperationResponse
 *
 * Response model for a single async operation.
 */
type OperationResponse = {
    /**
     * Id
     */
    id: string;
    /**
     * Task Type
     */
    task_type: string;
    /**
     * Items Count
     */
    items_count: number;
    /**
     * Document Id
     */
    document_id?: string | null;
    /**
     * Filename
     *
     * Original filename for file-conversion operations (file_convert_retain); null for other task types.
     */
    filename?: string | null;
    /**
     * Mental Model Id
     *
     * Mental model this operation acted on (refresh_mental_model); null for other task types. Without it the list cannot say which model an operation refreshed — `document_id` is null for these, and the list carries no result_metadata. The single-operation read exposes the same value under `result_metadata`.
     */
    mental_model_id?: string | null;
    /**
     * Typed, per-operation-type outcome detail, discriminated by its own `operation_type`. Populated for `refresh_mental_model` operations that have finished; null for operation types that report no typed detail, for operations still in flight, and for operations recorded before this field existed. Unlike `result_metadata` this is a supported field — new operation types add their own shape here rather than flattening fields onto the operation.
     */
    details?: RefreshMentalModelOperationDetails | null;
    /**
     * Created At
     */
    created_at: string;
    /**
     * Updated At
     *
     * When this operation's row last changed (claim, progress heartbeat, or completion).
     */
    updated_at?: string | null;
    /**
     * Status
     */
    status: string;
    /**
     * Error Message
     */
    error_message: string | null;
    /**
     * Retry Count
     *
     * Number of times this operation has been retried after failure.
     */
    retry_count?: number | null;
    /**
     * Next Retry At
     *
     * When the worker will next attempt this operation. For a pending operation, a value in the future indicates the task is waiting rather than available for immediate pickup — a refresh_mental_model held back by min_refresh_interval_seconds, or an extension raising DeferOperation until some backpressure window opens. It is not cleared when the task finally runs, so on a terminal operation it is a record of the last wait rather than a pending one: read it together with status.
     */
    next_retry_at?: string | null;
    /**
     * Last-known progress snapshot for a running operation; null if none was recorded.
     */
    progress?: OperationProgress | null;
};
/**
 * OperationStatusResponse
 *
 * Response model for getting a single operation status.
 */
type OperationStatusResponse = {
    /**
     * Operation Id
     */
    operation_id: string;
    /**
     * Status
     */
    status: "pending" | "processing" | "completed" | "failed" | "cancelled" | "not_found";
    /**
     * Operation Type
     */
    operation_type?: string | null;
    /**
     * Created At
     */
    created_at?: string | null;
    /**
     * Updated At
     */
    updated_at?: string | null;
    /**
     * Completed At
     */
    completed_at?: string | null;
    /**
     * Error Message
     */
    error_message?: string | null;
    /**
     * Retry Count
     *
     * Number of times this operation has been retried after failure.
     */
    retry_count?: number | null;
    /**
     * Next Retry At
     *
     * When the worker will next attempt this operation. For a pending operation, a value in the future indicates the task is parked — a refresh_mental_model held back by min_refresh_interval_seconds, or an extension raising DeferOperation — rather than awaiting immediate pickup.
     */
    next_retry_at?: string | null;
    /**
     * Last-known progress snapshot for a running operation; null if none was recorded.
     */
    progress?: OperationProgress | null;
    /**
     * Result Metadata
     *
     * Internal metadata for debugging. Structure may change without notice. Not for production use.
     */
    result_metadata?: {
        [key: string]: unknown;
    } | null;
    /**
     * Typed, per-operation-type outcome detail, discriminated by its own `operation_type`. Populated for `refresh_mental_model` operations that have finished; null for operation types that report no typed detail, for operations still in flight, and for operations recorded before this field existed. Unlike `result_metadata` this is a supported field — new operation types add their own shape here rather than flattening fields onto the operation.
     */
    details?: RefreshMentalModelOperationDetails | null;
    /**
     * Child Operations
     *
     * Child operations for batch operations (if applicable)
     */
    child_operations?: Array<ChildOperationStatus> | null;
    /**
     * Task Payload
     *
     * Raw task payload (params the operation was submitted with). Only populated when include_payload=true.
     */
    task_payload?: {
        [key: string]: unknown;
    } | null;
};
/**
 * OperationsListResponse
 *
 * Response model for list operations endpoint.
 */
type OperationsListResponse = {
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Total
     */
    total: number;
    /**
     * Limit
     */
    limit: number;
    /**
     * Offset
     */
    offset: number;
    /**
     * Operations
     */
    operations: Array<OperationResponse>;
};
/**
 * PromptBlockModel
 *
 * One block of a message: its text, and the setting that decides it.
 *
 * The **active** blocks of a message concatenate back to the exact text sent, so a
 * client can render them separately without showing the reader something the model
 * never receives. An **inactive** block has no text: it marks a setting that is
 * switched off, at the point where it would land if it were on.
 *
 * Everything identifying a block is a machine value, never display copy — what a
 * block is called, and what turning a switched-off one on would do, is for the
 * client to say in the language it is running in.
 */
type PromptBlockModel = {
    /**
     * Text
     *
     * The block's text; empty when the block is inactive.
     */
    text: string;
    /**
     * Source
     *
     * `config` — produced by a setting (`field` names it); `builtin` — Hindsight's own wording.
     */
    source: "config" | "builtin";
    /**
     * Field
     *
     * Config field behind this block; empty when no single field owns it.
     */
    field?: string;
    /**
     * Section
     *
     * Slug for a part the preview names itself and no field owns: `bank_identity`, `disposition`, `directives`. Empty otherwise.
     */
    section?: string;
    /**
     * Heading
     *
     * The section heading the prompt text carries at this point, extracted from the prompt itself. Empty when it carries none.
     */
    heading?: string;
    /**
     * Active
     *
     * Whether this block is in the prompt as configured.
     */
    active?: boolean;
    /**
     * Value
     *
     * The field's effective value; null when unset.
     */
    value?: string | null;
    /**
     * Kind
     *
     * Shape of the value, so a client can offer the right control for editing it.
     */
    kind: "text" | "boolean" | "choice" | "complex";
    /**
     * Choices
     *
     * Allowed values, when `kind` is `choice`.
     */
    choices?: Array<string> | null;
    /**
     * Editable
     *
     * Whether this bank may override the field via the bank config API. Server-level fields shape the prompt but cannot be set per bank, and offering to edit one would only collect a 400.
     */
    editable?: boolean;
};
/**
 * PromptMessageModel
 *
 * One message of the request, as the blocks it is built from.
 */
type PromptMessageModel = {
    /**
     * Role
     */
    role: "system" | "user";
    /**
     * Blocks
     */
    blocks?: Array<PromptBlockModel>;
};
/**
 * PromptPreviewRequest
 *
 * Request to render the prompts an operation would send, without calling an LLM.
 *
 * The operation is the whole request: everything that shapes the prompt comes from
 * the bank — its resolved config, profile and directives — and the runtime data an
 * operation would be given is a fixed placeholder. There is deliberately nothing to
 * override. A preview answers "what does this bank send"; letting a caller pass its
 * own mission or sample text only moved that question somewhere the bank cannot
 * answer it. To try a candidate value, save it and look again — the response says
 * which settings are editable.
 */
type PromptPreviewRequest = {
    /**
     * Operation
     *
     * Which operation's prompts to render.
     */
    operation?: "retain" | "consolidation" | "reflect";
    /**
     * Strategy
     *
     * Name of a retain strategy to render under (a key of the bank's `retain_strategies`). Retain only. Omit it and the bank's `retain_default_strategy` applies, exactly as it does for a retain that names none.
     */
    strategy?: string | null;
};
/**
 * PromptPreviewResponse
 *
 * The messages one call of the requested operation would send.
 *
 * `messages` is in send order, system first. Both are always present because a
 * mission is not necessarily in the system prompt: retain and consolidation keep
 * their system prompt bank-agnostic (so one provider-side cache serves every bank)
 * and carry the mission in the user message instead.
 *
 * When `skipped_reason` is set the configuration means no prompt is sent at all —
 * `chunks` extraction mode stores each chunk verbatim and never calls an LLM — and
 * `messages` is empty.
 */
type PromptPreviewResponse = {
    /**
     * Messages
     *
     * Request messages, in send order. Each is given as the blocks it is built from.
     */
    messages?: Array<PromptMessageModel>;
    /**
     * Strategy
     *
     * The retain strategy these prompts were rendered under, if any.
     */
    strategy?: string | null;
    /**
     * Strategies
     *
     * Names of the bank's retain strategies, so a client can offer them without a second call.
     */
    strategies?: Array<string>;
    /**
     * Run Settings
     *
     * Settings that shape the operation without appearing in its prompt, such as chunk sizes.
     */
    run_settings?: Array<RunSettingModel>;
    /**
     * Response Schema
     *
     * JSON schema the response is constrained to, when the operation constrains it.
     */
    response_schema?: {
        [key: string]: unknown;
    } | null;
    /**
     * Skipped Reason
     *
     * Why no prompt is sent, when the configuration means none is.
     */
    skipped_reason?: string | null;
};
/**
 * RecallRequest
 *
 * Request model for recall endpoint.
 */
type RecallRequest = {
    /**
     * Query
     */
    query: string;
    /**
     * Types
     *
     * List of fact types to recall: 'world', 'experience', 'observation'. Defaults to all fact types if not specified.
     */
    types?: Array<string> | null;
    /**
     * Prefer Observations
     *
     * When recalling raw facts ('world'/'experience') together with 'observation', drop any raw fact that an observation in the results was consolidated from, so the observation supersedes it and you don't get duplicate content. The freed slots are backfilled with the next results, keeping the result count at the requested budget. Disabled by default; set to true to enable. No effect unless 'observation' and at least one raw type are both requested.
     */
    prefer_observations?: boolean;
    budget?: Budget;
    /**
     * Max Tokens
     */
    max_tokens?: number;
    /**
     * Trace
     */
    trace?: boolean;
    /**
     * Query Timestamp
     *
     * ISO format date string (e.g., '2023-05-30T23:40:00'). Used as the query-time anchor for relative temporal expressions and recency scoring.
     */
    query_timestamp?: string | null;
    /**
     * Options for including additional data (entities are included by default)
     */
    include?: IncludeOptions;
    /**
     * Tags
     *
     * Filter memories by tags. If not specified, all memories are returned. Omitting tags (or passing []) together with tags_match='exact' filters to untagged/global observations only (the scope written by observation_scopes='shared').
     */
    tags?: Array<string> | null;
    /**
     * Tags Match
     *
     * How to match tags: 'any' (OR, includes untagged), 'all' (AND, includes untagged), 'any_strict' (OR, excludes untagged), 'all_strict' (AND, excludes untagged), 'exact' (set-equality on the full scope, excludes untagged). With 'exact' and no tags (or []), the empty global scope is selected and only untagged memories match.
     */
    tags_match?: "any" | "all" | "any_strict" | "all_strict" | "exact";
    /**
     * Tag Groups
     *
     * Compound tag filter using boolean groups. Groups in the list are AND-ed. Each group is a leaf {tags, match} or compound {and: [...]}, {or: [...]}, {not: ...}. A leaf may set resolve='fuzzy' to match its tags against the bank's tags by trigram similarity instead of literally, so a query that says 'typsecript' still reaches memories tagged 'typescript'.
     */
    tag_groups?: Array<TagGroupLeaf | TagGroupAndInput | TagGroupOrInput | TagGroupNotInput> | null;
    /**
     * Optional per-stage score floors, each inclusive (`>=`). `semantic` and `keyword` are retrieval-level cutoffs pushed into the SQL arm they name (overriding the global similarity/BM25 minimums for this request), and constrain only that arm: recall fuses four arms (semantic, keyword, graph, temporal) and returns a result surfaced by any of them, so a returned result reports null for a stage that did not surface it (a non-null score always clears its floor). Setting both therefore does not restrict the response to results clearing both. `reranker` and `final` are post-ranking filters applied to every scored result, so those floors *are* guaranteed by each result returned — use them for query abstention. Any field left unset imposes no floor; omitting `min_scores` entirely (the default) applies no score filtering. Use with care — the reranker's absolute scores are not calibrated across queries (a clearly-relevant match may score ~0.001 even though it is ranked first).
     */
    min_scores?: MinScores | null;
    /**
     * Window for the temporal retrieval arm, supplied instead of extracting dates from `query`. Set this when you already know the range you mean — a date picker, or an agent that resolved 'last quarter' itself — and recall will skip parsing the query text for dates. **This ranks, it does not filter**: the temporal arm surfaces memories whose own dates (`mentioned_at`, `occurred_start`, `occurred_end`) fall inside the window so they rank higher, while the semantic, keyword and graph arms are unaffected — so memories dated outside the window are still returned. Ignored when the bank has temporal retrieval disabled.
     */
    temporal_window?: TemporalWindow | null;
};
/**
 * RecallResponse
 *
 * Response model for recall endpoints.
 */
type RecallResponse = {
    /**
     * Results
     */
    results: Array<RecallResult>;
    /**
     * Trace
     */
    trace?: {
        [key: string]: unknown;
    } | null;
    /**
     * Entities
     *
     * Entity states for entities mentioned in results
     */
    entities?: {
        [key: string]: EntityStateResponse;
    } | null;
    /**
     * Chunks
     *
     * Chunks for facts, keyed by chunk_id
     */
    chunks?: {
        [key: string]: ChunkData;
    } | null;
    /**
     * Source Facts
     *
     * Source facts for observation-type results, keyed by fact ID
     */
    source_facts?: {
        [key: string]: RecallResult;
    } | null;
    /**
     * Source Facts Truncated
     *
     * Whether the source_facts map was cut short by the token budget. When true, some IDs in results[].source_fact_ids have no entry in source_facts — the budget ran out, the references are not dangling. Only set when source facts were requested.
     */
    source_facts_truncated?: boolean | null;
};
/**
 * RecallResult
 *
 * Single recall result item.
 */
type RecallResult = {
    /**
     * Id
     */
    id: string;
    /**
     * Text
     */
    text: string;
    /**
     * Type
     */
    type?: string | null;
    /**
     * Entities
     */
    entities?: Array<string> | null;
    /**
     * Context
     */
    context?: string | null;
    /**
     * Occurred Start
     */
    occurred_start?: string | null;
    /**
     * Occurred End
     */
    occurred_end?: string | null;
    /**
     * Mentioned At
     */
    mentioned_at?: string | null;
    /**
     * Document Id
     */
    document_id?: string | null;
    /**
     * Metadata
     */
    metadata?: {
        [key: string]: string;
    } | null;
    /**
     * Chunk Id
     */
    chunk_id?: string | null;
    /**
     * Tags
     */
    tags?: Array<string> | null;
    /**
     * Source Fact Ids
     */
    source_fact_ids?: Array<string> | null;
    scores?: RecallScores | null;
    /**
     * Attachments
     *
     * Attachments this fact was drawn from, as recorded per fact at extraction time — the same edge the memory read endpoints return, not everything its chunk happened to carry. A fact stated in prose reports none. Omitted when there are none.
     */
    attachments?: Array<ChunkAttachment> | null;
};
/**
 * RecallScores
 *
 * Per-result recall scores from different stages of the pipeline.
 *
 * ``final`` is the value results are ranked by. The others are diagnostic and
 * can be filtered on via the recall ``min_scores`` request parameter. ``semantic``
 * and ``keyword`` are the raw per-strategy retrieval scores (``None`` when that
 * strategy did not surface this result); ``reranker`` is the cross-encoder's
 * normalized relevance.
 */
type RecallScores = {
    /**
     * Final
     *
     * Final ranking score (combined reranker + recency/temporal/proof boosts)
     */
    final: number;
    /**
     * Reranker
     *
     * Cross-encoder relevance, normalized 0-1. None when the reranker is a passthrough (rrf/interleave modes).
     */
    reranker?: number | null;
    /**
     * Semantic
     *
     * Vector cosine similarity (0-1). None if this result was not surfaced semantically.
     */
    semantic?: number | null;
    /**
     * Keyword
     *
     * Keyword/full-text (BM25) score (>= 0, unbounded). None if this result was not surfaced by keyword search.
     */
    keyword?: number | null;
};
/**
 * RecoverConsolidationResponse
 *
 * Response model for recovering failed consolidation.
 */
type RecoverConsolidationResponse = {
    /**
     * Retried Count
     */
    retried_count: number;
};
/**
 * ReflectBasedOn
 *
 * Evidence the response is based on: memories, mental models, and directives.
 */
type ReflectBasedOn = {
    /**
     * Memories
     *
     * Memory facts used to generate the response
     */
    memories?: Array<ReflectFact>;
    /**
     * Mental Models
     *
     * Mental models used during reflection
     */
    mental_models?: Array<ReflectMentalModel>;
    /**
     * Directives
     *
     * Directives applied during reflection
     */
    directives?: Array<ReflectDirective>;
};
/**
 * ReflectDirective
 *
 * A directive applied during reflect.
 */
type ReflectDirective = {
    /**
     * Id
     *
     * Directive ID
     */
    id: string;
    /**
     * Name
     *
     * Directive name
     */
    name: string;
    /**
     * Content
     *
     * Directive content
     */
    content: string;
};
/**
 * ReflectFact
 *
 * A fact used in think response.
 */
type ReflectFact = {
    /**
     * Id
     */
    id?: string | null;
    /**
     * Text
     *
     * Fact text. When type='observation', this contains markdown-formatted consolidated knowledge
     */
    text: string;
    /**
     * Type
     */
    type?: string | null;
    /**
     * Context
     */
    context?: string | null;
    /**
     * Occurred Start
     */
    occurred_start?: string | null;
    /**
     * Occurred End
     */
    occurred_end?: string | null;
};
/**
 * ReflectIncludeOptions
 *
 * Options for including additional data in reflect results.
 */
type ReflectIncludeOptions = {
    /**
     * Include facts that the answer is based on. Set to {} to enable, null to disable (default: disabled).
     */
    facts?: FactsIncludeOptions | null;
    /**
     * Include tool calls trace. Set to {} for full trace (input+output), {output: false} for inputs only.
     */
    tool_calls?: ToolCallsIncludeOptions | null;
};
/**
 * ReflectLLMCall
 *
 * An LLM call made during reflect agent execution.
 */
type ReflectLlmCall = {
    /**
     * Scope
     *
     * Call scope: agent_1, agent_2, final, etc.
     */
    scope: string;
    /**
     * Duration Ms
     *
     * Execution time in milliseconds
     */
    duration_ms: number;
};
/**
 * ReflectMentalModel
 *
 * A mental model used during reflect.
 */
type ReflectMentalModel = {
    /**
     * Id
     *
     * Mental model ID
     */
    id: string;
    /**
     * Text
     *
     * Mental model content
     */
    text: string;
    /**
     * Context
     *
     * Additional context
     */
    context?: string | null;
};
/**
 * ReflectRequest
 *
 * Request model for reflect endpoint.
 */
type ReflectRequest = {
    /**
     * Reflect Search Observations Max Tokens
     *
     * Token budget for reflect's search_observations tool when the model names none. Observation evidence is often the largest contributor to the reflect context; lowering it trades the lowest-ranked observations for a smaller LLM context. None means use the shipped default (5000).
     */
    reflect_search_observations_max_tokens?: number | null;
    /**
     * Reflect Search Observations Include Entities
     *
     * Whether search_observations attaches resolved entity names to each observation. Entities can be more than half the serialized tool payload; turning them off keeps the same observations and ranking with a much smaller context. None means enabled.
     */
    reflect_search_observations_include_entities?: boolean | null;
    /**
     * Query
     */
    query: string;
    budget?: Budget;
    /**
     * Context
     *
     * DEPRECATED: Additional context is now concatenated with the query. Pass context directly in the query field instead. If provided, it will be appended to the query for backward compatibility.
     *
     * @deprecated
     */
    context?: string | null;
    /**
     * Max Tokens
     *
     * Maximum tokens for the response
     */
    max_tokens?: number;
    /**
     * Options for including additional data (disabled by default)
     */
    include?: ReflectIncludeOptions;
    /**
     * Response Schema
     *
     * Optional JSON Schema for structured output. When provided, the response will include a 'structured_output' field with the LLM response parsed according to this schema.
     */
    response_schema?: {
        [key: string]: unknown;
    } | null;
    /**
     * Tags
     *
     * Scope raw facts, observations, mental models, and tagged directives during reflection. With no tags, memory retrieval is unfiltered while only untagged/global directives are loaded. Use tags=[] with tags_match='exact' to select the untagged/global scope.
     */
    tags?: Array<string> | null;
    /**
     * Tags Match
     *
     * How to match tags: 'any' (OR, includes untagged), 'all' (AND, includes untagged), 'any_strict' (OR, excludes untagged), 'all_strict' (AND, excludes untagged), or 'exact' (set equality). Untagged directives remain global in every mode.
     */
    tags_match?: "any" | "all" | "any_strict" | "all_strict" | "exact";
    /**
     * Tag Groups
     *
     * Compound tag filter using boolean groups. Groups in the list are AND-ed. Each group is a leaf {tags, match} or compound {and: [...]}, {or: [...]}, {not: ...}. Mutually exclusive with tags. A leaf may set resolve='fuzzy' to match its tags against the bank's tags by trigram similarity instead of literally, so a query that says 'typsecript' still reaches memories tagged 'typescript'.
     */
    tag_groups?: Array<TagGroupLeaf | TagGroupAndInput | TagGroupOrInput | TagGroupNotInput> | null;
    /**
     * Apply All Directives
     *
     * Apply every active directive regardless of tags. By default directives are scoped like memories: untagged directives always apply, and tagged directives apply only when the request's tags match them. Set true to apply all active directives, ignoring tag scope.
     */
    apply_all_directives?: boolean;
    /**
     * Fact Types
     *
     * Filter which fact types are retrieved during reflect. None means all types (world, experience, observation).
     */
    fact_types?: Array<"world" | "experience" | "observation"> | null;
    /**
     * Exclude Mental Models
     *
     * If true, exclude all mental models from the reflect loop (skip search_mental_models tool).
     */
    exclude_mental_models?: boolean;
    /**
     * Exclude Mental Model Ids
     *
     * Exclude specific mental models by ID from the reflect loop.
     */
    exclude_mental_model_ids?: Array<string> | null;
};
/**
 * ReflectResponse
 *
 * Response model for think endpoint.
 */
type ReflectResponse = {
    /**
     * Text
     *
     * The reflect response as well-formatted markdown (headers, lists, bold/italic, code blocks, etc.)
     */
    text: string;
    /**
     * Evidence used to generate the response. Only present when include.facts is set.
     */
    based_on?: ReflectBasedOn | null;
    /**
     * Structured Output
     *
     * Structured output parsed according to the request's response_schema. Only present when response_schema was provided in the request.
     */
    structured_output?: {
        [key: string]: unknown;
    } | null;
    /**
     * Structured Output Error
     *
     * Why structured output could not be produced. Present only when a response_schema was given and the extraction call failed (provider error, timeout, unparseable output). A missing structured_output *without* this field means the answer held nothing matching the schema — the reflect itself still succeeded either way.
     */
    structured_output_error?: string | null;
    /**
     * Token usage metrics for LLM calls during reflection.
     */
    usage?: TokenUsage | null;
    /**
     * Execution trace of tool and LLM calls. Only present when include.tool_calls is set.
     */
    trace?: ReflectTrace | null;
};
/**
 * ReflectToolCall
 *
 * A tool call made during reflect agent execution.
 */
type ReflectToolCall = {
    /**
     * Tool
     *
     * Tool name: lookup, recall, learn, expand
     */
    tool: string;
    /**
     * Input
     *
     * Tool input parameters
     */
    input: {
        [key: string]: unknown;
    };
    /**
     * Output
     *
     * Tool output (only included when include.tool_calls.output is true)
     */
    output?: {
        [key: string]: unknown;
    } | null;
    /**
     * Duration Ms
     *
     * Execution time in milliseconds
     */
    duration_ms: number;
    /**
     * Iteration
     *
     * Iteration number (1-based) when this tool was called
     */
    iteration?: number;
};
/**
 * ReflectTrace
 *
 * Execution trace of LLM and tool calls during reflection.
 */
type ReflectTrace = {
    /**
     * Tool Calls
     *
     * Tool calls made during reflection
     */
    tool_calls?: Array<ReflectToolCall>;
    /**
     * Llm Calls
     *
     * LLM calls made during reflection
     */
    llm_calls?: Array<ReflectLlmCall>;
};
/**
 * RefreshMentalModelOperationDetails
 *
 * What a refresh_mental_model operation did, on the operation record itself.
 *
 * Reported under an async operation's ``details``, which is keyed by
 * ``operation_type``: each type that has a typed outcome to report contributes
 * its own shape there, rather than every type's fields being flattened onto the
 * operation. Today refresh is the only one.
 *
 * This exists because ``result_metadata`` — the only per-refresh record kept
 * indefinitely — could not say what a refresh did (#3274), and is documented as
 * debug-only and unstable, so it is not something a caller can build on.
 */
type RefreshMentalModelOperationDetails = {
    /**
     * Operation Type
     *
     * Discriminator: which operation type this detail describes.
     */
    operation_type?: "refresh_mental_model";
    /**
     * Outcome
     *
     * What the refresh did with the document: rewrote it (`content_written`), produced a document identical to the stored one (`content_unchanged`), had no new facts to read at all (`content_preserved_no_new_facts`), or refused to write (the `refresh_failed_*` values).
     */
    outcome: "content_written" | "content_unchanged" | "content_preserved_no_new_facts" | "refresh_failed_empty_candidate" | "refresh_failed_delta_not_applied" | "refresh_failed_structured_output" | "refresh_failed_error";
    /**
     * Failure Reason
     *
     * Why the refresh refused to write, finer-grained than the outcome — it distinguishes an op call that failed from one whose operations were all rejected, and from a baseline document that could not be read. Null unless `outcome` is one of the `refresh_failed_*` values.
     */
    failure_reason?: "empty_candidate" | "structured_doc_unreadable" | "delta_ops_failed" | "delta_ops_all_skipped" | "delta_not_applied" | "structured_output_failed" | "retrieval_failed" | "no_answer" | "unexpected_error" | null;
};
/**
 * ReprocessDocumentResponse
 *
 * Response model for reprocess document endpoint.
 */
type ReprocessDocumentResponse = {
    /**
     * Success
     */
    success: boolean;
    /**
     * Operation Id
     */
    operation_id: string;
    /**
     * Items Count
     */
    items_count: number;
};
/**
 * RetainRequest
 *
 * Request model for retain endpoint.
 */
type RetainRequest = {
    /**
     * Items
     */
    items: Array<MemoryItem>;
    /**
     * Async
     *
     * If true, process asynchronously in background. If false, wait for completion (default: false)
     */
    async?: boolean;
    /**
     * Document Tags
     *
     * Deprecated. Use item-level tags instead.
     *
     * @deprecated
     */
    document_tags?: Array<string> | null;
    /**
     * Operation Id
     *
     * Optional client-supplied UUID used as the identity of an async retain operation. Re-submitting with the same operation_id returns the original operation and creates no new work, so retrying after a lost or timed-out acknowledgement will not enqueue a duplicate. Reusing an id that belongs to a different operation returns HTTP 409. Ignored for synchronous retain.
     */
    operation_id?: string | null;
};
/**
 * RetainResponse
 *
 * Response model for retain endpoint.
 */
type RetainResponse = {
    /**
     * Success
     */
    success: boolean;
    /**
     * Bank Id
     */
    bank_id: string;
    /**
     * Items Count
     */
    items_count: number;
    /**
     * Async
     *
     * Whether the operation was processed asynchronously
     */
    async: boolean;
    /**
     * Operation Id
     *
     * Operation ID for tracking async operations. Use GET /v1/default/banks/{bank_id}/operations to list operations. Only present when async=true. When items use different per-item strategies, use operation_ids instead.
     */
    operation_id?: string | null;
    /**
     * Operation Ids
     *
     * Operation IDs when items were submitted as multiple strategy groups (async=true with mixed per-item strategies). operation_id is set to the first entry for backward compatibility.
     */
    operation_ids?: Array<string> | null;
    /**
     * Token usage metrics for LLM calls during fact extraction (only present for synchronous operations)
     */
    usage?: TokenUsage | null;
};
/**
 * RetryOperationResponse
 *
 * Response model for retry operation endpoint.
 */
type RetryOperationResponse = {
    /**
     * Success
     */
    success: boolean;
    /**
     * Message
     */
    message: string;
    /**
     * Operation Id
     */
    operation_id: string;
};
/**
 * RunSettingModel
 *
 * A setting that shapes the operation without appearing in its prompt.
 *
 * Chunk sizes decide how the input is cut before extraction runs, so they change
 * what comes back while contributing no prompt text — they cannot be blocks, which
 * partition the message, and these are in none of it.
 */
type RunSettingModel = {
    /**
     * Field
     */
    field: string;
    /**
     * Value
     *
     * Effective value; null when unset.
     */
    value?: string | null;
    /**
     * Kind
     *
     * Shape of the value, so a client can offer the right control.
     */
    kind: "text" | "boolean" | "choice" | "complex";
    /**
     * Editable
     *
     * Whether this bank may override the field via the bank config API.
     */
    editable?: boolean;
};
/**
 * SourceFactsIncludeOptions
 *
 * Options for including source facts for observation-type results.
 */
type SourceFactsIncludeOptions = {
    /**
     * Max Tokens
     *
     * Maximum total tokens for source facts across all observations (-1 = unlimited)
     */
    max_tokens?: number;
    /**
     * Max Tokens Per Observation
     *
     * Maximum tokens of source facts per observation (-1 = unlimited)
     */
    max_tokens_per_observation?: number;
};
/**
 * TagGroupAnd
 *
 * Compound AND group: all child filters must match.
 */
type TagGroupAndInput = {
    /**
     * And
     */
    and: Array<TagGroupLeaf | TagGroupAndInput | TagGroupOrInput | TagGroupNotInput>;
};
/**
 * TagGroupAnd
 *
 * Compound AND group: all child filters must match.
 */
type TagGroupAndOutput = {
    /**
     * And
     */
    and: Array<TagGroupLeaf | TagGroupAndOutput | TagGroupOrOutput | TagGroupNotOutput>;
};
/**
 * TagGroupLeaf
 *
 * A leaf tag filter: matches memories by tag list and match mode.
 */
type TagGroupLeaf = {
    /**
     * Tags
     */
    tags: Array<string>;
    /**
     * Match
     */
    match?: "any" | "all" | "any_strict" | "all_strict" | "exact";
    /**
     * Resolve
     */
    resolve?: "exact" | "fuzzy";
};
/**
 * TagGroupNot
 *
 * Compound NOT group: child filter must NOT match.
 */
type TagGroupNotInput = {
    /**
     * Not
     */
    not: TagGroupLeaf | TagGroupAndInput | TagGroupOrInput | TagGroupNotInput;
};
/**
 * TagGroupNot
 *
 * Compound NOT group: child filter must NOT match.
 */
type TagGroupNotOutput = {
    /**
     * Not
     */
    not: TagGroupLeaf | TagGroupAndOutput | TagGroupOrOutput | TagGroupNotOutput;
};
/**
 * TagGroupOr
 *
 * Compound OR group: at least one child filter must match.
 */
type TagGroupOrInput = {
    /**
     * Or
     */
    or: Array<TagGroupLeaf | TagGroupAndInput | TagGroupOrInput | TagGroupNotInput>;
};
/**
 * TagGroupOr
 *
 * Compound OR group: at least one child filter must match.
 */
type TagGroupOrOutput = {
    /**
     * Or
     */
    or: Array<TagGroupLeaf | TagGroupAndOutput | TagGroupOrOutput | TagGroupNotOutput>;
};
/**
 * TagItem
 *
 * Single tag with usage count.
 */
type TagItem = {
    /**
     * Tag
     *
     * The tag value
     */
    tag: string;
    /**
     * Count
     *
     * Number of memories with this tag
     */
    count: number;
};
/**
 * TemporalWindow
 *
 * A caller-supplied window for recall's temporal arm.
 *
 * Supplying this **replaces the date extraction** recall would otherwise run
 * over the query text, so a caller that already knows the range it means does
 * not have to phrase it in English and hope the parser agrees.
 *
 * It is **not a filter**. The temporal arm is one of four retrieval arms: it
 * surfaces memories whose own dates (``mentioned_at`` / ``occurred_start`` /
 * ``occurred_end``) fall inside the window so fusion can rank them higher.
 * The semantic, keyword and graph arms are unaffected, so results dated
 * outside the window are still returned. Narrowing results to a date range is
 * a different operation this does not provide.
 *
 * Has no effect when the bank's ``enable_temporal_retrieval`` config is off:
 * that flag gates the arm itself, and stays the single switch for it.
 */
type TemporalWindow = {
    /**
     * Start
     *
     * Start of the window (inclusive).
     */
    start: string;
    /**
     * End
     *
     * End of the window (inclusive).
     */
    end: string;
};
/**
 * TextContentBlock
 *
 * A run of text within a multimodal item, in the position the caller wrote it.
 */
type TextContentBlock = {
    /**
     * Type
     */
    type: "text";
    /**
     * Text
     */
    text: string;
};
/**
 * TokenUsage
 *
 * Token usage metrics for LLM calls.
 *
 * Tracks input/output tokens for a single request to enable
 * per-request cost tracking and monitoring.
 */
type TokenUsage = {
    /**
     * Input Tokens
     *
     * Number of input/prompt tokens consumed
     */
    input_tokens?: number;
    /**
     * Output Tokens
     *
     * Number of visible output/completion tokens generated (excludes reasoning/thoughts)
     */
    output_tokens?: number;
    /**
     * Total Tokens
     *
     * Total tokens (input + output, excludes thoughts)
     */
    total_tokens?: number;
    /**
     * Cached Tokens
     *
     * Cached/cache-read prompt tokens, when reported by the provider
     */
    cached_tokens?: number;
    /**
     * Thoughts Tokens
     *
     * Reasoning/thinking tokens generated by the model. Billed at the output rate by some providers (e.g. Gemini 2.5+ family) but not surfaced in the visible response.
     */
    thoughts_tokens?: number;
};
/**
 * ToolCallsIncludeOptions
 *
 * Options for including tool calls in reflect results.
 */
type ToolCallsIncludeOptions = {
    /**
     * Output
     *
     * Include tool outputs in the trace. Set to false to only include inputs (smaller payload).
     */
    output?: boolean;
};
/**
 * UpdateDirectiveRequest
 *
 * Request model for updating a directive.
 */
type UpdateDirectiveRequest = {
    /**
     * Name
     *
     * New name
     */
    name?: string | null;
    /**
     * Content
     *
     * New content
     */
    content?: string | null;
    /**
     * Priority
     *
     * New priority
     */
    priority?: number | null;
    /**
     * Is Active
     *
     * New active status
     */
    is_active?: boolean | null;
    /**
     * Tags
     *
     * New tags
     */
    tags?: Array<string> | null;
};
/**
 * UpdateDispositionRequest
 *
 * Request model for updating disposition traits.
 */
type UpdateDispositionRequest = {
    disposition: DispositionTraits;
};
/**
 * UpdateDocumentRequest
 *
 * Request model for updating a document's mutable fields.
 */
type UpdateDocumentRequest = {
    /**
     * Tags
     *
     * The complete new set of tags for the document and its memory units — this REPLACES the existing tags rather than adding to them, so omitting a tag drops it and `[]` clears them all. Triggers observation invalidation and re-consolidation.
     */
    tags?: Array<string> | null;
};
/**
 * UpdateDocumentResponse
 *
 * Response model for update document endpoint.
 */
type UpdateDocumentResponse = {
    /**
     * Success
     */
    success?: boolean;
};
/**
 * UpdateMemoryRequest
 *
 * Request model for curating a single memory unit (edit / invalidate / revert).
 *
 * Provide ``text`` to correct the fact, and/or ``state`` to invalidate
 * ('invalidated') or revert ('valid') it. ``reason`` is optional free text
 * recorded on the memory. At least one of ``text`` or ``state`` must be set.
 * Only world/experience facts can be curated; observations are derived.
 */
type UpdateMemoryRequest = {
    /**
     * Text
     *
     * New fact text. Re-embeds the memory, drops its derived observations and links, and triggers re-consolidation.
     */
    text?: string | null;
    /**
     * Context
     *
     * New context for the fact. '' clears it; omit to leave unchanged.
     */
    context?: string | null;
    /**
     * Occurred Start
     *
     * New occurred-range start (ISO 8601). '' clears it; omit to leave unchanged.
     */
    occurred_start?: string | null;
    /**
     * Occurred End
     *
     * New occurred-range end (ISO 8601). '' clears it; omit to leave unchanged.
     */
    occurred_end?: string | null;
    /**
     * Fact Type
     *
     * Reclassify the fact: 'world' or 'experience'. Omit to leave unchanged.
     */
    fact_type?: string | null;
    /**
     * Entities
     *
     * Replace the fact's entities. How each name is matched to an entity is governed by 'resolve_entities'. '[]' detaches all entities. Omit to leave unchanged.
     */
    entities?: Array<string> | null;
    /**
     * Resolve Entities
     *
     * Whether the names in 'entities' are resolved against the entities already in the bank. True (default) is what retain does: a similar existing entity is reused when it scores above the match threshold, so a name close to one already in the bank may resolve to that one instead of the one you wrote. False takes the names literally — an existing entity is reused only on a case-insensitive name match, any other name creates a new entity, and names in the same request are never merged with each other. Use False for hand-authored corrections, where the name you sent is the answer rather than a guess. Ignored when 'entities' is omitted.
     */
    resolve_entities?: boolean;
    /**
     * State
     *
     * Curation state: 'invalidated' to soft-retire the memory (excluded from recall/consolidation, links and derived observations pruned, moved to the archive) or 'valid' to revert. Reversible.
     */
    state?: string | null;
    /**
     * Reason
     *
     * Optional free-text reason recorded when invalidating.
     */
    reason?: string | null;
};
/**
 * UpdateMentalModelRequest
 *
 * Request model for updating a mental model.
 */
type UpdateMentalModelRequest = {
    /**
     * Name
     *
     * New name for the mental model
     */
    name?: string | null;
    /**
     * Source Query
     *
     * New source query for the mental model
     */
    source_query?: string | null;
    /**
     * Max Tokens
     *
     * Maximum tokens for generated content
     */
    max_tokens?: number | null;
    /**
     * Tags
     *
     * Tags for scoped visibility
     */
    tags?: Array<string> | null;
    /**
     * Trigger settings
     */
    trigger?: MentalModelTriggerInput | null;
};
/**
 * UpdateNodeRequest
 *
 * Rename/move a node and/or update a page's options. Each field applies only
 * when present in the request body.
 */
type UpdateNodeRequest = {
    /**
     * Name
     */
    name?: string | null;
    /**
     * Parent Id
     */
    parent_id?: string | null;
    /**
     * Source Query
     */
    source_query?: string | null;
    /**
     * Tags
     *
     * Replaces the page's tags, which SCOPE which memories it is built from. Pass `[]` to clear them and rebuild the page from the whole bank — the fix when a page generates 'I don't have information about this' because its tags match no memory. See the matching rules on this field in `CreatePageRequest`; `trigger.tags_match` widens them.
     */
    tags?: Array<string> | null;
    /**
     * Max Tokens
     */
    max_tokens?: number | null;
    /**
     * Refresh settings to change. Applied as a patch: only the fields present in this object are updated, and the rest keep the page's current values — so moving a page onto a schedule does not reset how it refreshes. Setting refresh_cron clears refresh_after_consolidation and vice versa, since a page refreshes on one or the other, never both.
     */
    trigger?: MentalModelTriggerInput | null;
};
/**
 * UpdateWebhookRequest
 *
 * Request model for updating a webhook. Only provided fields are updated.
 */
type UpdateWebhookRequest = {
    /**
     * Url
     *
     * HTTP(S) endpoint URL
     */
    url?: string | null;
    /**
     * Secret
     *
     * HMAC-SHA256 signing secret. Omit to keep existing; send null to clear.
     */
    secret?: string | null;
    /**
     * Event Types
     *
     * List of event types
     */
    event_types?: Array<string> | null;
    /**
     * Enabled
     *
     * Whether this webhook is active
     */
    enabled?: boolean | null;
    /**
     * HTTP delivery configuration
     */
    http_config?: WebhookHttpConfig | null;
};
/**
 * ValidationError
 */
type ValidationError = {
    /**
     * Location
     */
    loc: Array<string | number>;
    /**
     * Message
     */
    msg: string;
    /**
     * Error Type
     */
    type: string;
    /**
     * Input
     */
    input?: unknown;
    /**
     * Context
     */
    ctx?: {
        [key: string]: unknown;
    };
};
/**
 * VersionResponse
 *
 * Response model for the version/info endpoint.
 */
type VersionResponse = {
    /**
     * Api Version
     *
     * API version string
     */
    api_version: string;
    /**
     * Enabled feature flags
     */
    features: FeaturesInfo;
};
/**
 * WebhookDeliveryListResponse
 *
 * Response model for listing webhook deliveries.
 */
type WebhookDeliveryListResponse = {
    /**
     * Items
     */
    items: Array<WebhookDeliveryResponse>;
    /**
     * Next Cursor
     */
    next_cursor?: string | null;
};
/**
 * WebhookDeliveryResponse
 *
 * Response model for a webhook delivery record.
 */
type WebhookDeliveryResponse = {
    /**
     * Id
     */
    id: string;
    /**
     * Webhook Id
     */
    webhook_id: string | null;
    /**
     * Url
     */
    url: string;
    /**
     * Event Type
     */
    event_type: string;
    /**
     * Status
     */
    status: string;
    /**
     * Attempts
     */
    attempts: number;
    /**
     * Next Retry At
     */
    next_retry_at?: string | null;
    /**
     * Last Error
     */
    last_error?: string | null;
    /**
     * Last Response Status
     */
    last_response_status?: number | null;
    /**
     * Last Response Body
     */
    last_response_body?: string | null;
    /**
     * Last Attempt At
     */
    last_attempt_at?: string | null;
    /**
     * Created At
     */
    created_at?: string | null;
    /**
     * Updated At
     */
    updated_at?: string | null;
};
/**
 * WebhookHttpConfig
 *
 * HTTP delivery configuration for a webhook.
 */
type WebhookHttpConfig = {
    /**
     * Method
     *
     * HTTP method: GET or POST
     */
    method?: string;
    /**
     * Timeout Seconds
     *
     * HTTP request timeout in seconds
     */
    timeout_seconds?: number;
    /**
     * Headers
     *
     * Custom HTTP headers
     */
    headers?: {
        [key: string]: string;
    };
    /**
     * Params
     *
     * Custom HTTP query parameters
     */
    params?: {
        [key: string]: string;
    };
};
/**
 * WebhookListResponse
 *
 * Response model for listing webhooks.
 */
type WebhookListResponse = {
    /**
     * Items
     */
    items: Array<WebhookResponse>;
    /**
     * Total
     *
     * Total number of webhooks on the bank (ignores limit/offset)
     */
    total: number;
    /**
     * Limit
     *
     * Maximum number of webhooks returned in this page
     */
    limit: number;
    /**
     * Offset
     *
     * Offset this page started at
     */
    offset: number;
};
/**
 * WebhookResponse
 *
 * Response model for a webhook.
 */
type WebhookResponse = {
    /**
     * Id
     */
    id: string;
    /**
     * Bank Id
     */
    bank_id: string | null;
    /**
     * Url
     */
    url: string;
    /**
     * Secret
     *
     * Signing secret (redacted in responses)
     */
    secret?: string | null;
    /**
     * Event Types
     */
    event_types: Array<string>;
    /**
     * Enabled
     */
    enabled: boolean;
    http_config?: WebhookHttpConfig;
    /**
     * Created At
     */
    created_at?: string | null;
    /**
     * Updated At
     */
    updated_at?: string | null;
};
type HealthEndpointHealthGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: "/health";
};
type HealthEndpointHealthGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type GetReadinessData = {
    body?: never;
    path?: never;
    query?: never;
    url: "/health/ready";
};
type GetReadinessResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type GetLivenessData = {
    body?: never;
    path?: never;
    query?: never;
    url: "/health/live";
};
type GetLivenessResponses = {
    /**
     * Successful Response
     */
    200: LivenessResponse;
};
type GetVersionData = {
    body?: never;
    path?: never;
    query?: never;
    url: "/version";
};
type GetVersionResponses = {
    /**
     * Successful Response
     */
    200: VersionResponse;
};
type MetricsEndpointMetricsGetData = {
    body?: never;
    path?: never;
    query?: never;
    url: "/metrics";
};
type MetricsEndpointMetricsGetResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type GetGraphData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Type
         */
        type?: string | null;
        /**
         * Limit
         */
        limit?: number;
        /**
         * Q
         */
        q?: string | null;
        /**
         * Tags
         */
        tags?: Array<string> | null;
        /**
         * Tags Match
         */
        tags_match?: string;
        /**
         * Document Id
         */
        document_id?: string | null;
        /**
         * Chunk Id
         */
        chunk_id?: string | null;
    };
    url: "/v1/default/banks/{bank_id}/graph";
};
type GetGraphErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetGraphResponses = {
    /**
     * Successful Response
     */
    200: GraphDataResponse;
};
type ListMemoriesData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Type
         */
        type?: string | null;
        /**
         * Q
         */
        q?: string | null;
        /**
         * Consolidation State
         */
        consolidation_state?: string | null;
        /**
         * State
         */
        state?: string | null;
        /**
         * Document Id
         */
        document_id?: string | null;
        /**
         * Entity Id
         */
        entity_id?: string | null;
        /**
         * Tags
         */
        tags?: Array<string> | null;
        /**
         * Tags Match
         */
        tags_match?: "any" | "all" | "any_strict" | "all_strict" | "exact";
        /**
         * Time Field
         *
         * Time axis to filter and order by. `created_at` / `updated_at` = ingest and last-write time; `mentioned_at` / `occurred_start` / `occurred_end` = event time. Defaults to `created_at` when only `start_date`/`end_date` are given. Filtering and ordering both follow `time_field`, and rows with no value on that column are excluded — so `total` counts only rows carrying that timestamp, and can be 0 on a bank that is not empty.
         */
        time_field?: "created_at" | "updated_at" | "mentioned_at" | "occurred_start" | "occurred_end" | null;
        /**
         * Start Date
         *
         * Filter from this ISO datetime (inclusive)
         */
        start_date?: string | null;
        /**
         * End Date
         *
         * Filter until this ISO datetime (exclusive)
         */
        end_date?: string | null;
        /**
         * Limit
         */
        limit?: number;
        /**
         * Offset
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/memories/list";
};
type ListMemoriesErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListMemoriesResponses = {
    /**
     * Successful Response
     */
    200: ListMemoryUnitsResponse;
};
type DryRunExtractMemoriesData = {
    body: DryRunExtractRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/memories/dry-run-extract";
};
type DryRunExtractMemoriesErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DryRunExtractMemoriesResponses = {
    /**
     * Successful Response
     */
    200: DryRunExtractionResult;
};
type PreviewPromptData = {
    body: PromptPreviewRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/prompts/preview";
};
type PreviewPromptErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type PreviewPromptResponses = {
    /**
     * Successful Response
     */
    200: PromptPreviewResponse;
};
type GetMemoryData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Memory Id
         */
        memory_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/memories/{memory_id}";
};
type GetMemoryErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetMemoryResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type UpdateMemoryData = {
    body: UpdateMemoryRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Memory Id
         */
        memory_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/memories/{memory_id}";
};
type UpdateMemoryErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type UpdateMemoryResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type GetObservationHistoryData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Memory Id
         */
        memory_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/memories/{memory_id}/history";
};
type GetObservationHistoryErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetObservationHistoryResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type RecallMemoriesData = {
    body: RecallRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/memories/recall";
};
type RecallMemoriesErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type RecallMemoriesResponses = {
    /**
     * Successful Response
     */
    200: RecallResponse;
};
type ReflectData = {
    body: ReflectRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/reflect";
};
type ReflectErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ReflectResponses = {
    /**
     * Successful Response
     */
    200: ReflectResponse;
};
type ListBanksData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path?: never;
    query?: {
        /**
         * Q
         *
         * Case-insensitive substring filter on bank ID or name (e.g. 'alice')
         */
        q?: string | null;
        /**
         * Limit
         *
         * Maximum number of banks to return
         */
        limit?: number;
        /**
         * Offset
         *
         * Offset for pagination
         */
        offset?: number;
    };
    url: "/v1/default/banks";
};
type ListBanksErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListBanksResponses = {
    /**
     * Successful Response
     */
    200: BankListResponse;
};
type GetAgentStatsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Refresh
         *
         * Force a fresh recompute, bypassing the cached value (and refreshing the cache).
         */
        refresh?: boolean;
    };
    url: "/v1/default/banks/{bank_id}/stats";
};
type GetAgentStatsErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetAgentStatsResponses = {
    /**
     * Successful Response
     */
    200: BankStatsResponse;
};
type TestBankLlmData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/health/llm";
};
type TestBankLlmErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type TestBankLlmResponses = {
    /**
     * Successful Response
     */
    200: BankLlmHealthResponse;
};
type GetMemoriesTimeseriesData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Period
         */
        period?: string;
        /**
         * Time Field
         *
         * Timestamp column to bucket on. `created_at` (default) = ingest time; `mentioned_at` / `occurred_start` = event time, useful for migrated corpora where ingest time is a single point and doesn't reflect the underlying knowledge timeline. Unknown values fall back to `created_at`.
         */
        time_field?: string;
    };
    url: "/v1/default/banks/{bank_id}/stats/memories-timeseries";
};
type GetMemoriesTimeseriesErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetMemoriesTimeseriesResponses = {
    /**
     * Successful Response
     */
    200: MemoriesTimeseriesResponse;
};
type ListEntitiesData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Limit
         *
         * Maximum number of entities to return
         */
        limit?: number;
        /**
         * Offset
         *
         * Offset for pagination
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/entities";
};
type ListEntitiesErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListEntitiesResponses = {
    /**
     * Successful Response
     */
    200: EntityListResponse;
};
type GetEntityGraphData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Limit
         *
         * Maximum number of co-occurrence edges to return
         */
        limit?: number;
        /**
         * Min Count
         *
         * Minimum cooccurrence_count to include an edge
         */
        min_count?: number;
    };
    url: "/v1/default/banks/{bank_id}/entities/graph";
};
type GetEntityGraphErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetEntityGraphResponses = {
    /**
     * Successful Response
     */
    200: EntityGraphResponse;
};
type GetEntityData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Entity Id
         */
        entity_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/entities/{entity_id}";
};
type GetEntityErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetEntityResponses = {
    /**
     * Successful Response
     */
    200: EntityDetailResponse;
};
type RegenerateEntityObservationsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Entity Id
         */
        entity_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/entities/{entity_id}/regenerate";
};
type RegenerateEntityObservationsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type RegenerateEntityObservationsResponses = {
    /**
     * Successful Response
     */
    200: EntityDetailResponse;
};
type ListMentalModelsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Tags
         *
         * Filter by tags
         */
        tags?: Array<string> | null;
        /**
         * Tags Match
         *
         * How to match tags
         */
        tags_match?: "any" | "all" | "exact";
        /**
         * Detail
         *
         * Detail level: 'metadata' (names/tags/staleness — the default), 'content' (adds content/config), 'full' (includes reflect_response). Content is opt-in: it is returned only when explicitly requested.
         */
        detail?: "metadata" | "content" | "full";
        /**
         * Limit
         */
        limit?: number;
        /**
         * Offset
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/mental-models";
};
type ListMentalModelsErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListMentalModelsResponses = {
    /**
     * Successful Response
     */
    200: MentalModelListResponse;
};
type CreateMentalModelData = {
    body: CreateMentalModelRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/mental-models";
};
type CreateMentalModelErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type CreateMentalModelResponses = {
    /**
     * Successful Response
     */
    200: CreateMentalModelResponse;
};
type DeleteMentalModelData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Mental Model Id
         */
        mental_model_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}";
};
type DeleteMentalModelErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DeleteMentalModelResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type GetMentalModelData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Mental Model Id
         */
        mental_model_id: string;
    };
    query?: {
        /**
         * Detail
         *
         * Detail level: 'metadata' (names/tags only), 'content' (adds content/config), 'full' (includes reflect_response)
         */
        detail?: "metadata" | "content" | "full";
    };
    url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}";
};
type GetMentalModelErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetMentalModelResponses = {
    /**
     * Successful Response
     */
    200: MentalModelResponse;
};
type UpdateMentalModelData = {
    body: UpdateMentalModelRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Mental Model Id
         */
        mental_model_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}";
};
type UpdateMentalModelErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type UpdateMentalModelResponses = {
    /**
     * Successful Response
     */
    200: MentalModelResponse;
};
type GetMentalModelHistoryData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Mental Model Id
         */
        mental_model_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}/history";
};
type GetMentalModelHistoryErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetMentalModelHistoryResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type RefreshMentalModelData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Mental Model Id
         */
        mental_model_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}/refresh";
};
type RefreshMentalModelErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type RefreshMentalModelResponses = {
    /**
     * Successful Response
     */
    200: AsyncOperationSubmitResponse;
};
type DryRunRefreshMentalModelData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Mental Model Id
         */
        mental_model_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}/dry-run-refresh";
};
type DryRunRefreshMentalModelErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DryRunRefreshMentalModelResponses = {
    /**
     * Successful Response
     */
    200: MentalModelDryRunRefreshResult;
};
type ClearMentalModelData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Mental Model Id
         */
        mental_model_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}/clear";
};
type ClearMentalModelErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ClearMentalModelResponses = {
    /**
     * Successful Response
     */
    200: MentalModelResponse;
};
type GetKnowledgeBaseTreeData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/knowledge-base/tree";
};
type GetKnowledgeBaseTreeErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetKnowledgeBaseTreeResponses = {
    /**
     * Successful Response
     */
    200: KnowledgeTreeResponse;
};
type CreateKnowledgeFolderData = {
    body: CreateFolderRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/knowledge-base/folders";
};
type CreateKnowledgeFolderErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type CreateKnowledgeFolderResponses = {
    /**
     * Successful Response
     */
    201: KnowledgeNode;
};
type CreateKnowledgePageData = {
    body: CreatePageRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/knowledge-base/pages";
};
type CreateKnowledgePageErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type CreateKnowledgePageResponses = {
    /**
     * Successful Response
     */
    201: CreateKnowledgePageResponse;
};
type ExportKnowledgeBaseData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/knowledge-base/export";
};
type ExportKnowledgeBaseErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ExportKnowledgeBaseResponses = {
    /**
     * Successful Response
     */
    200: KnowledgePageBundleResponse;
};
type SearchKnowledgeBaseData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query: {
        /**
         * Q
         *
         * Search query
         */
        q: string;
        /**
         * Limit
         *
         * Maximum results to return
         */
        limit?: number;
    };
    url: "/v1/default/banks/{bank_id}/knowledge-base/search";
};
type SearchKnowledgeBaseErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type SearchKnowledgeBaseResponses = {
    /**
     * Successful Response
     */
    200: KnowledgePageSearchResponse;
};
type GetKnowledgePageData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Page Id
         */
        page_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/knowledge-base/pages/{page_id}";
};
type GetKnowledgePageErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetKnowledgePageResponses = {
    /**
     * Successful Response
     */
    200: KnowledgePageResponse;
};
type DeleteKnowledgeNodeData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Node Id
         */
        node_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/knowledge-base/nodes/{node_id}";
};
type DeleteKnowledgeNodeErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DeleteKnowledgeNodeResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type UpdateKnowledgeNodeData = {
    body: UpdateNodeRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Node Id
         */
        node_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/knowledge-base/nodes/{node_id}";
};
type UpdateKnowledgeNodeErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type UpdateKnowledgeNodeResponses = {
    /**
     * Successful Response
     */
    200: KnowledgeNode;
};
type ListDirectivesData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Tags
         *
         * Filter directives by execution scope. Omit or pass [] to list all directives.
         */
        tags?: Array<string> | null;
        /**
         * Tags Match
         *
         * How tagged directives match the requested scope. Untagged/global directives are included.
         */
        tags_match?: "any" | "all" | "exact";
        /**
         * Active Only
         *
         * Only return active directives
         */
        active_only?: boolean;
        /**
         * Limit
         */
        limit?: number;
        /**
         * Offset
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/directives";
};
type ListDirectivesErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListDirectivesResponses = {
    /**
     * Successful Response
     */
    200: DirectiveListResponse;
};
type CreateDirectiveData = {
    body: CreateDirectiveRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/directives";
};
type CreateDirectiveErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type CreateDirectiveResponses = {
    /**
     * Successful Response
     */
    200: DirectiveResponse;
};
type DeleteDirectiveData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Directive Id
         */
        directive_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/directives/{directive_id}";
};
type DeleteDirectiveErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DeleteDirectiveResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type GetDirectiveData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Directive Id
         */
        directive_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/directives/{directive_id}";
};
type GetDirectiveErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetDirectiveResponses = {
    /**
     * Successful Response
     */
    200: DirectiveResponse;
};
type UpdateDirectiveData = {
    body: UpdateDirectiveRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Directive Id
         */
        directive_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/directives/{directive_id}";
};
type UpdateDirectiveErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type UpdateDirectiveResponses = {
    /**
     * Successful Response
     */
    200: DirectiveResponse;
};
type ListDocumentsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Q
         *
         * Case-insensitive substring filter on document ID (e.g. 'report' matches 'report-2024')
         */
        q?: string | null;
        /**
         * Tags
         *
         * Filter documents by tags
         */
        tags?: Array<string> | null;
        /**
         * Tags Match
         *
         * How to match tags: 'any', 'all', 'any_strict', 'all_strict'
         */
        tags_match?: string;
        /**
         * Time Field
         *
         * Time axis to filter and order by: `created_at` (when the document first arrived) or `updated_at` (its last write, the default ordering). Filtering and ordering both follow `time_field`, and rows with no value on that column are excluded — so `total` counts only rows carrying that timestamp, and can be 0 on a bank that is not empty.
         */
        time_field?: "created_at" | "updated_at" | null;
        /**
         * Start Date
         *
         * Filter from this ISO datetime (inclusive)
         */
        start_date?: string | null;
        /**
         * End Date
         *
         * Filter until this ISO datetime (exclusive)
         */
        end_date?: string | null;
        /**
         * Limit
         */
        limit?: number;
        /**
         * Offset
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/documents";
};
type ListDocumentsErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListDocumentsResponses = {
    /**
     * Successful Response
     */
    200: ListDocumentsResponse;
};
type ListDocumentChunksData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Document Id
         */
        document_id: string;
    };
    query?: {
        /**
         * Limit
         *
         * Maximum number of chunks to return
         */
        limit?: number;
        /**
         * Offset
         *
         * Offset for pagination
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/documents/{document_id}/chunks";
};
type ListDocumentChunksErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListDocumentChunksResponses = {
    /**
     * Successful Response
     */
    200: ListChunksResponse;
};
type ReprocessDocumentData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Document Id
         */
        document_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/documents/{document_id}/reprocess";
};
type ReprocessDocumentErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ReprocessDocumentResponses = {
    /**
     * Successful Response
     */
    200: ReprocessDocumentResponse;
};
type DeleteDocumentData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Document Id
         */
        document_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/documents/{document_id}";
};
type DeleteDocumentErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DeleteDocumentResponses = {
    /**
     * Successful Response
     */
    200: DeleteDocumentResponse;
};
type GetDocumentData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Document Id
         */
        document_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/documents/{document_id}";
};
type GetDocumentErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetDocumentResponses = {
    /**
     * Successful Response
     */
    200: DocumentResponse;
};
type UpdateDocumentData = {
    body: UpdateDocumentRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Document Id
         */
        document_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/documents/{document_id}";
};
type UpdateDocumentErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type UpdateDocumentResponses = {
    /**
     * Successful Response
     */
    200: UpdateDocumentResponse;
};
type ListTagsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Q
         *
         * Wildcard pattern to filter tags (e.g., 'user:*' for user:alice, '*-admin' for role-admin). Use '*' as wildcard. Case-insensitive.
         */
        q?: string | null;
        /**
         * Source
         *
         * Where to read tags from: 'memories' (memory_units, default) or 'mental_models'.
         */
        source?: "memories" | "mental_models";
        /**
         * Limit
         *
         * Maximum number of tags to return
         */
        limit?: number;
        /**
         * Offset
         *
         * Offset for pagination
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/tags";
};
type ListTagsErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListTagsResponses = {
    /**
     * Successful Response
     */
    200: ListTagsResponse;
};
type GetChunkData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Chunk Id
         */
        chunk_id: string;
    };
    query?: never;
    url: "/v1/default/chunks/{chunk_id}";
};
type GetChunkErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetChunkResponses = {
    /**
     * Successful Response
     */
    200: ChunkResponse;
};
type ListOperationsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Status
         *
         * Filter by status: pending, processing, completed, failed, or cancelled
         */
        status?: string | null;
        /**
         * Type
         *
         * Filter by operation type: retain, consolidation, refresh_mental_model, file_convert_retain, webhook_delivery
         */
        type?: string | null;
        /**
         * Limit
         *
         * Maximum number of operations to return
         */
        limit?: number;
        /**
         * Offset
         *
         * Number of operations to skip
         */
        offset?: number;
        /**
         * Exclude Parents
         *
         * Exclude parent batch operations from results
         */
        exclude_parents?: boolean;
    };
    url: "/v1/default/banks/{bank_id}/operations";
};
type ListOperationsErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListOperationsResponses = {
    /**
     * Successful Response
     */
    200: OperationsListResponse;
};
type CancelOperationData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Operation Id
         */
        operation_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/operations/{operation_id}";
};
type CancelOperationErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type CancelOperationResponses = {
    /**
     * Successful Response
     */
    200: CancelOperationResponse;
};
type GetOperationStatusData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Operation Id
         */
        operation_id: string;
    };
    query?: {
        /**
         * Include Payload
         *
         * Include the raw task payload (submission params) in the response. May be large.
         */
        include_payload?: boolean;
    };
    url: "/v1/default/banks/{bank_id}/operations/{operation_id}";
};
type GetOperationStatusErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetOperationStatusResponses = {
    /**
     * Successful Response
     */
    200: OperationStatusResponse;
};
type RetryOperationData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Operation Id
         */
        operation_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/operations/{operation_id}/retry";
};
type RetryOperationErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type RetryOperationResponses = {
    /**
     * Successful Response
     */
    200: RetryOperationResponse;
};
type DeleteOperationData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Operation Id
         */
        operation_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/operations/{operation_id}/delete";
};
type DeleteOperationErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DeleteOperationResponses = {
    /**
     * Successful Response
     */
    200: DeleteOperationResponse;
};
type GetBankProfileData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/profile";
};
type GetBankProfileErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetBankProfileResponses = {
    /**
     * Successful Response
     */
    200: BankProfileResponse;
};
type UpdateBankDispositionData = {
    body: UpdateDispositionRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/profile";
};
type UpdateBankDispositionErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type UpdateBankDispositionResponses = {
    /**
     * Successful Response
     */
    200: BankProfileResponse;
};
type AddBankBackgroundData = {
    body: AddBackgroundRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/background";
};
type AddBankBackgroundErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type AddBankBackgroundResponses = {
    /**
     * Successful Response
     */
    200: BackgroundResponse;
};
type DeleteBankData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}";
};
type DeleteBankErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DeleteBankResponses = {
    /**
     * Successful Response
     */
    200: DeleteResponse;
};
type UpdateBankData = {
    body: CreateBankRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}";
};
type UpdateBankErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type UpdateBankResponses = {
    /**
     * Successful Response
     */
    200: BankProfileResponse;
};
type CreateOrUpdateBankData = {
    body: CreateBankRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}";
};
type CreateOrUpdateBankErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type CreateOrUpdateBankResponses = {
    /**
     * Successful Response
     */
    200: BankProfileResponse;
};
type ImportBankTemplateData = {
    /**
     * Manifest
     *
     * Bank template manifest
     */
    body: BankTemplateManifest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Dry Run
         *
         * Validate only, do not apply changes
         */
        dry_run?: boolean;
    };
    url: "/v1/default/banks/{bank_id}/import";
};
type ImportBankTemplateErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ImportBankTemplateResponses = {
    /**
     * Successful Response
     */
    200: BankTemplateImportResponse;
};
type ExportBankTemplateData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/export";
};
type ExportBankTemplateErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ExportBankTemplateResponses = {
    /**
     * Successful Response
     */
    200: BankTemplateManifest;
};
type ExportDocumentsSyncRemovedData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/document-transfer";
};
type ExportDocumentsSyncRemovedErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ExportDocumentsSyncRemovedResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type ImportDocumentsData = {
    body: BodyImportDocuments;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * On Conflict
         *
         * skip | replace | new-id
         */
        on_conflict?: string;
    };
    url: "/v1/default/banks/{bank_id}/document-transfer";
};
type ImportDocumentsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ImportDocumentsResponses = {
    /**
     * Successful Response
     */
    202: DocumentImportSubmitResponse;
};
type ExportDocumentsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Document Id
         *
         * Document id(s) to export; omit for all
         */
        document_id?: Array<string> | null;
        /**
         * Include Observations
         *
         * Also export consolidated observations (restored on import; whole-bank only)
         */
        include_observations?: boolean;
        /**
         * Include Knowledge Base
         *
         * Also export Mental Models and Knowledge Pages (restored on import; whole-bank only)
         */
        include_knowledge_base?: boolean;
    };
    url: "/v1/default/banks/{bank_id}/document-transfer/export";
};
type ExportDocumentsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ExportDocumentsResponses = {
    /**
     * Successful Response
     */
    202: DocumentExportSubmitResponse;
};
type ExportBankTransferData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Include Data
         *
         * Carry the memories and everything backing them
         */
        include_data?: boolean;
        /**
         * Include Bank Config
         *
         * Carry the bank's config overrides, directives and webhooks
         */
        include_bank_config?: boolean;
        /**
         * Include History
         *
         * Carry audit_log and llm_requests
         */
        include_history?: boolean;
        /**
         * Document Id
         *
         * Document id(s); omit for the whole bank
         */
        document_id?: Array<string> | null;
    };
    url: "/v1/default/banks/{bank_id}/transfer/export";
};
type ExportBankTransferErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ExportBankTransferResponses = {
    /**
     * Successful Response
     */
    202: BankTransferSubmitResponse;
};
type ImportBankTransferData = {
    body: BodyImportBankTransfer;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Mode
         *
         * restore (into a fresh bank) | merge (into this bank)
         */
        mode?: string;
        /**
         * Target Bank Id
         *
         * restore mode: the bank to create; defaults to the archive's source bank
         */
        target_bank_id?: string | null;
        /**
         * Document Conflict
         *
         * merge mode: skip | replace | new-id
         */
        document_conflict?: string;
        /**
         * Include Data
         *
         * restore mode: carry the memories and everything backing them (default true)
         */
        include_data?: boolean | null;
        /**
         * Include Bank Config
         *
         * restore mode: restore the bank's config overrides, directives and webhooks (default true)
         */
        include_bank_config?: boolean | null;
        /**
         * Include History
         *
         * restore mode: carry audit_log and llm_requests (default false)
         */
        include_history?: boolean | null;
    };
    url: "/v1/default/banks/{bank_id}/transfer/import";
};
type ImportBankTransferErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ImportBankTransferResponses = {
    /**
     * Successful Response
     */
    202: BankTransferSubmitResponse;
};
type CloneBankData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query: {
        /**
         * Target Bank Id
         *
         * Bank to create; must not already exist
         */
        target_bank_id: string;
        /**
         * Include Data
         *
         * Copy the memories, what backs them, and the mental models and knowledge pages synthesized from them
         */
        include_data?: boolean;
        /**
         * Include Bank Config
         *
         * Copy the bank's config overrides, directives and webhooks
         */
        include_bank_config?: boolean;
        /**
         * Include History
         *
         * Copy audit_log and llm_requests
         */
        include_history?: boolean;
    };
    url: "/v1/default/banks/{bank_id}/clone";
};
type CloneBankErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type CloneBankResponses = {
    /**
     * Successful Response
     */
    202: BankTransferSubmitResponse;
};
type GetBankAttachmentData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Attachment Id
         */
        attachment_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/attachments/{attachment_id}";
};
type GetBankAttachmentErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetBankAttachmentResponses = {
    /**
     * Attachment bytes
     */
    200: Blob | File;
};
type DownloadFileData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Key
         */
        key: string;
    };
    query?: never;
    url: "/v1/default/files/download/{key}";
};
type DownloadFileErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DownloadFileResponses = {
    /**
     * Stored file
     */
    200: Blob | File;
};
type GetBankTemplateSchemaData = {
    body?: never;
    path?: never;
    query?: never;
    url: "/v1/bank-template-schema";
};
type GetBankTemplateSchemaResponses = {
    /**
     * Successful Response
     */
    200: unknown;
};
type ClearObservationsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/observations";
};
type ClearObservationsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ClearObservationsResponses = {
    /**
     * Successful Response
     */
    200: DeleteResponse;
};
type ListObservationScopesData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Limit
         *
         * Maximum number of scopes to return
         */
        limit?: number;
        /**
         * Offset
         *
         * Offset for pagination
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/observations/scopes";
};
type ListObservationScopesErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListObservationScopesResponses = {
    /**
     * Successful Response
     */
    200: ObservationScopesResponse;
};
type RecoverConsolidationData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/consolidation/recover";
};
type RecoverConsolidationErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type RecoverConsolidationResponses = {
    /**
     * Successful Response
     */
    200: RecoverConsolidationResponse;
};
type ClearMemoryObservationsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Memory Id
         */
        memory_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/memories/{memory_id}/observations";
};
type ClearMemoryObservationsErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ClearMemoryObservationsResponses = {
    /**
     * Successful Response
     */
    200: ClearMemoryObservationsResponse;
};
type ResetBankConfigData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/config";
};
type ResetBankConfigErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ResetBankConfigResponses = {
    /**
     * Successful Response
     */
    200: BankConfigResponse;
};
type GetBankConfigData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/config";
};
type GetBankConfigErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type GetBankConfigResponses = {
    /**
     * Successful Response
     */
    200: BankConfigResponse;
};
type UpdateBankConfigData = {
    body: BankConfigUpdate;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/config";
};
type UpdateBankConfigErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type UpdateBankConfigResponses = {
    /**
     * Successful Response
     */
    200: BankConfigResponse;
};
type TriggerConsolidationData = {
    /**
     * Request
     */
    body?: ConsolidationRequest | null;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/consolidate";
};
type TriggerConsolidationErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type TriggerConsolidationResponses = {
    /**
     * Successful Response
     */
    200: ConsolidationResponse;
};
type ListWebhooksData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Limit
         *
         * Maximum number of webhooks to return
         */
        limit?: number;
        /**
         * Offset
         *
         * Offset for pagination
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/webhooks";
};
type ListWebhooksErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListWebhooksResponses = {
    /**
     * Successful Response
     */
    200: WebhookListResponse;
};
type CreateWebhookData = {
    body: CreateWebhookRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/webhooks";
};
type CreateWebhookErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type CreateWebhookResponses = {
    /**
     * Successful Response
     */
    201: WebhookResponse;
};
type DeleteWebhookData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Webhook Id
         */
        webhook_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/webhooks/{webhook_id}";
};
type DeleteWebhookErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type DeleteWebhookResponses = {
    /**
     * Successful Response
     */
    200: DeleteResponse;
};
type UpdateWebhookData = {
    body: UpdateWebhookRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Webhook Id
         */
        webhook_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/webhooks/{webhook_id}";
};
type UpdateWebhookErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type UpdateWebhookResponses = {
    /**
     * Successful Response
     */
    200: WebhookResponse;
};
type ListWebhookDeliveriesData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
        /**
         * Webhook Id
         */
        webhook_id: string;
    };
    query?: {
        /**
         * Limit
         *
         * Maximum number of deliveries to return
         */
        limit?: number;
        /**
         * Cursor
         *
         * Pagination cursor (created_at of last item)
         */
        cursor?: string | null;
    };
    url: "/v1/default/banks/{bank_id}/webhooks/{webhook_id}/deliveries";
};
type ListWebhookDeliveriesErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListWebhookDeliveriesResponses = {
    /**
     * Successful Response
     */
    200: WebhookDeliveryListResponse;
};
type ClearBankMemoriesData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Type
         *
         * Optional fact type filter (world, experience, observation)
         */
        type?: string | null;
    };
    url: "/v1/default/banks/{bank_id}/memories";
};
type ClearBankMemoriesErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ClearBankMemoriesResponses = {
    /**
     * Successful Response
     */
    200: DeleteResponse;
};
type RetainMemoriesData = {
    body: RetainRequest;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/memories";
};
type RetainMemoriesErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type RetainMemoriesResponses = {
    /**
     * Successful Response
     */
    200: RetainResponse;
};
type FileRetainData = {
    body: BodyFileRetain;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: never;
    url: "/v1/default/banks/{bank_id}/files/retain";
};
type FileRetainErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type FileRetainResponses = {
    /**
     * Successful Response
     */
    200: FileRetainResponse;
};
type ListAuditLogsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Action
         *
         * Filter by action type
         */
        action?: string | null;
        /**
         * Transport
         *
         * Filter by transport (http, mcp, system)
         */
        transport?: string | null;
        /**
         * Start Date
         *
         * Filter from this ISO datetime (inclusive)
         */
        start_date?: string | null;
        /**
         * End Date
         *
         * Filter until this ISO datetime (exclusive)
         */
        end_date?: string | null;
        /**
         * Limit
         *
         * Max items to return
         */
        limit?: number;
        /**
         * Offset
         *
         * Offset for pagination
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/audit-logs";
};
type ListAuditLogsErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListAuditLogsResponses = {
    /**
     * Successful Response
     */
    200: AuditLogListResponse;
};
type AuditLogStatsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Action
         *
         * Filter by action type
         */
        action?: string | null;
        /**
         * Period
         *
         * Time period: 1d, 7d, or 30d
         */
        period?: string;
    };
    url: "/v1/default/banks/{bank_id}/audit-logs/stats";
};
type AuditLogStatsErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type AuditLogStatsResponses = {
    /**
     * Successful Response
     */
    200: AuditLogStatsResponse;
};
type ListLlmRequestsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Status
         *
         * Filter by status (success, error)
         */
        status?: string | null;
        /**
         * Operation
         *
         * Filter by operation (retain, reflect, consolidation)
         */
        operation?: string | null;
        /**
         * Scope
         *
         * Filter by call scope
         */
        scope?: string | null;
        /**
         * Provider
         *
         * Filter by LLM provider
         */
        provider?: string | null;
        /**
         * Trace Id
         *
         * Filter to one operation run (all LLM calls sharing a trace)
         */
        trace_id?: string | null;
        /**
         * Document Id
         *
         * Filter to LLM calls that processed a given document
         */
        document_id?: string | null;
        /**
         * Memory Id
         *
         * Filter to the operation run(s) that produced or consumed a given memory_unit
         */
        memory_id?: string | null;
        /**
         * Group
         *
         * Paginate by operation run (trace) instead of by call; returns whole runs
         */
        group?: boolean;
        /**
         * Start Date
         *
         * Filter from this ISO datetime (inclusive)
         */
        start_date?: string | null;
        /**
         * End Date
         *
         * Filter until this ISO datetime (exclusive)
         */
        end_date?: string | null;
        /**
         * Limit
         *
         * Max items to return
         */
        limit?: number;
        /**
         * Offset
         *
         * Offset for pagination
         */
        offset?: number;
    };
    url: "/v1/default/banks/{bank_id}/llm-requests";
};
type ListLlmRequestsErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type ListLlmRequestsResponses = {
    /**
     * Successful Response
     */
    200: LlmRequestListResponse;
};
type LlmRequestStatsData = {
    body?: never;
    headers?: {
        /**
         * Authorization
         */
        authorization?: string | null;
    };
    path: {
        /**
         * Bank Id
         */
        bank_id: string;
    };
    query?: {
        /**
         * Operation
         *
         * Filter by operation
         */
        operation?: string | null;
        /**
         * Period
         *
         * Time period: 1d, 7d, or 30d
         */
        period?: string;
    };
    url: "/v1/default/banks/{bank_id}/llm-requests/stats";
};
type LlmRequestStatsErrors = {
    /**
     * The bank does not exist.
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};
type LlmRequestStatsResponses = {
    /**
     * Successful Response
     */
    200: LlmRequestStatsResponse;
};

type AuthToken = string | undefined;
interface Auth {
    /**
     * Which part of the request do we use to send the auth?
     *
     * @default 'header'
     */
    in?: "header" | "query" | "cookie";
    /**
     * Header or query parameter name.
     *
     * @default 'Authorization'
     */
    name?: string;
    scheme?: "basic" | "bearer";
    type: "apiKey" | "http";
}

interface SerializerOptions<T> {
    /**
     * @default true
     */
    explode: boolean;
    style: T;
}
type ArrayStyle = "form" | "spaceDelimited" | "pipeDelimited";
type ObjectStyle = "form" | "deepObject";

type QuerySerializer = (query: Record<string, unknown>) => string;
type BodySerializer = (body: unknown) => unknown;
type QuerySerializerOptionsObject = {
    allowReserved?: boolean;
    array?: Partial<SerializerOptions<ArrayStyle>>;
    object?: Partial<SerializerOptions<ObjectStyle>>;
};
type QuerySerializerOptions = QuerySerializerOptionsObject & {
    /**
     * Per-parameter serialization overrides. When provided, these settings
     * override the global array/object settings for specific parameter names.
     */
    parameters?: Record<string, QuerySerializerOptionsObject>;
};

type HttpMethod = "connect" | "delete" | "get" | "head" | "options" | "patch" | "post" | "put" | "trace";
type Client$1<RequestFn = never, Config = unknown, MethodFn = never, BuildUrlFn = never, SseFn = never> = {
    /**
     * Returns the final request URL.
     */
    buildUrl: BuildUrlFn;
    getConfig: () => Config;
    request: RequestFn;
    setConfig: (config: Config) => Config;
} & {
    [K in HttpMethod]: MethodFn;
} & ([SseFn] extends [never] ? {
    sse?: never;
} : {
    sse: {
        [K in HttpMethod]: SseFn;
    };
});
interface Config$1 {
    /**
     * Auth token or a function returning auth token. The resolved value will be
     * added to the request payload as defined by its `security` array.
     */
    auth?: ((auth: Auth) => Promise<AuthToken> | AuthToken) | AuthToken;
    /**
     * A function for serializing request body parameter. By default,
     * {@link JSON.stringify()} will be used.
     */
    bodySerializer?: BodySerializer | null;
    /**
     * An object containing any HTTP headers that you want to pre-populate your
     * `Headers` object with.
     *
     * {@link https://developer.mozilla.org/docs/Web/API/Headers/Headers#init See more}
     */
    headers?: RequestInit["headers"] | Record<string, string | number | boolean | (string | number | boolean)[] | null | undefined | unknown>;
    /**
     * The request method.
     *
     * {@link https://developer.mozilla.org/docs/Web/API/fetch#method See more}
     */
    method?: Uppercase<HttpMethod>;
    /**
     * A function for serializing request query parameters. By default, arrays
     * will be exploded in form style, objects will be exploded in deepObject
     * style, and reserved characters are percent-encoded.
     *
     * This method will have no effect if the native `paramsSerializer()` Axios
     * API function is used.
     *
     * {@link https://swagger.io/docs/specification/serialization/#query View examples}
     */
    querySerializer?: QuerySerializer | QuerySerializerOptions;
    /**
     * A function validating request data. This is useful if you want to ensure
     * the request conforms to the desired shape, so it can be safely sent to
     * the server.
     */
    requestValidator?: (data: unknown) => Promise<unknown>;
    /**
     * A function transforming response data before it's returned. This is useful
     * for post-processing data, e.g., converting ISO strings into Date objects.
     */
    responseTransformer?: (data: unknown) => Promise<unknown>;
    /**
     * A function validating response data. This is useful if you want to ensure
     * the response conforms to the desired shape, so it can be safely passed to
     * the transformers and returned to the user.
     */
    responseValidator?: (data: unknown) => Promise<unknown>;
}

type ServerSentEventsOptions<TData = unknown> = Omit<RequestInit, "method"> & Pick<Config$1, "method" | "responseTransformer" | "responseValidator"> & {
    /**
     * Fetch API implementation. You can use this option to provide a custom
     * fetch instance.
     *
     * @default globalThis.fetch
     */
    fetch?: typeof fetch;
    /**
     * Implementing clients can call request interceptors inside this hook.
     */
    onRequest?: (url: string, init: RequestInit) => Promise<Request>;
    /**
     * Callback invoked when a network or parsing error occurs during streaming.
     *
     * This option applies only if the endpoint returns a stream of events.
     *
     * @param error The error that occurred.
     */
    onSseError?: (error: unknown) => void;
    /**
     * Callback invoked when an event is streamed from the server.
     *
     * This option applies only if the endpoint returns a stream of events.
     *
     * @param event Event streamed from the server.
     * @returns Nothing (void).
     */
    onSseEvent?: (event: StreamEvent<TData>) => void;
    serializedBody?: RequestInit["body"];
    /**
     * Default retry delay in milliseconds.
     *
     * This option applies only if the endpoint returns a stream of events.
     *
     * @default 3000
     */
    sseDefaultRetryDelay?: number;
    /**
     * Maximum number of retry attempts before giving up.
     */
    sseMaxRetryAttempts?: number;
    /**
     * Maximum retry delay in milliseconds.
     *
     * Applies only when exponential backoff is used.
     *
     * This option applies only if the endpoint returns a stream of events.
     *
     * @default 30000
     */
    sseMaxRetryDelay?: number;
    /**
     * Optional sleep function for retry backoff.
     *
     * Defaults to using `setTimeout`.
     */
    sseSleepFn?: (ms: number) => Promise<void>;
    url: string;
};
interface StreamEvent<TData = unknown> {
    data: TData;
    event?: string;
    id?: string;
    retry?: number;
}
type ServerSentEventsResult<TData = unknown, TReturn = void, TNext = unknown> = {
    stream: AsyncGenerator<TData extends Record<string, unknown> ? TData[keyof TData] : TData, TReturn, TNext>;
};

type ErrInterceptor<Err, Res, Req, Options> = (error: Err, 
/** response may be undefined due to a network error where no response object is produced */
response: Res | undefined, 
/** request may be undefined, because error may be from building the request object itself */
request: Req | undefined, options: Options) => Err | Promise<Err>;
type ReqInterceptor<Req, Options> = (request: Req, options: Options) => Req | Promise<Req>;
type ResInterceptor<Res, Req, Options> = (response: Res, request: Req, options: Options) => Res | Promise<Res>;
declare class Interceptors<Interceptor> {
    fns: Array<Interceptor | null>;
    clear(): void;
    eject(id: number | Interceptor): void;
    exists(id: number | Interceptor): boolean;
    getInterceptorIndex(id: number | Interceptor): number;
    update(id: number | Interceptor, fn: Interceptor): number | Interceptor | false;
    use(fn: Interceptor): number;
}
interface Middleware<Req, Res, Err, Options> {
    error: Interceptors<ErrInterceptor<Err, Res, Req, Options>>;
    request: Interceptors<ReqInterceptor<Req, Options>>;
    response: Interceptors<ResInterceptor<Res, Req, Options>>;
}
declare const createConfig: <T extends ClientOptions = ClientOptions>(override?: Config<Omit<ClientOptions, keyof T> & T>) => Config<Omit<ClientOptions, keyof T> & T>;

type ResponseStyle = "data" | "fields";
interface Config<T extends ClientOptions = ClientOptions> extends Omit<RequestInit, "body" | "headers" | "method">, Config$1 {
    /**
     * Base URL for all requests made by this client.
     */
    baseUrl?: T["baseUrl"];
    /**
     * Fetch API implementation. You can use this option to provide a custom
     * fetch instance.
     *
     * @default globalThis.fetch
     */
    fetch?: typeof fetch;
    /**
     * Please don't use the Fetch client for Next.js applications. The `next`
     * options won't have any effect.
     *
     * Install {@link https://www.npmjs.com/package/@hey-api/client-next `@hey-api/client-next`} instead.
     */
    next?: never;
    /**
     * Return the response data parsed in a specified format. By default, `auto`
     * will infer the appropriate method from the `Content-Type` response header.
     * You can override this behavior with any of the {@link Body} methods.
     * Select `stream` if you don't want to parse response data at all.
     *
     * @default 'auto'
     */
    parseAs?: "arrayBuffer" | "auto" | "blob" | "formData" | "json" | "stream" | "text";
    /**
     * Should we return only data or multiple fields (data, error, response, etc.)?
     *
     * @default 'fields'
     */
    responseStyle?: ResponseStyle;
    /**
     * Throw an error instead of returning it in the response?
     *
     * @default false
     */
    throwOnError?: T["throwOnError"];
}
interface RequestOptions<TData = unknown, TResponseStyle extends ResponseStyle = "fields", ThrowOnError extends boolean = boolean, Url extends string = string> extends Config<{
    responseStyle: TResponseStyle;
    throwOnError: ThrowOnError;
}>, Pick<ServerSentEventsOptions<TData>, "onRequest" | "onSseError" | "onSseEvent" | "sseDefaultRetryDelay" | "sseMaxRetryAttempts" | "sseMaxRetryDelay"> {
    /**
     * Any body that you want to add to your request.
     *
     * {@link https://developer.mozilla.org/docs/Web/API/fetch#body}
     */
    body?: unknown;
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    /**
     * Security mechanism(s) to use for the request.
     */
    security?: ReadonlyArray<Auth>;
    url: Url;
}
interface ResolvedRequestOptions<TResponseStyle extends ResponseStyle = "fields", ThrowOnError extends boolean = boolean, Url extends string = string> extends RequestOptions<unknown, TResponseStyle, ThrowOnError, Url> {
    headers: Headers;
    serializedBody?: string;
}
type RequestResult<TData = unknown, TError = unknown, ThrowOnError extends boolean = boolean, TResponseStyle extends ResponseStyle = "fields"> = ThrowOnError extends true ? Promise<TResponseStyle extends "data" ? TData extends Record<string, unknown> ? TData[keyof TData] : TData : {
    data: TData extends Record<string, unknown> ? TData[keyof TData] : TData;
    request: Request;
    response: Response;
}> : Promise<TResponseStyle extends "data" ? (TData extends Record<string, unknown> ? TData[keyof TData] : TData) | undefined : ({
    data: TData extends Record<string, unknown> ? TData[keyof TData] : TData;
    error: undefined;
} | {
    data: undefined;
    error: TError extends Record<string, unknown> ? TError[keyof TError] : TError;
}) & {
    /** request may be undefined, because error may be from building the request object itself */
    request?: Request;
    /** response may be undefined, because error may be from building the request object itself or from a network error */
    response?: Response;
}>;
interface ClientOptions {
    baseUrl?: string;
    responseStyle?: ResponseStyle;
    throwOnError?: boolean;
}
type MethodFn = <TData = unknown, TError = unknown, ThrowOnError extends boolean = false, TResponseStyle extends ResponseStyle = "fields">(options: Omit<RequestOptions<TData, TResponseStyle, ThrowOnError>, "method">) => RequestResult<TData, TError, ThrowOnError, TResponseStyle>;
type SseFn = <TData = unknown, _TError = unknown, ThrowOnError extends boolean = false, TResponseStyle extends ResponseStyle = "fields">(options: Omit<RequestOptions<never, TResponseStyle, ThrowOnError>, "method">) => Promise<ServerSentEventsResult<TData>>;
type RequestFn = <TData = unknown, TError = unknown, ThrowOnError extends boolean = false, TResponseStyle extends ResponseStyle = "fields">(options: Omit<RequestOptions<TData, TResponseStyle, ThrowOnError>, "method"> & Pick<Required<RequestOptions<TData, TResponseStyle, ThrowOnError>>, "method">) => RequestResult<TData, TError, ThrowOnError, TResponseStyle>;
type BuildUrlFn = <TData extends {
    body?: unknown;
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    url: string;
}>(options: TData & Options$1<TData>) => string;
type Client = Client$1<RequestFn, Config, MethodFn, BuildUrlFn, SseFn> & {
    interceptors: Middleware<Request, Response, unknown, ResolvedRequestOptions>;
};
interface TDataShape {
    body?: unknown;
    headers?: unknown;
    path?: unknown;
    query?: unknown;
    url: string;
}
type OmitKeys<T, K> = Pick<T, Exclude<keyof T, K>>;
type Options$1<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean, TResponse = unknown, TResponseStyle extends ResponseStyle = "fields"> = OmitKeys<RequestOptions<TResponse, TResponseStyle, ThrowOnError>, "body" | "path" | "query" | "url"> & ([TData] extends [never] ? unknown : Omit<TData, "url">);

declare const createClient: (config?: Config) => Client;

type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean, TResponse = unknown> = Options$1<TData, ThrowOnError, TResponse> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};
/**
 * Health check endpoint
 *
 * Readiness check: verifies the API can reach the database. Alias of /health/ready. Use /health/live for liveness probes — this one fails whenever the database is unreachable, which must gate traffic, not restart the process.
 */
declare const healthEndpointHealthGet: <ThrowOnError extends boolean = false>(options?: Options<HealthEndpointHealthGetData, ThrowOnError>) => RequestResult<HealthEndpointHealthGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Readiness probe
 *
 * Returns 200 when the API can serve traffic (database reachable), 503 otherwise. Identical to /health, which stays supported as its alias.
 */
declare const getReadiness: <ThrowOnError extends boolean = false>(options?: Options<GetReadinessData, ThrowOnError>) => RequestResult<GetReadinessResponses, unknown, ThrowOnError, "fields">;
/**
 * Liveness probe
 *
 * Returns 200 whenever the process can serve a request. Performs no database access, so a slow or unreachable database never restarts the pod. Point livenessProbe here and readinessProbe at /health.
 */
declare const getLiveness: <ThrowOnError extends boolean = false>(options?: Options<GetLivenessData, ThrowOnError>) => RequestResult<GetLivenessResponses, unknown, ThrowOnError, "fields">;
/**
 * Get API version and feature flags
 *
 * Returns API version information and enabled feature flags. Use this to check which capabilities are available in this deployment.
 */
declare const getVersion: <ThrowOnError extends boolean = false>(options?: Options<GetVersionData, ThrowOnError>) => RequestResult<GetVersionResponses, unknown, ThrowOnError, "fields">;
/**
 * Prometheus metrics endpoint
 *
 * Exports metrics in Prometheus format for scraping
 */
declare const metricsEndpointMetricsGet: <ThrowOnError extends boolean = false>(options?: Options<MetricsEndpointMetricsGetData, ThrowOnError>) => RequestResult<MetricsEndpointMetricsGetResponses, unknown, ThrowOnError, "fields">;
/**
 * Get memory graph data
 *
 * Retrieve graph data for visualization, optionally filtered by type (world/experience/observation).
 */
declare const getGraph: <ThrowOnError extends boolean = false>(options: Options<GetGraphData, ThrowOnError>) => RequestResult<GetGraphResponses, GetGraphErrors, ThrowOnError, "fields">;
/**
 * List memory units
 *
 * List memory units with pagination and optional full-text search. Supports filtering by type, source document, linked entity ID, and a time window. Results are sorted by most recent first (mentioned_at DESC, then created_at DESC) unless a time window selects another axis.
 */
declare const listMemories: <ThrowOnError extends boolean = false>(options: Options<ListMemoriesData, ThrowOnError>) => RequestResult<ListMemoriesResponses, ListMemoriesErrors, ThrowOnError, "fields">;
/**
 * Dry-run fact extraction (preview, no persistence)
 *
 * Preview what the retain step would extract from text WITHOUT changing the bank — no entity resolution, links, embeddings, or persistence. Returns the candidate facts and the LLM token usage. Every prompt-affecting setting (retain mission, extraction mode, chunk size, …) is overridable in the body to A/B a candidate config against the bank's current one. This is a read-only tool: nothing is stored.
 */
declare const dryRunExtractMemories: <ThrowOnError extends boolean = false>(options: Options<DryRunExtractMemoriesData, ThrowOnError>) => RequestResult<DryRunExtractMemoriesResponses, DryRunExtractMemoriesErrors, ThrowOnError, "fields">;
/**
 * Preview an operation's prompts (no LLM call)
 *
 * Render the exact system and user messages retain, consolidation or reflect would send for this bank, without calling an LLM, reading memories, or changing anything. Everything that shapes the prompt comes from the bank; the runtime data an operation would be given is a fixed placeholder. Both messages are returned: retain and consolidation keep their system prompt bank-agnostic (one provider-side cache serves every bank) and carry the mission in the user message instead.
 */
declare const previewPrompt: <ThrowOnError extends boolean = false>(options: Options<PreviewPromptData, ThrowOnError>) => RequestResult<PreviewPromptResponses, PreviewPromptErrors, ThrowOnError, "fields">;
/**
 * Get memory unit
 *
 * Get a single memory unit by ID with all its metadata including entities and tags. Note: the 'history' field is deprecated and always returns an empty list - use GET /memories/{memory_id}/history instead.
 */
declare const getMemory: <ThrowOnError extends boolean = false>(options: Options<GetMemoryData, ThrowOnError>) => RequestResult<GetMemoryResponses, GetMemoryErrors, ThrowOnError, "fields">;
/**
 * Curate memory unit
 *
 * Edit a memory's text and/or change its curation state (invalidate / revert). Invalidated memories are excluded from recall, consolidation, and graph maintenance but kept for audit (reversible). Only world/experience facts can be curated; observations are derived.
 */
declare const updateMemory: <ThrowOnError extends boolean = false>(options: Options<UpdateMemoryData, ThrowOnError>) => RequestResult<UpdateMemoryResponses, UpdateMemoryErrors, ThrowOnError, "fields">;
/**
 * Get observation history
 *
 * Get the full history of an observation, with each change's source facts resolved to their text.
 */
declare const getObservationHistory: <ThrowOnError extends boolean = false>(options: Options<GetObservationHistoryData, ThrowOnError>) => RequestResult<GetObservationHistoryResponses, GetObservationHistoryErrors, ThrowOnError, "fields">;
/**
 * Recall memory
 *
 * Recall memory using semantic similarity and spreading activation.
 *
 * The `types` parameter is optional and may contain any of:
 * - `world`: General knowledge about people, places, events, and things that happen
 * - `experience`: Memories about experience, conversations, actions taken, and tasks performed
 * - `observation`: Consolidated knowledge synthesized from facts
 *
 * If `types` is omitted, all fact types are recalled.
 */
declare const recallMemories: <ThrowOnError extends boolean = false>(options: Options<RecallMemoriesData, ThrowOnError>) => RequestResult<RecallMemoriesResponses, RecallMemoriesErrors, ThrowOnError, "fields">;
/**
 * Reflect and generate answer
 *
 * Reflect and formulate an answer using bank identity, world facts, observations, and mental models.
 *
 * This endpoint:
 * 1. Retrieves experience (conversations and events)
 * 2. Retrieves world facts relevant to the query
 * 3. Retrieves observations and mental models (bank's synthesized perspectives)
 * 4. Uses LLM to formulate a contextual answer
 * 5. Returns plain text answer and the facts used
 */
declare const reflect: <ThrowOnError extends boolean = false>(options: Options<ReflectData, ThrowOnError>) => RequestResult<ReflectResponses, ReflectErrors, ThrowOnError, "fields">;
/**
 * List memory banks
 *
 * List banks with their profiles and summary stats, most recently written first (`last_write_at` descending), with pagination and optional search.
 */
declare const listBanks: <ThrowOnError extends boolean = false>(options?: Options<ListBanksData, ThrowOnError>) => RequestResult<ListBanksResponses, ListBanksErrors, ThrowOnError, "fields">;
/**
 * Get statistics for memory bank
 *
 * Get statistics about nodes and links for a specific agent
 */
declare const getAgentStats: <ThrowOnError extends boolean = false>(options: Options<GetAgentStatsData, ThrowOnError>) => RequestResult<GetAgentStatsResponses, GetAgentStatsErrors, ThrowOnError, "fields">;
/**
 * Test the bank's LLM connectivity
 *
 * Probe the LLMs this bank would use for retain / consolidation / reflect with one minimal call each (configs shared across operations are probed once), so you can discover 'not configured / unreachable' instead of a silent stall. Deliberate action (makes a real provider call); not for polling. Returns status only — never the provider, model, endpoint, API key, or raw error. Disable with HINDSIGHT_API_ENABLE_BANK_LLM_HEALTH=false.
 */
declare const testBankLlm: <ThrowOnError extends boolean = false>(options: Options<TestBankLlmData, ThrowOnError>) => RequestResult<TestBankLlmResponses, TestBankLlmErrors, ThrowOnError, "fields">;
/**
 * Memory ingestion time-series
 *
 * Memories ingested over a period, bucketed by time and broken down by fact type.
 */
declare const getMemoriesTimeseries: <ThrowOnError extends boolean = false>(options: Options<GetMemoriesTimeseriesData, ThrowOnError>) => RequestResult<GetMemoriesTimeseriesResponses, GetMemoriesTimeseriesErrors, ThrowOnError, "fields">;
/**
 * List entities
 *
 * List all entities (people, organizations, etc.) known by the bank, ordered by mention count. Supports pagination.
 */
declare const listEntities: <ThrowOnError extends boolean = false>(options: Options<ListEntitiesData, ThrowOnError>) => RequestResult<ListEntitiesResponses, ListEntitiesErrors, ThrowOnError, "fields">;
/**
 * Get entity co-occurrence graph
 *
 * Return a graph of entities (nodes) and their co-occurrences (edges) for visualization.
 */
declare const getEntityGraph: <ThrowOnError extends boolean = false>(options: Options<GetEntityGraphData, ThrowOnError>) => RequestResult<GetEntityGraphResponses, GetEntityGraphErrors, ThrowOnError, "fields">;
/**
 * Get entity details
 *
 * Get detailed information about an entity including observations (mental model).
 */
declare const getEntity: <ThrowOnError extends boolean = false>(options: Options<GetEntityData, ThrowOnError>) => RequestResult<GetEntityResponses, GetEntityErrors, ThrowOnError, "fields">;
/**
 * Regenerate entity observations (deprecated)
 *
 * This endpoint is deprecated. Entity observations have been replaced by mental models.
 *
 * @deprecated
 */
declare const regenerateEntityObservations: <ThrowOnError extends boolean = false>(options: Options<RegenerateEntityObservationsData, ThrowOnError>) => RequestResult<RegenerateEntityObservationsResponses, RegenerateEntityObservationsErrors, ThrowOnError, "fields">;
/**
 * List mental models
 *
 * List user-curated living documents that stay current.
 */
declare const listMentalModels: <ThrowOnError extends boolean = false>(options: Options<ListMentalModelsData, ThrowOnError>) => RequestResult<ListMentalModelsResponses, ListMentalModelsErrors, ThrowOnError, "fields">;
/**
 * Create mental model
 *
 * Create a mental model by running reflect with the source query in the background. Returns an operation ID to track progress. The content is auto-generated by the reflect endpoint. Use the operations endpoint to check completion status.
 */
declare const createMentalModel: <ThrowOnError extends boolean = false>(options: Options<CreateMentalModelData, ThrowOnError>) => RequestResult<CreateMentalModelResponses, CreateMentalModelErrors, ThrowOnError, "fields">;
/**
 * Delete mental model
 *
 * Delete a mental model.
 */
declare const deleteMentalModel: <ThrowOnError extends boolean = false>(options: Options<DeleteMentalModelData, ThrowOnError>) => RequestResult<DeleteMentalModelResponses, DeleteMentalModelErrors, ThrowOnError, "fields">;
/**
 * Get mental model
 *
 * Get a specific mental model by ID.
 */
declare const getMentalModel: <ThrowOnError extends boolean = false>(options: Options<GetMentalModelData, ThrowOnError>) => RequestResult<GetMentalModelResponses, GetMentalModelErrors, ThrowOnError, "fields">;
/**
 * Update mental model
 *
 * Update a mental model's name and/or source query.
 */
declare const updateMentalModel: <ThrowOnError extends boolean = false>(options: Options<UpdateMentalModelData, ThrowOnError>) => RequestResult<UpdateMentalModelResponses, UpdateMentalModelErrors, ThrowOnError, "fields">;
/**
 * Get mental model history
 *
 * Get the refresh history of a mental model, showing content changes over time.
 */
declare const getMentalModelHistory: <ThrowOnError extends boolean = false>(options: Options<GetMentalModelHistoryData, ThrowOnError>) => RequestResult<GetMentalModelHistoryResponses, GetMentalModelHistoryErrors, ThrowOnError, "fields">;
/**
 * Refresh mental model
 *
 * Submit an async task to re-run the source query through reflect and update the content.
 */
declare const refreshMentalModel: <ThrowOnError extends boolean = false>(options: Options<RefreshMentalModelData, ThrowOnError>) => RequestResult<RefreshMentalModelResponses, RefreshMentalModelErrors, ThrowOnError, "fields">;
/**
 * Dry-run mental model refresh (preview, no persistence)
 *
 * Preview what a refresh would do to this mental model WITHOUT changing it — no content, structured document, watermark, or last_refreshed_at is written. Returns the mode the refresh ran in and why (delta silently falls back to full when there is no baseline or the source query changed), the resolved tag scope and time window it read, how many facts retrieval returned versus how many the reflect agent actually used, the delta operations it emitted, and a unified diff from the stored content to the content it would write.
 *
 * This is the production refresh pipeline with two writes skipped — the content and the watermark — and nothing about it is configurable, so what it reports is what the next refresh will do. Because nothing is persisted, a delta dry run reads exactly the window the next real refresh would, and repeating it reads that same window again.
 *
 * It costs the same LLM tokens as a refresh and is validated the same way.
 */
declare const dryRunRefreshMentalModel: <ThrowOnError extends boolean = false>(options: Options<DryRunRefreshMentalModelData, ThrowOnError>) => RequestResult<DryRunRefreshMentalModelResponses, DryRunRefreshMentalModelErrors, ThrowOnError, "fields">;
/**
 * Clear mental model content
 *
 * Clear a mental model's content so the next refresh performs a full re-synthesis. This is useful for delta-mode models that have accumulated drift over many incremental refreshes. After clearing, call the /refresh endpoint to trigger a clean full rebuild.
 */
declare const clearMentalModel: <ThrowOnError extends boolean = false>(options: Options<ClearMentalModelData, ThrowOnError>) => RequestResult<ClearMentalModelResponses, ClearMentalModelErrors, ThrowOnError, "fields">;
/**
 * Get the knowledge-base tree
 *
 * Return the knowledge base as a nested tree of folders and pages.
 */
declare const getKnowledgeBaseTree: <ThrowOnError extends boolean = false>(options: Options<GetKnowledgeBaseTreeData, ThrowOnError>) => RequestResult<GetKnowledgeBaseTreeResponses, GetKnowledgeBaseTreeErrors, ThrowOnError, "fields">;
/**
 * Create a knowledge-base folder
 *
 * Create a folder, optionally nested under a parent folder.
 */
declare const createKnowledgeFolder: <ThrowOnError extends boolean = false>(options: Options<CreateKnowledgeFolderData, ThrowOnError>) => RequestResult<CreateKnowledgeFolderResponses, CreateKnowledgeFolderErrors, ThrowOnError, "fields">;
/**
 * Create a knowledge-base page
 *
 * Create a page (a mental model + tree node). Content is generated asynchronously; use the returned operation_id to track completion.
 */
declare const createKnowledgePage: <ThrowOnError extends boolean = false>(options: Options<CreateKnowledgePageData, ThrowOnError>) => RequestResult<CreateKnowledgePageResponses, CreateKnowledgePageErrors, ThrowOnError, "fields">;
/**
 * Export the knowledge base as a markdown bundle
 *
 * Return a portable markdown bundle: a nested index.md, one <id>.md per page, and history logs.
 */
declare const exportKnowledgeBase: <ThrowOnError extends boolean = false>(options: Options<ExportKnowledgeBaseData, ThrowOnError>) => RequestResult<ExportKnowledgeBaseResponses, ExportKnowledgeBaseErrors, ThrowOnError, "fields">;
/**
 * Hybrid search over knowledge pages (BM25 + vector)
 *
 * Doc-level hybrid search across a bank's knowledge pages: a full-text (BM25) match and a vector-similarity match, Reciprocal-Rank-Fusion fused. No reranker — tuned for latency.
 */
declare const searchKnowledgeBase: <ThrowOnError extends boolean = false>(options: Options<SearchKnowledgeBaseData, ThrowOnError>) => RequestResult<SearchKnowledgeBaseResponses, SearchKnowledgeBaseErrors, ThrowOnError, "fields">;
/**
 * Get a knowledge-base page
 *
 * Return a single page as a markdown document (frontmatter + markdown body).
 */
declare const getKnowledgePage: <ThrowOnError extends boolean = false>(options: Options<GetKnowledgePageData, ThrowOnError>) => RequestResult<GetKnowledgePageResponses, GetKnowledgePageErrors, ThrowOnError, "fields">;
/**
 * Delete a knowledge-base node
 *
 * Delete a folder or page and its whole subtree (pages' mental models are removed too).
 */
declare const deleteKnowledgeNode: <ThrowOnError extends boolean = false>(options: Options<DeleteKnowledgeNodeData, ThrowOnError>) => RequestResult<DeleteKnowledgeNodeResponses, DeleteKnowledgeNodeErrors, ThrowOnError, "fields">;
/**
 * Rename/move a knowledge-base node or update a page's options
 *
 * Rename a node (set `name`), move it under another folder (set `parent_id`, null for the root), and/or update a page's options (`source_query`, `tags`, `max_tokens`, `trigger`). Changing `source_query` schedules an async refresh so the page rebuilds against the new question. `trigger` is applied as a patch: the fields you send are updated and the rest keep the page's current values.
 */
declare const updateKnowledgeNode: <ThrowOnError extends boolean = false>(options: Options<UpdateKnowledgeNodeData, ThrowOnError>) => RequestResult<UpdateKnowledgeNodeResponses, UpdateKnowledgeNodeErrors, ThrowOnError, "fields">;
/**
 * List directives
 *
 * List directive definitions. Unlike reflect, an omitted tag filter returns all directives.
 */
declare const listDirectives: <ThrowOnError extends boolean = false>(options: Options<ListDirectivesData, ThrowOnError>) => RequestResult<ListDirectivesResponses, ListDirectivesErrors, ThrowOnError, "fields">;
/**
 * Create directive
 *
 * Create a global or tag-scoped hard rule for reflect prompts.
 */
declare const createDirective: <ThrowOnError extends boolean = false>(options: Options<CreateDirectiveData, ThrowOnError>) => RequestResult<CreateDirectiveResponses, CreateDirectiveErrors, ThrowOnError, "fields">;
/**
 * Delete directive
 *
 * Delete a directive.
 */
declare const deleteDirective: <ThrowOnError extends boolean = false>(options: Options<DeleteDirectiveData, ThrowOnError>) => RequestResult<DeleteDirectiveResponses, DeleteDirectiveErrors, ThrowOnError, "fields">;
/**
 * Get directive
 *
 * Get a specific directive by ID.
 */
declare const getDirective: <ThrowOnError extends boolean = false>(options: Options<GetDirectiveData, ThrowOnError>) => RequestResult<GetDirectiveResponses, GetDirectiveErrors, ThrowOnError, "fields">;
/**
 * Update directive
 *
 * Update a directive's properties.
 */
declare const updateDirective: <ThrowOnError extends boolean = false>(options: Options<UpdateDirectiveData, ThrowOnError>) => RequestResult<UpdateDirectiveResponses, UpdateDirectiveErrors, ThrowOnError, "fields">;
/**
 * List documents
 *
 * List documents with pagination, optional search, and an optional time window. Most recently written first (`updated_at` descending) unless `time_field` selects another axis. Documents are the source content from which memory units are extracted.
 */
declare const listDocuments: <ThrowOnError extends boolean = false>(options: Options<ListDocumentsData, ThrowOnError>) => RequestResult<ListDocumentsResponses, ListDocumentsErrors, ThrowOnError, "fields">;
/**
 * List document chunks
 *
 * List all chunks for a given document, ordered by chunk index.
 */
declare const listDocumentChunks: <ThrowOnError extends boolean = false>(options: Options<ListDocumentChunksData, ThrowOnError>) => RequestResult<ListDocumentChunksResponses, ListDocumentChunksErrors, ThrowOnError, "fields">;
/**
 * Reprocess document
 *
 * Re-run the retain pipeline on an existing document without changing its content. This deletes the existing memory units and re-extracts facts using the current engine configuration. Useful when the LLM model, chunking strategy, or extraction settings have changed.
 */
declare const reprocessDocument: <ThrowOnError extends boolean = false>(options: Options<ReprocessDocumentData, ThrowOnError>) => RequestResult<ReprocessDocumentResponses, ReprocessDocumentErrors, ThrowOnError, "fields">;
/**
 * Delete a document
 *
 * Delete a document and all its associated memory units and links.
 *
 * This will cascade delete:
 * - The document itself
 * - All memory units extracted from this document
 * - All links (temporal, semantic, entity) associated with those memory units
 *
 * This operation cannot be undone.
 */
declare const deleteDocument: <ThrowOnError extends boolean = false>(options: Options<DeleteDocumentData, ThrowOnError>) => RequestResult<DeleteDocumentResponses, DeleteDocumentErrors, ThrowOnError, "fields">;
/**
 * Get document details
 *
 * Get a specific document including its original text
 */
declare const getDocument: <ThrowOnError extends boolean = false>(options: Options<GetDocumentData, ThrowOnError>) => RequestResult<GetDocumentResponses, GetDocumentErrors, ThrowOnError, "fields">;
/**
 * Update document
 *
 * Update mutable fields on a document without re-processing its content.
 *
 * **Tags** (`tags`): The array REPLACES the document's tags, it is not merged into them — send the complete set you want the document to end up with, and any tag you leave out is dropped. An empty array (`[]`) therefore clears every tag; only omitting the field entirely is rejected (422).
 *
 * The new tags are propagated to all associated memory units. Observations derived from those units are invalidated and queued for re-consolidation under the new tags. Co-source memories from other documents that shared those observations are also reset. Tags are compared as a set, so re-sending the tags a document already has (in any order) changes nothing and queues no re-consolidation.
 *
 * At least one field must be provided.
 */
declare const updateDocument: <ThrowOnError extends boolean = false>(options: Options<UpdateDocumentData, ThrowOnError>) => RequestResult<UpdateDocumentResponses, UpdateDocumentErrors, ThrowOnError, "fields">;
/**
 * List tags
 *
 * List all unique tags in a memory bank with usage counts. Supports wildcard search using '*' (e.g., 'user:*', '*-fred', 'tag*-2'). Case-insensitive. Use `source=mental_models` to list tags used on mental models instead of memories.
 */
declare const listTags: <ThrowOnError extends boolean = false>(options: Options<ListTagsData, ThrowOnError>) => RequestResult<ListTagsResponses, ListTagsErrors, ThrowOnError, "fields">;
/**
 * Get chunk details
 *
 * Get a specific chunk by its ID
 */
declare const getChunk: <ThrowOnError extends boolean = false>(options: Options<GetChunkData, ThrowOnError>) => RequestResult<GetChunkResponses, GetChunkErrors, ThrowOnError, "fields">;
/**
 * List async operations
 *
 * Get a list of async operations for a specific agent, with optional filtering by status and operation type. Results are sorted by most recent first.
 */
declare const listOperations: <ThrowOnError extends boolean = false>(options: Options<ListOperationsData, ThrowOnError>) => RequestResult<ListOperationsResponses, ListOperationsErrors, ThrowOnError, "fields">;
/**
 * Cancel a pending or in-flight async operation
 *
 * Cancel a queued or running async operation. A 'pending' operation is never started. A 'processing' one is cancelled cooperatively: the row is marked 'cancelled' immediately and the worker running it stops at its next checkpoint, so work already in flight may finish the batch it is on. This also clears operations stranded in 'processing' by a crashed worker. Returns 409 for operations that already reached a terminal state.
 */
declare const cancelOperation: <ThrowOnError extends boolean = false>(options: Options<CancelOperationData, ThrowOnError>) => RequestResult<CancelOperationResponses, CancelOperationErrors, ThrowOnError, "fields">;
/**
 * Get operation status
 *
 * Get the status of a specific async operation. Returns 'pending', 'processing', 'completed', 'failed', or 'cancelled'. Completed operations remain queryable with their payload for the configured retention window and are pruned afterward.
 */
declare const getOperationStatus: <ThrowOnError extends boolean = false>(options: Options<GetOperationStatusData, ThrowOnError>) => RequestResult<GetOperationStatusResponses, GetOperationStatusErrors, ThrowOnError, "fields">;
/**
 * Retry a failed async operation
 *
 * Re-queue a failed async operation so the worker picks it up again
 */
declare const retryOperation: <ThrowOnError extends boolean = false>(options: Options<RetryOperationData, ThrowOnError>) => RequestResult<RetryOperationResponses, RetryOperationErrors, ThrowOnError, "fields">;
/**
 * Delete a terminal async operation
 *
 * Permanently remove a failed, cancelled, or completed async operation record
 */
declare const deleteOperation: <ThrowOnError extends boolean = false>(options: Options<DeleteOperationData, ThrowOnError>) => RequestResult<DeleteOperationResponses, DeleteOperationErrors, ThrowOnError, "fields">;
/**
 * Get memory bank profile (removed — use GET .../config)
 *
 * **Removed.** The bank profile endpoints have been removed. Disposition traits and the reflect mission are bank configuration: read them from GET /v1/default/banks/{bank_id}/config as `disposition_skepticism`, `disposition_literalism`, `disposition_empathy` and `reflect_mission`, and write them with PATCH /v1/default/banks/{bank_id}/config. The `name` field this endpoint also returned was a display-only label; read it from GET /v1/default/banks.
 *
 * @deprecated
 */
declare const getBankProfile: <ThrowOnError extends boolean = false>(options: Options<GetBankProfileData, ThrowOnError>) => RequestResult<GetBankProfileResponses, GetBankProfileErrors, ThrowOnError, "fields">;
/**
 * Update memory bank disposition (removed — use PATCH .../config)
 *
 * **Removed.** The bank profile endpoints have been removed. Disposition traits and the reflect mission are bank configuration: read them from GET /v1/default/banks/{bank_id}/config as `disposition_skepticism`, `disposition_literalism`, `disposition_empathy` and `reflect_mission`, and write them with PATCH /v1/default/banks/{bank_id}/config. The `name` field this endpoint also returned was a display-only label; read it from GET /v1/default/banks.
 *
 * @deprecated
 */
declare const updateBankDisposition: <ThrowOnError extends boolean = false>(options: Options<UpdateBankDispositionData, ThrowOnError>) => RequestResult<UpdateBankDispositionResponses, UpdateBankDispositionErrors, ThrowOnError, "fields">;
/**
 * Add/merge memory bank background (removed — use PATCH .../config)
 *
 * **Removed.** The bank background was folded into the reflect mission. Write it with PATCH /v1/default/banks/{bank_id}/config as `reflect_mission`. That call replaces the value rather than merging into it, so read the current mission from GET .../config first if you relied on this endpoint's append behaviour.
 *
 * @deprecated
 */
declare const addBankBackground: <ThrowOnError extends boolean = false>(options: Options<AddBankBackgroundData, ThrowOnError>) => RequestResult<AddBankBackgroundResponses, AddBankBackgroundErrors, ThrowOnError, "fields">;
/**
 * Delete memory bank
 *
 * Delete an entire memory bank including all memories, entities, documents, and the bank profile itself. This is a destructive operation that cannot be undone.
 */
declare const deleteBank: <ThrowOnError extends boolean = false>(options: Options<DeleteBankData, ThrowOnError>) => RequestResult<DeleteBankResponses, DeleteBankErrors, ThrowOnError, "fields">;
/**
 * Partial update memory bank
 *
 * Partially update an agent's profile. Only provided fields will be updated.
 */
declare const updateBank: <ThrowOnError extends boolean = false>(options: Options<UpdateBankData, ThrowOnError>) => RequestResult<UpdateBankResponses, UpdateBankErrors, ThrowOnError, "fields">;
/**
 * Create or update memory bank
 *
 * Create a new agent or update existing agent with disposition and mission. Auto-fills missing fields with defaults.
 */
declare const createOrUpdateBank: <ThrowOnError extends boolean = false>(options: Options<CreateOrUpdateBankData, ThrowOnError>) => RequestResult<CreateOrUpdateBankResponses, CreateOrUpdateBankErrors, ThrowOnError, "fields">;
/**
 * Import bank template
 *
 * Import a bank template manifest to create or update a bank's configuration, mental models, and directives. If the bank does not exist it is created. Config fields are applied as per-bank overrides. Mental models are matched by id, directives by name — existing ones are updated, new ones are created. Use dry_run=true to validate the manifest without applying changes.
 */
declare const importBankTemplate: <ThrowOnError extends boolean = false>(options: Options<ImportBankTemplateData, ThrowOnError>) => RequestResult<ImportBankTemplateResponses, ImportBankTemplateErrors, ThrowOnError, "fields">;
/**
 * Export bank template
 *
 * Export a bank's current configuration, mental models, and directives as a template manifest. The exported manifest can be imported into another bank to replicate the setup.
 */
declare const exportBankTemplate: <ThrowOnError extends boolean = false>(options: Options<ExportBankTemplateData, ThrowOnError>) => RequestResult<ExportBankTemplateResponses, ExportBankTemplateErrors, ThrowOnError, "fields">;
/**
 * Export documents (removed — use POST .../document-transfer/export)
 *
 * **Removed.** The synchronous whole-bank export loaded the entire bank into memory and held a database connection for the full request, which could exhaust memory and take down the shared API on large banks. Use the asynchronous POST /v1/default/banks/{bank_id}/document-transfer/export instead: it returns an operation_id, runs the export in the background, and exposes a download URL on completion.
 *
 * @deprecated
 */
declare const exportDocumentsSyncRemoved: <ThrowOnError extends boolean = false>(options: Options<ExportDocumentsSyncRemovedData, ThrowOnError>) => RequestResult<ExportDocumentsSyncRemovedResponses, ExportDocumentsSyncRemovedErrors, ThrowOnError, "fields">;
/**
 * Import documents (async)
 *
 * Submit a transfer archive (produced by the export endpoint) for import into a bank. Runs as a background operation: facts are re-embedded with the target bank's embedding model and entities are re-resolved — no LLM extraction. Returns an operation_id; poll GET /v1/default/banks/{bank_id}/operations/{operation_id} for status and the imported/skipped counts in result_metadata. Use on_conflict to control existing document ids: skip (default), replace, or new-id.
 *
 * @deprecated
 */
declare const importDocuments: <ThrowOnError extends boolean = false>(options: Options<ImportDocumentsData, ThrowOnError>) => RequestResult<ImportDocumentsResponses, ImportDocumentsErrors, ThrowOnError, "fields">;
/**
 * Export documents (async)
 *
 * Submit an async export of a bank's documents (extracted facts, entity names, causal links, chunks) as a transfer ZIP archive. Embeddings and database ids are not included — importing re-embeds with the target bank's model and re-resolves entities. Runs as a background operation to avoid pinning the API on large banks. Returns an operation_id; poll GET /v1/default/banks/{bank_id}/operations/{operation_id}. On completion the operation's result_metadata carries download_url (fetch the ZIP from GET /v1/default/files/download/{key}), storage_key, byte_size, and filename. Pass document_id query params to export specific documents, or omit to export the whole bank; include_observations=true carries consolidated observations and include_knowledge_base=true carries Mental Models plus Knowledge Pages (all whole-bank export only).
 *
 * @deprecated
 */
declare const exportDocuments: <ThrowOnError extends boolean = false>(options: Options<ExportDocumentsData, ThrowOnError>) => RequestResult<ExportDocumentsResponses, ExportDocumentsErrors, ThrowOnError, "fields">;
/**
 * Export a bank (async)
 *
 * Submit an async export of a bank as a transfer ZIP archive. Three flags choose what the archive carries: include_data (documents, facts, observations, attachments and their bytes, the curation archive, the operations log and the maintenance queues), include_bank_config (bank config, mental models and their history, knowledge pages), include_bank_config (the bank's config overrides, directives and webhooks) and include_history (audit_log, llm_requests). Embeddings and database ids are never carried — importing re-embeds with the target bank's model and re-resolves entities, so an archive moves between instances configured with different embedding models. Returns an operation_id; poll GET /v1/default/banks/{bank_id}/operations/{operation_id}, then fetch the archive from the download_url in its result_metadata. Pass document_id to export specific documents instead of the whole bank (a document subset carries no bank-level sections).
 */
declare const exportBankTransfer: <ThrowOnError extends boolean = false>(options: Options<ExportBankTransferData, ThrowOnError>) => RequestResult<ExportBankTransferResponses, ExportBankTransferErrors, ThrowOnError, "fields">;
/**
 * Import a bank (async)
 *
 * Submit a transfer archive (produced by the export endpoint) for import. Runs as a background operation: facts are re-embedded with the target bank's embedding model and entities are re-resolved — no LLM extraction, so the import costs no tokens and invents no new facts.
 *
 * Two modes. `restore` (default) writes a whole bank into target_bank_id, which must NOT already exist — it restores a bank rather than merging into one, and is how a bank is moved between instances or copied under a new id. `merge` folds an archive's documents into this bank, with document_conflict deciding what happens to ids that already exist (skip, replace, new-id).
 *
 * The include flags narrow what is restored to a subset of what the archive holds; they cannot add what the producer did not export. Returns an operation_id; poll GET /v1/default/banks/{bank_id}/operations/{operation_id} for status and per-component counts. The operation is recorded against {bank_id} even in restore mode, because the target bank does not exist yet.
 */
declare const importBankTransfer: <ThrowOnError extends boolean = false>(options: Options<ImportBankTransferData, ThrowOnError>) => RequestResult<ImportBankTransferResponses, ImportBankTransferErrors, ThrowOnError, "fields">;
/**
 * Clone a bank (async)
 *
 * Copy this bank into a new one, in a single call. The clone starts with the source's memories as they are at clone time and evolves independently from then on: later retains, consolidation and edits on either bank leave the other alone.
 *
 * This is the export and import above run back to back on this instance, so nothing is re-extracted and no LLM is called — facts are re-embedded and entities re-resolved, exactly as a restore does. The same three flags choose what the clone inherits: include_data (documents, facts, observations, attachments, the curation archive, the operations log, and the mental models and knowledge pages synthesized from them), include_bank_config (the bank's config overrides, directives and **webhooks**) and include_history (audit_log, llm_requests).
 *
 * Note the webhooks: they travel with the bank's configuration, so a clone made with the default flags will call the source's webhook endpoints. Pass include_bank_config=false, or delete them on the clone, when they point at a per-bank consumer.
 *
 * target_bank_id must not already exist. Returns an operation_id, recorded against the source bank (the target does not exist yet); poll GET /v1/default/banks/{bank_id}/operations/{operation_id} for status and the per-component counts.
 */
declare const cloneBank: <ThrowOnError extends boolean = false>(options: Options<CloneBankData, ThrowOnError>) => RequestResult<CloneBankResponses, CloneBankErrors, ThrowOnError, "fields">;
/**
 * Fetch an attachment retained inline with a document
 *
 * Serve the bytes of an attachment retained as inline content. The id is the one inside a placeholder token, and is returned on `attachments[].url` by recall and by the document/chunk/memory reads — so an agent can show or reason over the original behind an attachment-derived fact.
 *
 * Bytes are served with the Content-Type the caller declared at retain. Access is authorized against the bank; a missing attachment and an invisible bank both return 404, so the endpoint cannot be used to probe what a bank holds.
 */
declare const getBankAttachment: <ThrowOnError extends boolean = false>(options: Options<GetBankAttachmentData, ThrowOnError>) => RequestResult<GetBankAttachmentResponses, GetBankAttachmentErrors, ThrowOnError, "fields">;
/**
 * Download a stored file (async export archive)
 *
 * Stream a file previously written to file storage — currently the transfer ZIP produced by an async document export. The key comes from the export operation's result_metadata (storage_key / download_url). Access is authorized against the bank the key belongs to.
 */
declare const downloadFile: <ThrowOnError extends boolean = false>(options: Options<DownloadFileData, ThrowOnError>) => RequestResult<DownloadFileResponses, DownloadFileErrors, ThrowOnError, "fields">;
/**
 * Get bank template JSON Schema
 *
 * Returns the JSON Schema for the bank template manifest format. Use this to validate template manifests before importing.
 */
declare const getBankTemplateSchema: <ThrowOnError extends boolean = false>(options?: Options<GetBankTemplateSchemaData, ThrowOnError>) => RequestResult<GetBankTemplateSchemaResponses, unknown, ThrowOnError, "fields">;
/**
 * Clear all observations
 *
 * Delete all observations for a memory bank. This is useful for resetting the consolidated knowledge.
 */
declare const clearObservations: <ThrowOnError extends boolean = false>(options: Options<ClearObservationsData, ThrowOnError>) => RequestResult<ClearObservationsResponses, ClearObservationsErrors, ThrowOnError, "fields">;
/**
 * List observation scopes
 *
 * Enumerate the distinct scopes across a bank's observations. Each observation lives under a scope: the exact set of tags it was consolidated with. Returns every distinct scope (tag order normalized) with the number of observations in it; the empty tag list is the global/untagged scope. Use a returned scope with the graph endpoint (tags=<scope> & tags_match=exact) to filter observations to exactly that scope. Paged: `total` reports every distinct scope in the bank.
 */
declare const listObservationScopes: <ThrowOnError extends boolean = false>(options: Options<ListObservationScopesData, ThrowOnError>) => RequestResult<ListObservationScopesResponses, ListObservationScopesErrors, ThrowOnError, "fields">;
/**
 * Recover failed consolidation
 *
 * Reset all memories that were permanently marked as failed during consolidation (after exhausting all LLM retries and adaptive batch splitting) so they are picked up again on the next consolidation run. Does not delete any observations.
 */
declare const recoverConsolidation: <ThrowOnError extends boolean = false>(options: Options<RecoverConsolidationData, ThrowOnError>) => RequestResult<RecoverConsolidationResponses, RecoverConsolidationErrors, ThrowOnError, "fields">;
/**
 * Clear observations for a memory
 *
 * Delete all observations derived from a specific memory and reset it for re-consolidation. The memory itself is not deleted. A consolidation job is triggered automatically so the memory will produce fresh observations on the next consolidation run.
 */
declare const clearMemoryObservations: <ThrowOnError extends boolean = false>(options: Options<ClearMemoryObservationsData, ThrowOnError>) => RequestResult<ClearMemoryObservationsResponses, ClearMemoryObservationsErrors, ThrowOnError, "fields">;
/**
 * Reset bank configuration
 *
 * Reset bank configuration to defaults by removing all bank-specific overrides. The bank will then use global and tenant-level configuration only.
 */
declare const resetBankConfig: <ThrowOnError extends boolean = false>(options: Options<ResetBankConfigData, ThrowOnError>) => RequestResult<ResetBankConfigResponses, ResetBankConfigErrors, ThrowOnError, "fields">;
/**
 * Get bank configuration
 *
 * Get fully resolved configuration for a bank including all hierarchical overrides (global → tenant → bank). The 'config' field contains all resolved config values. The 'overrides' field shows only bank-specific overrides. Always available: HINDSIGHT_API_ENABLE_BANK_CONFIG_API gates only the write operations on this resource.
 */
declare const getBankConfig: <ThrowOnError extends boolean = false>(options: Options<GetBankConfigData, ThrowOnError>) => RequestResult<GetBankConfigResponses, GetBankConfigErrors, ThrowOnError, "fields">;
/**
 * Update bank configuration
 *
 * Update configuration overrides for a bank. Only hierarchical behavioral settings can be overridden (retention parameters, recall settings, etc.). Keys can be provided in Python field format (retain_extraction_mode) or environment variable format (HINDSIGHT_API_RETAIN_EXTRACTION_MODE).
 */
declare const updateBankConfig: <ThrowOnError extends boolean = false>(options: Options<UpdateBankConfigData, ThrowOnError>) => RequestResult<UpdateBankConfigResponses, UpdateBankConfigErrors, ThrowOnError, "fields">;
/**
 * Trigger consolidation
 *
 * Run memory consolidation to create/update observations from recent memories.
 */
declare const triggerConsolidation: <ThrowOnError extends boolean = false>(options: Options<TriggerConsolidationData, ThrowOnError>) => RequestResult<TriggerConsolidationResponses, TriggerConsolidationErrors, ThrowOnError, "fields">;
/**
 * List webhooks
 *
 * List the webhooks registered for a bank, oldest first. Paged: `total` reports every webhook on the bank.
 */
declare const listWebhooks: <ThrowOnError extends boolean = false>(options: Options<ListWebhooksData, ThrowOnError>) => RequestResult<ListWebhooksResponses, ListWebhooksErrors, ThrowOnError, "fields">;
/**
 * Register webhook
 *
 * Register a webhook endpoint to receive event notifications for this bank.
 */
declare const createWebhook: <ThrowOnError extends boolean = false>(options: Options<CreateWebhookData, ThrowOnError>) => RequestResult<CreateWebhookResponses, CreateWebhookErrors, ThrowOnError, "fields">;
/**
 * Delete webhook
 *
 * Remove a registered webhook.
 */
declare const deleteWebhook: <ThrowOnError extends boolean = false>(options: Options<DeleteWebhookData, ThrowOnError>) => RequestResult<DeleteWebhookResponses, DeleteWebhookErrors, ThrowOnError, "fields">;
/**
 * Update webhook
 *
 * Update one or more fields of a registered webhook. Only provided fields are changed.
 */
declare const updateWebhook: <ThrowOnError extends boolean = false>(options: Options<UpdateWebhookData, ThrowOnError>) => RequestResult<UpdateWebhookResponses, UpdateWebhookErrors, ThrowOnError, "fields">;
/**
 * List webhook deliveries
 *
 * Inspect delivery history for a webhook (useful for debugging).
 */
declare const listWebhookDeliveries: <ThrowOnError extends boolean = false>(options: Options<ListWebhookDeliveriesData, ThrowOnError>) => RequestResult<ListWebhookDeliveriesResponses, ListWebhookDeliveriesErrors, ThrowOnError, "fields">;
/**
 * Clear memory bank memories
 *
 * Delete memory units for a memory bank. Optionally filter by type (world, experience, observation) to delete only specific types. This is a destructive operation that cannot be undone. The bank profile (disposition and background) will be preserved.
 */
declare const clearBankMemories: <ThrowOnError extends boolean = false>(options: Options<ClearBankMemoriesData, ThrowOnError>) => RequestResult<ClearBankMemoriesResponses, ClearBankMemoriesErrors, ThrowOnError, "fields">;
/**
 * Retain memories
 *
 * Retain memory items with automatic fact extraction.
 *
 * This is the main endpoint for storing memories. It supports both synchronous and asynchronous processing via the `async` parameter.
 *
 * **Features:**
 * - Efficient batch processing
 * - Automatic fact extraction from natural language
 * - Entity recognition and linking
 * - Document tracking with automatic upsert (when document_id is provided)
 * - Temporal and semantic linking
 * - Optional asynchronous processing
 *
 * **The system automatically:**
 * 1. Extracts semantic facts from the content
 * 2. Generates embeddings
 * 3. Deduplicates similar facts
 * 4. Creates temporal, semantic, and entity links
 * 5. Tracks document metadata
 *
 * **When `async=true`:** Returns immediately after queuing. Use the operations endpoint to monitor progress.
 *
 * **When `async=false` (default):** Waits for processing to complete.
 *
 * **Note:** If a memory item has a `document_id` that already exists, the old document and its memory units will be deleted before creating new ones (upsert behavior).
 */
declare const retainMemories: <ThrowOnError extends boolean = false>(options: Options<RetainMemoriesData, ThrowOnError>) => RequestResult<RetainMemoriesResponses, RetainMemoriesErrors, ThrowOnError, "fields">;
/**
 * Convert files to memories
 *
 * Upload files (PDF, DOCX, etc.), convert them to markdown, and retain as memories.
 *
 * This endpoint handles file upload, conversion, and memory creation in a single operation.
 *
 * **Features:**
 * - Supports PDF, DOCX, PPTX, XLSX, images (parser-dependent OCR), audio (with transcription)
 * - Automatic file-to-markdown conversion using pluggable parsers
 * - Files stored in object storage (PostgreSQL by default, S3 for production)
 * - Each file becomes a separate document with optional metadata/tags
 * - Always processes asynchronously — returns operation IDs immediately
 *
 * **The system automatically:**
 * 1. Stores uploaded files in object storage
 * 2. Converts files to markdown
 * 3. Creates document records with file metadata
 * 4. Extracts facts and creates memory units (same as regular retain)
 *
 * Use the operations endpoint to monitor progress.
 *
 * **Request format:** multipart/form-data with:
 * - `files`: One or more files to upload
 * - `request`: JSON string with FileRetainRequest model
 *
 * **Parser selection:**
 * - Set `parser` in the request body to override the server default for all files.
 * - Set `parser` inside a `files_metadata` entry for per-file control.
 * - Pass a list (e.g. `['iris', 'markitdown']`) to define an ordered fallback chain — each parser is tried in sequence until one succeeds.
 * - Falls back to the server default (`HINDSIGHT_API_FILE_PARSER`) if not specified.
 * - Only parsers enabled on the server may be requested; others return HTTP 400.
 */
declare const fileRetain: <ThrowOnError extends boolean = false>(options: Options<FileRetainData, ThrowOnError>) => RequestResult<FileRetainResponses, FileRetainErrors, ThrowOnError, "fields">;
/**
 * List audit logs
 *
 * List audit log entries for a bank, ordered by most recent first.
 */
declare const listAuditLogs: <ThrowOnError extends boolean = false>(options: Options<ListAuditLogsData, ThrowOnError>) => RequestResult<ListAuditLogsResponses, ListAuditLogsErrors, ThrowOnError, "fields">;
/**
 * Audit log statistics
 *
 * Get audit log counts grouped by time bucket for charting.
 */
declare const auditLogStats: <ThrowOnError extends boolean = false>(options: Options<AuditLogStatsData, ThrowOnError>) => RequestResult<AuditLogStatsResponses, AuditLogStatsErrors, ThrowOnError, "fields">;
/**
 * List LLM request traces
 *
 * List traced LLM requests for a bank, ordered by most recent first. Requires LLM request tracing to be enabled (HINDSIGHT_API_LLM_TRACE_ENABLED).
 */
declare const listLlmRequests: <ThrowOnError extends boolean = false>(options: Options<ListLlmRequestsData, ThrowOnError>) => RequestResult<ListLlmRequestsResponses, ListLlmRequestsErrors, ThrowOnError, "fields">;
/**
 * LLM request statistics
 *
 * Get LLM request counts grouped by time bucket and status for charting.
 */
declare const llmRequestStats: <ThrowOnError extends boolean = false>(options: Options<LlmRequestStatsData, ThrowOnError>) => RequestResult<LlmRequestStatsResponses, LlmRequestStatsErrors, ThrowOnError, "fields">;

type sdk_gen_Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean, TResponse = unknown> = Options<TData, ThrowOnError, TResponse>;
declare const sdk_gen_addBankBackground: typeof addBankBackground;
declare const sdk_gen_auditLogStats: typeof auditLogStats;
declare const sdk_gen_cancelOperation: typeof cancelOperation;
declare const sdk_gen_clearBankMemories: typeof clearBankMemories;
declare const sdk_gen_clearMemoryObservations: typeof clearMemoryObservations;
declare const sdk_gen_clearMentalModel: typeof clearMentalModel;
declare const sdk_gen_clearObservations: typeof clearObservations;
declare const sdk_gen_cloneBank: typeof cloneBank;
declare const sdk_gen_createDirective: typeof createDirective;
declare const sdk_gen_createKnowledgeFolder: typeof createKnowledgeFolder;
declare const sdk_gen_createKnowledgePage: typeof createKnowledgePage;
declare const sdk_gen_createMentalModel: typeof createMentalModel;
declare const sdk_gen_createOrUpdateBank: typeof createOrUpdateBank;
declare const sdk_gen_createWebhook: typeof createWebhook;
declare const sdk_gen_deleteBank: typeof deleteBank;
declare const sdk_gen_deleteDirective: typeof deleteDirective;
declare const sdk_gen_deleteDocument: typeof deleteDocument;
declare const sdk_gen_deleteKnowledgeNode: typeof deleteKnowledgeNode;
declare const sdk_gen_deleteMentalModel: typeof deleteMentalModel;
declare const sdk_gen_deleteOperation: typeof deleteOperation;
declare const sdk_gen_deleteWebhook: typeof deleteWebhook;
declare const sdk_gen_downloadFile: typeof downloadFile;
declare const sdk_gen_dryRunExtractMemories: typeof dryRunExtractMemories;
declare const sdk_gen_dryRunRefreshMentalModel: typeof dryRunRefreshMentalModel;
declare const sdk_gen_exportBankTemplate: typeof exportBankTemplate;
declare const sdk_gen_exportBankTransfer: typeof exportBankTransfer;
declare const sdk_gen_exportDocuments: typeof exportDocuments;
declare const sdk_gen_exportDocumentsSyncRemoved: typeof exportDocumentsSyncRemoved;
declare const sdk_gen_exportKnowledgeBase: typeof exportKnowledgeBase;
declare const sdk_gen_fileRetain: typeof fileRetain;
declare const sdk_gen_getAgentStats: typeof getAgentStats;
declare const sdk_gen_getBankAttachment: typeof getBankAttachment;
declare const sdk_gen_getBankConfig: typeof getBankConfig;
declare const sdk_gen_getBankProfile: typeof getBankProfile;
declare const sdk_gen_getBankTemplateSchema: typeof getBankTemplateSchema;
declare const sdk_gen_getChunk: typeof getChunk;
declare const sdk_gen_getDirective: typeof getDirective;
declare const sdk_gen_getDocument: typeof getDocument;
declare const sdk_gen_getEntity: typeof getEntity;
declare const sdk_gen_getEntityGraph: typeof getEntityGraph;
declare const sdk_gen_getGraph: typeof getGraph;
declare const sdk_gen_getKnowledgeBaseTree: typeof getKnowledgeBaseTree;
declare const sdk_gen_getKnowledgePage: typeof getKnowledgePage;
declare const sdk_gen_getLiveness: typeof getLiveness;
declare const sdk_gen_getMemoriesTimeseries: typeof getMemoriesTimeseries;
declare const sdk_gen_getMemory: typeof getMemory;
declare const sdk_gen_getMentalModel: typeof getMentalModel;
declare const sdk_gen_getMentalModelHistory: typeof getMentalModelHistory;
declare const sdk_gen_getObservationHistory: typeof getObservationHistory;
declare const sdk_gen_getOperationStatus: typeof getOperationStatus;
declare const sdk_gen_getReadiness: typeof getReadiness;
declare const sdk_gen_getVersion: typeof getVersion;
declare const sdk_gen_healthEndpointHealthGet: typeof healthEndpointHealthGet;
declare const sdk_gen_importBankTemplate: typeof importBankTemplate;
declare const sdk_gen_importBankTransfer: typeof importBankTransfer;
declare const sdk_gen_importDocuments: typeof importDocuments;
declare const sdk_gen_listAuditLogs: typeof listAuditLogs;
declare const sdk_gen_listBanks: typeof listBanks;
declare const sdk_gen_listDirectives: typeof listDirectives;
declare const sdk_gen_listDocumentChunks: typeof listDocumentChunks;
declare const sdk_gen_listDocuments: typeof listDocuments;
declare const sdk_gen_listEntities: typeof listEntities;
declare const sdk_gen_listLlmRequests: typeof listLlmRequests;
declare const sdk_gen_listMemories: typeof listMemories;
declare const sdk_gen_listMentalModels: typeof listMentalModels;
declare const sdk_gen_listObservationScopes: typeof listObservationScopes;
declare const sdk_gen_listOperations: typeof listOperations;
declare const sdk_gen_listTags: typeof listTags;
declare const sdk_gen_listWebhookDeliveries: typeof listWebhookDeliveries;
declare const sdk_gen_listWebhooks: typeof listWebhooks;
declare const sdk_gen_llmRequestStats: typeof llmRequestStats;
declare const sdk_gen_metricsEndpointMetricsGet: typeof metricsEndpointMetricsGet;
declare const sdk_gen_previewPrompt: typeof previewPrompt;
declare const sdk_gen_recallMemories: typeof recallMemories;
declare const sdk_gen_recoverConsolidation: typeof recoverConsolidation;
declare const sdk_gen_reflect: typeof reflect;
declare const sdk_gen_refreshMentalModel: typeof refreshMentalModel;
declare const sdk_gen_regenerateEntityObservations: typeof regenerateEntityObservations;
declare const sdk_gen_reprocessDocument: typeof reprocessDocument;
declare const sdk_gen_resetBankConfig: typeof resetBankConfig;
declare const sdk_gen_retainMemories: typeof retainMemories;
declare const sdk_gen_retryOperation: typeof retryOperation;
declare const sdk_gen_searchKnowledgeBase: typeof searchKnowledgeBase;
declare const sdk_gen_testBankLlm: typeof testBankLlm;
declare const sdk_gen_triggerConsolidation: typeof triggerConsolidation;
declare const sdk_gen_updateBank: typeof updateBank;
declare const sdk_gen_updateBankConfig: typeof updateBankConfig;
declare const sdk_gen_updateBankDisposition: typeof updateBankDisposition;
declare const sdk_gen_updateDirective: typeof updateDirective;
declare const sdk_gen_updateDocument: typeof updateDocument;
declare const sdk_gen_updateKnowledgeNode: typeof updateKnowledgeNode;
declare const sdk_gen_updateMemory: typeof updateMemory;
declare const sdk_gen_updateMentalModel: typeof updateMentalModel;
declare const sdk_gen_updateWebhook: typeof updateWebhook;
declare namespace sdk_gen {
  export { type sdk_gen_Options as Options, sdk_gen_addBankBackground as addBankBackground, sdk_gen_auditLogStats as auditLogStats, sdk_gen_cancelOperation as cancelOperation, sdk_gen_clearBankMemories as clearBankMemories, sdk_gen_clearMemoryObservations as clearMemoryObservations, sdk_gen_clearMentalModel as clearMentalModel, sdk_gen_clearObservations as clearObservations, sdk_gen_cloneBank as cloneBank, sdk_gen_createDirective as createDirective, sdk_gen_createKnowledgeFolder as createKnowledgeFolder, sdk_gen_createKnowledgePage as createKnowledgePage, sdk_gen_createMentalModel as createMentalModel, sdk_gen_createOrUpdateBank as createOrUpdateBank, sdk_gen_createWebhook as createWebhook, sdk_gen_deleteBank as deleteBank, sdk_gen_deleteDirective as deleteDirective, sdk_gen_deleteDocument as deleteDocument, sdk_gen_deleteKnowledgeNode as deleteKnowledgeNode, sdk_gen_deleteMentalModel as deleteMentalModel, sdk_gen_deleteOperation as deleteOperation, sdk_gen_deleteWebhook as deleteWebhook, sdk_gen_downloadFile as downloadFile, sdk_gen_dryRunExtractMemories as dryRunExtractMemories, sdk_gen_dryRunRefreshMentalModel as dryRunRefreshMentalModel, sdk_gen_exportBankTemplate as exportBankTemplate, sdk_gen_exportBankTransfer as exportBankTransfer, sdk_gen_exportDocuments as exportDocuments, sdk_gen_exportDocumentsSyncRemoved as exportDocumentsSyncRemoved, sdk_gen_exportKnowledgeBase as exportKnowledgeBase, sdk_gen_fileRetain as fileRetain, sdk_gen_getAgentStats as getAgentStats, sdk_gen_getBankAttachment as getBankAttachment, sdk_gen_getBankConfig as getBankConfig, sdk_gen_getBankProfile as getBankProfile, sdk_gen_getBankTemplateSchema as getBankTemplateSchema, sdk_gen_getChunk as getChunk, sdk_gen_getDirective as getDirective, sdk_gen_getDocument as getDocument, sdk_gen_getEntity as getEntity, sdk_gen_getEntityGraph as getEntityGraph, sdk_gen_getGraph as getGraph, sdk_gen_getKnowledgeBaseTree as getKnowledgeBaseTree, sdk_gen_getKnowledgePage as getKnowledgePage, sdk_gen_getLiveness as getLiveness, sdk_gen_getMemoriesTimeseries as getMemoriesTimeseries, sdk_gen_getMemory as getMemory, sdk_gen_getMentalModel as getMentalModel, sdk_gen_getMentalModelHistory as getMentalModelHistory, sdk_gen_getObservationHistory as getObservationHistory, sdk_gen_getOperationStatus as getOperationStatus, sdk_gen_getReadiness as getReadiness, sdk_gen_getVersion as getVersion, sdk_gen_healthEndpointHealthGet as healthEndpointHealthGet, sdk_gen_importBankTemplate as importBankTemplate, sdk_gen_importBankTransfer as importBankTransfer, sdk_gen_importDocuments as importDocuments, sdk_gen_listAuditLogs as listAuditLogs, sdk_gen_listBanks as listBanks, sdk_gen_listDirectives as listDirectives, sdk_gen_listDocumentChunks as listDocumentChunks, sdk_gen_listDocuments as listDocuments, sdk_gen_listEntities as listEntities, sdk_gen_listLlmRequests as listLlmRequests, sdk_gen_listMemories as listMemories, sdk_gen_listMentalModels as listMentalModels, sdk_gen_listObservationScopes as listObservationScopes, sdk_gen_listOperations as listOperations, sdk_gen_listTags as listTags, sdk_gen_listWebhookDeliveries as listWebhookDeliveries, sdk_gen_listWebhooks as listWebhooks, sdk_gen_llmRequestStats as llmRequestStats, sdk_gen_metricsEndpointMetricsGet as metricsEndpointMetricsGet, sdk_gen_previewPrompt as previewPrompt, sdk_gen_recallMemories as recallMemories, sdk_gen_recoverConsolidation as recoverConsolidation, sdk_gen_reflect as reflect, sdk_gen_refreshMentalModel as refreshMentalModel, sdk_gen_regenerateEntityObservations as regenerateEntityObservations, sdk_gen_reprocessDocument as reprocessDocument, sdk_gen_resetBankConfig as resetBankConfig, sdk_gen_retainMemories as retainMemories, sdk_gen_retryOperation as retryOperation, sdk_gen_searchKnowledgeBase as searchKnowledgeBase, sdk_gen_testBankLlm as testBankLlm, sdk_gen_triggerConsolidation as triggerConsolidation, sdk_gen_updateBank as updateBank, sdk_gen_updateBankConfig as updateBankConfig, sdk_gen_updateBankDisposition as updateBankDisposition, sdk_gen_updateDirective as updateDirective, sdk_gen_updateDocument as updateDocument, sdk_gen_updateKnowledgeNode as updateKnowledgeNode, sdk_gen_updateMemory as updateMemory, sdk_gen_updateMentalModel as updateMentalModel, sdk_gen_updateWebhook as updateWebhook };
}

/**
 * Hindsight Client - Clean, TypeScript SDK for the Hindsight API.
 *
 * Example:
 * ```typescript
 * import { HindsightClient } from '@vectorize-io/hindsight-client';
 *
 * // Without authentication
 * const client = new HindsightClient({ baseUrl: 'http://localhost:8888' });
 *
 * // With API key authentication
 * const client = new HindsightClient({
 *   baseUrl: 'http://localhost:8888',
 *   apiKey: 'your-api-key'
 * });
 *
 * // Retain a memory
 * await client.retain('alice', 'Alice loves AI');
 *
 * // Recall memories
 * const results = await client.recall('alice', 'What does Alice like?');
 *
 * // Generate contextual answer
 * const answer = await client.reflect('alice', 'What are my interests?');
 * ```
 */

declare const CLIENT_VERSION: string;
declare const DEFAULT_USER_AGENT: string;
/** Attempts a retryable call makes in total, including the first. */
declare const DEFAULT_MAX_ATTEMPTS = 3;
/** Parse `Retry-After` (delta-seconds form) into milliseconds, if present. */
declare function retryAfterMs(response: Response | undefined): number | null;
/**
 * Run `send`, retrying while the server reports it is at capacity (429/503).
 *
 * Only for **idempotent** operations. Recall and reflect are reads, so a repeat is
 * free; synchronous retain is not, and is deliberately excluded — its
 * `operation_id` is ignored there, so a retry could duplicate a write.
 *
 * Two things matter more than the retry itself. `Retry-After` is honoured, because
 * the server sends it knowing how long its own queue is. And the wait is
 * **jittered**: a burst of clients that all receive `Retry-After: 1` and obey it
 * exactly return in lockstep and rebuild the spike that caused the rejection.
 */
declare function retryOnCapacity<T extends {
    response?: Response;
}>(send: () => Promise<T>, maxAttempts: number, random?: () => number, signal?: AbortSignal): Promise<T>;
interface HindsightClientOptions {
    baseUrl: string;
    /**
     * Optional API key for authentication (sent as Bearer token in Authorization header)
     */
    apiKey?: string;
    /**
     * Override the default `User-Agent` header. Integrations should set this to
     * identify themselves (e.g. `"hindsight-ai-sdk/1.2.0"`). Browsers ignore
     * attempts to set `User-Agent`; this only takes effect in Node.js / Bun /
     * Deno runtimes. Defaults to `hindsight-client-typescript/<version>`.
     */
    userAgent?: string;
    /** Optional headers sent with every request. */
    headers?: Record<string, string>;
    /**
     * Total attempts for *idempotent* calls (recall, reflect) when the server reports
     * it is at capacity (429/503). 1 disables retrying. Waits honour `Retry-After`
     * and are jittered; writes are never retried.
     */
    maxAttempts?: number;
}
/**
 * Error thrown by the Hindsight client when an API request fails.
 * Includes the HTTP status code and error details from the API.
 */
declare class HindsightError extends Error {
    statusCode?: number;
    details?: unknown;
    constructor(message: string, statusCode?: number, details?: unknown);
}
interface EntityInput {
    text: string;
    type?: string;
}
/**
 * One element of a multimodal retain item's content.
 *
 * Retain accepts either a plain string or an ordered list of these, so an
 * attachment sits inline where it actually appears and the extractor reads it
 * alongside the prose that refers to it. Requires a vision-capable retain LLM
 * server-side.
 *
 * Re-exported from the generated types rather than redeclared, so the shape
 * stays whatever the API actually accepts.
 */
type ContentBlock = TextContentBlock | ImageContentBlock | FileContentBlock;
interface MemoryItemInput {
    content: string | ContentBlock[];
    timestamp?: string | Date;
    context?: string;
    metadata?: Record<string, string>;
    document_id?: string;
    entities?: EntityInput[];
    /** Resolve the supplied `entities` against existing ones (default true); false stores them as written */
    resolve_entities?: boolean;
    tags?: string[];
    observation_scopes?: "per_tag" | "combined" | "all_combinations" | "shared" | string[][];
    strategy?: string;
    update_mode?: "replace" | "append";
}
/**
 * Refresh settings for a mental model or knowledge page, in this client's
 * camelCase style.
 *
 * One shape for every method that takes a trigger, so a setting exposed on
 * creation is also settable on update: `updateMentalModel` used to accept two
 * of these fields and `createMentalModel` four, which left the rest reachable
 * only by calling the generated SDK directly.
 */
interface MentalModelTriggerOptions {
    /** `full` regenerates the content from scratch on each refresh; `delta` edits the existing content in place. */
    mode?: "full" | "delta";
    refreshAfterConsolidation?: boolean;
    /** Cron expression (UTC, 5-field). Mutually exclusive with refreshAfterConsolidation; null removes a schedule. */
    refreshCron?: string | null;
    /** Floor, in seconds, on how often an automatic refresh of this model may run. A trigger firing sooner is queued and parked until the window closes, and further triggers fold into it, so a burst of retains costs one refresh. Explicit refreshes ignore it. 0 disables the floor for this model; omit to inherit the bank/global default. */
    minRefreshIntervalSeconds?: number;
    /** Which fact types refresh retrieves. Omit for all of them. */
    factTypes?: Array<"world" | "experience" | "observation">;
    /** Skip the search_mental_models tool during refresh, so this model does not reflect over its siblings. */
    excludeMentalModels?: boolean;
    excludeMentalModelIds?: string[];
    /** How this model's tags filter source memories on refresh. If omitted, a tagged model defaults to 'all_strict' (a memory must carry every one of the model's tags), which silently drops memories that only carry a subset. Set 'any' to match memories carrying any of the tags — the same default recall/reflect use. */
    tagsMatch?: "any" | "all" | "any_strict" | "all_strict" | "exact";
    /** Compound tag filter using boolean groups; overrides the model's flat tags/tagsMatch during refresh. */
    tagGroups?: Array<TagGroupLeaf | TagGroupAndInput | TagGroupOrInput | TagGroupNotInput>;
    includeChunks?: boolean;
    recallMaxTokens?: number;
    recallChunksMaxTokens?: number;
    /** JSON Schema for structured output, stored alongside the markdown content. */
    responseSchema?: Record<string, unknown>;
    /** Record how each refresh reached its result under reflect_response.trace. */
    keepTrace?: boolean;
}
declare class HindsightClient {
    private client;
    private maxAttempts;
    constructor(options: HindsightClientOptions);
    /**
     * Get API version and feature flags for the connected Hindsight deployment.
     */
    getVersion(options?: {
        signal?: AbortSignal;
    }): Promise<VersionResponse>;
    /**
     * Validates the API response and throws an error if the request failed.
     */
    private validateResponse;
    /**
     * Retain a single memory for a bank.
     */
    retain(bankId: string, content: string | ContentBlock[], options?: {
        timestamp?: Date | string;
        context?: string;
        metadata?: Record<string, string>;
        documentId?: string;
        async?: boolean;
        /** Optional caller-supplied UUID for idempotent async retries */
        operationId?: string;
        entities?: EntityInput[];
        /** Resolve the supplied `entities` against existing ones (default true); false stores them as written */
        resolveEntities?: boolean;
        /** Optional list of tags for this memory */
        tags?: string[];
        /** How to handle existing documents: 'replace' (default) or 'append' */
        updateMode?: "replace" | "append";
        /** Observation scoping strategy: 'per_tag', 'combined', 'all_combinations', 'shared', or explicit scope groups */
        observationScopes?: "per_tag" | "combined" | "all_combinations" | "shared" | string[][];
        /** Extraction strategy override */
        strategy?: string;
        signal?: AbortSignal;
    }): Promise<RetainResponse>;
    /**
     * Retain multiple memories in batch.
     */
    retainBatch(bankId: string, items: MemoryItemInput[], options?: {
        documentId?: string;
        documentTags?: string[];
        async?: boolean;
        /** Optional caller-supplied UUID for idempotent async retries */
        operationId?: string;
        signal?: AbortSignal;
    }): Promise<RetainResponse>;
    /**
     * Upload files and retain their contents as memories.
     *
     * Files are automatically converted to text (PDF, DOCX, images via OCR, audio via
     * transcription, and more) and ingested as memories. Processing is always asynchronous —
     * use the returned operation IDs to track progress via the operations endpoint.
     *
     * @param bankId - The memory bank ID
     * @param files - Array of File or Blob objects to upload
     * @param options - Optional settings: context, documentTags, filesMetadata
     */
    retainFiles(bankId: string, files: Array<File | Blob>, options?: {
        context?: string;
        filesMetadata?: Array<{
            context?: string;
            document_id?: string;
            tags?: string[];
            metadata?: Record<string, string>;
        }>;
        signal?: AbortSignal;
    }): Promise<FileRetainResponse>;
    /**
     * Recall memories with a natural language query.
     */
    recall(bankId: string, query: string, options?: {
        types?: string[];
        /** When recalling raw facts ('world'/'experience') together with 'observation', drop any raw fact a returned observation was consolidated from, so the observation supersedes it (no duplicate content). Disabled by default; no effect unless 'observation' and at least one raw type are both in types. */
        preferObservations?: boolean;
        maxTokens?: number;
        budget?: Budget;
        trace?: boolean;
        queryTimestamp?: string;
        includeEntities?: boolean;
        maxEntityTokens?: number;
        includeChunks?: boolean;
        maxChunkTokens?: number;
        /** Include source facts for observation-type results */
        includeSourceFacts?: boolean;
        /** Maximum tokens for source facts (default: 4096) */
        maxSourceFactsTokens?: number;
        /** Optional list of tags to filter memories by */
        tags?: string[];
        /** How to match tags: 'any' (OR, includes untagged), 'all' (AND, includes untagged), 'any_strict' (OR, excludes untagged), 'all_strict' (AND, excludes untagged), 'exact' (set equality, excludes untagged). Default: 'any' */
        tagsMatch?: "any" | "all" | "any_strict" | "all_strict" | "exact";
        /** Compound tag filter using boolean groups. Groups are AND-ed. Each group is a leaf {tags, match} or compound {and: [...]}, {or: [...]}, {not: ...}. Mutually exclusive with tags/tagsMatch. */
        tagGroups?: Array<TagGroupLeaf | TagGroupAndInput | TagGroupOrInput | TagGroupNotInput>;
        /** Optional per-stage score floors, e.g. {semantic: 0.2, final: 0.5}. 'semantic' and 'keyword' are retrieval-level cutoffs; 'reranker' and 'final' are applied to the scored results after reranking. Any omitted stage imposes no floor. */
        minScores?: MinScores;
        /** Window for the temporal retrieval arm, supplied instead of extracting dates from the query text. Ranks memories dated inside the window higher; it does NOT drop memories dated outside it, so it is not a way to restrict results to a period. Ignored when the bank has temporal retrieval disabled. */
        temporalWindow?: TemporalWindow;
        signal?: AbortSignal;
    }): Promise<RecallResponse>;
    /**
     * Reflect and generate a contextual answer using the bank's identity and memories.
     */
    reflect(bankId: string, query: string, options?: {
        context?: string;
        budget?: Budget;
        /** Optional list of tags to filter memories by */
        tags?: string[];
        /** How to match tags: 'any' (OR, includes untagged), 'all' (AND, includes untagged), 'any_strict' (OR, excludes untagged), 'all_strict' (AND, excludes untagged), 'exact' (set equality, excludes untagged). Default: 'any' */
        tagsMatch?: "any" | "all" | "any_strict" | "all_strict" | "exact";
        /** Compound tag filter using boolean groups. Groups are AND-ed. Mutually exclusive with tags/tagsMatch. */
        tagGroups?: Array<TagGroupLeaf | TagGroupAndInput | TagGroupOrInput | TagGroupNotInput>;
        /** Apply every active directive regardless of tags. By default directives are tag-scoped like memories: untagged ones always apply, tagged ones only when the request's tags match. */
        applyAllDirectives?: boolean;
        /** Optional JSON Schema for structured output. When provided, the response includes a 'structured_output' field. */
        responseSchema?: Record<string, unknown>;
        /** Filter which fact types are retrieved: 'world', 'experience', 'observation'. None means all. */
        factTypes?: Array<"world" | "experience" | "observation">;
        /** If true, exclude all mental models from reflection. */
        excludeMentalModels?: boolean;
        /** Exclude specific mental models by ID from reflection. */
        excludeMentalModelIds?: string[];
        /** Token budget for the agent's search_observations calls. Omit to use the bank's reflect_default_options, then the shipped default. */
        reflectSearchObservationsMaxTokens?: number;
        /** Whether search_observations attaches resolved entity names, which can be over half the tool payload. Omit to use the bank default (enabled). */
        reflectSearchObservationsIncludeEntities?: boolean;
        /** If true, the response includes a 'based_on' field listing the memories, mental models, and directives used. */
        includeFacts?: boolean;
        /** If true, the response includes a 'trace' field with the tool calls and LLM calls made during reflection (trace.tool_calls / trace.llm_calls). */
        includeToolCalls?: boolean;
        /** When includeToolCalls is true, set to false for an inputs-only trace (smaller payload). Ignored otherwise. Default: true. */
        includeToolCallOutput?: boolean;
        signal?: AbortSignal;
    }): Promise<ReflectResponse>;
    /**
     * List memories with pagination.
     */
    listMemories(bankId: string, options?: {
        limit?: number;
        offset?: number;
        type?: string;
        q?: string;
        consolidationState?: "failed" | "pending" | "done";
        state?: "valid" | "invalidated";
        documentId?: string;
        entityId?: string;
        /**
         * Time axis to filter and order by. Also drops memories with no value on
         * that column, so `total` counts only the ones inside the window.
         */
        timeField?: "created_at" | "updated_at" | "mentioned_at" | "occurred_start" | "occurred_end";
        /** ISO-8601, inclusive. */
        startDate?: string;
        /** ISO-8601, exclusive. */
        endDate?: string;
        signal?: AbortSignal;
    }): Promise<ListMemoryUnitsResponse>;
    /**
     * Create or update a bank with disposition, missions, and operational configuration.
     */
    createBank(bankId: string, options?: {
        /** @deprecated Display label only. */
        name?: string;
        /** @deprecated Use reflectMission instead. */
        mission?: string;
        /** Mission/context for Reflect operations. */
        reflectMission?: string;
        /** @deprecated Alias for mission. */
        background?: string;
        /** @deprecated Use dispositionSkepticism, dispositionLiteralism, dispositionEmpathy instead. */
        disposition?: {
            skepticism: number;
            literalism: number;
            empathy: number;
        };
        /** @deprecated Use updateBankConfig({ dispositionSkepticism }) instead. */
        dispositionSkepticism?: number;
        /** @deprecated Use updateBankConfig({ dispositionLiteralism }) instead. */
        dispositionLiteralism?: number;
        /** @deprecated Use updateBankConfig({ dispositionEmpathy }) instead. */
        dispositionEmpathy?: number;
        /** Steers what gets extracted during retain(). Injected alongside built-in rules. */
        retainMission?: string;
        /** Fact extraction mode: 'concise' (default), 'verbose', 'custom', 'verbatim', or 'chunks'. */
        retainExtractionMode?: string;
        /** Custom extraction prompt (only active when retainExtractionMode is 'custom'). */
        retainCustomInstructions?: string;
        /** Target maximum characters for each content chunk during retain. */
        retainChunkSize?: number;
        /** Maximum characters for a single JSONL line or conversation turn to keep whole during retain. */
        retainStructuredChunkSize?: number;
        /** Max inline attachments one extraction chunk may carry. `retainChunkSize`
         *  budgets text only, so this is what bounds attachments. */
        retainMaxAttachmentsPerChunk?: number;
        /** Toggle automatic observation consolidation after retain(). */
        enableObservations?: boolean;
        /** Controls what gets synthesised into observations. Replaces built-in rules. */
        observationsMission?: string;
        /** Run the keyword (BM25) retrieval arm during recall. False leaves pure vector search. */
        enableTextSearch?: boolean;
        /** Run the temporal retrieval arm during recall, and the date-aware query analysis feeding it. */
        enableTemporalRetrieval?: boolean;
        /** Run the entity/link graph traversal arm during recall. */
        enableGraphRetrieval?: boolean;
        /** Rerank fused candidates with the cross-encoder. False returns the RRF order. */
        enableReranking?: boolean;
        signal?: AbortSignal;
    }): Promise<BankProfileResponse>;
    /**
     * Set or update the reflect mission for a memory bank.
     * @deprecated Use createBank({ reflectMission: '...' }) instead.
     */
    setMission(bankId: string, mission: string, options?: {
        signal?: AbortSignal;
    }): Promise<BankProfileResponse>;
    /**
     * Get a bank's profile.
     *
     * @deprecated Removed server-side — the endpoint answers 410. Disposition traits and
     * the reflect mission are bank configuration: use {@link getBankConfig} and read
     * `disposition_skepticism`, `disposition_literalism`, `disposition_empathy` and
     * `reflect_mission`. The bank's display label, which was itself deprecated, is on
     * `GET /v1/default/banks` — this wrapper exposes no bank listing.
     */
    getBankProfile(bankId: string, options?: {
        signal?: AbortSignal;
    }): Promise<BankProfileResponse>;
    /**
     * Get the resolved configuration for a bank, including any bank-level overrides.
     *
     * Always available: `HINDSIGHT_API_ENABLE_BANK_CONFIG_API=false` disables only the
     * config writes, not this read.
     */
    getBankConfig(bankId: string, options?: {
        signal?: AbortSignal;
    }): Promise<BankConfigResponse>;
    /**
     * Update configuration overrides for a bank.
     *
     * Can be disabled on the server by setting `HINDSIGHT_API_ENABLE_BANK_CONFIG_API=false`.
     *
     * @param bankId - The memory bank ID
     * @param options - Fields to override
     */
    updateBankConfig(bankId: string, options: {
        reflectMission?: string;
        retainMission?: string;
        retainExtractionMode?: string;
        retainCustomInstructions?: string;
        retainChunkSize?: number;
        retainStructuredChunkSize?: number;
        /** Max inline attachments one extraction chunk may carry. `retainChunkSize`
         *  budgets text only, so this is what bounds attachments. */
        retainMaxAttachmentsPerChunk?: number;
        /**
         * Controlled vocabulary for entity labels. Each group classifies a fact under a
         * `key`: `"value"`/`"multi-values"` pick from the group's declared `values`, while
         * `"text"`/`"multi-text"` are open-vocabulary (one string / any number of strings).
         * With `tag: true` the extracted `key:value` labels are also written as tags, so
         * they are filterable via `tags`/`tagsMatch` at recall.
         */
        entityLabels?: LabelGroupInput[];
        /** Allow entities outside `entityLabels`. False is labels-only mode. */
        entitiesAllowFreeForm?: boolean;
        enableObservations?: boolean;
        observationsMission?: string;
        /** Run the keyword (BM25) retrieval arm during recall. False leaves pure vector search. */
        enableTextSearch?: boolean;
        /** Run the temporal retrieval arm during recall, and the date-aware query analysis feeding it. */
        enableTemporalRetrieval?: boolean;
        /** Run the entity/link graph traversal arm during recall. */
        enableGraphRetrieval?: boolean;
        /** Rerank fused candidates with the cross-encoder. False returns the RRF order. */
        enableReranking?: boolean;
        /** How skeptical vs trusting (1=trusting, 5=skeptical). */
        dispositionSkepticism?: number;
        /** How literally to interpret information (1=flexible, 5=literal). */
        dispositionLiteralism?: number;
        /** How much to consider emotional context (1=detached, 5=empathetic). */
        dispositionEmpathy?: number;
        /** Default retain strategy name. */
        retainDefaultStrategy?: string;
        /** Named strategy definitions (strategy name to config). */
        retainStrategies?: Record<string, unknown>;
        /** Number of chunks per sub-batch in chunks extraction mode. */
        retainChunkBatchSize?: number;
        /** Persist the original document text alongside extracted facts. */
        storeDocumentText?: boolean;
        /** Cap on observations retained per scope (-1 for unlimited). */
        maxObservationsPerScope?: number;
        /** Per-scope observation caps, overriding maxObservationsPerScope. */
        observationScopeLimits?: Record<string, unknown>[];
        /** Consolidate automatically after retain() rather than on demand. */
        enableAutoConsolidation?: boolean;
        /** Number of LLM calls to batch during consolidation. */
        consolidationLlmBatchSize?: number;
        /** Concurrent LLM calls during consolidation. */
        consolidationLlmParallelism?: number;
        /** Memories consolidated per round. */
        consolidationMaxMemoriesPerRound?: number;
        /** Max tokens for source facts across all observations in a pass. */
        consolidationSourceFactsMaxTokens?: number;
        /** Max tokens of source facts per observation in the prompt. */
        consolidationSourceFactsMaxTokensPerObservation?: number;
        /** Debounce between mental-model refreshes. */
        mentalModelMinRefreshIntervalSeconds?: number;
        /** Trigger fields merged over the built-in default for new knowledge pages. */
        knowledgePageDefaultTrigger?: Record<string, unknown>;
        /** Default reflect options for this bank, applied whenever a reflect request (or a mental model's trigger) leaves the option unset: reflect_search_observations_max_tokens, reflect_search_observations_include_entities. */
        reflectDefaultOptions?: Record<string, unknown>;
        /** Token budget for source facts during reflect. -1 disables. */
        reflectSourceFactsMaxTokens?: number;
        /** Token budget for facts returned by recall. */
        recallMaxTokens?: number;
        /** Include source chunks in recall results. */
        recallIncludeChunks?: boolean;
        /** Token budget for those chunks. */
        recallChunksMaxTokens?: number;
        /** How the per-query result budget is derived: 'fixed' or 'adaptive'. */
        recallBudgetFunction?: string;
        /** Fixed budget for low-breadth queries. */
        recallBudgetFixedLow?: number;
        /** Fixed budget for medium-breadth queries. */
        recallBudgetFixedMid?: number;
        /** Fixed budget for high-breadth queries. */
        recallBudgetFixedHigh?: number;
        /** Adaptive budget fraction for low-breadth queries. */
        recallBudgetAdaptiveLow?: number;
        /** Adaptive budget fraction for medium-breadth queries. */
        recallBudgetAdaptiveMid?: number;
        /** Adaptive budget fraction for high-breadth queries. */
        recallBudgetAdaptiveHigh?: number;
        /** Lower clamp on the resolved budget. */
        recallBudgetMin?: number;
        /** Upper clamp on the resolved budget. */
        recallBudgetMax?: number;
        /** MCP tool names enabled for this bank. */
        mcpEnabledTools?: string[];
        /** Gemini/VertexAI safety overrides. */
        llmGeminiSafetySettings?: {
            category: string;
            threshold: string;
        }[];
        /** Memory-defense (prompt-injection / secret redaction) settings. */
        memoryDefense?: Record<string, unknown>;
        /** Write an audit log entry for each operation on this bank. */
        auditLogEnabled?: boolean;
        signal?: AbortSignal;
    }): Promise<BankConfigResponse>;
    /**
     * Reset all bank-level configuration overrides, reverting to server defaults.
     *
     * Can be disabled on the server by setting `HINDSIGHT_API_ENABLE_BANK_CONFIG_API=false`.
     */
    resetBankConfig(bankId: string, options?: {
        signal?: AbortSignal;
    }): Promise<BankConfigResponse>;
    /**
     * Delete a bank.
     */
    deleteBank(bankId: string, options?: {
        signal?: AbortSignal;
    }): Promise<void>;
    /**
     * Create a directive (hard rule for reflect).
     */
    createDirective(bankId: string, name: string, content: string, options?: {
        priority?: number;
        isActive?: boolean;
        tags?: string[];
        signal?: AbortSignal;
    }): Promise<DirectiveResponse>;
    /**
     * List all directives in a bank.
     */
    listDirectives(bankId: string, options?: {
        tags?: string[];
        limit?: number;
        offset?: number;
        signal?: AbortSignal;
    }): Promise<DirectiveListResponse>;
    /**
     * Get a specific directive.
     */
    getDirective(bankId: string, directiveId: string, options?: {
        signal?: AbortSignal;
    }): Promise<DirectiveResponse>;
    /**
     * Update a directive.
     */
    updateDirective(bankId: string, directiveId: string, options: {
        name?: string;
        content?: string;
        priority?: number;
        isActive?: boolean;
        tags?: string[];
        signal?: AbortSignal;
    }): Promise<DirectiveResponse>;
    /**
     * Delete a directive.
     */
    deleteDirective(bankId: string, directiveId: string, options?: {
        signal?: AbortSignal;
    }): Promise<void>;
    /**
     * Create a mental model (runs reflect in background).
     */
    createMentalModel(bankId: string, name: string, sourceQuery: string, options?: {
        id?: string;
        tags?: string[];
        maxTokens?: number;
        trigger?: MentalModelTriggerOptions;
        signal?: AbortSignal;
    }): Promise<CreateMentalModelResponse>;
    /**
     * List all mental models in a bank.
     *
     * The endpoint defaults to `detail: "metadata"`, so `content`, `source_query`,
     * `max_tokens` and `trigger` come back null unless you ask for them.
     */
    listMentalModels(bankId: string, options?: {
        tags?: string[];
        tagsMatch?: "any" | "all" | "exact";
        /** Exclude large provenance chains with "metadata" or "content" when they are not needed. */
        detail?: "metadata" | "content" | "full";
        limit?: number;
        offset?: number;
        signal?: AbortSignal;
    }): Promise<MentalModelListResponse>;
    /**
     * Get a specific mental model.
     */
    getMentalModel(bankId: string, mentalModelId: string, options?: {
        /** Exclude large provenance chains with "metadata" or "content" when they are not needed. */
        detail?: "metadata" | "content" | "full";
        signal?: AbortSignal;
    }): Promise<MentalModelResponse>;
    /**
     * Refresh a mental model to update with current knowledge.
     */
    refreshMentalModel(bankId: string, mentalModelId: string, options?: {
        signal?: AbortSignal;
    }): Promise<AsyncOperationSubmitResponse>;
    /**
     * Preview what a refresh would do to a mental model without changing it.
     *
     * The production refresh pipeline with two writes skipped — the content and the
     * watermark — so what it reports is what the next refresh will do. Reports the
     * mode it ran in and why, the scope and window it read, the evidence it would
     * ground on, and a diff from the stored content to the content it would write.
     *
     * Not configurable, and costs the same LLM tokens as a real refresh.
     */
    dryRunRefreshMentalModel(bankId: string, mentalModelId: string, options?: {
        signal?: AbortSignal;
    }): Promise<MentalModelDryRunRefreshResult>;
    /**
     * Clear a mental model's content so the next refresh performs a full re-synthesis.
     */
    clearMentalModel(bankId: string, mentalModelId: string, options?: {
        signal?: AbortSignal;
    }): Promise<MentalModelResponse>;
    /**
     * Update a mental model's metadata.
     */
    updateMentalModel(bankId: string, mentalModelId: string, options: {
        name?: string;
        sourceQuery?: string;
        tags?: string[];
        maxTokens?: number;
        /** Refresh settings to change. Applied as a patch: the fields you send are updated
         *  and the rest keep the model's current values. */
        trigger?: MentalModelTriggerOptions;
        signal?: AbortSignal;
    }): Promise<MentalModelResponse>;
    /**
     * Delete a mental model.
     */
    deleteMentalModel(bankId: string, mentalModelId: string, options?: {
        signal?: AbortSignal;
    }): Promise<void>;
    /**
     * Get the change history of a mental model.
     */
    getMentalModelHistory(bankId: string, mentalModelId: string, options?: {
        signal?: AbortSignal;
    }): Promise<unknown>;
    /**
     * Get the knowledge base as a nested folder/page tree.
     *
     * Page bodies are not included — fetch one with `getKnowledgePage`.
     */
    getKnowledgeBaseTree(bankId: string, options?: {
        signal?: AbortSignal;
    }): Promise<KnowledgeTreeResponse>;
    /**
     * Create a knowledge-base folder.
     */
    createKnowledgeFolder(bankId: string, name: string, options?: {
        parentId?: string | null;
        signal?: AbortSignal;
    }): Promise<KnowledgeNode>;
    /**
     * Create a knowledge-base page. Content is generated asynchronously — poll the
     * returned `operation_id` to know when the first build has finished.
     *
     * Omit `trigger` to use the page defaults (observation-only, delta mode,
     * refresh after consolidation); a supplied trigger is applied as a patch over
     * them, so the fields you leave out keep their defaults.
     */
    createKnowledgePage(bankId: string, name: string, sourceQuery: string, options?: {
        parentId?: string | null;
        /**
         * Scopes which memories the page is built from — these are a filter, not labels, and a
         * `type:<x>` tag sets the page's rendered type while still filtering. A tagged page
         * defaults to `all_strict`: a memory must carry EVERY tag and untagged memories are
         * excluded, so tags the bank's memories don't carry build an empty page. Pass
         * `trigger.tagsMatch: "all"` to keep the tags but include untagged memories.
         */
        tags?: string[];
        maxTokens?: number;
        trigger?: MentalModelTriggerOptions;
        signal?: AbortSignal;
    }): Promise<CreateKnowledgePageResponse>;
    /**
     * Get a knowledge page rendered as a markdown document (frontmatter + body).
     */
    getKnowledgePage(bankId: string, pageId: string, options?: {
        signal?: AbortSignal;
    }): Promise<KnowledgePageResponse>;
    /**
     * Hybrid search (full-text + vector) over the bank's knowledge pages.
     */
    searchKnowledgeBase(bankId: string, query: string, options?: {
        limit?: number;
        signal?: AbortSignal;
    }): Promise<KnowledgePageSearchResponse>;
    /**
     * Rename/move a knowledge node and/or update a page's options.
     *
     * Only the fields present in `options` are sent, so passing `parentId: null`
     * explicitly moves the node to the root.
     */
    updateKnowledgeNode(bankId: string, nodeId: string, options: {
        name?: string;
        parentId?: string | null;
        /** Pages only — changing it rebuilds the page against the new question. */
        sourceQuery?: string;
        /** Pages only — replaces the page's tags (pass [] to clear). */
        tags?: string[];
        maxTokens?: number;
        /** Pages only — refresh settings to change. Applied as a patch: the fields you send are
         *  updated and the rest keep the page's current values. */
        trigger?: MentalModelTriggerInput;
        signal?: AbortSignal;
    }): Promise<KnowledgeNode>;
    /**
     * Delete a knowledge folder or page and its whole subtree.
     */
    deleteKnowledgeNode(bankId: string, nodeId: string, options?: {
        signal?: AbortSignal;
    }): Promise<unknown>;
    /**
     * Export the knowledge base as a portable markdown bundle.
     */
    exportKnowledgeBase(bankId: string, options?: {
        signal?: AbortSignal;
    }): Promise<KnowledgePageBundleResponse>;
    /**
     * Get a document by ID. Returns null if not found.
     */
    getDocument(bankId: string, documentId: string, options?: {
        signal?: AbortSignal;
    }): Promise<DocumentResponse | null>;
    /**
     * List documents in a bank.
     */
    listDocuments(bankId: string, options?: {
        limit?: number;
        offset?: number;
        /** Time axis to filter and order by; `updated_at` is the default ordering. */
        timeField?: "created_at" | "updated_at";
        /** ISO-8601, inclusive. */
        startDate?: string;
        /** ISO-8601, exclusive. */
        endDate?: string;
        signal?: AbortSignal;
    }): Promise<ListDocumentsResponse>;
    /**
     * Delete a document.
     */
    deleteDocument(bankId: string, documentId: string, options?: {
        signal?: AbortSignal;
    }): Promise<void>;
    /**
     * Update a document's mutable fields.
     */
    updateDocument(bankId: string, documentId: string, options: {
        tags?: string[];
        signal?: AbortSignal;
    }): Promise<UpdateDocumentResponse>;
    /**
     * Export a bank's documents as a transfer ZIP archive (blocking convenience).
     *
     * The export runs as a background operation server-side (a whole-bank export can
     * be large). This helper submits it, polls the operation to completion, downloads
     * the archive, and resolves with its bytes. For the raw flow use the low-level
     * `sdk.exportDocuments` / `sdk.getOperationStatus` / `sdk.downloadFile`.
     *
     * @throws {HindsightError} if the export fails, times out, or completes without an archive.
     */
    exportDocuments(bankId: string, options?: {
        documentIds?: string[];
        includeObservations?: boolean;
        includeKnowledgeBase?: boolean;
        /** Milliseconds between operation-status polls (default 2000). */
        pollIntervalMs?: number;
        /** Maximum milliseconds to wait for the export to finish (default 300000). */
        timeoutMs?: number;
        signal?: AbortSignal;
    }): Promise<Uint8Array>;
    /**
     * Export a whole bank as a transfer ZIP archive (blocking convenience).
     *
     * Three flags decide what the archive carries. `includeData` covers the memories
     * and everything backing them (documents, facts, observations, attachments and
     * their bytes, the curation archive, the operations log and the maintenance
     * queues); `includeBankConfig` the bank's own config, mental models and their
     * history, knowledge pages, directives and webhooks; `includeHistory` the audit
     * and LLM-request logs. Embeddings never travel — the importing instance
     * regenerates them, which is what makes an archive portable.
     *
     * @throws {HindsightError} if the export fails, times out, or completes without an archive.
     */
    exportBank(bankId: string, options?: {
        includeData?: boolean;
        includeBankConfig?: boolean;
        includeHistory?: boolean;
        /** Milliseconds between operation-status polls (default 2000). */
        pollIntervalMs?: number;
        /** Maximum milliseconds to wait for the export to finish (default 300000). */
        timeoutMs?: number;
        signal?: AbortSignal;
    }): Promise<Uint8Array>;
    /**
     * Restore a bank archive into a fresh bank, and resolve with the operation id.
     *
     * The restore runs in the background (facts are re-embedded and entities
     * re-resolved); poll `sdk.getOperationStatus` for its progress and counts.
     *
     * `targetBankId` must NOT already exist — this restores a whole bank rather than
     * merging into one. `bankId` is simply the bank the operation is recorded
     * against, because the target does not exist yet. To fold an archive's documents
     * into an existing bank instead, use `sdk.importDocuments`.
     */
    importBank(bankId: string, archive: Blob | File, options?: {
        targetBankId?: string;
        includeData?: boolean;
        includeBankConfig?: boolean;
        includeHistory?: boolean;
        signal?: AbortSignal;
    }): Promise<string>;
    /**
     * Copy a bank into a new one, and resolve with the clone operation's id.
     *
     * The clone starts with the source's memories as they are at clone time and
     * evolves independently from then on. It runs server-side as the export and
     * import back to back, so no archive travels over the wire and no LLM is called;
     * poll `sdk.getOperationStatus` for progress and the per-component counts.
     *
     * `targetBankId` must NOT already exist. Note that webhooks travel with
     * `includeBankConfig`: a clone made with the defaults will call the source's
     * webhook endpoints.
     */
    cloneBank(bankId: string, targetBankId: string, options?: {
        includeData?: boolean;
        includeBankConfig?: boolean;
        includeHistory?: boolean;
        signal?: AbortSignal;
    }): Promise<string>;
    /**
     * Poll an export operation to completion and download the archive it produced.
     * Shared by `exportDocuments` and `exportBank` — both submit an operation whose
     * `result_metadata` names the finished archive.
     */
    private downloadOperationArchive;
}
/**
 * Serialize a RecallResponse to a string suitable for LLM prompts.
 *
 * Builds a prompt containing:
 * - Facts: each result as a JSON object with text, context, temporal fields,
 *   and source_chunk (if the result's chunk_id matches a chunk in the response).
 * - Entities: entity summaries from observations, formatted as sections.
 *
 * Mirrors the format used internally by Hindsight's reflect operation.
 */
declare function recallResponseToPromptString(response: RecallResponse): string;

export { type AsyncOperationSubmitResponse, type BankConfigResponse, type BankProfileResponse, type BankTemplateConfig, type BankTemplateDirective, type BankTemplateImportResponse, type BankTemplateManifest, type BankTemplateMentalModel, type Budget, CLIENT_VERSION, type Client, type ContentBlock, type CreateBankRequest, type CreateKnowledgePageResponse, type CreateMentalModelResponse, DEFAULT_MAX_ATTEMPTS, DEFAULT_USER_AGENT, type DirectiveListResponse, type DirectiveResponse, type DocumentResponse, type EntityInput, type FileRetainResponse, HindsightClient, type HindsightClientOptions, HindsightError, type KnowledgeNode, type KnowledgePageBundleResponse, type KnowledgePageResponse, type KnowledgePageSearchResponse, type KnowledgeTreeResponse, type LabelGroupInput, type ListDocumentsResponse, type ListMemoryUnitsResponse, type MemoryItemInput, type MentalModelDryRunRefreshResult, type MentalModelListResponse, type MentalModelResponse, type MentalModelTriggerInput, type MentalModelTriggerOptions, type MinScores, type RecallRequest, type RecallResponse, type RecallResult, type ReflectRequest, type ReflectResponse, type RetainRequest, type RetainResponse, type TagGroupAndInput, type TagGroupLeaf, type TagGroupNotInput, type TagGroupOrInput, type TemporalWindow, type UpdateDocumentResponse, type VersionResponse, createClient, createConfig, recallResponseToPromptString, retryAfterMs, retryOnCapacity, sdk_gen as sdk };
