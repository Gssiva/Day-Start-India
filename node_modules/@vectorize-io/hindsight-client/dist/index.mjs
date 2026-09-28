var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// generated/core/bodySerializer.gen.ts
var serializeFormDataPair = (data, key, value) => {
  if (typeof value === "string" || value instanceof Blob) {
    data.append(key, value);
  } else if (value instanceof Date) {
    data.append(key, value.toISOString());
  } else {
    data.append(key, JSON.stringify(value));
  }
};
var formDataBodySerializer = {
  bodySerializer: (body) => {
    const data = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if (value === void 0 || value === null) {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((v) => serializeFormDataPair(data, key, v));
      } else {
        serializeFormDataPair(data, key, value);
      }
    });
    return data;
  }
};
var jsonBodySerializer = {
  bodySerializer: (body) => JSON.stringify(body, (_key, value) => typeof value === "bigint" ? value.toString() : value)
};

// generated/core/params.gen.ts
var extraPrefixesMap = {
  $body_: "body",
  $headers_: "headers",
  $path_: "path",
  $query_: "query"
};
var extraPrefixes = Object.entries(extraPrefixesMap);

// generated/core/serverSentEvents.gen.ts
function createSseClient({
  onRequest,
  onSseError,
  onSseEvent,
  responseTransformer,
  responseValidator,
  sseDefaultRetryDelay,
  sseMaxRetryAttempts,
  sseMaxRetryDelay,
  sseSleepFn,
  url,
  ...options
}) {
  let lastEventId;
  const sleep = sseSleepFn ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  const createStream = async function* () {
    let retryDelay = sseDefaultRetryDelay ?? 3e3;
    let attempt = 0;
    const signal = options.signal ?? new AbortController().signal;
    while (true) {
      if (signal.aborted) break;
      attempt++;
      const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
      if (lastEventId !== void 0) {
        headers.set("Last-Event-ID", lastEventId);
      }
      try {
        const requestInit = {
          redirect: "follow",
          ...options,
          body: options.serializedBody,
          headers,
          signal
        };
        let request = new Request(url, requestInit);
        if (onRequest) {
          request = await onRequest(url, requestInit);
        }
        const _fetch = options.fetch ?? globalThis.fetch;
        const response = await _fetch(request);
        if (!response.ok) throw new Error(`SSE failed: ${response.status} ${response.statusText}`);
        if (!response.body) throw new Error("No body in SSE response");
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        let buffer = "";
        const abortHandler = () => {
          try {
            reader.cancel();
          } catch {
          }
        };
        signal.addEventListener("abort", abortHandler);
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += value;
            buffer = buffer.replace(/\r\n?/g, "\n");
            const chunks = buffer.split("\n\n");
            buffer = chunks.pop() ?? "";
            for (const chunk of chunks) {
              const lines = chunk.split("\n");
              const dataLines = [];
              let eventName;
              for (const line of lines) {
                if (line.startsWith("data:")) {
                  dataLines.push(line.replace(/^data:\s*/, ""));
                } else if (line.startsWith("event:")) {
                  eventName = line.replace(/^event:\s*/, "");
                } else if (line.startsWith("id:")) {
                  lastEventId = line.replace(/^id:\s*/, "");
                } else if (line.startsWith("retry:")) {
                  const parsed = Number.parseInt(line.replace(/^retry:\s*/, ""), 10);
                  if (!Number.isNaN(parsed)) {
                    retryDelay = parsed;
                  }
                }
              }
              let data;
              let parsedJson = false;
              if (dataLines.length) {
                const rawData = dataLines.join("\n");
                try {
                  data = JSON.parse(rawData);
                  parsedJson = true;
                } catch {
                  data = rawData;
                }
              }
              if (parsedJson) {
                if (responseValidator) {
                  await responseValidator(data);
                }
                if (responseTransformer) {
                  data = await responseTransformer(data);
                }
              }
              onSseEvent?.({
                data,
                event: eventName,
                id: lastEventId,
                retry: retryDelay
              });
              if (dataLines.length) {
                yield data;
              }
            }
          }
        } finally {
          signal.removeEventListener("abort", abortHandler);
          reader.releaseLock();
        }
        break;
      } catch (error) {
        onSseError?.(error);
        if (sseMaxRetryAttempts !== void 0 && attempt >= sseMaxRetryAttempts) {
          break;
        }
        const backoff = Math.min(retryDelay * 2 ** (attempt - 1), sseMaxRetryDelay ?? 3e4);
        await sleep(backoff);
      }
    }
  };
  const stream = createStream();
  return { stream };
}

// generated/core/pathSerializer.gen.ts
var separatorArrayExplode = (style) => {
  switch (style) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var separatorArrayNoExplode = (style) => {
  switch (style) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
};
var separatorObjectExplode = (style) => {
  switch (style) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var serializeArrayParam = ({
  allowReserved,
  explode,
  name,
  style,
  value
}) => {
  if (!explode) {
    const joinedValues2 = (allowReserved ? value : value.map((v) => encodeURIComponent(v))).join(separatorArrayNoExplode(style));
    switch (style) {
      case "label":
        return `.${joinedValues2}`;
      case "matrix":
        return `;${name}=${joinedValues2}`;
      case "simple":
        return joinedValues2;
      default:
        return `${name}=${joinedValues2}`;
    }
  }
  const separator = separatorArrayExplode(style);
  const joinedValues = value.map((v) => {
    if (style === "label" || style === "simple") {
      return allowReserved ? v : encodeURIComponent(v);
    }
    return serializePrimitiveParam({
      allowReserved,
      name,
      value: v
    });
  }).join(separator);
  return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};
var serializePrimitiveParam = ({
  allowReserved,
  name,
  value
}) => {
  if (value === void 0 || value === null) {
    return "";
  }
  if (typeof value === "object") {
    throw new Error(
      "Deeply-nested arrays/objects aren\u2019t supported. Provide your own `querySerializer()` to handle these."
    );
  }
  return `${name}=${allowReserved ? value : encodeURIComponent(value)}`;
};
var serializeObjectParam = ({
  allowReserved,
  explode,
  name,
  style,
  value,
  valueOnly
}) => {
  if (value instanceof Date) {
    return valueOnly ? value.toISOString() : `${name}=${value.toISOString()}`;
  }
  if (style !== "deepObject" && !explode) {
    let values = [];
    Object.entries(value).forEach(([key, v]) => {
      values = [...values, key, allowReserved ? v : encodeURIComponent(v)];
    });
    const joinedValues2 = values.join(",");
    switch (style) {
      case "form":
        return `${name}=${joinedValues2}`;
      case "label":
        return `.${joinedValues2}`;
      case "matrix":
        return `;${name}=${joinedValues2}`;
      default:
        return joinedValues2;
    }
  }
  const separator = separatorObjectExplode(style);
  const joinedValues = Object.entries(value).map(
    ([key, v]) => serializePrimitiveParam({
      allowReserved,
      name: style === "deepObject" ? `${name}[${key}]` : key,
      value: v
    })
  ).join(separator);
  return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};

// generated/core/utils.gen.ts
var PATH_PARAM_RE = /\{[^{}]+\}/g;
var defaultPathSerializer = ({ path, url: _url }) => {
  let url = _url;
  const matches = _url.match(PATH_PARAM_RE);
  if (matches) {
    for (const match of matches) {
      let explode = false;
      let name = match.substring(1, match.length - 1);
      let style = "simple";
      if (name.endsWith("*")) {
        explode = true;
        name = name.substring(0, name.length - 1);
      }
      if (name.startsWith(".")) {
        name = name.substring(1);
        style = "label";
      } else if (name.startsWith(";")) {
        name = name.substring(1);
        style = "matrix";
      }
      const value = path[name];
      if (value === void 0 || value === null) {
        continue;
      }
      if (Array.isArray(value)) {
        url = url.replace(match, serializeArrayParam({ explode, name, style, value }));
        continue;
      }
      if (typeof value === "object") {
        url = url.replace(
          match,
          serializeObjectParam({
            explode,
            name,
            style,
            value,
            valueOnly: true
          })
        );
        continue;
      }
      if (style === "matrix") {
        url = url.replace(
          match,
          `;${serializePrimitiveParam({
            name,
            value
          })}`
        );
        continue;
      }
      const replaceValue = encodeURIComponent(
        style === "label" ? `.${value}` : value
      );
      url = url.replace(match, replaceValue);
    }
  }
  return url;
};
var getUrl = ({
  baseUrl,
  path,
  query,
  querySerializer,
  url: _url
}) => {
  const pathUrl = _url.startsWith("/") ? _url : `/${_url}`;
  let url = (baseUrl ?? "") + pathUrl;
  if (path) {
    url = defaultPathSerializer({ path, url });
  }
  let search = query ? querySerializer(query) : "";
  if (search.startsWith("?")) {
    search = search.substring(1);
  }
  if (search) {
    url += `?${search}`;
  }
  return url;
};
function getValidRequestBody(options) {
  const hasBody = options.body !== void 0;
  const isSerializedBody = hasBody && options.bodySerializer;
  if (isSerializedBody) {
    if ("serializedBody" in options) {
      const hasSerializedBody = options.serializedBody !== void 0 && options.serializedBody !== "";
      return hasSerializedBody ? options.serializedBody : null;
    }
    return options.body !== "" ? options.body : null;
  }
  if (hasBody) {
    return options.body;
  }
  return void 0;
}

// generated/core/auth.gen.ts
var getAuthToken = async (auth, callback) => {
  const token = typeof callback === "function" ? await callback(auth) : callback;
  if (!token) {
    return;
  }
  if (auth.scheme === "bearer") {
    return `Bearer ${token}`;
  }
  if (auth.scheme === "basic") {
    return `Basic ${btoa(token)}`;
  }
  return token;
};

// generated/client/utils.gen.ts
var createQuerySerializer = ({
  parameters = {},
  ...args
} = {}) => {
  const querySerializer = (queryParams) => {
    const search = [];
    if (queryParams && typeof queryParams === "object") {
      for (const name in queryParams) {
        const value = queryParams[name];
        if (value === void 0 || value === null) {
          continue;
        }
        const options = parameters[name] || args;
        if (Array.isArray(value)) {
          const serializedArray = serializeArrayParam({
            allowReserved: options.allowReserved,
            explode: true,
            name,
            style: "form",
            value,
            ...options.array
          });
          if (serializedArray) search.push(serializedArray);
        } else if (typeof value === "object") {
          const serializedObject = serializeObjectParam({
            allowReserved: options.allowReserved,
            explode: true,
            name,
            style: "deepObject",
            value,
            ...options.object
          });
          if (serializedObject) search.push(serializedObject);
        } else {
          const serializedPrimitive = serializePrimitiveParam({
            allowReserved: options.allowReserved,
            name,
            value
          });
          if (serializedPrimitive) search.push(serializedPrimitive);
        }
      }
    }
    return search.join("&");
  };
  return querySerializer;
};
var getParseAs = (contentType) => {
  if (!contentType) {
    return "stream";
  }
  const cleanContent = contentType.split(";")[0]?.trim();
  if (!cleanContent) {
    return;
  }
  if (cleanContent.startsWith("application/json") || cleanContent.endsWith("+json")) {
    return "json";
  }
  if (cleanContent === "multipart/form-data") {
    return "formData";
  }
  if (["application/", "audio/", "image/", "video/"].some((type) => cleanContent.startsWith(type))) {
    return "blob";
  }
  if (cleanContent.startsWith("text/")) {
    return "text";
  }
  return;
};
var checkForExistence = (options, name) => {
  if (!name) {
    return false;
  }
  if (options.headers.has(name) || options.query?.[name] || options.headers.get("Cookie")?.includes(`${name}=`)) {
    return true;
  }
  return false;
};
async function setAuthParams(options) {
  for (const auth of options.security ?? []) {
    if (checkForExistence(options, auth.name)) {
      continue;
    }
    const token = await getAuthToken(auth, options.auth);
    if (!token) {
      continue;
    }
    const name = auth.name ?? "Authorization";
    switch (auth.in) {
      case "query":
        if (!options.query) {
          options.query = {};
        }
        options.query[name] = token;
        break;
      case "cookie":
        options.headers.append("Cookie", `${name}=${token}`);
        break;
      case "header":
      default:
        options.headers.set(name, token);
        break;
    }
  }
}
var buildUrl = (options) => getUrl({
  baseUrl: options.baseUrl,
  path: options.path,
  query: options.query,
  querySerializer: typeof options.querySerializer === "function" ? options.querySerializer : createQuerySerializer(options.querySerializer),
  url: options.url
});
var mergeConfigs = (a, b) => {
  const config = { ...a, ...b };
  if (config.baseUrl?.endsWith("/")) {
    config.baseUrl = config.baseUrl.substring(0, config.baseUrl.length - 1);
  }
  config.headers = mergeHeaders(a.headers, b.headers);
  return config;
};
var headersEntries = (headers) => {
  const entries = [];
  headers.forEach((value, key) => {
    entries.push([key, value]);
  });
  return entries;
};
var mergeHeaders = (...headers) => {
  const mergedHeaders = new Headers();
  for (const header of headers) {
    if (!header) {
      continue;
    }
    const iterator = header instanceof Headers ? headersEntries(header) : Object.entries(header);
    for (const [key, value] of iterator) {
      if (value === null) {
        mergedHeaders.delete(key);
      } else if (Array.isArray(value)) {
        for (const v of value) {
          mergedHeaders.append(key, v);
        }
      } else if (value !== void 0) {
        mergedHeaders.set(
          key,
          typeof value === "object" ? JSON.stringify(value) : value
        );
      }
    }
  }
  return mergedHeaders;
};
var Interceptors = class {
  constructor() {
    this.fns = [];
  }
  clear() {
    this.fns = [];
  }
  eject(id) {
    const index = this.getInterceptorIndex(id);
    if (this.fns[index]) {
      this.fns[index] = null;
    }
  }
  exists(id) {
    const index = this.getInterceptorIndex(id);
    return Boolean(this.fns[index]);
  }
  getInterceptorIndex(id) {
    if (typeof id === "number") {
      return this.fns[id] ? id : -1;
    }
    return this.fns.indexOf(id);
  }
  update(id, fn) {
    const index = this.getInterceptorIndex(id);
    if (this.fns[index]) {
      this.fns[index] = fn;
      return id;
    }
    return false;
  }
  use(fn) {
    this.fns.push(fn);
    return this.fns.length - 1;
  }
};
var createInterceptors = () => ({
  error: new Interceptors(),
  request: new Interceptors(),
  response: new Interceptors()
});
var defaultQuerySerializer = createQuerySerializer({
  allowReserved: false,
  array: {
    explode: true,
    style: "form"
  },
  object: {
    explode: true,
    style: "deepObject"
  }
});
var defaultHeaders = {
  "Content-Type": "application/json"
};
var createConfig = (override = {}) => ({
  ...jsonBodySerializer,
  headers: defaultHeaders,
  parseAs: "auto",
  querySerializer: defaultQuerySerializer,
  ...override
});

// generated/client/client.gen.ts
var createClient = (config = {}) => {
  let _config = mergeConfigs(createConfig(), config);
  const getConfig = () => ({ ..._config });
  const setConfig = (config2) => {
    _config = mergeConfigs(_config, config2);
    return getConfig();
  };
  const interceptors = createInterceptors();
  const beforeRequest = async (options) => {
    const opts = {
      ..._config,
      ...options,
      fetch: options.fetch ?? _config.fetch ?? globalThis.fetch,
      headers: mergeHeaders(_config.headers, options.headers),
      serializedBody: void 0
    };
    if (opts.security) {
      await setAuthParams(opts);
    }
    if (opts.requestValidator) {
      await opts.requestValidator(opts);
    }
    if (opts.body !== void 0 && opts.bodySerializer) {
      opts.serializedBody = opts.bodySerializer(opts.body);
    }
    if (opts.body === void 0 || opts.serializedBody === "") {
      opts.headers.delete("Content-Type");
    }
    const resolvedOpts = opts;
    const url = buildUrl(resolvedOpts);
    return { opts: resolvedOpts, url };
  };
  const request = async (options) => {
    const throwOnError = options.throwOnError ?? _config.throwOnError;
    const responseStyle = options.responseStyle ?? _config.responseStyle;
    let request2;
    let response;
    try {
      const { opts, url } = await beforeRequest(options);
      const { client: _client, ...optsForRequest } = opts;
      const requestInit = {
        redirect: "follow",
        ...optsForRequest,
        body: getValidRequestBody(opts)
      };
      request2 = new Request(url, requestInit);
      for (const fn of interceptors.request.fns) {
        if (fn) {
          request2 = await fn(request2, opts);
        }
      }
      const _fetch = opts.fetch;
      response = await _fetch(request2);
      for (const fn of interceptors.response.fns) {
        if (fn) {
          response = await fn(response, request2, opts);
        }
      }
      const result = {
        request: request2,
        response
      };
      if (response.ok) {
        const parseAs = (opts.parseAs === "auto" ? getParseAs(response.headers.get("Content-Type")) : opts.parseAs) ?? "json";
        if (response.status === 204 || response.headers.get("Content-Length") === "0") {
          let emptyData;
          switch (parseAs) {
            case "arrayBuffer":
            case "blob":
            case "text":
              emptyData = await response[parseAs]();
              break;
            case "formData":
              emptyData = new FormData();
              break;
            case "stream":
              emptyData = response.body;
              break;
            case "json":
            default:
              emptyData = {};
              break;
          }
          return opts.responseStyle === "data" ? emptyData : {
            data: emptyData,
            ...result
          };
        }
        let data;
        switch (parseAs) {
          case "arrayBuffer":
          case "blob":
          case "formData":
          case "text":
            data = await response[parseAs]();
            break;
          case "json": {
            const text = await response.text();
            data = text ? JSON.parse(text) : {};
            break;
          }
          case "stream":
            return opts.responseStyle === "data" ? response.body : {
              data: response.body,
              ...result
            };
        }
        if (parseAs === "json") {
          if (opts.responseValidator) {
            await opts.responseValidator(data);
          }
          if (opts.responseTransformer) {
            data = await opts.responseTransformer(data);
          }
        }
        return opts.responseStyle === "data" ? data : {
          data,
          ...result
        };
      }
      const textError = await response.text();
      let jsonError;
      try {
        jsonError = JSON.parse(textError);
      } catch {
      }
      throw jsonError ?? textError;
    } catch (error) {
      let finalError = error;
      for (const fn of interceptors.error.fns) {
        if (fn) {
          finalError = await fn(finalError, response, request2, options);
        }
      }
      finalError = finalError || {};
      if (throwOnError) {
        throw finalError;
      }
      return responseStyle === "data" ? void 0 : {
        error: finalError,
        request: request2,
        response
      };
    }
  };
  const makeMethodFn = (method) => (options) => request({ ...options, method });
  const makeSseFn = (method) => async (options) => {
    const { opts, url } = await beforeRequest(options);
    return createSseClient({
      ...opts,
      body: opts.body,
      method,
      onRequest: async (url2, init) => {
        let request2 = new Request(url2, init);
        for (const fn of interceptors.request.fns) {
          if (fn) {
            request2 = await fn(request2, opts);
          }
        }
        return request2;
      },
      serializedBody: getValidRequestBody(opts),
      url
    });
  };
  const _buildUrl = (options) => buildUrl({ ..._config, ...options });
  return {
    buildUrl: _buildUrl,
    connect: makeMethodFn("CONNECT"),
    delete: makeMethodFn("DELETE"),
    get: makeMethodFn("GET"),
    getConfig,
    head: makeMethodFn("HEAD"),
    interceptors,
    options: makeMethodFn("OPTIONS"),
    patch: makeMethodFn("PATCH"),
    post: makeMethodFn("POST"),
    put: makeMethodFn("PUT"),
    request,
    setConfig,
    sse: {
      connect: makeSseFn("CONNECT"),
      delete: makeSseFn("DELETE"),
      get: makeSseFn("GET"),
      head: makeSseFn("HEAD"),
      options: makeSseFn("OPTIONS"),
      patch: makeSseFn("PATCH"),
      post: makeSseFn("POST"),
      put: makeSseFn("PUT"),
      trace: makeSseFn("TRACE")
    },
    trace: makeMethodFn("TRACE")
  };
};

// generated/sdk.gen.ts
var sdk_gen_exports = {};
__export(sdk_gen_exports, {
  addBankBackground: () => addBankBackground,
  auditLogStats: () => auditLogStats,
  cancelOperation: () => cancelOperation,
  clearBankMemories: () => clearBankMemories,
  clearMemoryObservations: () => clearMemoryObservations,
  clearMentalModel: () => clearMentalModel,
  clearObservations: () => clearObservations,
  cloneBank: () => cloneBank,
  createDirective: () => createDirective,
  createKnowledgeFolder: () => createKnowledgeFolder,
  createKnowledgePage: () => createKnowledgePage,
  createMentalModel: () => createMentalModel,
  createOrUpdateBank: () => createOrUpdateBank,
  createWebhook: () => createWebhook,
  deleteBank: () => deleteBank,
  deleteDirective: () => deleteDirective,
  deleteDocument: () => deleteDocument,
  deleteKnowledgeNode: () => deleteKnowledgeNode,
  deleteMentalModel: () => deleteMentalModel,
  deleteOperation: () => deleteOperation,
  deleteWebhook: () => deleteWebhook,
  downloadFile: () => downloadFile,
  dryRunExtractMemories: () => dryRunExtractMemories,
  dryRunRefreshMentalModel: () => dryRunRefreshMentalModel,
  exportBankTemplate: () => exportBankTemplate,
  exportBankTransfer: () => exportBankTransfer,
  exportDocuments: () => exportDocuments,
  exportDocumentsSyncRemoved: () => exportDocumentsSyncRemoved,
  exportKnowledgeBase: () => exportKnowledgeBase,
  fileRetain: () => fileRetain,
  getAgentStats: () => getAgentStats,
  getBankAttachment: () => getBankAttachment,
  getBankConfig: () => getBankConfig,
  getBankProfile: () => getBankProfile,
  getBankTemplateSchema: () => getBankTemplateSchema,
  getChunk: () => getChunk,
  getDirective: () => getDirective,
  getDocument: () => getDocument,
  getEntity: () => getEntity,
  getEntityGraph: () => getEntityGraph,
  getGraph: () => getGraph,
  getKnowledgeBaseTree: () => getKnowledgeBaseTree,
  getKnowledgePage: () => getKnowledgePage,
  getLiveness: () => getLiveness,
  getMemoriesTimeseries: () => getMemoriesTimeseries,
  getMemory: () => getMemory,
  getMentalModel: () => getMentalModel,
  getMentalModelHistory: () => getMentalModelHistory,
  getObservationHistory: () => getObservationHistory,
  getOperationStatus: () => getOperationStatus,
  getReadiness: () => getReadiness,
  getVersion: () => getVersion,
  healthEndpointHealthGet: () => healthEndpointHealthGet,
  importBankTemplate: () => importBankTemplate,
  importBankTransfer: () => importBankTransfer,
  importDocuments: () => importDocuments,
  listAuditLogs: () => listAuditLogs,
  listBanks: () => listBanks,
  listDirectives: () => listDirectives,
  listDocumentChunks: () => listDocumentChunks,
  listDocuments: () => listDocuments,
  listEntities: () => listEntities,
  listLlmRequests: () => listLlmRequests,
  listMemories: () => listMemories,
  listMentalModels: () => listMentalModels,
  listObservationScopes: () => listObservationScopes,
  listOperations: () => listOperations,
  listTags: () => listTags,
  listWebhookDeliveries: () => listWebhookDeliveries,
  listWebhooks: () => listWebhooks,
  llmRequestStats: () => llmRequestStats,
  metricsEndpointMetricsGet: () => metricsEndpointMetricsGet,
  previewPrompt: () => previewPrompt,
  recallMemories: () => recallMemories,
  recoverConsolidation: () => recoverConsolidation,
  reflect: () => reflect,
  refreshMentalModel: () => refreshMentalModel,
  regenerateEntityObservations: () => regenerateEntityObservations,
  reprocessDocument: () => reprocessDocument,
  resetBankConfig: () => resetBankConfig,
  retainMemories: () => retainMemories,
  retryOperation: () => retryOperation,
  searchKnowledgeBase: () => searchKnowledgeBase,
  testBankLlm: () => testBankLlm,
  triggerConsolidation: () => triggerConsolidation,
  updateBank: () => updateBank,
  updateBankConfig: () => updateBankConfig,
  updateBankDisposition: () => updateBankDisposition,
  updateDirective: () => updateDirective,
  updateDocument: () => updateDocument,
  updateKnowledgeNode: () => updateKnowledgeNode,
  updateMemory: () => updateMemory,
  updateMentalModel: () => updateMentalModel,
  updateWebhook: () => updateWebhook
});

// generated/client.gen.ts
var client = createClient(createConfig());

// generated/sdk.gen.ts
var healthEndpointHealthGet = (options) => (options?.client ?? client).get({
  url: "/health",
  ...options
});
var getReadiness = (options) => (options?.client ?? client).get({
  url: "/health/ready",
  ...options
});
var getLiveness = (options) => (options?.client ?? client).get({
  url: "/health/live",
  ...options
});
var getVersion = (options) => (options?.client ?? client).get({
  url: "/version",
  ...options
});
var metricsEndpointMetricsGet = (options) => (options?.client ?? client).get({
  url: "/metrics",
  ...options
});
var getGraph = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/graph",
  ...options
});
var listMemories = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/memories/list",
  ...options
});
var dryRunExtractMemories = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/memories/dry-run-extract",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var previewPrompt = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/prompts/preview",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var getMemory = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/memories/{memory_id}",
  ...options
});
var updateMemory = (options) => (options.client ?? client).patch({
  url: "/v1/default/banks/{bank_id}/memories/{memory_id}",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var getObservationHistory = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/memories/{memory_id}/history", ...options });
var recallMemories = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/memories/recall",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var reflect = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/reflect",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var listBanks = (options) => (options?.client ?? client).get({
  url: "/v1/default/banks",
  ...options
});
var getAgentStats = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/stats",
  ...options
});
var testBankLlm = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/health/llm",
  ...options
});
var getMemoriesTimeseries = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/stats/memories-timeseries", ...options });
var listEntities = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/entities",
  ...options
});
var getEntityGraph = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/entities/graph",
  ...options
});
var getEntity = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/entities/{entity_id}",
  ...options
});
var regenerateEntityObservations = (options) => (options.client ?? client).post({ url: "/v1/default/banks/{bank_id}/entities/{entity_id}/regenerate", ...options });
var listMentalModels = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/mental-models",
  ...options
});
var createMentalModel = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/mental-models",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var deleteMentalModel = (options) => (options.client ?? client).delete({ url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}", ...options });
var getMentalModel = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}",
  ...options
});
var updateMentalModel = (options) => (options.client ?? client).patch({
  url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var getMentalModelHistory = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}/history", ...options });
var refreshMentalModel = (options) => (options.client ?? client).post({ url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}/refresh", ...options });
var dryRunRefreshMentalModel = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}/dry-run-refresh",
  ...options
});
var clearMentalModel = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/mental-models/{mental_model_id}/clear",
  ...options
});
var getKnowledgeBaseTree = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/knowledge-base/tree", ...options });
var createKnowledgeFolder = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/knowledge-base/folders",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var createKnowledgePage = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/knowledge-base/pages",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var exportKnowledgeBase = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/knowledge-base/export", ...options });
var searchKnowledgeBase = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/knowledge-base/search", ...options });
var getKnowledgePage = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/knowledge-base/pages/{page_id}",
  ...options
});
var deleteKnowledgeNode = (options) => (options.client ?? client).delete({ url: "/v1/default/banks/{bank_id}/knowledge-base/nodes/{node_id}", ...options });
var updateKnowledgeNode = (options) => (options.client ?? client).patch({
  url: "/v1/default/banks/{bank_id}/knowledge-base/nodes/{node_id}",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var listDirectives = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/directives",
  ...options
});
var createDirective = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/directives",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var deleteDirective = (options) => (options.client ?? client).delete({
  url: "/v1/default/banks/{bank_id}/directives/{directive_id}",
  ...options
});
var getDirective = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/directives/{directive_id}",
  ...options
});
var updateDirective = (options) => (options.client ?? client).patch({
  url: "/v1/default/banks/{bank_id}/directives/{directive_id}",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var listDocuments = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/documents",
  ...options
});
var listDocumentChunks = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/documents/{document_id}/chunks", ...options });
var reprocessDocument = (options) => (options.client ?? client).post({ url: "/v1/default/banks/{bank_id}/documents/{document_id}/reprocess", ...options });
var deleteDocument = (options) => (options.client ?? client).delete({
  url: "/v1/default/banks/{bank_id}/documents/{document_id}",
  ...options
});
var getDocument = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/documents/{document_id}",
  ...options
});
var updateDocument = (options) => (options.client ?? client).patch({
  url: "/v1/default/banks/{bank_id}/documents/{document_id}",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var listTags = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/tags",
  ...options
});
var getChunk = (options) => (options.client ?? client).get({
  url: "/v1/default/chunks/{chunk_id}",
  ...options
});
var listOperations = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/operations",
  ...options
});
var cancelOperation = (options) => (options.client ?? client).delete({
  url: "/v1/default/banks/{bank_id}/operations/{operation_id}",
  ...options
});
var getOperationStatus = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/operations/{operation_id}", ...options });
var retryOperation = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/operations/{operation_id}/retry",
  ...options
});
var deleteOperation = (options) => (options.client ?? client).delete({
  url: "/v1/default/banks/{bank_id}/operations/{operation_id}/delete",
  ...options
});
var getBankProfile = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/profile",
  ...options
});
var updateBankDisposition = (options) => (options.client ?? client).put({
  url: "/v1/default/banks/{bank_id}/profile",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var addBankBackground = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/background",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var deleteBank = (options) => (options.client ?? client).delete({
  url: "/v1/default/banks/{bank_id}",
  ...options
});
var updateBank = (options) => (options.client ?? client).patch({
  url: "/v1/default/banks/{bank_id}",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var createOrUpdateBank = (options) => (options.client ?? client).put({
  url: "/v1/default/banks/{bank_id}",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var importBankTemplate = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/import",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var exportBankTemplate = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/export", ...options });
var exportDocumentsSyncRemoved = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/document-transfer", ...options });
var importDocuments = (options) => (options.client ?? client).post({
  ...formDataBodySerializer,
  url: "/v1/default/banks/{bank_id}/document-transfer",
  ...options,
  headers: {
    "Content-Type": null,
    ...options.headers
  }
});
var exportDocuments = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/document-transfer/export",
  ...options
});
var exportBankTransfer = (options) => (options.client ?? client).post({ url: "/v1/default/banks/{bank_id}/transfer/export", ...options });
var importBankTransfer = (options) => (options.client ?? client).post({
  ...formDataBodySerializer,
  url: "/v1/default/banks/{bank_id}/transfer/import",
  ...options,
  headers: {
    "Content-Type": null,
    ...options.headers
  }
});
var cloneBank = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/clone",
  ...options
});
var getBankAttachment = (options) => (options.client ?? client).get(
  { url: "/v1/default/banks/{bank_id}/attachments/{attachment_id}", ...options }
);
var downloadFile = (options) => (options.client ?? client).get({
  url: "/v1/default/files/download/{key}",
  ...options
});
var getBankTemplateSchema = (options) => (options?.client ?? client).get({
  url: "/v1/bank-template-schema",
  ...options
});
var clearObservations = (options) => (options.client ?? client).delete({ url: "/v1/default/banks/{bank_id}/observations", ...options });
var listObservationScopes = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/observations/scopes", ...options });
var recoverConsolidation = (options) => (options.client ?? client).post({ url: "/v1/default/banks/{bank_id}/consolidation/recover", ...options });
var clearMemoryObservations = (options) => (options.client ?? client).delete({ url: "/v1/default/banks/{bank_id}/memories/{memory_id}/observations", ...options });
var resetBankConfig = (options) => (options.client ?? client).delete({
  url: "/v1/default/banks/{bank_id}/config",
  ...options
});
var getBankConfig = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/config",
  ...options
});
var updateBankConfig = (options) => (options.client ?? client).patch(
  {
    url: "/v1/default/banks/{bank_id}/config",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  }
);
var triggerConsolidation = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/consolidate",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var listWebhooks = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/webhooks",
  ...options
});
var createWebhook = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/webhooks",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var deleteWebhook = (options) => (options.client ?? client).delete({
  url: "/v1/default/banks/{bank_id}/webhooks/{webhook_id}",
  ...options
});
var updateWebhook = (options) => (options.client ?? client).patch({
  url: "/v1/default/banks/{bank_id}/webhooks/{webhook_id}",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var listWebhookDeliveries = (options) => (options.client ?? client).get({ url: "/v1/default/banks/{bank_id}/webhooks/{webhook_id}/deliveries", ...options });
var clearBankMemories = (options) => (options.client ?? client).delete({ url: "/v1/default/banks/{bank_id}/memories", ...options });
var retainMemories = (options) => (options.client ?? client).post({
  url: "/v1/default/banks/{bank_id}/memories",
  ...options,
  headers: {
    "Content-Type": "application/json",
    ...options.headers
  }
});
var fileRetain = (options) => (options.client ?? client).post({
  ...formDataBodySerializer,
  url: "/v1/default/banks/{bank_id}/files/retain",
  ...options,
  headers: {
    "Content-Type": null,
    ...options.headers
  }
});
var listAuditLogs = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/audit-logs",
  ...options
});
var auditLogStats = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/audit-logs/stats",
  ...options
});
var listLlmRequests = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/llm-requests",
  ...options
});
var llmRequestStats = (options) => (options.client ?? client).get({
  url: "/v1/default/banks/{bank_id}/llm-requests/stats",
  ...options
});

// src/index.ts
var CLIENT_VERSION = true ? "0.10.1" : "0.0.0-dev";
var DEFAULT_USER_AGENT = `hindsight-client-typescript/${CLIENT_VERSION}`;
var DEFAULT_MAX_ATTEMPTS = 3;
var FALLBACK_BACKOFF_MS = 500;
function retryAfterMs(response) {
  const raw = response?.headers?.get("retry-after");
  if (raw === null || raw === void 0) return null;
  const seconds = Number(raw);
  if (!Number.isFinite(seconds)) return null;
  return Math.max(0, seconds * 1e3);
}
async function retryOnCapacity(send, maxAttempts, random = Math.random, signal) {
  signal?.throwIfAborted();
  let result = await send();
  signal?.throwIfAborted();
  for (let attempt = 1; attempt < maxAttempts; attempt++) {
    const status = result.response?.status;
    if (status !== 429 && status !== 503) return result;
    const wait = retryAfterMs(result.response) ?? FALLBACK_BACKOFF_MS * 2 ** (attempt - 1);
    await new Promise((resolve, reject) => {
      const onAbort = () => {
        clearTimeout(timer);
        signal?.removeEventListener("abort", onAbort);
        reject(signal?.reason);
      };
      const timer = setTimeout(() => {
        signal?.removeEventListener("abort", onAbort);
        resolve();
      }, random() * wait);
      signal?.addEventListener("abort", onAbort, { once: true });
      if (signal?.aborted) onAbort();
    });
    signal?.throwIfAborted();
    result = await send();
    signal?.throwIfAborted();
  }
  return result;
}
var HindsightError = class extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = "HindsightError";
    this.statusCode = statusCode;
    this.details = details;
  }
};
function toTriggerBody(trigger) {
  return {
    mode: trigger.mode,
    refresh_after_consolidation: trigger.refreshAfterConsolidation,
    refresh_cron: trigger.refreshCron,
    min_refresh_interval_seconds: trigger.minRefreshIntervalSeconds,
    fact_types: trigger.factTypes,
    exclude_mental_models: trigger.excludeMentalModels,
    exclude_mental_model_ids: trigger.excludeMentalModelIds,
    tags_match: trigger.tagsMatch,
    tag_groups: trigger.tagGroups,
    include_chunks: trigger.includeChunks,
    recall_max_tokens: trigger.recallMaxTokens,
    recall_chunks_max_tokens: trigger.recallChunksMaxTokens,
    response_schema: trigger.responseSchema,
    keep_trace: trigger.keepTrace
  };
}
function warnIfOperationIdDropped(async, operationId) {
  if (operationId != null && async !== true) {
    console.warn(
      "operationId is ignored for synchronous retain; pass async: true to enable idempotent retries."
    );
  }
}
var HindsightClient = class {
  constructor(options) {
    const headers = {
      ...options.headers,
      "User-Agent": options.userAgent ?? DEFAULT_USER_AGENT
    };
    if (options.apiKey) {
      headers.Authorization = `Bearer ${options.apiKey}`;
    }
    this.client = createClient(
      createConfig({
        baseUrl: options.baseUrl,
        headers
      })
    );
    this.maxAttempts = Math.max(1, options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS);
  }
  /**
   * Get API version and feature flags for the connected Hindsight deployment.
   */
  async getVersion(options) {
    const response = await getVersion({
      client: this.client,
      signal: options?.signal
    });
    return this.validateResponse(response, "getVersion");
  }
  /**
   * Validates the API response and throws an error if the request failed.
   */
  validateResponse(response, operation) {
    if (!response.data) {
      const error = response.error;
      const httpResponse = response.response;
      const statusCode = httpResponse?.status;
      const details = error?.detail || error?.message || error;
      throw new HindsightError(
        `${operation} failed: ${JSON.stringify(details)}`,
        statusCode,
        details
      );
    }
    return response.data;
  }
  /**
   * Retain a single memory for a bank.
   */
  async retain(bankId, content, options) {
    warnIfOperationIdDropped(options?.async, options?.operationId);
    return this.retainBatch(
      bankId,
      [
        {
          content,
          timestamp: options?.timestamp,
          context: options?.context,
          metadata: options?.metadata,
          document_id: options?.documentId,
          entities: options?.entities,
          resolve_entities: options?.resolveEntities,
          tags: options?.tags,
          update_mode: options?.updateMode,
          observation_scopes: options?.observationScopes,
          strategy: options?.strategy
        }
      ],
      {
        async: options?.async,
        signal: options?.signal,
        ...options?.async === true && options.operationId != null ? { operationId: options.operationId } : {}
      }
    );
  }
  /**
   * Retain multiple memories in batch.
   */
  async retainBatch(bankId, items, options) {
    warnIfOperationIdDropped(options?.async, options?.operationId);
    const processedItems = items.map((item) => ({
      content: item.content,
      context: item.context,
      metadata: item.metadata,
      document_id: item.document_id,
      entities: item.entities,
      resolve_entities: item.resolve_entities,
      tags: item.tags,
      observation_scopes: item.observation_scopes,
      strategy: item.strategy,
      update_mode: item.update_mode,
      timestamp: item.timestamp instanceof Date ? item.timestamp.toISOString() : item.timestamp
    }));
    const itemsWithDocId = processedItems.map((item) => ({
      ...item,
      document_id: item.document_id || options?.documentId
    }));
    const response = await retainMemories({
      client: this.client,
      path: { bank_id: bankId },
      body: {
        items: itemsWithDocId,
        document_tags: options?.documentTags,
        async: options?.async,
        ...options?.async === true && options.operationId != null ? { operation_id: options.operationId } : {}
      },
      signal: options?.signal
    });
    return this.validateResponse(response, "retainBatch");
  }
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
  async retainFiles(bankId, files, options) {
    const meta = options?.filesMetadata ?? files.map(() => options?.context ? { context: options.context } : {});
    const requestBody = JSON.stringify({
      files_metadata: meta
    });
    const response = await fileRetain({
      client: this.client,
      path: { bank_id: bankId },
      body: { files, request: requestBody },
      signal: options?.signal
    });
    return this.validateResponse(response, "retainFiles");
  }
  /**
   * Recall memories with a natural language query.
   */
  async recall(bankId, query, options) {
    const response = await retryOnCapacity(
      () => recallMemories({
        client: this.client,
        path: { bank_id: bankId },
        body: {
          query,
          types: options?.types,
          prefer_observations: options?.preferObservations,
          max_tokens: options?.maxTokens,
          budget: options?.budget || "mid",
          trace: options?.trace,
          query_timestamp: options?.queryTimestamp,
          include: {
            entities: options?.includeEntities === false ? null : options?.includeEntities ? { max_tokens: options?.maxEntityTokens ?? 500 } : void 0,
            chunks: options?.includeChunks ? { max_tokens: options?.maxChunkTokens ?? 8192 } : void 0,
            source_facts: options?.includeSourceFacts ? { max_tokens: options?.maxSourceFactsTokens ?? 4096 } : void 0
          },
          tags: options?.tags,
          tags_match: options?.tagsMatch,
          tag_groups: options?.tagGroups,
          min_scores: options?.minScores,
          temporal_window: options?.temporalWindow
        },
        signal: options?.signal
      }),
      this.maxAttempts,
      Math.random,
      options?.signal
    );
    return this.validateResponse(response, "recall");
  }
  /**
   * Reflect and generate a contextual answer using the bank's identity and memories.
   */
  async reflect(bankId, query, options) {
    const include = options?.includeFacts || options?.includeToolCalls ? {
      facts: options?.includeFacts ? {} : void 0,
      tool_calls: options?.includeToolCalls ? { output: options?.includeToolCallOutput ?? true } : void 0
    } : void 0;
    const response = await retryOnCapacity(
      () => reflect({
        client: this.client,
        path: { bank_id: bankId },
        body: {
          query,
          context: options?.context,
          budget: options?.budget || "low",
          tags: options?.tags,
          tags_match: options?.tagsMatch,
          tag_groups: options?.tagGroups,
          apply_all_directives: options?.applyAllDirectives,
          response_schema: options?.responseSchema,
          fact_types: options?.factTypes,
          exclude_mental_models: options?.excludeMentalModels,
          exclude_mental_model_ids: options?.excludeMentalModelIds,
          reflect_search_observations_max_tokens: options?.reflectSearchObservationsMaxTokens,
          reflect_search_observations_include_entities: options?.reflectSearchObservationsIncludeEntities,
          include
        },
        signal: options?.signal
      }),
      this.maxAttempts,
      Math.random,
      options?.signal
    );
    return this.validateResponse(response, "reflect");
  }
  /**
   * List memories with pagination.
   */
  async listMemories(bankId, options) {
    const response = await listMemories({
      client: this.client,
      path: { bank_id: bankId },
      query: {
        limit: options?.limit,
        offset: options?.offset,
        type: options?.type,
        q: options?.q,
        consolidation_state: options?.consolidationState,
        state: options?.state,
        document_id: options?.documentId,
        entity_id: options?.entityId,
        time_field: options?.timeField,
        start_date: options?.startDate,
        end_date: options?.endDate
      },
      signal: options?.signal
    });
    return this.validateResponse(response, "listMemories");
  }
  /**
   * Create or update a bank with disposition, missions, and operational configuration.
   */
  async createBank(bankId, options = {}) {
    const response = await createOrUpdateBank({
      client: this.client,
      path: { bank_id: bankId },
      body: {
        name: options.name,
        mission: options.mission,
        reflect_mission: options.reflectMission,
        background: options.background,
        disposition: options.disposition,
        disposition_skepticism: options.dispositionSkepticism,
        disposition_literalism: options.dispositionLiteralism,
        disposition_empathy: options.dispositionEmpathy,
        retain_mission: options.retainMission,
        retain_extraction_mode: options.retainExtractionMode,
        retain_custom_instructions: options.retainCustomInstructions,
        retain_chunk_size: options.retainChunkSize,
        retain_structured_chunk_size: options.retainStructuredChunkSize,
        retain_max_attachments_per_chunk: options.retainMaxAttachmentsPerChunk,
        enable_observations: options.enableObservations,
        observations_mission: options.observationsMission,
        enable_text_search: options.enableTextSearch,
        enable_temporal_retrieval: options.enableTemporalRetrieval,
        enable_graph_retrieval: options.enableGraphRetrieval,
        enable_reranking: options.enableReranking
      },
      signal: options.signal
    });
    return this.validateResponse(response, "createBank");
  }
  /**
   * Set or update the reflect mission for a memory bank.
   * @deprecated Use createBank({ reflectMission: '...' }) instead.
   */
  async setMission(bankId, mission, options) {
    return this.createBank(bankId, { reflectMission: mission, signal: options?.signal });
  }
  /**
   * Get a bank's profile.
   *
   * @deprecated Removed server-side — the endpoint answers 410. Disposition traits and
   * the reflect mission are bank configuration: use {@link getBankConfig} and read
   * `disposition_skepticism`, `disposition_literalism`, `disposition_empathy` and
   * `reflect_mission`. The bank's display label, which was itself deprecated, is on
   * `GET /v1/default/banks` — this wrapper exposes no bank listing.
   */
  async getBankProfile(bankId, options) {
    const response = await getBankProfile({
      client: this.client,
      path: { bank_id: bankId },
      signal: options?.signal
    });
    return this.validateResponse(response, "getBankProfile");
  }
  /**
   * Get the resolved configuration for a bank, including any bank-level overrides.
   *
   * Always available: `HINDSIGHT_API_ENABLE_BANK_CONFIG_API=false` disables only the
   * config writes, not this read.
   */
  async getBankConfig(bankId, options) {
    const response = await getBankConfig({
      client: this.client,
      path: { bank_id: bankId },
      signal: options?.signal
    });
    return this.validateResponse(response, "getBankConfig");
  }
  /**
   * Update configuration overrides for a bank.
   *
   * Can be disabled on the server by setting `HINDSIGHT_API_ENABLE_BANK_CONFIG_API=false`.
   *
   * @param bankId - The memory bank ID
   * @param options - Fields to override
   */
  async updateBankConfig(bankId, options) {
    const updates = {};
    if (options.reflectMission !== void 0) updates.reflect_mission = options.reflectMission;
    if (options.retainMission !== void 0) updates.retain_mission = options.retainMission;
    if (options.retainExtractionMode !== void 0)
      updates.retain_extraction_mode = options.retainExtractionMode;
    if (options.retainCustomInstructions !== void 0)
      updates.retain_custom_instructions = options.retainCustomInstructions;
    if (options.retainChunkSize !== void 0) updates.retain_chunk_size = options.retainChunkSize;
    if (options.retainStructuredChunkSize !== void 0)
      updates.retain_structured_chunk_size = options.retainStructuredChunkSize;
    if (options.retainMaxAttachmentsPerChunk !== void 0)
      updates.retain_max_attachments_per_chunk = options.retainMaxAttachmentsPerChunk;
    if (options.entityLabels !== void 0) updates.entity_labels = options.entityLabels;
    if (options.entitiesAllowFreeForm !== void 0)
      updates.entities_allow_free_form = options.entitiesAllowFreeForm;
    if (options.enableObservations !== void 0)
      updates.enable_observations = options.enableObservations;
    if (options.observationsMission !== void 0)
      updates.observations_mission = options.observationsMission;
    if (options.enableTextSearch !== void 0)
      updates.enable_text_search = options.enableTextSearch;
    if (options.enableTemporalRetrieval !== void 0)
      updates.enable_temporal_retrieval = options.enableTemporalRetrieval;
    if (options.enableGraphRetrieval !== void 0)
      updates.enable_graph_retrieval = options.enableGraphRetrieval;
    if (options.enableReranking !== void 0) updates.enable_reranking = options.enableReranking;
    if (options.dispositionSkepticism !== void 0)
      updates.disposition_skepticism = options.dispositionSkepticism;
    if (options.dispositionLiteralism !== void 0)
      updates.disposition_literalism = options.dispositionLiteralism;
    if (options.dispositionEmpathy !== void 0)
      updates.disposition_empathy = options.dispositionEmpathy;
    if (options.retainDefaultStrategy !== void 0)
      updates.retain_default_strategy = options.retainDefaultStrategy;
    if (options.retainStrategies !== void 0)
      updates.retain_strategies = options.retainStrategies;
    if (options.retainChunkBatchSize !== void 0)
      updates.retain_chunk_batch_size = options.retainChunkBatchSize;
    if (options.storeDocumentText !== void 0)
      updates.store_document_text = options.storeDocumentText;
    if (options.maxObservationsPerScope !== void 0)
      updates.max_observations_per_scope = options.maxObservationsPerScope;
    if (options.observationScopeLimits !== void 0)
      updates.observation_scope_limits = options.observationScopeLimits;
    if (options.enableAutoConsolidation !== void 0)
      updates.enable_auto_consolidation = options.enableAutoConsolidation;
    if (options.consolidationLlmBatchSize !== void 0)
      updates.consolidation_llm_batch_size = options.consolidationLlmBatchSize;
    if (options.consolidationLlmParallelism !== void 0)
      updates.consolidation_llm_parallelism = options.consolidationLlmParallelism;
    if (options.consolidationMaxMemoriesPerRound !== void 0)
      updates.consolidation_max_memories_per_round = options.consolidationMaxMemoriesPerRound;
    if (options.consolidationSourceFactsMaxTokens !== void 0)
      updates.consolidation_source_facts_max_tokens = options.consolidationSourceFactsMaxTokens;
    if (options.consolidationSourceFactsMaxTokensPerObservation !== void 0)
      updates.consolidation_source_facts_max_tokens_per_observation = options.consolidationSourceFactsMaxTokensPerObservation;
    if (options.mentalModelMinRefreshIntervalSeconds !== void 0)
      updates.mental_model_min_refresh_interval_seconds = options.mentalModelMinRefreshIntervalSeconds;
    if (options.knowledgePageDefaultTrigger !== void 0)
      updates.knowledge_page_default_trigger = options.knowledgePageDefaultTrigger;
    if (options.reflectDefaultOptions !== void 0)
      updates.reflect_default_options = options.reflectDefaultOptions;
    if (options.reflectSourceFactsMaxTokens !== void 0)
      updates.reflect_source_facts_max_tokens = options.reflectSourceFactsMaxTokens;
    if (options.recallMaxTokens !== void 0) updates.recall_max_tokens = options.recallMaxTokens;
    if (options.recallIncludeChunks !== void 0)
      updates.recall_include_chunks = options.recallIncludeChunks;
    if (options.recallChunksMaxTokens !== void 0)
      updates.recall_chunks_max_tokens = options.recallChunksMaxTokens;
    if (options.recallBudgetFunction !== void 0)
      updates.recall_budget_function = options.recallBudgetFunction;
    if (options.recallBudgetFixedLow !== void 0)
      updates.recall_budget_fixed_low = options.recallBudgetFixedLow;
    if (options.recallBudgetFixedMid !== void 0)
      updates.recall_budget_fixed_mid = options.recallBudgetFixedMid;
    if (options.recallBudgetFixedHigh !== void 0)
      updates.recall_budget_fixed_high = options.recallBudgetFixedHigh;
    if (options.recallBudgetAdaptiveLow !== void 0)
      updates.recall_budget_adaptive_low = options.recallBudgetAdaptiveLow;
    if (options.recallBudgetAdaptiveMid !== void 0)
      updates.recall_budget_adaptive_mid = options.recallBudgetAdaptiveMid;
    if (options.recallBudgetAdaptiveHigh !== void 0)
      updates.recall_budget_adaptive_high = options.recallBudgetAdaptiveHigh;
    if (options.recallBudgetMin !== void 0) updates.recall_budget_min = options.recallBudgetMin;
    if (options.recallBudgetMax !== void 0) updates.recall_budget_max = options.recallBudgetMax;
    if (options.mcpEnabledTools !== void 0) updates.mcp_enabled_tools = options.mcpEnabledTools;
    if (options.llmGeminiSafetySettings !== void 0)
      updates.llm_gemini_safety_settings = options.llmGeminiSafetySettings;
    if (options.memoryDefense !== void 0) updates.memory_defense = options.memoryDefense;
    if (options.auditLogEnabled !== void 0) updates.audit_log_enabled = options.auditLogEnabled;
    const response = await updateBankConfig({
      client: this.client,
      path: { bank_id: bankId },
      body: { updates },
      signal: options.signal
    });
    return this.validateResponse(response, "updateBankConfig");
  }
  /**
   * Reset all bank-level configuration overrides, reverting to server defaults.
   *
   * Can be disabled on the server by setting `HINDSIGHT_API_ENABLE_BANK_CONFIG_API=false`.
   */
  async resetBankConfig(bankId, options) {
    const response = await resetBankConfig({
      client: this.client,
      path: { bank_id: bankId },
      signal: options?.signal
    });
    return this.validateResponse(response, "resetBankConfig");
  }
  /**
   * Delete a bank.
   */
  async deleteBank(bankId, options) {
    const response = await deleteBank({
      client: this.client,
      path: { bank_id: bankId },
      signal: options?.signal
    });
    if (response.error) {
      throw new Error(`deleteBank failed: ${JSON.stringify(response.error)}`);
    }
  }
  // Directive methods
  /**
   * Create a directive (hard rule for reflect).
   */
  async createDirective(bankId, name, content, options) {
    const response = await createDirective({
      client: this.client,
      path: { bank_id: bankId },
      body: {
        name,
        content,
        priority: options?.priority ?? 0,
        is_active: options?.isActive ?? true,
        tags: options?.tags
      },
      signal: options?.signal
    });
    return this.validateResponse(response, "createDirective");
  }
  /**
   * List all directives in a bank.
   */
  async listDirectives(bankId, options) {
    const response = await listDirectives({
      client: this.client,
      path: { bank_id: bankId },
      query: {
        tags: options?.tags,
        ...options?.limit !== void 0 ? { limit: options.limit } : {},
        ...options?.offset !== void 0 ? { offset: options.offset } : {}
      },
      signal: options?.signal
    });
    return this.validateResponse(response, "listDirectives");
  }
  /**
   * Get a specific directive.
   */
  async getDirective(bankId, directiveId, options) {
    const response = await getDirective({
      client: this.client,
      path: { bank_id: bankId, directive_id: directiveId },
      signal: options?.signal
    });
    return this.validateResponse(response, "getDirective");
  }
  /**
   * Update a directive.
   */
  async updateDirective(bankId, directiveId, options) {
    const response = await updateDirective({
      client: this.client,
      path: { bank_id: bankId, directive_id: directiveId },
      body: {
        name: options.name,
        content: options.content,
        priority: options.priority,
        is_active: options.isActive,
        tags: options.tags
      },
      signal: options.signal
    });
    return this.validateResponse(response, "updateDirective");
  }
  /**
   * Delete a directive.
   */
  async deleteDirective(bankId, directiveId, options) {
    const response = await deleteDirective({
      client: this.client,
      path: { bank_id: bankId, directive_id: directiveId },
      signal: options?.signal
    });
    if (response.error) {
      throw new Error(`deleteDirective failed: ${JSON.stringify(response.error)}`);
    }
  }
  // Mental Model methods
  /**
   * Create a mental model (runs reflect in background).
   */
  async createMentalModel(bankId, name, sourceQuery, options) {
    const response = await createMentalModel({
      client: this.client,
      path: { bank_id: bankId },
      body: {
        id: options?.id,
        name,
        source_query: sourceQuery,
        tags: options?.tags,
        max_tokens: options?.maxTokens,
        trigger: options?.trigger ? toTriggerBody(options.trigger) : void 0
      },
      signal: options?.signal
    });
    return this.validateResponse(response, "createMentalModel");
  }
  /**
   * List all mental models in a bank.
   *
   * The endpoint defaults to `detail: "metadata"`, so `content`, `source_query`,
   * `max_tokens` and `trigger` come back null unless you ask for them.
   */
  async listMentalModels(bankId, options) {
    const response = await listMentalModels({
      client: this.client,
      path: { bank_id: bankId },
      query: {
        tags: options?.tags,
        ...options?.tagsMatch !== void 0 ? { tags_match: options.tagsMatch } : {},
        ...options?.detail !== void 0 ? { detail: options.detail } : {},
        ...options?.limit !== void 0 ? { limit: options.limit } : {},
        ...options?.offset !== void 0 ? { offset: options.offset } : {}
      },
      signal: options?.signal
    });
    return this.validateResponse(response, "listMentalModels");
  }
  /**
   * Get a specific mental model.
   */
  async getMentalModel(bankId, mentalModelId, options) {
    const response = await getMentalModel({
      client: this.client,
      path: { bank_id: bankId, mental_model_id: mentalModelId },
      ...options?.detail ? { query: { detail: options.detail } } : {},
      signal: options?.signal
    });
    return this.validateResponse(response, "getMentalModel");
  }
  /**
   * Refresh a mental model to update with current knowledge.
   */
  async refreshMentalModel(bankId, mentalModelId, options) {
    const response = await refreshMentalModel({
      client: this.client,
      path: { bank_id: bankId, mental_model_id: mentalModelId },
      signal: options?.signal
    });
    return this.validateResponse(response, "refreshMentalModel");
  }
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
  async dryRunRefreshMentalModel(bankId, mentalModelId, options) {
    const response = await dryRunRefreshMentalModel({
      client: this.client,
      path: { bank_id: bankId, mental_model_id: mentalModelId },
      signal: options?.signal
    });
    return this.validateResponse(response, "dryRunRefreshMentalModel");
  }
  /**
   * Clear a mental model's content so the next refresh performs a full re-synthesis.
   */
  async clearMentalModel(bankId, mentalModelId, options) {
    const response = await clearMentalModel({
      client: this.client,
      path: { bank_id: bankId, mental_model_id: mentalModelId },
      signal: options?.signal
    });
    return this.validateResponse(response, "clearMentalModel");
  }
  /**
   * Update a mental model's metadata.
   */
  async updateMentalModel(bankId, mentalModelId, options) {
    const response = await updateMentalModel({
      client: this.client,
      path: { bank_id: bankId, mental_model_id: mentalModelId },
      body: {
        name: options.name,
        source_query: options.sourceQuery,
        tags: options.tags,
        max_tokens: options.maxTokens,
        trigger: options.trigger ? toTriggerBody(options.trigger) : void 0
      },
      signal: options.signal
    });
    return this.validateResponse(response, "updateMentalModel");
  }
  /**
   * Delete a mental model.
   */
  async deleteMentalModel(bankId, mentalModelId, options) {
    const response = await deleteMentalModel({
      client: this.client,
      path: { bank_id: bankId, mental_model_id: mentalModelId },
      signal: options?.signal
    });
    if (response.error) {
      throw new Error(`deleteMentalModel failed: ${JSON.stringify(response.error)}`);
    }
  }
  /**
   * Get the change history of a mental model.
   */
  async getMentalModelHistory(bankId, mentalModelId, options) {
    const response = await getMentalModelHistory({
      client: this.client,
      path: { bank_id: bankId, mental_model_id: mentalModelId },
      signal: options?.signal
    });
    return this.validateResponse(response, "getMentalModelHistory");
  }
  /**
   * Get the knowledge base as a nested folder/page tree.
   *
   * Page bodies are not included — fetch one with `getKnowledgePage`.
   */
  async getKnowledgeBaseTree(bankId, options) {
    const response = await getKnowledgeBaseTree({
      client: this.client,
      path: { bank_id: bankId },
      signal: options?.signal
    });
    return this.validateResponse(response, "getKnowledgeBaseTree");
  }
  /**
   * Create a knowledge-base folder.
   */
  async createKnowledgeFolder(bankId, name, options) {
    const response = await createKnowledgeFolder({
      client: this.client,
      path: { bank_id: bankId },
      body: { name, parent_id: options?.parentId },
      signal: options?.signal
    });
    return this.validateResponse(response, "createKnowledgeFolder");
  }
  /**
   * Create a knowledge-base page. Content is generated asynchronously — poll the
   * returned `operation_id` to know when the first build has finished.
   *
   * Omit `trigger` to use the page defaults (observation-only, delta mode,
   * refresh after consolidation); a supplied trigger is applied as a patch over
   * them, so the fields you leave out keep their defaults.
   */
  async createKnowledgePage(bankId, name, sourceQuery, options) {
    const response = await createKnowledgePage({
      client: this.client,
      path: { bank_id: bankId },
      body: {
        name,
        source_query: sourceQuery,
        parent_id: options?.parentId,
        tags: options?.tags,
        max_tokens: options?.maxTokens,
        trigger: options?.trigger ? toTriggerBody(options.trigger) : void 0
      },
      signal: options?.signal
    });
    return this.validateResponse(response, "createKnowledgePage");
  }
  /**
   * Get a knowledge page rendered as a markdown document (frontmatter + body).
   */
  async getKnowledgePage(bankId, pageId, options) {
    const response = await getKnowledgePage({
      client: this.client,
      path: { bank_id: bankId, page_id: pageId },
      signal: options?.signal
    });
    return this.validateResponse(response, "getKnowledgePage");
  }
  /**
   * Hybrid search (full-text + vector) over the bank's knowledge pages.
   */
  async searchKnowledgeBase(bankId, query, options) {
    const response = await searchKnowledgeBase({
      client: this.client,
      path: { bank_id: bankId },
      query: {
        q: query,
        ...options?.limit !== void 0 ? { limit: options.limit } : {}
      },
      signal: options?.signal
    });
    return this.validateResponse(response, "searchKnowledgeBase");
  }
  /**
   * Rename/move a knowledge node and/or update a page's options.
   *
   * Only the fields present in `options` are sent, so passing `parentId: null`
   * explicitly moves the node to the root.
   */
  async updateKnowledgeNode(bankId, nodeId, options) {
    const response = await updateKnowledgeNode({
      client: this.client,
      path: { bank_id: bankId, node_id: nodeId },
      body: {
        ...options.name !== void 0 ? { name: options.name } : {},
        ..."parentId" in options ? { parent_id: options.parentId } : {},
        ...options.sourceQuery !== void 0 ? { source_query: options.sourceQuery } : {},
        ...options.tags !== void 0 ? { tags: options.tags } : {},
        ...options.maxTokens !== void 0 ? { max_tokens: options.maxTokens } : {},
        ...options.trigger !== void 0 ? { trigger: options.trigger } : {}
      },
      signal: options.signal
    });
    return this.validateResponse(response, "updateKnowledgeNode");
  }
  /**
   * Delete a knowledge folder or page and its whole subtree.
   */
  async deleteKnowledgeNode(bankId, nodeId, options) {
    const response = await deleteKnowledgeNode({
      client: this.client,
      path: { bank_id: bankId, node_id: nodeId },
      signal: options?.signal
    });
    return this.validateResponse(response, "deleteKnowledgeNode");
  }
  /**
   * Export the knowledge base as a portable markdown bundle.
   */
  async exportKnowledgeBase(bankId, options) {
    const response = await exportKnowledgeBase({
      client: this.client,
      path: { bank_id: bankId },
      signal: options?.signal
    });
    return this.validateResponse(response, "exportKnowledgeBase");
  }
  /**
   * Get a document by ID. Returns null if not found.
   */
  async getDocument(bankId, documentId, options) {
    const response = await getDocument({
      client: this.client,
      path: { bank_id: bankId, document_id: documentId },
      signal: options?.signal
    });
    if (response.response?.status === 404) {
      return null;
    }
    return this.validateResponse(response, "getDocument");
  }
  /**
   * List documents in a bank.
   */
  async listDocuments(bankId, options) {
    const response = await listDocuments({
      client: this.client,
      path: { bank_id: bankId },
      query: {
        limit: options?.limit,
        offset: options?.offset,
        time_field: options?.timeField,
        start_date: options?.startDate,
        end_date: options?.endDate
      },
      signal: options?.signal
    });
    return this.validateResponse(response, "listDocuments");
  }
  /**
   * Delete a document.
   */
  async deleteDocument(bankId, documentId, options) {
    const response = await deleteDocument({
      client: this.client,
      path: { bank_id: bankId, document_id: documentId },
      signal: options?.signal
    });
    if (response.error) {
      throw new Error(`deleteDocument failed: ${JSON.stringify(response.error)}`);
    }
  }
  /**
   * Update a document's mutable fields.
   */
  async updateDocument(bankId, documentId, options) {
    const response = await updateDocument({
      client: this.client,
      path: { bank_id: bankId, document_id: documentId },
      body: { tags: options.tags },
      signal: options.signal
    });
    return this.validateResponse(response, "updateDocument");
  }
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
  async exportDocuments(bankId, options) {
    const submitResponse = await exportDocuments({
      client: this.client,
      path: { bank_id: bankId },
      query: {
        ...options?.documentIds !== void 0 ? { document_id: options.documentIds } : {},
        ...options?.includeObservations !== void 0 ? { include_observations: options.includeObservations } : {},
        ...options?.includeKnowledgeBase !== void 0 ? { include_knowledge_base: options.includeKnowledgeBase } : {}
      },
      signal: options?.signal
    });
    const submission = this.validateResponse(submitResponse, "exportDocuments");
    const operationId = submission.operation_id;
    const pollInterval = options?.pollIntervalMs ?? 2e3;
    const timeout = options?.timeoutMs ?? 3e5;
    const deadline = Date.now() + timeout;
    let resultMetadata;
    for (; ; ) {
      const statusResponse = await getOperationStatus({
        client: this.client,
        path: { bank_id: bankId, operation_id: operationId },
        signal: options?.signal
      });
      const status = this.validateResponse(statusResponse, "getOperationStatus");
      if (status.status === "completed") {
        resultMetadata = status.result_metadata;
        break;
      }
      if (status.status === "failed" || status.status === "cancelled") {
        throw new HindsightError(
          `Export operation ${operationId} ${status.status}: ${status.error_message ?? ""}`
        );
      }
      if (Date.now() >= deadline) {
        throw new HindsightError(
          `Export operation ${operationId} did not complete within ${timeout}ms`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }
    const downloadUrl = resultMetadata?.download_url;
    if (!downloadUrl) {
      throw new HindsightError(`Export operation ${operationId} completed without a download_url`);
    }
    const downloadResponse = await this.client.get({
      url: downloadUrl,
      parseAs: "arrayBuffer",
      signal: options?.signal
    });
    const data = this.validateResponse(downloadResponse, "downloadFile");
    return new Uint8Array(data);
  }
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
  async exportBank(bankId, options) {
    const submitResponse = await exportBankTransfer({
      client: this.client,
      path: { bank_id: bankId },
      query: {
        ...options?.includeData !== void 0 ? { include_data: options.includeData } : {},
        ...options?.includeBankConfig !== void 0 ? { include_bank_config: options.includeBankConfig } : {},
        ...options?.includeHistory !== void 0 ? { include_history: options.includeHistory } : {}
      },
      signal: options?.signal
    });
    const submission = this.validateResponse(submitResponse, "exportBankTransfer");
    return this.downloadOperationArchive(bankId, submission.operation_id, options);
  }
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
  async importBank(bankId, archive, options) {
    const response = await importBankTransfer({
      client: this.client,
      path: { bank_id: bankId },
      query: {
        ...options?.targetBankId !== void 0 ? { target_bank_id: options.targetBankId } : {},
        ...options?.includeData !== void 0 ? { include_data: options.includeData } : {},
        ...options?.includeBankConfig !== void 0 ? { include_bank_config: options.includeBankConfig } : {},
        ...options?.includeHistory !== void 0 ? { include_history: options.includeHistory } : {}
      },
      body: { file: archive },
      signal: options?.signal
    });
    const submission = this.validateResponse(response, "importBankTransfer");
    return submission.operation_id;
  }
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
  async cloneBank(bankId, targetBankId, options) {
    const response = await cloneBank({
      client: this.client,
      path: { bank_id: bankId },
      query: {
        target_bank_id: targetBankId,
        ...options?.includeData !== void 0 ? { include_data: options.includeData } : {},
        ...options?.includeBankConfig !== void 0 ? { include_bank_config: options.includeBankConfig } : {},
        ...options?.includeHistory !== void 0 ? { include_history: options.includeHistory } : {}
      },
      signal: options?.signal
    });
    const submission = this.validateResponse(response, "cloneBank");
    return submission.operation_id;
  }
  /**
   * Poll an export operation to completion and download the archive it produced.
   * Shared by `exportDocuments` and `exportBank` — both submit an operation whose
   * `result_metadata` names the finished archive.
   */
  async downloadOperationArchive(bankId, operationId, options) {
    const pollInterval = options?.pollIntervalMs ?? 2e3;
    const timeout = options?.timeoutMs ?? 3e5;
    const deadline = Date.now() + timeout;
    let resultMetadata;
    for (; ; ) {
      const statusResponse = await getOperationStatus({
        client: this.client,
        path: { bank_id: bankId, operation_id: operationId },
        signal: options?.signal
      });
      const status = this.validateResponse(statusResponse, "getOperationStatus");
      if (status.status === "completed") {
        resultMetadata = status.result_metadata;
        break;
      }
      if (status.status === "failed" || status.status === "cancelled") {
        throw new HindsightError(
          `Export operation ${operationId} ${status.status}: ${status.error_message ?? ""}`
        );
      }
      if (Date.now() >= deadline) {
        throw new HindsightError(
          `Export operation ${operationId} did not complete within ${timeout}ms`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }
    const downloadUrl = resultMetadata?.download_url;
    if (!downloadUrl) {
      throw new HindsightError(`Export operation ${operationId} completed without a download_url`);
    }
    const downloadResponse = await this.client.get({
      url: downloadUrl,
      parseAs: "arrayBuffer",
      signal: options?.signal
    });
    const data = this.validateResponse(downloadResponse, "downloadFile");
    return new Uint8Array(data);
  }
};
function recallResponseToPromptString(response) {
  const chunksMap = response.chunks ?? {};
  const sections = [];
  const formattedFacts = (response.results ?? []).map((result) => {
    const obj = { text: result.text };
    if (result.context) obj.context = result.context;
    if (result.occurred_start) obj.occurred_start = result.occurred_start;
    if (result.occurred_end) obj.occurred_end = result.occurred_end;
    if (result.mentioned_at) obj.mentioned_at = result.mentioned_at;
    if (result.chunk_id && chunksMap[result.chunk_id]) {
      obj.source_chunk = chunksMap[result.chunk_id].text;
    }
    return obj;
  });
  sections.push("FACTS:\n" + JSON.stringify(formattedFacts, null, 2));
  const entities = response.entities;
  if (entities) {
    const entityParts = [];
    for (const [name, state] of Object.entries(entities)) {
      if (state.observations?.length) {
        entityParts.push(`## ${name}
${state.observations[0].text}`);
      }
    }
    if (entityParts.length) {
      sections.push("ENTITIES:\n" + entityParts.join("\n\n"));
    }
  }
  return sections.join("\n\n");
}
export {
  CLIENT_VERSION,
  DEFAULT_MAX_ATTEMPTS,
  DEFAULT_USER_AGENT,
  HindsightClient,
  HindsightError,
  createClient,
  createConfig,
  recallResponseToPromptString,
  retryAfterMs,
  retryOnCapacity,
  sdk_gen_exports as sdk
};
//# sourceMappingURL=index.mjs.map