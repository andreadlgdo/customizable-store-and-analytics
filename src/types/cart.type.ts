export interface CartAsideCustom {
    texts: {
        title: string;
        empty: {
            description: string;
            action: string;
        };
        order: {
            totalPrice: string;
            action: string;
        }
    },
    visuals: {
        colors: {
            empty: {
                button: string;
            },
            order: {
                button: string;
                icon: {
                    favourite: string;
                    delete: string;
                }
            }
        }
    } 
}