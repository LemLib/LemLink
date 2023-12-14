import { type Range, SemVer, maxSatisfying } from "semver";

export interface PackageIdentifier {
  /**
   * does not include @ sign
   * @example lemlib
   */
  readonly owner: string;
  /**
   * @example lemlink
   */
  readonly repo: string;
}

export abstract class PackageVersion
  extends SemVer
  implements PackageIdentifier
{
  readonly owner: string;
  readonly repo: string;
  public constructor(packId: PackageIdentifier, version: SemVer) {
    super(version);

    this.owner = packId.owner;
    this.repo = packId.repo;
  }
  public abstract download(): Promise<NodeJS.ReadableStream | undefined>;
}

export abstract class Package<
  V extends PackageVersion,
  ID extends PackageIdentifier,
> implements PackageIdentifier
{
  public readonly owner: string;
  public readonly repo: string;

  constructor(id: ID) {
    this.owner = id.owner;
    this.repo = id.repo;
  }

  public abstract getVersions(): Promise<V[]>;
  public abstract getLatest(): Promise<V | null>;

  public async getVersionsInRange(range: Range): Promise<V[]> {
    const versions = await this.getVersions();
    return versions.filter((v) => range.test(v));
  }

  public async getLatestInRange(range: Range): Promise<V | null> {
    return maxSatisfying(await this.getVersionsInRange(range), range);
  }
}

export abstract class PackageResolver<
  P extends Package<PackageVersion, PackageIdentifier>,
> {
  public abstract resolvePackage(id: PackageIdentifier): Promise<P | null>;
}
