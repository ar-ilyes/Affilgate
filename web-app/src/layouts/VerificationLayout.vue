<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <div class="flex h-screen">
                <div class="w-12 bg-primary-500 text-white flex flex-col justify-center items-center"></div>
                <div
                    class="bg-[#FFFFFF61] absolute w-full h-[calc(100%-50px)] left-0 top-[50%] -translate-y-[50%] rounded-l-[3rem] z-10">
                </div>
                <section class="relative flex-1 bg-primary-500">
                    <div
                        class="bg-white items-center flex flex-col px-16 relative rounded-l-[3rem] h-screen z-40">
                        <router-view />
                    </div>
                </section>
            </div>
        </q-page-container>
    </q-layout>
</template>