export {
  /** The version of this LemLink instance */ version as VERSION,
} from "../package.json";
export {
  ExternalLogger as Logger,
  LOG_LEVEL,
  type LogMessage,
  BaseSink,
} from "./logger";
