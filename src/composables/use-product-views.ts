import { ProductView } from "@/interfaces/productView";
import { productViewService } from "@/services/productView.service";

export function useProductViews() {
    const getProductViewsByUserId = async (userId: string) => await productViewService.getProductViewsByUserId(userId);

    const createProductView = async (productView: ProductView) =>  await productViewService.createProductView(productView);

    return {
        createProductView,
        getProductViewsByUserId
    };
}