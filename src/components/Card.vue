<template>
    <article class="product-card">
        <div class="product-card__img">
            <img :src="get(data, 'thumbnail')" alt="">
            <div class="set-rating">
                <slot name="set-rating" :product="{rawData}">

                </slot>
            </div>
        </div>
        <div class="product-card__title">
            <p class="product-card__title--brand">{{ get(data, 'brand', 'no brand')  }}</p>
            <p class="product-card__title--title">{{ get(data, 'title', 'no title') }}</p>
            <p class="product-card__title--price">${{ get(data, 'price', 0) }}</p>
        </div>
        <p class="product-card__description"> 

            <em>
                {{ get(data, 'description', 'no description') }}
            </em>
        </p>
        <div class="product-card__footer">
            <div class="product-card__footer--rating">
                <vue3-star-ratings :disableClick="!isAuthecticated" v-model="rating" :showControl="false" starSize="20"/>
            </div>
            <div class="product-card__footer--see-more">
                <button @click="onMore">More...</button>
            </div>
        </div>
    </article>
</template>

<script>
import { computed, defineComponent, toRaw } from "vue";
import { get } from 'lodash';
import { updateProductRating } from "@/api/productApi";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
    export default defineComponent({
        props: {
            data: {},
            isAuthecticated: {
                type: Boolean,
                default: false
            }
        },

        setup(props) {
            const router = useRouter();
            const rating = computed({
                get() {
                    return get(props.data, 'rating', 0)
                },
                set() {
                    updateCardRating();
                }
            });
            const rawData = computed(() => toRaw(props.data));
            const updateCardRating = () => {
                updateProductRating({
                    id: props.data.id,
                    rating: rating.value
                }).then(response => {
                    toast.success(response)
                })
            }


            const onMore = () => {
                router.push({name: 'product-update', params: {id: get(props.data, 'id')}})
            }

            return {
                get,
                rating,
                rawData,
                onMore
            }
        }
    })
</script>
<style lang="scss" scoped>
    .product-card {
        box-shadow: 0px 6px 6px -3px rgba(58, 53, 65, 0.2), 0px 10px 14px 1px rgba(58, 53, 65, 0.14), 0px 4px 18px 3px rgba(58, 53, 65, 0.12);
        height: 100%;
        border-radius: .5rem;
        padding: 1rem;
        &__img {
            height: 20rem;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .set-rating {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }


        }

        &__title {
            padding: .5rem;
            display: flex;
            gap: .6rem;
            font-weight: 600;
            font-size: 1rem;
        }

        &__description {
            text-align: left;    
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &--see-more {
                button {
                    $green:  rgb(77, 173, 77);
                    outline: none;
                    padding: .5rem .8rem;
                    font-size: 1rem;
                    color: $green;
                    border-radius: .5rem;
                    border: 1px solid $green;
                    background: rgba($color:$green, $alpha: .1);
                }
            }
        }
    }
</style>