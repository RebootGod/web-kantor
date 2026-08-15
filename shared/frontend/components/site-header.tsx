import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Forsecure homepage">
        <Image
          className="brand-logo"
          src="/forsecure-logo.png"
          alt="Forsecure"
          width={800}
          height={172}
          priority
        />
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
