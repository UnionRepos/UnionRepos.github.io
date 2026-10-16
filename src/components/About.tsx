export function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-paper px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[640px]">
        <h2 className="prose-title text-ink">Brought together.</h2>
        <div className="prose-block">
          <h3>Begins with a person.</h3>
          <p>A repository can start under someone's own account, as their own work.</p>
        </div>
        <div className="prose-block">
          <h3>Joins the organization.</h3>
          <p>
            UnionRepos is where those personal repositories are gathered. The commits,
            issues, and name stay.
          </p>
        </div>
        <div className="prose-block">
          <h3>Listed in public.</h3>
          <p>What is public appears below, and on the organization profile.</p>
        </div>
      </div>
    </section>
  );
}
