<template>
    <div class="signin">
        <div class="signin-form">
            <p class="form-title">Sign in</p>
            <form @submit.prevent="onLogin">
                <div class="form-control" :class="{ 'shake': v$.username.$error }">
                    <label for="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        :class="{ 'error': v$.username.$error }"
                        v-model="signInForm.username"
                        placeholder="Username"
                    />
                    <p v-if="v$.username.$error"> {{ v$.username.$errors[0].$message }} </p>
                </div>

                <div class="form-control" :class="{ 'shake': v$.password.$error }">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        :class="{ 'error': v$.password.$error }"
                        v-model="signInForm.password"
                        placeholder="Password"
                    />
                    <p v-if="v$.password.$error"> {{ v$.password.$errors[0].$message }} </p>
                </div>

                <button ripple>Signin</button>
            </form>
        </div>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from 'vue-router'
    export default defineComponent({
        setup() {
            const route = useRoute();
            const router = useRouter();
            const authStore = useAuthStore();
            const signInForm = reactive({
                username: "",
                password: ""
            });

            const signInFormVRules = {
                username: {
                    required
                },
                password: {
                    required,
                    minLength: minLength(6)
                }
            }

            const v$ = useVuelidate(signInFormVRules, signInForm);

            const redirect = ref('');
            watch(() => route, (newValue) => {
                redirect.value = newValue.query && newValue.query.redirect;
                if(authStore.token) {
                    router.push({path: redirect.value || '/'})
                }
            }, {
                immediate: true,
                deep: true
            });

            const onLogin = () => {
                v$.value.$validate()
                .then(response => {
                    console.log(response);
                    if(response) {
                        authStore.login({ ...signInForm })
                        .then(() => {
                            router.push(redirect.value || '/')
                            toast.success("Logged in successfully!!!")
                        })
                    }
                })
            }
            return {
                signInForm,
                v$,
                onLogin
            }
        }
    })
</script>
<style lang="scss" scoped>
    .signin {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FAACA8;
        background-image: linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%);

        &-form {
            background-color: #0093E9;
            background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
            width: 30%;
            box-shadow: 0px 6px 6px -3px rgba(58, 53, 65, 0.2), 0px 10px 14px 1px rgba(58, 53, 65, 0.14), 0px 4px 18px 3px rgba(58, 53, 65, 0.12);
            border-radius: .6rem;
            padding: 2rem;
            .form-title {
                font-weight: 500;
                font-size: 2rem;
                line-height: 4.8rem;
            }
            .form-control {
                margin-bottom: 2rem;
                label {
                    display: block;
                    text-align: left;
                    font-size: 1.5rem;
                    margin-bottom: .5rem;
                }
                input {
                    width: 100%;
                    border: none;
                    outline: none;
                    border: 1px solid #AEAEAE;
                    font-size: 1.2rem;
                    border-radius: 20px;
                    padding: 1rem;
                    &:focus {
                        border: 1px solid rgb(11, 143, 237);
                    }
                }
                p {
                    color: rgb(235, 28, 28);
                    margin-top: .5rem;
                    text-align: left;
                }
            }

            button {
                margin: 2rem 0;

                display: block;
                width: 100%;
                font-weight: 500;
                font-size: 1.5rem;
                line-height: 3rem;
                padding: .2rem;
                outline: none;
                border: none;
                color: #FFFFFF;
                background-color: #FAD961;
                background-image: linear-gradient(90deg, #FAD961 0%, #F76B1C 100%);


                border-radius: 30px;
            }
        }
    }

    .error {
        border: 1px solid rgb(235, 28, 28) !important;
        color: rgb(235, 28, 28);
    }

   @media screen and (max-width: 360px) {
    .signin {
        &-form {
            width: 95%;
            padding: 1rem;
        }
    }
   }
</style>