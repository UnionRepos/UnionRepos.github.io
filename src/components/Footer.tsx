import { ORG_URL } from "../site";

const year = new Date().getFullYear();

export function Footer() {

  return (
    <footer className="border-t border-line bg-canvas px-[22px] py-6 text-[12px] leading-[1.33] text-[#424245]">
      <div className="mx-auto flex max-w-[980px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0">Copyright © {year} UnionRepos.</p>
        <a className="text-[#424245] hover:underline" href={ORG_URL} target="_blank" rel="noreferrer">
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
