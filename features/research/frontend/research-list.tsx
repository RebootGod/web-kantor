"use client";

import Link from "next/link";
import { useState } from "react";

export type ResearchItem = {
  number: string;
  slug: string;
  title: string;
  copy: string;
  status: string;
  category: string;
  publishedAt: string;
};

const PAGE_SIZE = 9;

export function ResearchList({ items }: { items: ResearchItem[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleItems = items.slice(startIndex, startIndex + PAGE_SIZE);

  function goToPage(page: number) {
    setCurrentPage(page);
    document
      .getElementById("research-list")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="research-list" id="research-list">
      <div className="research-grid">
        {visibleItems.map((item) => (
          <Link
            className="research-card-link"
            href={`/research/${item.slug}`}
            key={item.slug}
          >
            <article className="research-card">
              <div className="research-card-meta">
                <span>{item.number}</span>
                <small>{item.category}</small>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
              <time dateTime={item.publishedAt}>{item.status}</time>
            </article>
          </Link>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav className="research-pagination" aria-label="Research pagination">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">←</span> Previous
          </button>
          <div className="research-page-numbers">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  className={page === currentPage ? "is-current" : undefined}
                  type="button"
                  onClick={() => goToPage(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                  key={page}
                >
                  {String(page).padStart(2, "0")}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <span aria-hidden="true">→</span>
          </button>
        </nav>
      ) : null}
    </div>
  );
}
