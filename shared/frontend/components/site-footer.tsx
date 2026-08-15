type SiteFooterProps = {
  context: string;
};

export function SiteFooter({ context }: SiteFooterProps) {
  return (
    <footer>
      <div className="footer-brand">
        <span className="brand-mark brand-mark-small" aria-hidden="true">
          <span>F</span>
          <span>S</span>
        </span>
        <div>
          <b>Forsecure</b>
          <span>Offensive Security &amp; Secure Engineering</span>
        </div>
      </div>
      <p>{context}</p>
      <p className="copyright">
        © {new Date().getUTCFullYear()} Forsecure
      </p>
    </footer>
  );
}
