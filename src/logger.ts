/** specifies severity of a log message */
export enum LOG_LEVEL {
  /** verbose description */
  VERBOSE,
  /** debug description */
  DEBUG,
  /** info description */
  INFO,
  /** warning description */
  WARNING,
  /** error description */
  ERROR,
  /** fatal description */
  FATAL,
}

export interface LogMessage<Source extends string> {
  /** where did this message come from? */
  source: Source;
  /** the severity of the message */
  level: LOG_LEVEL;
  /** the actual message */
  msg: string;
}

/**
 * What's a sink?
 *
 * Well you can kind of think of a Sink as an {@link https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter EventEmitter}.
 *
 * - Emitting an event using the {@linkcode log()} method.
 * - You can add a listener using the {@linkcode addSink()} method.
 *
 * @example
 * class MySink extends BaseSink<string> {
 *   public override log(msg) {
 *     console.log(msg);
 *   }
 * }
 * // prints "Hello World"
 * new MySink.log("Hello World");
 *
 * @see {@linkcode BaseSink.log()}
 * @see {@linkcode BaseSink.addSink()}
 */
export class BaseSink<M> {
  protected sinks: Array<BaseSink<M>> = [];

  /**
   * Runs the {@linkcode log()} method of all sinks added to this sink via the {@linkcode addSink()} method
   * @param msg message that will be sent to the other sinks
   *
   * @see {@linkcode BaseSink.addSink()}
   * @see {@linkcode BaseSink}
   */
  public log(msg: M): void {
    this.sinks.forEach((sink) => {
      sink.log(msg);
    });
  }

  /**
   * Add sinks that will also be logged to when this sink is logged to
   * @param sinks will be added to the
   *
   * @see {@linkcode BaseSink.log()}
   * @see {@linkcode BaseSink}
   */
  public addSink(...sinks: Array<BaseSink<M>>): void {
    sinks.push(...sinks);
  }
}

/**
 * Any messages sent to an instance of Logger will automatically be sent to the {@linkcode ExternalLogger}
 *
 * @template Source where is the logger being used?
 *
 * @example
 * new Logger("lemlink.package-manger.install").log("fatal", 'could not retrieve package "ExampleLib"')
 * @see {@linkcode BaseSink}
 * @see {@linkcode Logger.log()}
 *
 * @internal
 */
export class Logger<Source extends Lowercase<string>> extends BaseSink<
  LogMessage<Source>
> {
  /**
   * Any messages sent to an instance of `Logger` will automatically be sent to the {@linkcode ExternalLogger}
   *
   * @param {Source} source where is the logger being used?
   * @see {@linkcode BaseSink}
   * @see {@linkcode Logger}
   *
   * @internal
   */
  constructor(private readonly source: Source) {
    super();
    this.addSink(ExternalLogger.getInstance());
  }

  /**
   * @internal
   *
   * Sends a message to the {@linkcode ExternalLogger}
   *
   * @param level the severity of the log message
   * @param msg message to send to {@linkcode ExternalLogger}
   *
   * @see {@linkcode Logger}
   * @see {@linkcode BaseSink.log()}
   */
  public override log(level: LOG_LEVEL, msg: string): void;
  /**
   * Sends a message to the {@linkcode ExternalLogger}
   *
   * @param msg message to send to {@linkcode ExternalLogger}
   *
   * @see {@linkcode Logger}
   * @see {@linkcode BaseSink.log()}
   *
   * @internal
   */
  public override log(msg: LogMessage<Source>): void;
  public override log(
    a: LOG_LEVEL | Omit<LogMessage<Source>, "source">,
    b?: string,
  ): void {
    let msg: LogMessage<Source>;
    if (typeof a === "number") {
      if (b !== undefined) msg = { level: a, msg: b, source: this.source };
      else return;
    } else msg = { ...a, source: this.source };
    super.log(msg);
  }
}
/**
 * Used to listen to the logs output by LemLink
 * @example
 * class MyLogSink extends BaseSink<string> {
 *   public override log(msg) {
 *     console.log(msg);
 *   }
 * }
 * ExternalLogger.addSink(new MyLogSink());
 * // Now, whenever a log is made from LemLink,
 * // it will be logged to the terminal!
 *
 * @see {@linkcode ExternalLogger.addSink()}
 */
export class ExternalLogger extends BaseSink<LogMessage<string>> {
  /** singleton instance */
  private static readonly instance: ExternalLogger;

  /** only one instance of ExternalLogger will ever be constructed */
  private constructor() {
    super();
  }

  /**
   * Used in {@linkcode Logger} to added as a listening sink
   * @see {@linkcode Logger} constructor
   *
   * @internal
   */
  public static getInstance(): ExternalLogger {
    return this.instance;
  }

  /**
   * Messages are sent from {@link Logger Loggers} to this logger using this method.
   * This method serves as a wrapper for {@linkcode BaseSink.log() ExternalLogger.instance.log()}
   *
   * @param msg sent from {@link Logger Loggers}
   *
   * @see {@linkcode Logger} constructor
   * @see {@linkcode ExternalLogger}
   * @see {@linkcode BaseSink.log()}
   *
   * @internal
   */
  public static log(msg: LogMessage<string>): void {
    this.instance.log(msg);
  }

  /**
   * Add sinks that will also be logged to when this sink is logged to
   * @param sinks will be added to the
   *
   * @see {@linkcode ExternalLogger}
   * @see {@linkcode BaseSink.addSink()}
   */
  public static addSink(...sinks: Array<BaseSink<LogMessage<string>>>): void {
    this.instance.addSink(...sinks);
  }
}
