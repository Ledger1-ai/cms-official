import {
    Check, Monitor, Zap, Shield, Globe, Briefcase, Users, Target,
    TrendingUp, Star, Heart, MessageCircle, Mail, ArrowRight,
    ChevronDown, Sparkles, Camera, Palette, Music, Video,
    ShoppingCart, CreditCard, Package, Tag, Cloud, Database,
    Lock, Smartphone, Cpu, Layers, Code, Gift, Award, Clock,
    MapPin, Phone, Building, Rocket, Compass, Anchor
} from "lucide-react";

export const ICON_MAP: Record<string, any> = {
    Monitor, Zap, Shield, Globe, Briefcase, Users, Target,
    TrendingUp, Star, Heart, MessageCircle, Mail, ArrowRight,
    ChevronDown, Sparkles, Camera, Palette, Music, Video,
    ShoppingCart, CreditCard, Package, Tag, Cloud, Database,
    Lock, Smartphone, Cpu, Layers, Code, Gift, Award, Clock,
    MapPin, Phone, Building, Rocket, Compass, Anchor, Check
};

export const iconOptions = Object.keys(ICON_MAP).map(name => ({ label: name, value: name }));
