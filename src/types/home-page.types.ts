import { CustomResponse } from "@/services";

export interface Colors {
    primary: string;
    secondary: string;
}

export interface HomePageTexts {
    name: string;
    mainAction: string;
    highlights: string[];
}

interface Visuals {
    colors: Colors;
}

export interface HomePageCustom extends Omit<CustomResponse, 'texts' | 'visuals'> {
    texts: HomePageTexts;
    visuals: Visuals;
}