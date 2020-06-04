/**
 * @fileoverview gRPC-Web generated client stub for chat
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')
const proto = {};
proto.chat = require('./chat_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.chat.ChatServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.chat.ChatServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.User,
 *   !proto.chat.User>}
 */
const methodDescriptor_ChatService_Login = new grpc.web.MethodDescriptor(
  '/chat.ChatService/Login',
  grpc.web.MethodType.UNARY,
  proto.chat.User,
  proto.chat.User,
  /**
   * @param {!proto.chat.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.chat.User,
 *   !proto.chat.User>}
 */
const methodInfo_ChatService_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.chat.User,
  /**
   * @param {!proto.chat.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.User.deserializeBinary
);


/**
 * @param {!proto.chat.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.chat.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chat.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.ChatService/Login',
      request,
      metadata || {},
      methodDescriptor_ChatService_Login,
      callback);
};


/**
 * @param {!proto.chat.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chat.User>}
 *     A native promise that resolves to the response
 */
proto.chat.ChatServicePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.ChatService/Login',
      request,
      metadata || {},
      methodDescriptor_ChatService_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.User,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_ChatService_Logout = new grpc.web.MethodDescriptor(
  '/chat.ChatService/Logout',
  grpc.web.MethodType.UNARY,
  proto.chat.User,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.chat.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.chat.User,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_ChatService_Logout = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.chat.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.chat.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatServiceClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.ChatService/Logout',
      request,
      metadata || {},
      methodDescriptor_ChatService_Logout,
      callback);
};


/**
 * @param {!proto.chat.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.chat.ChatServicePromiseClient.prototype.logout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.ChatService/Logout',
      request,
      metadata || {},
      methodDescriptor_ChatService_Logout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.Message,
 *   !proto.chat.Message>}
 */
const methodDescriptor_ChatService_SendMessage = new grpc.web.MethodDescriptor(
  '/chat.ChatService/SendMessage',
  grpc.web.MethodType.UNARY,
  proto.chat.Message,
  proto.chat.Message,
  /**
   * @param {!proto.chat.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.Message.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.chat.Message,
 *   !proto.chat.Message>}
 */
const methodInfo_ChatService_SendMessage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.chat.Message,
  /**
   * @param {!proto.chat.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.Message.deserializeBinary
);


/**
 * @param {!proto.chat.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.chat.Message)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chat.Message>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatServiceClient.prototype.sendMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chat.ChatService/SendMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_SendMessage,
      callback);
};


/**
 * @param {!proto.chat.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chat.Message>}
 *     A native promise that resolves to the response
 */
proto.chat.ChatServicePromiseClient.prototype.sendMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chat.ChatService/SendMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_SendMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.chat.User,
 *   !proto.chat.Message>}
 */
const methodDescriptor_ChatService_GetMessage = new grpc.web.MethodDescriptor(
  '/chat.ChatService/GetMessage',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.chat.User,
  proto.chat.Message,
  /**
   * @param {!proto.chat.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.Message.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.chat.User,
 *   !proto.chat.Message>}
 */
const methodInfo_ChatService_GetMessage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.chat.Message,
  /**
   * @param {!proto.chat.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.chat.Message.deserializeBinary
);


/**
 * @param {!proto.chat.User} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.Message>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatServiceClient.prototype.getMessage =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.ChatService/GetMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_GetMessage);
};


/**
 * @param {!proto.chat.User} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.chat.Message>}
 *     The XHR Node Readable Stream
 */
proto.chat.ChatServicePromiseClient.prototype.getMessage =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/chat.ChatService/GetMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_GetMessage);
};


module.exports = proto.chat;

