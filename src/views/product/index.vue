
<template>
	<div>
       <DataTable filter :headers="headers" :data="filteredProducts">
            <!-- filters -->
            <template #filter-id>
                <div @click="onClearFilterAttributes" ripple class="pa-5">
                    <i class="ri-filter-fill"></i>
                </div>
            </template>

            <template #filter-category>
                <div class="px-3 py-1">
                    <Select 
                        type="text" 
                        :options="categoryStore.categories" 
                        v-model="filterAttributes.category"
                    />
                </div>
            </template>

            <template #filter-brand>
                <div class="px-3 py-1">
                    <TextField type="text" placeholder="Brand" v-model="filterAttributes.brand"/>
                </div>
            </template>
            
        <!-- filter end -->
        <!-- table columns -->
            <template #thumbnail="{data}">
                <div class="product-thumbnail">
                    <img :src="data.row.thumbnail" alt="">
                </div>
            </template>
            <template #description="{data}">
                <div class="three-dots">
                    {{data.row.description}}
                </div>
            </template>
            <template #price="{data}">
                <div>
                    {{ currency(data.row.price)}}
                </div>
            </template>
            <template #discountPercentage="{data}">
                <div>
                    {{ data.row.discountPercentage }}%
                </div>
            </template>
            <!-- table columns end -->
        </DataTable>
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
import { useCategoryStore } from '@/store/categoryStore';
import DataTable from '@/components/DataTable.vue';
import TextField from '@/components/TextField.vue';
import Select from '@/components/Select.vue';
import Pagination from '@/components/Pagination.vue';
import { toast } from 'vue3-toastify'
export default {
  components: { DataTable, TextField, Select, Pagination },
    setup() {
        const headers = ref([
            {
                field: 'id',
                label: '#ID'
            },
            {
                field: 'thumbnail',
                label: 'Thumbnail'
            },
            {
                field: 'title',
                label: 'Title'
            },
            {
                field: 'brand',
                label: 'Brand'
            },
            {
                field: 'category',
                label: 'Category'
            },
            {
                field: 'description',
                label: 'Description'
            },
            {
                field: 'price',
                label: 'Price'
            },
            {
                field: 'discountPercentage',
                label: 'Discount Percentage'
            },
            {
                field: 'rating',
                label: "Rating"
            },
            {
                field: 'stock',
                label: 'Stock'
            }
        ])
        const productStore = useProductStore();
        const categoryStore = useCategoryStore();
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
            categoryStore.getCategories()
            .catch(error => {
                toast.error(error.message || 'Something went wrong!');
            });
            
            getProducts();
        });

        return {
            productStore,
            categoryStore,
            filterAttributes,
            filteredProducts,
            headers,
            currency,
            percentage,
            currentPage,
            onClearFilterAttributes
        }
    }
}
</script>

<style lang="scss" scoped>
    .search {
        width: 20rem;
        margin-bottom: 1rem;
        float: right;
    }
    .three-dots {
        display:inline-block;
        width:18rem;
        white-space: nowrap;
        overflow:hidden !important;
        text-overflow: ellipsis;
    }

    .product-thumbnail {
        width: 5rem;
        height: 3rem;

        img {
            margin: auto;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

   .pagination {
    display: flex;
    justify-content: space-around;
    align-items: center;
   }
</style>
