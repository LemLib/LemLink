import { Octokit } from "octokit";
import { type PackageIdentifier, PackageResolver } from "../package";
import { GithubPackage } from "./package";

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
