import { useState } from 'react';

function resolveImages(product) {
  const list = [];
  if (product?.imageUrl) list.push(product.imageUrl);
  if (product?.secondaryImageUrl && !list.includes(product.secondaryImageUrl)) {
    list.push(product.secondaryImageUrl);
  }
  if (product?.hoverImage && !list.includes(product.hoverImage)) {
    list.push(product.hoverImage);
  }
  if (Array.isArray(product?.images)) {
    for (const img of product.images) {
      if (img && !list.includes(img)) list.push(img);
    }
  }
  return list.slice(0, 2);
}

export default function ProductHoverCard({
  product,
  onEnquiry,
  onBulkOrder,
}) {
  const images = resolveImages(product);
  const hasSecondImage = images.length > 1;

  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeIndex =
    hasSecondImage && isHovered
      ? 1
      : Math.min(selectedIndex, Math.max(images.length - 1, 0));
  const currentImage = images[activeIndex] || '';

  return (
    <article
      onMouseEnter={() => {
        setIsHovered(true);
        if (hasSecondImage) setSelectedIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setSelectedIndex(0);
      }}
      className="group flex flex-col justify-between rounded-xl border border-[#c5a059]/30 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div>
        <div className="relative mb-3 flex h-56 items-center justify-center overflow-hidden rounded-lg bg-[#f8f4ee]">
          {product.gsm && (
            <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-[#c5a059] px-2.5 py-0.5 text-[10px] font-bold text-[#0b132b]">
              {product.gsm}
            </span>
          )}

          {hasSecondImage && (
            <div
              className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-full border border-black/15 bg-white/90 px-2 py-1 shadow-sm"
              onMouseEnter={(e) => e.stopPropagation()}
            >
              {images.map((_, idx) => {
                const active = activeIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`View image ${idx + 1}`}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => setSelectedIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      active
                        ? 'w-3.5 bg-[#18432f]'
                        : 'w-1.5 bg-[#18432f]/35 hover:bg-[#18432f]/65'
                    }`}
                  />
                );
              })}
            </div>
          )}

          {currentImage ? (
            <img
              src={currentImage}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
            />
          ) : (
            <span className="text-xs font-medium text-muted">No Image</span>
          )}
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-bold text-navy">
            {product.title}
          </h3>
          <span className="shrink-0 rounded border border-[#c5a059]/30 bg-[#f8f4ee] px-2 py-0.5 text-[10px] font-medium text-navy">
            {product.category}
          </span>
        </div>

        <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">
          {product.fabric || 'Factory Fabric'} • MOQ {product.moq || 50} pcs
        </p>

        <p className="mt-2 text-sm font-bold text-navy">
          ₹{product.pricePerUnit}{' '}
          <span className="text-[11px] font-normal text-muted">/ pc</span>
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#c5a059]/20 pt-2.5">
        <button
          type="button"
          onClick={() => onEnquiry?.(product)}
          className="rounded-md border border-[#c5a059]/50 px-2.5 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-[#f8f4ee]"
        >
          Enquiry
        </button>

        <button
          type="button"
          onClick={() => onBulkOrder?.(product)}
          className="rounded-md bg-navy px-2.5 py-1.5 text-xs font-semibold text-[#f8f4ee] transition-colors hover:bg-navy/90"
        >
          Bulk Order
        </button>
      </div>
    </article>
  );
}