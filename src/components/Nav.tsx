import { useEffect, useState } from "react";
import { ORG_URL } from "../site";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[rgba(251,251,253,0.8)] backdrop-blur-[20px] backdrop-saturate-[180%]">
      <nav
        className="flex h-12 items-center justify-between px-[22px]"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="text-[17px] font-semibold tracking-[-0.022em] text-ink"
        >
          UnionRepos
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a className="text-[12px] text-ink/80 hover:text-ink" href="#repositories">
            Repositories
          </a>
          <a
            className="text-[12px] text-ink/80 hover:text-ink"
            href={ORG_URL}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <button
          type="button"
          className="text-[12px] text-ink md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open ? (
        <div id="site-menu" className="border-t border-black/10 px-[22px] py-2 md:hidden">
          <a
            href="#repositories"
            className="block py-3 text-[17px] text-ink"
            onClick={() => setOpen(false)}
          >
            Repositories
          </a>
          <a
            href={ORG_URL}
            className="block py-3 text-[17px] text-ink"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      ) : null}
    </header>
  );
}
