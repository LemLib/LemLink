import { Octokit } from "octokit";
import { type Range, SemVer, parse, maxSatisfying } from "semver";
import { type IncomingMessage } from "http";
import { get as httpsGet, type RequestOptions } from "https";

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

export type GithubPackageReleaseData = Awaited<
  ReturnType<Octokit["rest"]["repos"]["listReleases"]>
>["data"][number];

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

export class GithubPackageVersion extends PackageVersion {
  protected constructor(
    protected readonly client: Octokit,
    public readonly packId: PackageIdentifier,
    public readonly data: GithubPackageReleaseData,
    version: SemVer,
  ) {
    super(packId, version);
  }

  public static create(
    client: Octokit,
    packId: PackageIdentifier,
    data: GithubPackageReleaseData,
  ): GithubPackageVersion | null {
    const version = parse(data.tag_name);
    if (version == null) return null;
    return new GithubPackageVersion(client, packId, data, version);
  }

  protected getAssetIndex(): number {
    return 0;
  }

  public override async download(): Promise<NodeJS.ReadableStream | undefined> {
    const index = this.getAssetIndex();
    const auth = await this.client.auth();
    const opts: RequestOptions = {};

    if (
      typeof auth === "object" &&
      auth != null &&
      "token" in auth &&
      typeof auth.token === "string"
    )
      opts.headers = {
        Authorization: `Bearer ${auth.token}`,
      };

    const response = await new Promise<IncomingMessage>((resolve) =>
      httpsGet(this.data.assets[index].url, opts, resolve),
    );

    return response;
  }
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

export class GithubPackage extends Package<
  GithubPackageVersion,
  PackageIdentifier
> {
  constructor(
    protected readonly client: Octokit,
    protected readonly id: PackageIdentifier,
  ) {
    super(id);
  }

  public override async getVersions(): Promise<GithubPackageVersion[]> {
    return (
      await this.client.rest.repos.listReleases({
        ...this.id,
      })
    ).data
      .map((release) =>
        GithubPackageVersion.create(this.client, this.id, release),
      )
      .filter((release): release is GithubPackageVersion => release != null);
  }

  public async getLatest(): Promise<GithubPackageVersion | null> {
    return GithubPackageVersion.create(
      this.client,
      this.id,
      (
        await this.client.rest.repos.getLatestRelease({
          ...this.id,
        })
      ).data,
    );
  }
}

export abstract class PackageResolver<
  P extends Package<PackageVersion, PackageIdentifier>,
> {
  public abstract resolvePackage(id: PackageIdentifier): Promise<P | null>;
}

export class GithubPackageResolver extends PackageResolver<GithubPackage> {
  private static readonly client: Octokit = new Octokit();
  private static readonly singleton: GithubPackageResolver =
    new GithubPackageResolver(GithubPackageResolver.client);

  protected constructor(protected readonly client: Octokit) {
    super();
  }

  public static get(): GithubPackageResolver {
    return GithubPackageResolver.singleton;
  }

  public override async resolvePackage(
    id: PackageIdentifier,
  ): Promise<GithubPackage> {
    return new GithubPackage(this.client, id);
  }
}
