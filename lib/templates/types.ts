import { Data } from "@measured/puck";
import { Props } from "@/lib/puck.config";

export interface Template {
    id: string;
    name: string;
    category: "saas" | "agency" | "portfolio" | "ecommerce" | "business" | "event" | "health" | "education" | "finance" | "travel" | "food" | "construction" | "nonprofit" | "tech" | "legal" | "lifestyle" | "automotive" | "services" | "entertainment" | "hospitality" | "sports"; // Expanded categories
    description: string;
    thumbnail?: string;
    data: Data<Props>;
}
