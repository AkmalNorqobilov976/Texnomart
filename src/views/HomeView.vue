
<template>
	<div class="product">
      <div class="card-views">
        <div v-for="(product, i) in productStore.data.products" :key="i" class="card-item">
          <Card class="card" :data="product" :isAuthecticated="authStore.isAuthecticated">
          
          </Card>
        </div>
      </div>       
       <div class="pagination">
            <pagination 
                :perPage="productStore.data.limit" 
                :total="productStore.data.total"
                v-model="currentPage"
            />
            <div>
                Totally {{ productStore.data.total }} products. Current showed products {{ filteredProducts.length }}
            </div>
       </div>
	</div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useProductStore } from '@/store/productStore';
import Pagination from '@/components/Pagination.vue';
import { toast } from 'vue3-toastify'
import Card from '@/components/Card.vue';
import { useAuthStore } from '@/store/authStore';
export default {
  components: { Pagination, Card },
    setup() {
        const productStore = useProductStore();
        const authStore = useAuthStore();
        const filterAttributes = reactive({
            q: "",
            price: "",
            discountPercentage: "",
            brand: "",
            category: ""


        });

        const currentPage = ref(1);
        
        watch(currentPage, () => {
            getProducts();
        });


        const currency = computed(() => {
            return (curr) => {
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(curr);
            }
        });

        const percentage = computed(() => {
            return (percent) => {
                return new Intl.NumberFormat('en-US', { 
                    style: 'percent', 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(percent);
            }
        })

        const getProducts = () => {
            productStore.getProducts({ q: filterAttributes.q, currentPage: currentPage.value })
            .catch(error => {
                toast.error(error.message || 'Something went wrong!');
            })
        }

        const filteredProducts = computed(() => {
            let arr = [ ...productStore.data.products ];
            const attrs = Object.keys(filterAttributes);
            
            for (const attr of attrs) {
                if(filterAttributes[attr]) {
                    arr = arr.filter(item => {
                        if(item[attr].includes(filterAttributes[attr])) {
                            return item;
                        }
                    })
                }
            }

            return arr;
        })
        const onClearFilterAttributes = () => {
            let attrs = Object.keys(filterAttributes);
            for (const attr of attrs) {
                filterAttributes[attr] = "";
            }
        }
        
        onMounted(() => {
            
            getProducts();
        });

        return {
            productStore,
            filterAttributes,
            filteredProducts,
            currency,
            percentage,
            currentPage,
            onClearFilterAttributes,
            authStore
        }
    }
}
</script>

<style lang="scss" scoped>
    .product {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;

        .card-views {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: .8rem;
          .card {
            .product-rating {
              display: none;
              width: 100%;
              height: 100%;
              background: rgba($color: #000000, $alpha: .3);
            }
            &:hover .product-rating{
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
    }

   .pagination {
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    margin-top: 2rem;
    justify-content: space-around;
    align-items: center;
   }


   @media screen and (max-width: 360px) {
    .product {
      .card-views {
        grid-template-columns: 1fr;
      }
    }
      .pagination {
            flex-direction: column;
            gap: .5rem;
        }
   }
</style>
