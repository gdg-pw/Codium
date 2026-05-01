//====================================
//  TAB CATEGORY ICON COMPONENT
//====================================

export const CategoryIcon = ({ category }: { category: string }) => {
    const svgProps = {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor", //use button's text color
        strokeWidth: "2",
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        width: 24,
        height: 24,
    };

    switch (category) {
        case "Logic":
            return (
                <svg {...svgProps}>
                    {/* logic icon and some svg magic*/}
                    <rect x="3" y="3" width="6" height="6" rx="1" />
                    <rect x="15" y="3" width="6" height="6" rx="1" />
                    <rect x="9" y="15" width="6" height="6" rx="1" />
                    <path d="M6 9v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9" />
                    <path d="M12 13v2" />
                </svg>
            );
        case "Math":
            return (
                <svg {...svgProps}>
                    {/* calculator icon */}
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="10" x2="10" y2="10" />
                    <line x1="8" y1="14" x2="10" y2="14" />
                    <line x1="8" y1="18" x2="10" y2="18" />
                    <line x1="14" y1="10" x2="16" y2="10" />
                    <line x1="14" y1="14" x2="16" y2="14" />
                    <line x1="14" y1="18" x2="16" y2="18" />
                </svg>
            );
        default:
            return (
                <svg {...svgProps}>
                    {/* misc icon */}
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                </svg>
            );
    }
};