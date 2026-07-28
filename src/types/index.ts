export interface Service {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  excerpt: string;
  excerptAr: string;
  icon: string;
  image: string;
  isSpecial?: boolean;
  disclaimer?: string;
  disclaimerAr?: string;
}

export interface FAQ {
  id: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  text: string;
  textAr: string;
  isSample: boolean;
}

export interface Country {
  id: string;
  name: string;
  nameAr: string;
  flag: string;
  slug: string;
  landingPages: {
    title: string;
    titleAr: string;
  }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  category: string;
  categoryAr: string;
  image: string;
  date: string;
  readTime: string;
}

export interface NavigationItem {
  label: string;
  labelAr: string;
  href: string;
  children?: NavigationItem[];
}

export interface Translations {
  [key: string]: string | Translations;
}
