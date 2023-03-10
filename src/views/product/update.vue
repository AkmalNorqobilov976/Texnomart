<template>
    <div class="product-update">
        <div class="product-update__images">
            <div class="product-update__images--thumbnail">
                <img :src="selectedImage" alt="">
            </div>

            <YSlider>
                <div class="product-update__images--others">
                    <div v-for="(img, i) in get(product, 'images', [])" :key="i" class="product-update__images--others-item">
                        <img :src="img" @click="selectedImage = img" alt=""/>
                    </div>
                </div>
            </YSlider>

        </div>
        <div class="product-update__info">
            <div class="product-update__info--brand-title-price">
                <p>{{ get(product, 'brand') }}</p>
                <p>{{ get(product, 'title') }}</p>
                <p>${{ get(product, 'price', 0) }}</p>
            </div>
            <div class="product-update__description">
                <em>{{ get(product, 'description') }}</em>
            </div>
            <p class="product-update__stock">Stock: {{ get(product, 'stock', 0) }}</p>
            <p class="product-update__stock">Discount: {{ get(product, 'discountPercentage', 0) }} %</p>
            <form @submit.prevent="onUpdate">
                <p v-if="rating" class="product-update__rating">
                    <vue3-star-ratings  v-model="rating" :showControl="false" starSize="20"/>
                </p>

                <div class="product-update__comment">
                    <textarea v-model="comment" placeholder="Comment" rows="10"></textarea>
                </div>
                <button class="product-update__btn" ripple>Send</button>
            </form>
        </div>
    </div>
</template>

<script>
import { getProduct, updateProductRating } from "@/api/productApi";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { get } from 'lodash';
import YSlider from "@/components/YSlider.vue";
export default defineComponent({
    setup() {
        const route = useRoute();
        const product = ref({});
        const comment = ref("");
        const rating = computed({
            get() {
                return product.value.rating;
            },
            set(value) {
                product.value.rating = value;
            }
        });
        const selectedImage = ref(null);
        onMounted(() => {
            getProduct(route.params.id)
                .then((response) => {
                product.value = response.data;
                selectedImage.value = product.value.thumbnail;
                toast.success("Successfully");
            });
        });
        const onUpdate = () => {
            updateProductRating({
                id: product.value.id,
                rating: rating.value
            }).then(() => {
                toast.success("Updated Succesfully");
            }).catch(error => {
                toast.error(error.message || 'Something went wrong!');
            });
        };
        return {
            product,
            get,
            selectedImage,
            rating,
            comment,
            onUpdate
        };
    },
    components: { YSlider }
})
</script>

<style lang="scss" scoped>
    .product-update {
        padding: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
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

        &__info {
            &--brand-title-price {
                display: flex;
                gap: .3rem;
                font-size: 1rem;
                font-weight: 600;
            }
        }

        &__description {
            margin-top: 1.5rem;
        }

        &__rating {
            display: inline-block;
        }

        &__comment {
            textarea {
                width: 100%;
                padding: 1rem;
            }
        }

        &__btn {
            display: block;
            border: green 1px solid;
            background: rgba($color: green, $alpha: .1);
            border-radius: .1rem;
            padding: .3rem 5rem;
            outline: none;
        }
    }

    @media screen and (max-width: 360px) {
        .product-update {
            grid-template-columns: 1fr;
            padding: 0rem;
            width: 100vw;
            &__images {
            &--thumbnail {
                width: 100vw;
                height: 10rem;
                img {
                    width: 100vw;
                    height: 100%;
                    object-fit: cover;
                }
            }

            &--others {
                margin-top: .4rem;
                display: flex;
                flex-wrap: wrap;
                gap: .2rem;
                &-item {
                    width: 5rem;
                    height: 3rem;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }


        &__comment {
            textarea {
                width: 100%;
                padding: 0rem;
            }
        }

        }
    }
</style>