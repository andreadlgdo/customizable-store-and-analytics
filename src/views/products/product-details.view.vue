<template>
    <div :class="baseClass">
        <UiLoading v-if="isLoading" />
        <Header 
            :opened-menu="isOpenMenu"
            :opened-user-menu="isOpenUserMenu"
            :opened-whist-list="isOpenWhistList"
            :opened-shopping-cart="isOpenShoppingCart"
            @updateMenu="(value) => (isOpenMenu = value)"
            @updateUserMenu="(value) => (isOpenUserMenu = value)"
            @selectFavourite="loadProducts"
            @updateWhistList="(value) => (isOpenWhistList = value)"
            @updateShoppingCart="(value) => (isOpenShoppingCart = value)"
            @addToCart="addToCartWhistList"
        />
        <div :class="[
            `${baseClass}__wrapper ${baseClass}__wrapper--main`,
            {
                'open-aside': isOpenUserMenu || isOpenWhistList || isOpenShoppingCart,
            }
        ]">
            <UiIconButton 
                icon="go-to" 
                :class="`${baseClass}__icon ${baseClass}__icon--arrow`" 
                @click="goBack"
            />
            <div :class="[`${baseClass}__wrapper ${baseClass}__wrapper--product`,
                {
                'open-aside': isOpenUserMenu || isOpenWhistList || isOpenShoppingCart,
            }
            ]" v-if="productDetails">
                <div :class="`${baseClass}__image-container`">
                    <UiImage :image="productDetails?.imageUrl" type="semi-round" size="super-large" />
                </div>
                <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--info`">
                    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--info-content`">
                        <h1 :class="`${baseClass}__title`">{{ productDetails?.name }}</h1>
                        <p :class="`${baseClass}__description`" v-if="productDetails?.description">{{ productDetails?.description }}</p>
                        <div :class="`${baseClass}__price-container`">
                            <p :class="[
                                    `${baseClass}__text ${baseClass}__text--price`,
                                    { [`${baseClass}__text--have-discount`]: productDetails?.priceWithDiscount }
                                ]"
                            >{{ productDetails?.price + '€' }}</p>
                            <p :class="`${baseClass}__text ${baseClass}__text--discount`" v-if="productDetails?.priceWithDiscount">{{ productDetails?.priceWithDiscount + '€' }}</p>
                        </div>
                        <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--categories`">
                            <UiPill 
                                v-for="category in productDetails?.categories" 
                                :key="category"
                                :text="category"
                                size="large"
                                status="default"
                            />
                        </div>
                        <div v-if="haveStock" :class="`${baseClass}__wrapper ${baseClass}__wrapper--selects`">
                            <UiSelect   
                                v-if="!productDetails?.isUniqueSize"   
                                @change="selectSize" 
                                label="Talla"
                                placeholder="Talla"
                                :options="productDetails?.stock?.map(s => ({ title: s.size, disabled: !s.quantity }))"
                                :value="size"
                            />
                            <UiSelect  
                                v-if="!!size || productDetails?.isUniqueSize"
                                @change="value => (unit = value)"
                                label="Unidades"
                                placeholder="Uds."
                                :options="Array.from(
                                    {
                                        length: (productDetails.isUniqueSize
                                            ? productDetails.uniqueStock
                                            : productDetails.stock?.find(s => s.size === size)?.quantity) ?? 0
                                    },
                                    (_, i) => ({
                                    title: (i + 1).toString()
                                    })
                                )"
                                :value="unit"
                            />
                        </div>
                        <p v-else :class="`${baseClass}__text ${baseClass}__text--stock`">Out of stock</p>
                    </div>
                    <div :class="`${baseClass}__wrapper ${baseClass}__wrapper--footer`">
                        <UiButton
                            @click="addProductCard"
                            text="Añadir al carrito" 
                            icon="cart" 
                            :class="`${baseClass}__button`"  
                            :disabled="(!productDetails.isUniqueSize || !unit) && (!size || !unit)"
                            transparent 
                        />
                        <UiIconButton
                            @click="selectFavourite"
                            :icon="isFavourite ? 'heartSelected' : 'heart'"
                            :class="[`${baseClass}__icon ${baseClass}__icon--heart`, { [`${baseClass}__icon--heart--selected`]: isFavourite }]" 
                        />
                    </div>
                </div>
            </div>
        </div>
        <div :class="`${baseClass}__related-products`">
            <UiProductCarrousel :products="relatedCategoriesWithProductCount" title="Completa tu compra" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed, ref, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import Header from '@/views/app-header.view.vue';
    import { useCart, useCategories, useProducts, useRecommendations, useUsers } from '@/composables';
    import { Product } from '@/interfaces';
    import UiImage from '@/components/shared/ui-image.component.vue';
    import UiIconButton from '@/components/shared/ui-icon-button.component.vue';
    import UiPill from '@/components/shared/ui-pill.component.vue';
    import UiSelect from '@/components/shared/ui-select.component.vue';
    import UiButton from '@/components/shared/ui-button.component.vue';
    import UiLoading from '@/components/shared/ui-loading.component.vue';
    import UiProductCarrousel from '@/components/products/ui-product-carrousel.component.vue';
    import { productService } from '@/services';

    const baseClass = 'product-details';
    
    const { addProduct } = useCart();
    const { loadProducts, findProduct } = useProducts();
    const { getRelatedIdCategories, loadCategories } = useCategories();
    const { processCategories } = useRecommendations();
    const { user } = useUsers();
    const route = useRoute();
    const router = useRouter();
    
    const productId = computed<string>(() => route.params.productId as string);

    const isLoading = ref<boolean>(false);
    const isOpenMenu = ref<boolean>(false);
    const isOpenUserMenu = ref<boolean>(false);
    const isOpenWhistList = ref<boolean>(false);
    const isOpenShoppingCart = ref<boolean>(false);

    const productDetails = ref<Product | undefined>(undefined);
    const size = ref('');
    const unit = ref('');
    const isFavourite = ref<boolean>(productDetails.value?.isFavouriteUsersIds?.includes(user.value?._id ?? '') ?? false);
    const relatedCategoriesWithProductCount = ref<Product[]>([]);
    
    const haveStock = computed(() =>
        productDetails.value?.isUniqueSize
            ? productDetails.value?.uniqueStock
            : productDetails.value?.stock?.reduce((acc, stock) => acc + stock.quantity, 0)
    );
    
    const addToCartWhistList = (product: Product): void => {
        productDetails.value = product;
        isOpenWhistList.value = false;
    };

    const addProductCard = async () => {
        await addProduct(productDetails.value!, size.value, unit.value);
        size.value = '';
        unit.value = '';
        isOpenShoppingCart.value = true;
    };

    const selectSize = (value: string) => {
        size.value = value;
        unit.value = '';
    };

    const selectFavourite = async () => {
        if (!productDetails.value?._id) return;

        if (user.value?._id) {
            const updateProduct: Product = {
            ...productDetails.value,
            isFavouriteUsersIds: !isFavourite.value
                ? [...(productDetails.value?.isFavouriteUsersIds ?? []), user.value._id]
                : productDetails.value?.isFavouriteUsersIds?.filter(f => f !== user.value?._id)
            };

            if (productDetails.value) {
            productDetails.value = updateProduct;
            }
            await productService.updateProduct(updateProduct);
        } else {
            const localFavouritesProductsIds = JSON.parse(
            localStorage.getItem('favouriteProducts') || '[]'
            ) as string[];

            if (!isFavourite.value) {
            if (!localFavouritesProductsIds.includes(productDetails.value?._id ?? '')) {
                localFavouritesProductsIds.push(productDetails.value?._id ?? '');
            }
            } else {
            const index = localFavouritesProductsIds.indexOf(productDetails.value?._id ?? '');
            if (index !== -1) {
                localFavouritesProductsIds.splice(index, 1);
            }
            }
            localStorage.setItem('favouriteProducts', JSON.stringify(localFavouritesProductsIds));
        }

        await loadProducts();
        isOpenWhistList.value = true;
    };

    const goBack = () => {
        const category = route.params.category as string;
        if (category) {
            router.push({ name: 'Products', params: { category: category } });
        } else {
            router.back();
        }
    };

    watch(productDetails, () => {
        isFavourite.value = productDetails.value?.isFavouriteUsersIds?.includes(user.value?._id ?? '') ?? false;
    });

    onMounted(async () => {
        isLoading.value = true;
        await loadProducts();
        productDetails.value = await findProduct(productId.value);
        await loadCategories();
        const productCategories = await processCategories(productDetails.value?.categories ?? []);
        const relatedCategories = await getRelatedIdCategories(productCategories);
        relatedCategoriesWithProductCount.value = await productService.getCategoriesWithProductCount(relatedCategories, 5);
        isLoading.value = false;
    });
</script>

<style lang="scss" scoped>
    .product-details {
        height: 100%;
        background-color: var(--bg-white);

        &__wrapper {
            display: flex;

            &--main {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                height: calc(100% - 5rem);
                padding: 3rem;
                background-color: var(--bg-light);
                transition: all 0.3s ease;
                width: 100%;

                &.open-aside {
                    width: calc(100% - 320px);
                    margin-right: 320px;
                }
            }

            &--product {
                display: flex;
                align-items: flex-start;
                justify-content: center;
                width: 90%;
                padding: 4rem 6rem;
                border-radius: 16px;
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

                &.open-aside {
                    padding: 2rem;
                }
            }

            &--info {
                flex-direction: column;
                justify-content: space-between;
                height: auto;
                min-height: 30rem;
                flex: 1;
                max-width: 500px;
            }

            &--info-content {
                flex-direction: column;
            }

            &--categories {
                flex-wrap: wrap;
                gap: 0.75rem;
                margin: 1rem 0;
            }

            &--selects {
                gap: 1.5rem;
                margin-top: 0.5rem;
            }

            &--footer {
                gap: 1.5rem;
                margin-top: 2rem;
                padding-top: 1.5rem;
                border-top: 1px solid var(--border-color);
            }
        }

        &__related-products {
            padding: 2rem;
            background-color: var(--bg-white);
            border-top: 1px solid var(--border-color);
        }

        &__image-container {
            flex: 1;
            max-width: 500px;
            border-radius: 12px;
            overflow: hidden;
            background-color: transparent;
            transition: transform 0.3s ease;

            :deep(img) {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 12px;
            }

            &:hover {
                transform: scale(1.02);
            }
        }

        &__title {
            font-size: 2rem;
            font-weight: 600;
            color: var(--text-primary);
            margin: 0;
            line-height: 1.2;
        }

        &__description {
            font-size: 1rem;
            color: var(--text-secondary);
            line-height: 1.6;
            margin: 0;
        }

        &__price-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin: 0.5rem 0;
        }

        &__icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            transition: all 0.3s ease;
            background-color: var(--bg-white);

            &--arrow {
                position: absolute;
                top: 2rem;
                left: 2rem;
                transform: rotate(180deg);

                &:hover {
                    background: var(--bg-light);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                    transform: rotate(180deg) scale(1.1);
                }
            }

            &--heart {
                padding: 10px;
                border-radius: 50px;

                &:hover {
                    background-color: var(--bg-red);
                    transform: scale(1.1);
                }

                &--selected {
                    background-color: var(--bg-red);
                }
            }
        }

        &__button {
            width: 100%;
            height: 48px;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;

            &:not(:disabled):hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
        }
        
        &__text {
            &--price {
                font-size: 24px;
                font-weight: bold;
            }

            &--stock,
            &--discount {
                font-size: 24px;
                font-weight: bold;
                color: var(--color-red);
            }

            &--have-discount {
                font-size: 18px;
                text-decoration: line-through;
            }
        }
    }
</style>