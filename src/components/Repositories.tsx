import { useEffect, useState } from "react";
import { fetchPublicRepos, type Repo } from "../lib/github";
import { ORG_URL } from "../site";

type Status =
  | { kind: "loading" }
  | { kind: "ready"; repos: Repo[] }
  | { kind: "error" };

function wideTile(index: number, count: number) {
  return count === 1 || (count % 2 === 1 && index === count - 1);
}

export function Repositories() {
  const [status, setStatus] = useState<Status>({ kind: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = AbortSignal.timeout(12000);
    const signal = AbortSignal.any([controller.signal, timeout]);

    fetchPublicRepos(signal)
      .then((repos) => {
        if (!controller.signal.aborted) setStatus({ kind: "ready", repos });
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setStatus({ kind: "error" });
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="repositories" className="scroll-mt-16 bg-canvas px-3 pt-20 pb-3">
      <h2 className="section-title text-ink">Repositories</h2>
      {status.kind === "loading" ? (
        <div className="tile featured" role="status">
          <h3>Loading.</h3>
        </div>
      ) : null}
      {status.kind === "error" ? (
        <div className="tile featured" role="alert">
          <h3>The repository list could not be loaded.</h3>
          <p>GitHub did not return the list. You can browse the organization directly.</p>
          <a className="action" href={ORG_URL} target="_blank" rel="noreferrer">
            Open the organization on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      ) : null}
      {status.kind === "ready" && status.repos.length === 0 ? (
        <div className="tile featured">
          <h3>No public repositories yet.</h3>
          <p>When a repository is published, it will appear here.</p>
          <a className="action" href={ORG_URL} target="_blank" rel="noreferrer">
            Open the organization on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      ) : null}
      {status.kind === "ready" && status.repos.length > 0 ? (
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
          {status.repos.map((repo, index) => {
            const wide = wideTile(index, status.repos.length);
            return (
              <li key={repo.id} className={wide ? "md:col-span-2" : undefined}>
                <a
                  className={wide ? "tile featured" : "tile"}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h3>{repo.name}</h3>
                  {repo.description ? <p>{repo.description}</p> : null}
                  {repo.language ? <p className="meta">{repo.language}</p> : null}
                  <span className="action">
                    View repository
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
