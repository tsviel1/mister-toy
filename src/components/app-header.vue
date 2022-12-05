<template>
    <section class="main-header">
        <header class="flex items-center justify-between container full">
            <div class="logo uppercase">
                <h2>
                    <router-link class="link" to="/toy">Toys</router-link>
                </h2>
            </div>
            <nav class="flex gap-1">
                <router-link class="link" to="/chart">Charts</router-link>
                <router-link class="link" to="/">Home</router-link>
                <router-link class="link" to="/toy">Toys</router-link>
                <router-link class="link" to="/about">About</router-link>
                <router-link class="link" to="/user">User</router-link>
            </nav>
        </header>
    </section>
</template>