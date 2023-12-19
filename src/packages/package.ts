import { eq as verEquals, type Range, type SemVer } from "semver";

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

export abstract class PackageVersion implements PackageIdentifier {
  readonly owner: string;
  readonly repo: string;
  public constructor(
    packId: PackageIdentifier,
    public readonly version: SemVer,
  ) {
    this.owner = packId.owner;
    this.repo = packId.repo;
  }
  public abstract download(): Promise<Buffer | undefined>;
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

  public async getVersion(version: SemVer): Promise<V | undefined> {
    return (await this.getVersions()).find((v) =>
      verEquals(v.version, version),
    );
  }

  public async getVersionsInRange(range: Range): Promise<V[]> {
    const versions = await this.getVersions();
    return versions.filter((v) => range.test(v.version));
  }

  public async getLatestInRange(range: Range): Promise<V | undefined> {
    return (await this.getVersionsInRange(range))
      .sort((a, b) => a.version.compare(b.version))
      .pop();
  }
}

export abstract class PackageResolver<
  P extends Package<PackageVersion, PackageIdentifier>,
> {
  public abstract resolvePackage(id: PackageIdentifier): Promise<P | null>;
}
