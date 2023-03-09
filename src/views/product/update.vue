<template>
    <div class="product-update">
        <div class="product-update__images">
            <div class="product-update__images--thumbnail">
                <img :src="get(product, 'thumbnail')" alt="">
            </div>

            <div class="product-update__images--others">
                <div v-for="(img, i) in get(product, 'images', [])" :key="i" class="product-update__images--others-item">
                    <img :src="img" alt=""/>
                </div>
            </div>
        </div>
        <div class="product-update__info">
            <div class="product-update__info--brand-title-price">
                <p>{{ get(product, 'brand') }}</p>
                <p>{{ get(product, 'title') }}</p>
                <p>${{ get(product, 'price', 0) }}</p>
            </div>
            <div>
                <em>{{ get(product, 'description') }}</em>
            </div>
        </div>
    </div>
</template>

<script>
import { getProduct } from "@/api/productApi";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { get } from 'lodash';
export default defineComponent({
    setup() {
        const route = useRoute();
        const product = ref({});
        onMounted(() => {
            getProduct(route.params.id)
            .then((response) => {
                product.value = response.data;
                console.log(product.value);
                toast.success("Successfully")
            })
        })

        return {
            product,
            get
        }
    }
})
</script>

<style lang="scss" scoped>
    .product-update {
        padding: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        &__images {
            &--thumbnail {
                width: 100%;
                height: 40rem;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            &--others {
                margin-top: 1rem;
                display: flex;
                gap: .3rem;
                &-item {
                    width: 8rem;
                    height: 5rem;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
</style>