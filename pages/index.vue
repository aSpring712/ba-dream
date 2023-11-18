<template>
    <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
        <v-card>
        <v-card-title class="headline">
            Welcome !
        </v-card-title>
        <v-card-actions>
            <v-spacer />
            <v-btn
            nuxt
            to="/login"
            >
            이동하기
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'IndexPage'
}
</script>
