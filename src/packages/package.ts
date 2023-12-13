import { type Octokit } from "octokit";
import { SemVer, parse } from "semver";
import { createWriteStream } from "fs";
import { type IncomingMessage } from "http";
import { get as httpsGet } from "https";

export interface PackageIdentifier {
  /**
   * does not include @ sign
   * @example lemlib
   */
  readonly owner: string;
  /**
   * @example lemlib
   */
  readonly repo: string;
}
export type PackageReleaseData = Awaited<
  ReturnType<Octokit["rest"]["repos"]["listReleases"]>
>["data"][number];

export class PackageVersion extends SemVer {
  protected constructor(
    protected readonly client: Octokit,
    public readonly packId: PackageIdentifier,
    public readonly data: PackageReleaseData,
    version: SemVer,
  ) {
    super(version);
  }

  public static create(
    client: Octokit,
    packId: PackageIdentifier,
    data: PackageReleaseData,
  ): PackageVersion | null {
    const version = parse(data.tag_name);
    if (version == null) return null;
    return new PackageVersion(client, packId, data, version);
  }

  public async download(
    path: Path,
    asset: { index: number } | { id: number } = { index: 0 },
  ): Promise<boolean> {
    try {
      let index: number;
      if ("index" in asset) index = asset.index;
      else index = this.data.assets.findIndex((a) => a.id === asset.id);

      const response = await new Promise<IncomingMessage>((resolve) =>
        httpsGet(this.data.assets[index].url, resolve),
      );
      const fileStream = createWriteStream(path);

      response.pipe(fileStream);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export class Package {
  constructor(
    protected readonly id: PackageIdentifier,
    protected readonly client: Octokit,
  ) {}

  public async getVersions(): Promise<PackageVersion[]> {
    return (
      await this.client.rest.repos.listReleases({
        ...this.id,
      })
    ).data
      .map((release) => PackageVersion.create(this.client, this.id, release))
      .filter((release): release is PackageVersion => release != null);
  }

  public async getLatest(): Promise<PackageVersion | null> {
    return PackageVersion.create(
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

/** placeholder */
type Path = string & { __type: "path" };
