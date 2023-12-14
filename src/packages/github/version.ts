import { type Octokit } from "octokit";
import { PackageVersion, type PackageIdentifier } from "../package";
import { type SemVer, parse } from "semver";
import { type GithubPackageReleaseData } from "./package";
import { type IncomingMessage } from "http";
import { get as httpsGet, type RequestOptions } from "https";

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
