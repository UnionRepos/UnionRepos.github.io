export type Repo = {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function fetchPublicRepos(signal: AbortSignal): Promise<Repo[]> {
  const response = await fetch(
    "https://api.github.com/orgs/UnionRepos/repos?per_page=100&sort=pushed&direction=desc&type=public",
    {
      signal,
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("Unexpected response");
  }

  const repos: Repo[] = [];
  for (const item of payload) {
    if (!isRecord(item)) continue;
    if (item.fork === true || item.archived === true || item.private === true) continue;
    if (
      typeof item.id !== "number" ||
      typeof item.name !== "string" ||
      typeof item.html_url !== "string"
    ) {
      continue;
    }
    repos.push({
      id: item.id,
      name: item.name,
      description: typeof item.description === "string" ? item.description : null,
      htmlUrl: item.html_url,
      language: typeof item.language === "string" ? item.language : null,
    });
  }

  return repos;
}
