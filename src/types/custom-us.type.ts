export interface ContactUsTexts {
    form: Array<{
        label: string;
        placeholder: string;
        action?: string;
    }>;
    subtitle: string;
    sections: string[];
}

interface ContactUsVisuals {
    colors: Array<{
        primary: string;
    }>;
}

interface ContactUsData {
    sections: string[];
}

export interface ContactUsCustom {
    texts: ContactUsTexts;
    visuals: ContactUsVisuals;
    data: ContactUsData;
}

export interface ContactMethod {
    type: string;
    link: string;
    text: string;
    icon: any;
    target?: '_blank' | '_self';
}

export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
  }