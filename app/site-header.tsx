import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Forsecure homepage">
        <span className="brand-mark" aria-hidden="true">
          <span>F</span>
          <span>S</span>
        </span>
        <span className="brand-name">Forsecure</span>
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/#services">Services</Link>
        <Link href="/research">Research</Link>
        <Link href="/contact">Contact Us</Link>
      </nav>

      <Link className="nav-cta" href="/contact">
        Discuss security
        <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
