import type { ServiceDetailItem } from "@/app/services/backend";
import { ServiceDetailIcon } from "../service-detail-icon";

type ServiceDetailListProps = {
  items: ServiceDetailItem[];
  hasVisualDetails: boolean;
};

export function ServiceDetailList({
  items,
  hasVisualDetails,
}: ServiceDetailListProps) {
  return (
    <ul
      className={`service-detail-list${hasVisualDetails ? " service-detail-list-visual" : ""}`}
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          className={
            `${item.icon ? "has-icon" : ""}${item.highlight ? " is-highlighted" : ""}`.trim() ||
            undefined
          }
        >
          <span className="service-detail-item-number">0{index + 1}</span>
          {item.icon ? (
            <span className="service-detail-item-figure" aria-hidden="true">
              <ServiceDetailIcon name={item.icon} />
            </span>
          ) : null}
          <span className="service-detail-item-copy">
            <b>{item.title}</b>
            {item.description ? <em>{item.description}</em> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
