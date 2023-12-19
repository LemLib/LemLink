import { type Octokit } from "octokit";
import { Package, type PackageIdentifier } from "../package";
import { GithubPackageVersion } from "./version";

export type GithubPackageReleaseData = Awaited<
  ReturnType<Octokit["rest"]["repos"]["listReleases"]>
>["data"][number];

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
