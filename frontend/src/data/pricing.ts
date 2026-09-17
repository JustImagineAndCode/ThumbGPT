import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
       "Access to standard thumbnail models",
        "Standard generation speed",
        "30 thumbnail generations/mo",
        "720p / 1080p high-res exports",
        "Basic template library access"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
           "Access to all Pro AI thumbnail models",
            "Priority render queue & faster generation",
            "100 high-CTR thumbnail generations/mo",
            "HD 4K download & full commercial rights",
            "Advanced design customization & layers",
            "A/B testing concept suggestions",
            "Dedicated creator support"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Unlimited thumbnail generations",
            "Dedicated ultra-fast rendering server",
            "Custom AI model training on your brand style",
            "Multi-channel & team collaboration",
            "API access for automated workflows"
        ],
        mostPopular: false
    }
];