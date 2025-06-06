<template>
    <div :class="baseClass">
        <Header 
            :opened-menu="isOpenMenu"
            :opened-user-menu="isOpenUserMenu"
            :opened-whist-list="isOpenWhistList"
            :opened-shopping-cart="isOpenShoppingCart"
            @updateMenu="(value) => (isOpenMenu = value)"
            @updateUserMenu="(value) => (isOpenUserMenu = value)"
            @selectFavourite="handleFavouriteSelection"
            @updateWhistList="(value) => (isOpenWhistList = value)"
            @updateShoppingCart="(value) => (isOpenShoppingCart = value)"
            @addToCart="addToCartWhistList"
        />
        <div :class="`${baseClass}__wrapper`">
            <UiIconButton 
                icon="go-to" 
                :class="`${baseClass}__icon ${baseClass}__icon--arrow`" 
                @click="router.back()"
            />
            <div :class="`${baseClass}__product`" v-if="productDetails">
                <UiImage :image="productDetails?.imageUrl" size="extra-large" type="semi-round" />
                <div :class="`${baseClass}__product-info`">
                    <h1>{{ productDetails?.name }}</h1>
                    <p v-if="productDetails?.description">{{ productDetails?.description }}</p>
                    <p>{{ productDetails?.price + '€' }}</p>
                    <div :class="`${baseClass}__categories`">
                        <UiPill 
                            v-for="category in productDetails?.categories" 
                            :key="category"
                            :text="category"
                            size="large"
                            status="default"
                        />
                    </div>
                    <p v-if="productDetails?.priceWithDiscount">{{ productDetails?.priceWithDiscount + '€' }}</p>
                    <div :class="`${baseClass}__selects`">
                        <UiSelect   
                            v-if="!productDetails?.isUniqueSize"   
                            @change="value => (size = value)" 
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
                    <div :class="`${baseClass}__selects`">
                        <UiButton text="Añadir al carrito" :class="`${baseClass}__button`" />
                        <UiIconButton
                            @click="selectFavourite"
                            :icon="isFavourite ? 'heartSelected' : 'heart'"
                            :class="[`${baseClass}__icon ${baseClass}__icon--heart`, { [`${baseClass}__icon--heart--selected`]: isFavourite }]" 
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed, ref, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import Header from '@/views/app-header.view.vue';
    import { useProducts, useUsers } from '@/composables';
    import { Product } from '@/interfaces';
    import UiImage from '@/components/shared/ui-image.component.vue';
    import UiIconButton from '@/components/shared/ui-icon-button.component.vue';
    import UiPill from '@/components/shared/ui-pill.component.vue';
    import UiSelect from '@/components/shared/ui-select.component.vue';
    import UiButton from '@/components/shared/ui-button.component.vue';
    import { productService } from '@/services';

    const baseClass = 'product-details';

    const { loadProducts, findProduct } = useProducts();
    const { user } = useUsers();
    const route = useRoute();
    const router = useRouter();
    
    const productId = computed<string>(() => route.params.productId as string);

    const isOpenMenu = ref<boolean>(false);
    const isOpenUserMenu = ref<boolean>(false);
    const isOpenWhistList = ref<boolean>(false);
    const isOpenShoppingCart = ref<boolean>(false);

    const productDetails = ref<Product | undefined>(undefined);
    const size = ref('');
    const unit = ref('');
    const isFavourite = ref<boolean>(productDetails.value?.isFavouriteUsersIds?.includes(user.id) ?? false);

    const handleFavouriteSelection = (): void => {
        loadProducts();
    };

    const addToCartWhistList = (product: Product): void => {
        productDetails.value = product;
        isOpenWhistList.value = false;
    };

    watch(productDetails, () => {
        isFavourite.value = productDetails.value?.isFavouriteUsersIds?.includes(user.value?._id ?? '') ?? false;
    });

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

    onMounted(async () => {
        await loadProducts();
        productDetails.value = findProduct(productId.value);
    });
</script>

<style lang="scss" scoped>
    .product-details {
        height: 100%;

        &__wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(100% - 5rem);
            padding: 2rem;
        }

        &__icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 1px 4px rgba(0,0,0,0.08);
            transition: background 0.2s, box-shadow 0.2s;

            &--arrow {
                position: absolute;
                top: 20px;
                left: 40px;
                transform: rotate(180deg);

                &:hover {
                    background: #f5f5f5;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                }
            }

            &--heart {
                padding: 8px;
                border-radius: 50px;

                &:hover {
                    background-color: var(--bg-red);
                }

                &--selected {
                    background-color: var(--bg-red);
                }
            }
        }

        &__product {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
        }

        &__product-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        &__categories {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        &__selects {
            display: flex;
            gap: 1rem;
        }

        &__button {
            width: 100%;
        }
    }
</style>