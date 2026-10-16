import { ORG_URL } from "../site";

export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[100svh] items-center justify-center bg-paper px-6 pt-12"
    >
      <div className="hero-rise max-w-[720px] text-center">
        <h1 className="display text-ink">UnionRepos</h1>
        <p className="lede text-ink">Personal repositories, united.</p>
        <a
          className="mt-5 inline-block text-[21px] leading-[1.19] text-link hover:underline"
          href={ORG_URL}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
