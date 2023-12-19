import { type Octokit } from "octokit";
import { type PackageIdentifier, PackageResolver } from "../package";
import { GithubPackage } from "./package";

export class GithubPackageResolver extends PackageResolver<GithubPackage> {
  public constructor(protected readonly client: Octokit) {
    super();
  }

  public override async resolvePackage(
    id: PackageIdentifier,
  ): Promise<GithubPackage> {
    return new GithubPackage(this.client, id);
  }
}
